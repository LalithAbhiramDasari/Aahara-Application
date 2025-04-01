package com.capstone.Aaahara_backend.Controllers;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.Aaahara_backend.Models.Food;
import com.capstone.Aaahara_backend.Models.Requests;
import com.capstone.Aaahara_backend.Repositories.FoodRepository;
import com.capstone.Aaahara_backend.Repositories.RequestsRepository;

@RestController
@CrossOrigin
public class RequestsController {

	@Autowired
	private RequestsRepository foodRequestRepo;
	
	@Autowired
	private FoodRepository foodRepo;

	@PutMapping("/requestFood/{food_id}/{user_id}/{requested_quantity}")
	public ResponseEntity<String> requestFood(
	        @PathVariable("food_id") Long foodId,
	        @PathVariable("user_id") Long userId,
	        @PathVariable("requested_quantity") int requestedQuantity) {

	    Optional<Food> foodOptional = foodRepo.getFoodByfoodId(foodId);

	    if (foodOptional.isPresent()) {
	        Food food = foodOptional.get();

	        if (!"Available".equalsIgnoreCase(food.getFood_status())) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Food item is not available for requests.");
	        }

	        if (requestedQuantity <= 0 || requestedQuantity > food.getQuantity()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Invalid requested quantity.");
	        }

	        // Reduce quantity and update status if all quantity is requested
	        int remainingQuantity = food.getQuantity() - requestedQuantity;
	        if (remainingQuantity == 0) {
	            food.setFood_status("Requested to Collect");
	        }
	        food.setQuantity(remainingQuantity);
	        foodRepo.save(food);
	        
	        // Create and save food request
	        Requests foodRequest = new Requests();
	      
	        foodRequest.setFood_id(foodId);
	        foodRequest.setUser_id(userId);
	        foodRequest.setRequested_quantity(requestedQuantity);
	        foodRequest.setRequested_date(new Date()); // Corrected to match entity
	        foodRequest.setRequest_status("Pending");
	        foodRequestRepo.save(foodRequest);
	        
	        Requests foodReq = foodRequestRepo.save(foodRequest);

	        String generatedRequestId = "RXX" + foodReq.getRequest_id();
	        foodReq.setRid(generatedRequestId);
	        foodReq = foodRequestRepo.save(foodRequest);
	        

	        return ResponseEntity.ok("Food request logged successfully. Remaining quantity: " + remainingQuantity);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item not found.");
	    }
	}
	
	@GetMapping("/food-requests")
	public ResponseEntity<List<Requests>> getAllFoodRequests() {
	    List<Requests> requests = foodRequestRepo.findAll();
	    return ResponseEntity.ok(requests);
	}
	
	@PostMapping("/getRequestsForMyFood")
	public ResponseEntity<List<Requests>> getRequestsForMyFood(@RequestParam Long user_id) {
	    List<Requests> requests = foodRequestRepo.getRequestsForMyFood(user_id);
	    return ResponseEntity.ok(requests);
	}
	
	@PostMapping("/getMyRequests")
	public ResponseEntity<List<Requests>> getUsersFoodRequests(@RequestParam Long user_id) {
	    List<Requests> requests = foodRequestRepo.getMyRequests(user_id);
	    return ResponseEntity.ok(requests);
	}
	
	@GetMapping("/food-requests/food/{foodId}")
	public ResponseEntity<List<Requests>> getFoodRequestsByFoodId(@PathVariable Long foodId) {
	    List<Requests> requests = foodRequestRepo.getRequestsByFoodId(foodId);
	    return ResponseEntity.ok(requests);
	}
	
	@GetMapping("/food-requests/user/{userId}")
	public ResponseEntity<List<Requests>> getFoodRequestsByUserId(@PathVariable Long userId) {
	    List<Requests> requests = foodRequestRepo.getRequestsByUserId(userId);
	    return ResponseEntity.ok(requests);
	}
	
	
	@GetMapping("/getRequest/")
	public ResponseEntity<Optional<Requests>> getRequestById(@RequestParam Long request_id)
	{
		Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(request_id);
		return ResponseEntity.ok(requestOptional);
	}
	
	@PostMapping("/food-requests/{requestId}/provider-feedback")
	public ResponseEntity<String> updateProviderFeedback(
	        @PathVariable Long requestId, 
	        @RequestParam String feedback) {

	    Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(requestId);

	    if (requestOptional.isPresent()) {
	        Requests request = requestOptional.get();
	        request.setFood_provider_feedback(feedback);
	        foodRequestRepo.save(request);
	        return ResponseEntity.ok("Provider feedback updated.");
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food request not found.");
	}
	
	@PostMapping("/food-requests/{requestId}/receiver-feedback")
	public ResponseEntity<String> updateReceiverFeedback(
	        @PathVariable Long requestId, 
	        @RequestParam String feedback) {

	    Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(requestId);

	    if (requestOptional.isPresent()) {
	        Requests request = requestOptional.get();
	        request.setFood_receiver_feedback(feedback);
	        foodRequestRepo.save(request);
	        return ResponseEntity.ok("Receiver feedback updated.");
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food request not found.");
	}
	
	@PutMapping("/food-requests/decline/{requestId}")
	public ResponseEntity<String> cancelFoodRequest(@PathVariable Long requestId) {
	    Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(requestId);

	    if (requestOptional.isPresent()) {
	        Requests request = requestOptional.get();

	        if ("Pending".equalsIgnoreCase(request.getRequest_status())) {
	            request.setRequest_status("Declined");
	            foodRequestRepo.save(request);
	            Long foodId = request.getFood_id();
	            
	            Optional<Food> foodOptional = foodRepo.getFoodByfoodId(foodId);
	            if (foodOptional.isPresent()) {
	                Food food = foodOptional.get();

	                // Restore the food quantity
	                food.setQuantity(food.getQuantity() + request.getRequested_quantity());
	                food.setFood_status("Available");
	                foodRepo.save(food);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                        .body("Food item not found.");
	            }
	            
	            return ResponseEntity.ok("Food request has been Declined.");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Only requests with 'Pending' status can be Declined.");
	        }
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food request not found.");
	}
	
	
	@PutMapping("/food-requests/approve/{requestId}")
	public ResponseEntity<String> approveFoodRequest(@PathVariable Long requestId) {
	    Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(requestId);

	    if (requestOptional.isPresent()) {
	        Requests request = requestOptional.get();

	        if ("Pending".equalsIgnoreCase(request.getRequest_status())) {
	            request.setRequest_status("Approved");
	            foodRequestRepo.save(request);
	            return ResponseEntity.ok("Food request has been Approved");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Only requests with 'Pending' status can be Approved.");
	        }
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food request not found.");
	}


	
	@PostMapping("/updateRequestStatus")
    public ResponseEntity<String> updateRequestStatus(
            @RequestParam Long requestId, 
            @RequestParam String status) {

		System.out.println("Received requestId: " + requestId + ", status: " + status);
        Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(requestId);

        if (requestOptional.isPresent()) {
            Requests request = requestOptional.get();
            request.setRequest_status(status);
            foodRequestRepo.save(request);

            // If the new status is "Collected", check if all requests for the food item are collected
            if (status.equalsIgnoreCase("Collected")) {
                List<Requests> requests = foodRequestRepo.getRequestsByFoodId(request.getFood_id());
                boolean allCollected = requests.stream()
                        .allMatch(r -> r.getRequest_status().equalsIgnoreCase("Collected"));

                if (allCollected) {
                    Optional<Food> foodOptional = foodRepo.getFoodByfoodId(request.getFood_id());
                    foodOptional.ifPresent(food -> {
                        food.setFood_status("Collected");
                        foodRepo.save(food);
                    });
                }
            }

            return ResponseEntity.ok("Request status updated to " + status);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food request not found.");
    }


	
//	@PostMapping("/updateRequestStatus")
//    @Transactional
//    public ResponseEntity<String> updateRequestStatus(
//            @RequestParam("requestId") Long requestId,
//            @RequestParam("status") String status) {
//
//        // Logging to confirm parameters are received
//        System.out.println("Received requestId: " + requestId + ", status: " + status);
//
//        // Use your repository method; here we assume findById works if your repository extends JpaRepository.
//        Optional<Requests> requestOptional = foodRequestRepo.getRequestsByRequestId(requestId);
//        if (!requestOptional.isPresent()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food request not found.");
//        }
//
//        Requests request = requestOptional.get();
//        request.setRequest_status(status);
//        foodRequestRepo.save(request);
//        return ResponseEntity.ok("Request status updated to " + status);
//    }
	
	
	
	@PostMapping("/updateFoodStatusIfCollected")
	@Transactional
	public ResponseEntity<String> updateFoodStatusIfCollected(@RequestParam("foodId") Long foodId) {
	    // Fetch food details
	    Optional<Food> foodOptional = foodRepo.findById(foodId);
	    if (!foodOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found.");
	    }

	    Food food = foodOptional.get();

	    // Check if food quantity is 0
	    if (food.getQuantity() > 0) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("Cannot mark as collected: Food quantity is not zero.");
	    }

	    // Fetch all requests associated with the food
	    List<Requests> requestsList = foodRequestRepo.getRequestsByFoodId(foodId);

	    // Check if all requests are marked as "Collected"
	    boolean allCollected = requestsList.stream()
	            .allMatch(req -> "Collected".equalsIgnoreCase(req.getRequest_status()));

	    if (!allCollected) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("Cannot mark as collected: Not all requests are marked as collected.");
	    }

	    // Update the food status
	    food.setFood_status("Collected");
	    foodRepo.save(food);

	    return ResponseEntity.ok("Food status updated to Collected.");
	}
	
	
	@GetMapping("/viewAllfoodRequestsDetails")
	public ResponseEntity<List<?>> viewAllfoodRequestsDetails() {
	    List<?> requests = foodRequestRepo.getRequestsDetails();
	    return ResponseEntity.ok(requests);
	}






}
