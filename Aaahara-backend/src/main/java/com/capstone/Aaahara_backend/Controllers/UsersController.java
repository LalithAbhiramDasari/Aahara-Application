package com.capstone.Aaahara_backend.Controllers;

import java.util.Date;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.capstone.Aaahara_backend.Models.Users;
import com.capstone.Aaahara_backend.Repositories.UsersRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.nio.file.*;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import java.nio.file.*;


@RestController
@CrossOrigin
public class UsersController {

    @Autowired
    UsersRepository userRepo;

    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);
    private static final String SECRET_KEY = "SecretKey";  // Change this in production

    // Generate JWT Token
    private String generateToken(Users user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("userId", user.getUser_id())
                .withClaim("userName", user.getName())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiry
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

 
   
    @PostMapping("/register")
    public ResponseEntity<?> addUser(
            @ModelAttribute Users user,
            @RequestParam("aadhar_image") MultipartFile file) {
        try {
            String phonePattern = "^[6789]\\d{9}$";
            String emailPattern = "^[a-zA-Z][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

            // Validate required fields
            if (user.getPhone() == null || !String.valueOf(user.getPhone()).matches(phonePattern)) {
                return ResponseEntity.badRequest().body("Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.");
            }
            if (user.getEmail() == null || !user.getEmail().matches(emailPattern)) {
                return ResponseEntity.badRequest().body("Invalid email format.");
            }
            if (user.getPassword() == null || user.getPassword().length() < 8) {
                return ResponseEntity.badRequest().body("Password must be at least 8 characters long.");
            }

            // Validate and save Aadhar image
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Aadhar image uploaded.");
            }
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid file format. Only JPG, PNG, and JPEG are allowed for Aadhar image.");
            }

            // Create upload directory if it does not exist
            Path uploadPath = Paths.get(FILE_UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Copy the file to the target location
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Build the file download URI (adjust the URL as needed)
            String fileDownloadUri = "http://localhost:8080/files/aadhar/" + fileName;
            user.setAadhar(fileDownloadUri);

            // Check if email is already registered
            if (userRepo.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already registered! Please use a different email.");
            }

            // Encrypt password before saving
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

            // Save user to get the generated user_id
            Users savedUser = userRepo.save(user);

            // Generate UID based on user_id and update it
            String generatedUid = "UXX" + savedUser.getUser_id();
            savedUser.setUid(generatedUid);
            savedUser.setUser_status("Active");
            
            // Save the user again with the UID
            savedUser = userRepo.save(savedUser);

            // Generate token (using your existing generateToken method)
            String token = "User" + generateToken(savedUser);

            // Prepare the response object
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("name", savedUser.getName());
            response.put("phone", savedUser.getPhone());
            response.put("email", savedUser.getEmail());
            response.put("uid", savedUser.getUid());
            response.put("user_id", savedUser.getUser_id());
            response.put("aadhar_image", savedUser.getAadhar());

            return ResponseEntity.ok(response);

        } catch (DataIntegrityViolationException e) {
            logger.error("Duplicate email detected: ", e);
            return ResponseEntity.badRequest().body("Email already exists!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading Aadhar image.");
        } catch (Exception e) {
            logger.error("Error registering user: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User registration failed.");
        }
    }


    
    
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody Users user) {
        try {
            Optional<Users> foundUser = userRepo.findByEmail(user.getEmail());

            if (foundUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            Users existingUser = foundUser.get();

            // Check if user is banned
            if ("Banned".equalsIgnoreCase(existingUser.getUser_status())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Your account is banned due to unusual activity.");
            }

            // Verify password using BCrypt
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (!encoder.matches(user.getPassword(), existingUser.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }

            // Generate Token (Replace this with actual JWT implementation)
            String token = "User" + generateToken(existingUser);

            // Create response object
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Success");
            response.put("user_id", existingUser.getUser_id());
            response.put("name", existingUser.getName());
            response.put("token", token);
            response.put("uid", existingUser.getUid());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error during login: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed.");
        }
    }
   
    
    @PostMapping("/userdashboard")
    public ResponseEntity<?> getUserDetails(@RequestParam Long user_id) {
        List<Object[]> userDetails = userRepo.usersDetails(user_id);

        if (userDetails.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Object[] user = userDetails.get(0);
        Map<String, Object> response = new HashMap<>();
        response.put("user_id", user[0]);
        response.put("name", user[1]);
        response.put("email", user[2]);
        response.put("phone", user[3]);
        response.put("profile_pic", user[4]);
        response.put("aadhar", user[5]);
        response.put("uid", user[6]);
        

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/viewAllusers")
    public ResponseEntity<List<Users>> viewAllUsers() {
        List<Users> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/checkAadharbyId")
    public ResponseEntity<?> checkAadharbyId(@RequestParam Long user_id) {
        Optional<Users> user = userRepo.findById(user_id);

        if (user.isPresent() && user.get().getAadhar() != null) {
            return ResponseEntity.ok("Aadhar License found");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Driving License not found. Please upload it in your profile.");
        }
    }


    // Global Exception Handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        logger.error("Exception occurred: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
    }
    
    
    @PutMapping("/updateprofile")
    public ResponseEntity<?> updateProfile(@RequestBody Users user) {
        // Check if user ID is provided
        if (user.getUser_id() == null) {
            return ResponseEntity.badRequest().body("User ID is required for updating.");
        }

        // Check if the user exists
        Optional<Users> existingUser = userRepo.findById(user.getUser_id());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        // Update fields
        Users updatedUser = existingUser.get();
        if (user.getName() != null) {
            updatedUser.setName(user.getName());
        }
        if (user.getPassword() != null) {
        	updatedUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // Consider hashing the password before saving
        }
        if (user.getPhone() != null) {
            updatedUser.setPhone(user.getPhone());
        }
       
        // Save the updated user
        userRepo.save(updatedUser);
        
        return ResponseEntity.ok(updatedUser);
    }
    
    @PostMapping("/updateUserLocation/")
    public ResponseEntity<?> updateCoordinates(@RequestParam Double latitude,
                                               @RequestParam Double longitude,
                                               @RequestParam Long user_id) {
        try {
            // Assuming you have a UserService that interacts with your UserRepository
            Optional<Users> optionalUser = userRepo.findById(user_id);
            if (optionalUser.isPresent()) {
                Users user = optionalUser.get();
                user.setLatitude(latitude);
                user.setLongitude(longitude);
                userRepo.save(user);
                return ResponseEntity.ok("Location updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error updating location: " + e.getMessage());
        }
    }
    

    
    private static final String FILE_UPLOAD_DIR = System.getProperty("user.dir") + "/Uploads/aadhar/";
    @PostMapping("/upload-aadhar/{user_id}")
    public ResponseEntity<?> uploadDL(@PathVariable Long user_id, @RequestPart("aadhar") MultipartFile file) {
        try {
            Optional<Users> existingUser = userRepo.findById(user_id);
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded.");
            }

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file format. Only JPG, PNG, and JPEG are allowed.");
            }

            String fileStorageLocation = FILE_UPLOAD_DIR; // Define your storage path
            Path uploadPath = Paths.get(fileStorageLocation);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Users user = existingUser.get();
            String fileDownloadUri = "http://localhost:8080/files/aadhar/" + fileName;
            user.setAadhar(fileDownloadUri);
            userRepo.save(user);

            return ResponseEntity.ok(Map.of("message", "Aadhar uploaded successfully.", "fileUrl", fileDownloadUri));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the file.");
        }
    }
    
    private static final String PROFILE_UPLOAD_DIR = System.getProperty("user.dir") + "/Uploads/profile_pic/";
    
    @PostMapping("/upload-profile/{user_id}")
    public ResponseEntity<?> uploadProfilePic(@PathVariable Long user_id, @RequestPart("profile_pic") MultipartFile file) {
        try {
            Optional<Users> existingUser = userRepo.findById(user_id);
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded.");
            }

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file format. Only JPG, PNG, and JPEG are allowed.");
            }

            Path uploadPath = Paths.get(PROFILE_UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Users user = existingUser.get();
            String fileDownloadUri = "http://localhost:8080/files/profile/" + fileName;
            user.setProfile_pic(fileDownloadUri);
            userRepo.save(user);

            return ResponseEntity.ok(Map.of("message", "Profile picture uploaded successfully.", "fileUrl", fileDownloadUri));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the file.");
        }
    }
    
    
    @PutMapping("/banUser")
    public ResponseEntity<?> banUser(@RequestBody Users user) {
        // Check if user ID is provided
        if (user.getUser_id() == null) {
            return ResponseEntity.badRequest().body("User ID is required for Banning.");
        }

        Optional<Users> existingUser = userRepo.findById(user.getUser_id());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        // Update fields
        Users updatedUser = existingUser.get();
        if (user.getUser_status().equals("Active")) {
            updatedUser.setUser_status("Banned");
        }
  
        userRepo.save(updatedUser);
        
        return ResponseEntity.ok(updatedUser);
    }
    
    @PutMapping("/unbanUser")
    public ResponseEntity<?> UnbanUser(@RequestBody Users user) {
        // Check if user ID is provided
        if (user.getUser_id() == null) {
            return ResponseEntity.badRequest().body("User ID is required for Banning.");
        }

        Optional<Users> existingUser = userRepo.findById(user.getUser_id());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        // Update fields
        Users updatedUser = existingUser.get();
        if (user.getUser_status().equals("Banned")) {
            updatedUser.setUser_status("Active");
        }
  
        userRepo.save(updatedUser);
        
        return ResponseEntity.ok(updatedUser);
    }
   
}
