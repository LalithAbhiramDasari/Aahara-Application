package com.capstone.Aaahara_backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.Aaahara_backend.Models.Food;

public interface FoodRepository extends JpaRepository<Food,Long> {

	@Query(value = "SELECT * FROM food f WHERE f.food_id = ?1", nativeQuery = true)
    Optional<Food> getFoodByfoodId(Long foodId);
	
	@Query(value = "SELECT * FROM food f WHERE f.user_id = ?1", nativeQuery = true)
    List<Food> getFoodByUserId(Long UserId);
	
	@Query(value = "SELECT f.* FROM food as f join users as u on f.user_id = u.user_id WHERE f.user_id != ?1 AND f.food_status NOT IN ('Expired', 'Deleted', 'Collected') AND u.user_status = 'Active'", nativeQuery = true)
	List<Food> getFoodUsersFoodById(Long userId);
	
	
	
}
