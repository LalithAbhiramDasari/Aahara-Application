package com.capstone.Aaahara_backend.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Food {

	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long food_id;
    
    @JsonProperty("fid")
    private String fid;
    
    @JsonProperty("user_id")
    private Long user_id;

    @JsonProperty("description")
    @Column(columnDefinition = "TEXT")
    private String description;

    @JsonProperty("quantity")
    private Integer quantity;
    
    @JsonProperty("posted_quantity")
    private Integer posted_quantity;
    // Number of persons it serves
    
    @Temporal(TemporalType.TIMESTAMP)
	private Date posted_date = new Date();

    
    @JsonProperty("expiry_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime expiry_date;

    @JsonProperty("latitude")
    private Double latitude;

    @JsonProperty("longitude")
    private Double longitude;

    @JsonProperty("address")
    private String address;

    @JsonProperty("food_image")
    @Column(columnDefinition = "LONGTEXT")
    private String food_image;
    
    @JsonProperty("food_type")
    private String food_type;
    
    @JsonProperty("food_category")
    private String food_category;
    
    @JsonProperty("food_status")
    private String food_status; // Active or Deleted

	public Food() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Food(Long food_id, String fid, Long user_id, String description, Integer quantity,Integer posted_quantity, Date posted_date,
			LocalDateTime expiry_date, Double latitude, Double longitude, String address, String food_image,
			String food_type, String food_category, String food_status) {
		super();
		this.food_id = food_id;
		this.fid = fid;
		this.user_id = user_id;
		this.description = description;
		this.quantity = quantity;
		this.posted_quantity = posted_quantity;
		this.posted_date = posted_date;
		this.expiry_date = expiry_date;
		this.latitude = latitude;
		this.longitude = longitude;
		this.address = address;
		this.food_image = food_image;
		this.food_type = food_type;
		this.food_category = food_category;
		this.food_status = food_status;
	}

	public Long getFood_id() {
		return food_id;
	}

	public void setFood_id(Long food_id) {
		this.food_id = food_id;
	}

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public Integer getPosted_quantity() {
		return posted_quantity;
	}

	public void setPosted_quantity(Integer posted_quantity) {
		this.posted_quantity = posted_quantity;
	}

	public Date getPosted_date() {
		return posted_date;
	}

	public void setPosted_date(Date posted_date) {
		this.posted_date = posted_date;
	}

	public LocalDateTime getExpiry_date() {
		return expiry_date;
	}

	public void setExpiry_date(LocalDateTime expiry_date) {
		this.expiry_date = expiry_date;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFood_image() {
		return food_image;
	}

	public void setFood_image(String food_image) {
		this.food_image = food_image;
	}

	public String getFood_type() {
		return food_type;
	}

	public void setFood_type(String food_type) {
		this.food_type = food_type;
	}

	public String getFood_category() {
		return food_category;
	}

	public void setFood_category(String food_category) {
		this.food_category = food_category;
	}

	public String getFood_status() {
		return food_status;
	}

	public void setFood_status(String food_status) {
		this.food_status = food_status;
	}

	

}