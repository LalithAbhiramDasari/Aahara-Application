package com.capstone.Aaahara_backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.capstone.Aaahara_backend.Models.Admin;


public interface AdminRepository extends JpaRepository<Admin, Long> 
{
	 @Query(value = "SELECT * from admin where admin_name = ?1" , nativeQuery = true)
	 Optional<Admin> findByAdminName(String admin_name);
}
