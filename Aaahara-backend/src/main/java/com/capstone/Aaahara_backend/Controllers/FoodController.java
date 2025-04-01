package com.capstone.Aaahara_backend.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.capstone.Aaahara_backend.Models.Food;
import com.capstone.Aaahara_backend.Models.Users;
import com.capstone.Aaahara_backend.Repositories.FoodRepository;

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
import com.fasterxml.jackson.databind.ObjectMapper;

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
public class FoodController {

	@Autowired
    FoodRepository foodRepo;
	
//	@PostMapping("/postFood")
//    public ResponseEntity<Food> addFood(@RequestBody Food food) {
//        if (food.getFood_status() == null || food.getFood_status().isEmpty()) {
//            food.setFood_status("Available");
//        }
//        String generatedFoodId = "FXX" + food.getFood_id();
//        food.setFid(generatedFoodId);
//        System.out.println(food.toString());
//        Food foodObj = foodRepo.save(food);
//        return ResponseEntity.ok(foodObj);
//    }
	
	private static final String FOOD_UPLOAD_DIR = System.getProperty("user.dir") + "/Uploads/food/";
	@PostMapping("/postFood")
	public ResponseEntity<?> addFoodWithImage(
			@ModelAttribute Food food,
	        @RequestParam("image") MultipartFile file) {
	    try {
	    	
	    	System.out.println("DEBUG :: Received:");
	        System.out.println("user_id: " + food.getUser_id());
	        System.out.println("description: " + food.getDescription());
	        System.out.println("quantity: " + food.getQuantity());
	        System.out.println("file: " + file.getOriginalFilename());

	        // Default status if not provided
	        if (food.getFood_status() == null || food.getFood_status().isEmpty()) {
	            food.setFood_status("Available");
	        }

	        // Validate and save image
	        if (file.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No image uploaded.");
	        }

	        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	        if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg")) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file format. Only JPG, PNG, and JPEG are allowed.");
	        }

	        Path uploadPath = Paths.get(FOOD_UPLOAD_DIR);
	        if (!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        Path targetLocation = uploadPath.resolve(fileName);
	        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

	        // Set image URL and generated food ID
	        String fileDownloadUri = "http://localhost:8080/files/food/" + fileName;
	        Food savedFood = foodRepo.save(food);
	        savedFood.setFood_image(fileDownloadUri);
	        

	        String generatedFoodId = "FXX" + (savedFood.getFood_id());
	        savedFood.setFid(generatedFoodId);
	        savedFood = foodRepo.save(food);

	        // Save food to database
	        //Food savedFood = foodRepo.save(food);
	        return ResponseEntity.ok(savedFood);
	    } catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image.");
	    }
	}
	
//	@PutMapping("/changeFoodStatus/{foodId}")
//	public ResponseEntity<String> changeFoodStatus(@PathVariable Long foodId, @PathVariable String status) {
//	    Optional<Food> foodOptional = foodRepo.getFoodByfoodId(foodId);
//
//	    if (foodOptional.isPresent()) {
//	        Food food = foodOptional.get();
//	        
//	        if ("Available".equalsIgnoreCase(food.getFood_status())) {
//	            food.setFood_status(status);
//	            foodRepo.save(food);
//	            return ResponseEntity.ok("Food item marked as Deleted.");
//	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Food item is not available for deletion.");
//	        }
//	    } else {
//	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item not found.");
//	    }
//	}

	
	@PutMapping("/deleteFood/{foodId}")
	public ResponseEntity<String> deleteFood(@PathVariable Long foodId) {
	    Optional<Food> foodOptional = foodRepo.getFoodByfoodId(foodId);

	    if (foodOptional.isPresent()) {
	        Food food = foodOptional.get();
	        
	        if ("Available".equalsIgnoreCase(food.getFood_status())) {
	            food.setFood_status("Deleted");
	            foodRepo.save(food);
	            return ResponseEntity.ok("Food item marked as Deleted.");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Food item is not available for deletion.");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item not found.");
	    }
	}
	
	@PutMapping("/markExpired/{foodId}")
	public ResponseEntity<String> markExpired(@PathVariable Long foodId) {
	    Optional<Food> foodOptional = foodRepo.getFoodByfoodId(foodId);

	    if (foodOptional.isPresent()) {
	        Food food = foodOptional.get();
	        
	        if ("Available".equalsIgnoreCase(food.getFood_status()) || "Requested to Collect".equalsIgnoreCase(food.getFood_status())) {
	            food.setFood_status("Expired");
	            foodRepo.save(food);
	            return ResponseEntity.ok("Food item marked as Expired.");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Food item is not available for to change status.");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item not found.");
	    }
	}
	
	@GetMapping("/viewAllFood")
    public ResponseEntity<List<Food>> viewAllFood() {
        List<Food> food = foodRepo.findAll();
        return ResponseEntity.ok(food);
    }
	
	@PostMapping("/viewMyFood")
    public ResponseEntity<List<Food>> viewmyFood(@RequestBody Food f) {
        List<Food> food = foodRepo.getFoodByUserId(f.getUser_id());
        return ResponseEntity.ok(food);
    }
	
	@PostMapping("/viewUsersFood")
    public ResponseEntity<List<Food>> viewmyUsersFood(@RequestBody Food f) {
        List<Food> food = foodRepo.getFoodUsersFoodById(f.getUser_id());
        return ResponseEntity.ok(food);
    }
	
	@GetMapping("/viewFoodById")
	public ResponseEntity<Food> viewFoodById(@RequestParam Long foodId) {
	    Optional<Food> food = foodRepo.getFoodByfoodId(foodId);
	    return food.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	
	

	
	
}
