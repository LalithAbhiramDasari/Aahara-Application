package com.capstone.Aaahara_backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.Aaahara_backend.Models.Food;
import com.capstone.Aaahara_backend.Models.Requests;

public interface RequestsRepository extends JpaRepository<Requests, Long> {
    
	@Query(value = "SELECT * FROM requests as f WHERE f.food_id = ?1", nativeQuery = true)
	List<Requests> getRequestsByFoodId(Long food_id);
	
	@Query(value = "SELECT * FROM requests as f WHERE f.user_id = ?1", nativeQuery = true)
    List<Requests> getRequestsByUserId(Long user_id);
	
	@Query(value = "SELECT * FROM requests as r WHERE r.request_id = ?1", nativeQuery = true)
    Optional<Requests> getRequestsByRequestId(Long request_id);
	
	@Query(value = "SELECT * FROM requests as r WHERE r.rid = '?1'", nativeQuery = true)
    Optional<Requests> getRequestsByRId(String request_id);
	
	@Query(value = "SELECT * FROM requests as r WHERE r.user_id = ?1", nativeQuery = true)
    List<Requests> getMyRequests(Long user_id);
	
//	@Query(value = "SELECT r.* FROM requests r JOIN food f ON r.food_id = f.food_id join users as u on requests.user_id = u.user_id where f.user_id = ?1 ", nativeQuery = true)
//    List<Requests> getRequestsForMyFood(Long user_id);
	
	@Query(value = "SELECT req.* FROM requests req INNER JOIN food food ON req.food_id = food.food_id INNER JOIN users usr ON req.user_id = usr.user_id WHERE food.user_id = ?1 AND usr.user_status = 'Active'", nativeQuery = true)
	List<Requests> getRequestsForMyFood(Long userId);
	 
	@Query(value = "SELECT f.food_id, r.rid, u.uid, u.name, f.fid, f.description, f.posted_quantity, r.requested_quantity, f.posted_date, r.requested_date, f.food_status, r.request_status, r.food_provider_feedback, r.food_receiver_feedback from requests as r join users as u on r.user_id= u.user_id join food as f on f.food_id = r.food_id", nativeQuery = true)
    List<?> getRequestsDetails();
	
}