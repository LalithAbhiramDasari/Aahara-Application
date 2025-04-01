package com.capstone.Aaahara_backend.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class Users
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    
    @JsonProperty("uid")
    private String uid;

    @JsonProperty("name")
    private String name;

    @Column(unique = true)
    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("aadhar")
    @Column(columnDefinition = "LONGTEXT")
    private String aadhar;

    @JsonProperty("phone")
    private Long phone;

    @JsonProperty("profile_pic")
    @Column(columnDefinition = "LONGTEXT")
    private String profile_pic;

    @JsonProperty("latitude")
    private Double latitude;

    @JsonProperty("longitude")
    private Double longitude;
    
    @JsonProperty("user_status")
    private String user_status;// Active or Banned

	public Users(Long user_id, String uid, String name, String email, String password, String aadhar, Long phone,
			String profile_pic, Double latitude, Double longitude, String user_status) {
		super();
		this.user_id = user_id;
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.password = password;
		this.aadhar = aadhar;
		this.phone = phone;
		this.profile_pic = profile_pic;
		this.latitude = latitude;
		this.longitude = longitude;
		this.user_status = user_status;
	}

	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getProfile_pic() {
		return profile_pic;
	}

	public void setProfile_pic(String profile_pic) {
		this.profile_pic = profile_pic;
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

	public String getUser_status() {
		return user_status;
	}

	public void setUser_status(String user_status) {
		this.user_status = user_status;
	}
    

}	