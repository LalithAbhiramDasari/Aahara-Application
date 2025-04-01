package com.capstone.Aaahara_backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.auth0.jwt.JWT;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.auth0.jwt.algorithms.Algorithm;
import com.capstone.Aaahara_backend.Models.Admin;
import com.capstone.Aaahara_backend.Repositories.AdminRepository;

import java.util.Date;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


@RestController
@CrossOrigin
public class AdminController {
    
    @Autowired
    AdminRepository adminRepo;
    
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
    private static final String SECRET_KEY = "SecretKey"; 

    // Generate JWT Token
    private String generateToken(Admin admin) {
        return JWT.create()
                .withSubject(admin.getAdmin_name())
                .withClaim("adminId", admin.getAdmin_id())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiry
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    @PostMapping("/adminLogin")
    public ResponseEntity<?> adminLogin(@RequestBody Admin admin) {
        try {
            Optional<Admin> foundAdmin = adminRepo.findByAdminName(admin.getAdmin_name());

            if (foundAdmin.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin not found");
            }

            Admin existingAdmin = foundAdmin.get();

            // Password comparison using equals()
            if (!admin.getAdmin_password().equals(existingAdmin.getAdmin_password())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }

            // Generate Token
            String token = "Admin" + generateToken(existingAdmin);

            // Create response object
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Success");
            response.put("admin_id", existingAdmin.getAdmin_id());
            response.put("admin_name", existingAdmin.getAdmin_name());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error during admin login: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Admin login failed");
        }
    }

}
