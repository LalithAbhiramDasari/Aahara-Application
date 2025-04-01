package com.capstone.Aaahara_backend.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Requests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long request_id;
    
    @JsonProperty("rid")
    private String rid;

    @JsonProperty("food_id")
    private Long food_id;

    @JsonProperty("user_id")
    private Long user_id; 

    @JsonProperty("requested_quantity")
    private Integer requested_quantity;

    @Temporal(TemporalType.TIMESTAMP)
	private Date requested_date = new Date();

    @JsonProperty("request_status")
    private String request_status; // Pending, Approved, Collected, Rejected
    
    @JsonProperty("food_provider_feedback")
    private String food_provider_feedback;
    
    @JsonProperty("food_receiver_feedback")
    private String food_receiver_feedback;

	public Requests() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Requests(Long request_id, String rid, Long food_id, Long user_id, Integer requested_quantity,
			Date requested_date, String request_status, String food_provider_feedback, String food_receiver_feedback) {
		super();
		this.request_id = request_id;
		this.rid = rid;
		this.food_id = food_id;
		this.user_id = user_id;
		this.requested_quantity = requested_quantity;
		this.requested_date = requested_date;
		this.request_status = request_status;
		this.food_provider_feedback = food_provider_feedback;
		this.food_receiver_feedback = food_receiver_feedback;
	}

	public Long getRequest_id() {
		return request_id;
	}

	public void setRequest_id(Long id) {
		this.request_id = id;
	}

	public String getRid() {
		return rid;
	}

	public void setRid(String request_id) {
		this.rid = request_id;
	}

	public Long getFood_id() {
		return food_id;
	}

	public void setFood_id(Long food_id) {
		this.food_id = food_id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Integer getRequested_quantity() {
		return requested_quantity;
	}

	public void setRequested_quantity(Integer requested_quantity) {
		this.requested_quantity = requested_quantity;
	}

	public Date getRequested_date() {
		return requested_date;
	}

	public void setRequested_date(Date requested_date) {
		this.requested_date = requested_date;
	}

	public String getRequest_status() {
		return request_status;
	}

	public void setRequest_status(String request_status) {
		this.request_status = request_status;
	}

	public String getFood_provider_feedback() {
		return food_provider_feedback;
	}

	public void setFood_provider_feedback(String food_provider_feedback) {
		this.food_provider_feedback = food_provider_feedback;
	}

	public String getFood_receiver_feedback() {
		return food_receiver_feedback;
	}

	public void setFood_receiver_feedback(String food_receiver_feedback) {
		this.food_receiver_feedback = food_receiver_feedback;
	}
    
}
