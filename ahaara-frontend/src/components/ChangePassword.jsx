import { 
    Button, 
    TextField, 
    InputAdornment, 
    Typography, 
    Paper, 
    Box, 
    IconButton, 
    Alert 
  } from '@mui/material';
  import { Visibility, VisibilityOff } from '@mui/icons-material';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  
  const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const user_id = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!user_id || !token || !token.startsWith("User")) {
            navigate("/error");
          }
        }, []);
  
    const validateField = (name, value) => {
      let error = "";
      if (name === "currentPassword") {
        if (!value) error = "Current password is required";
      } else if (name === "newPassword") {
        if (!value) error = "New password is required";
        else if (value.length < 8) error = "At least 8 characters required";
        else if (!/[A-Z]/.test(value)) error = "Include at least one uppercase letter";
        else if (!/[0-9]/.test(value)) error = "Include at least one number";
        else if (!/[!@#$%^&*]/.test(value)) error = "Include at least one special character";
        else if (/\s/.test(value)) error = "No spaces allowed in password";
      } else if (name === "confirmNewPassword") {
        if (!value) error = "Please confirm new password";
        else if (value !== passwords.newPassword) error = "Passwords do not match";
      }
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPasswords(prev => ({ ...prev, [name]: value }));
      validateField(name, value);
    };
  
    const validateForm = () => {
      let newErrors = {};
      Object.keys(passwords).forEach(key => {
        const err = validateField(key, passwords[key]);
        if (err) newErrors[key] = err;
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      if (!validateForm()) {
        setMessage("Please fix the errors before submitting");
        return;
      }
      try {
        // Retrieve full user details from the dashboard API
        const dashboardResponse = await axios.post("http://localhost:8080/userdashboard", null, {
          params: { user_id }
        });
        const userDetails = dashboardResponse.data;
        if (!userDetails.email) {
          setMessage("Unable to retrieve user details");
          return;
        }
    
        // Validate current password using the login API
        try {
          const loginResponse = await axios.post("http://localhost:8080/login", {
            email: userDetails.email,
            password: passwords.currentPassword
          });
          // If login response message is not "Success", show error
          if (!loginResponse.data || loginResponse.data.message !== "Success") {
            setMessage("Invalid Current password");
            return;
          }
        } catch (error) {
          if (error.response && error.response.data) {
            const errMsg = error.response.data;
            if (errMsg === "Invalid password") {
              setMessage("Invalid Current password");
            } else {
              setMessage(errMsg);
            }
          } else {
            setMessage("Error validating current password");
          }
          return;
        }
    
        // Update the password in the full user object
        const updatedUser = { ...userDetails, password: passwords.newPassword };
    
        // Update the user using the updateprofile endpoint
        const updateResponse = await axios.put("http://localhost:8080/updateprofile", updatedUser);
        
        if (updateResponse.status === 200) {
          setMessage("Password changed successfully");
          // Navigate back after a short delay
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        } else {
          setMessage(updateResponse.data.message || "Failed to change password");
        }
        
      } catch (error) {
        console.error("Error updating password:", error);
        setMessage("Error updating password");
      }
    };
  
    return (
      <Box sx={{ 
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        minHeight:"100vh", 
        width:"100vw", 
        padding:2 
      }}>
        <Paper sx={{ 
          padding:4, 
          borderRadius:3, 
          width:"100%", 
          maxWidth:600, 
          backgroundColor:"white", 
          boxShadow:3 
        }}>
          <Typography variant="h5" sx={{ textAlign:"center", fontWeight:"bold", marginBottom:3 }}>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField 
              label="Current Password"
              variant="outlined"
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={passwords.currentPassword}
              onChange={handleChange}
              onBlur={(e) => validateField("currentPassword", e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end">
                      {showCurrent ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField 
              label="New Password"
              variant="outlined"
              name="newPassword"
              type={showNew ? "text" : "password"}
              value={passwords.newPassword}
              onChange={handleChange}
              onBlur={(e) => validateField("newPassword", e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField 
              label="Confirm New Password"
              variant="outlined"
              name="confirmNewPassword"
              type={showConfirm ? "text" : "password"}
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              onBlur={(e) => validateField("confirmNewPassword", e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {message && <Alert severity="info" sx={{ mt:2 }}>{message}</Alert>}
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ marginTop:3, padding:1.5, fontWeight:"bold", backgroundColor:"green", "&:hover": { backgroundColor: "darkgreen" } }}
            >
              Change Password
            </Button>
          </form>
          <Button variant="outlined" fullWidth onClick={() => navigate(-1)}
           
            sx={{ marginTop: 2, padding: 1.5, fontWeight: "bold", color: "green", borderColor: "green", "&:hover": { backgroundColor: "rgba(134, 239, 172, 0.8)", color: "white" } }}
            >
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  };
  
  export default ChangePassword;
  