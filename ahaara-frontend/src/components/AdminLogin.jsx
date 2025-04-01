import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Paper, 
  Box, 
  Typography, 
  InputAdornment, 
  IconButton, 
  Link, 
  Alert, 
  useMediaQuery 
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ admin_name: "", admin_password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    // if (!formData.email.match(/^[a-zA-Z][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    //   newErrors.email = "Enter a valid email";
    // }
    // if (formData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters";
    // }
    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setServerError("");

    try {
      const response = await axios.post("http://localhost:8080/adminLogin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.message === "Success") {
        const { admin_id, token } = response.data;
        sessionStorage.setItem("admin_id", admin_id);
        sessionStorage.setItem("token", token);
        navigate("/viewAllUsers");
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data === "User not found") {
          setServerError("User not found. Please register first.");
        } else if (data === "Invalid password") {
          setServerError("Incorrect password. Try again.");
        } else if (data === "Your account is banned due to unusual activity.") {
          setServerError("Your account is banned due to unusual activity.");
        } else {
          setServerError("Something went wrong! Please try again.");
        }
      } else {
        setServerError("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",  
      height: "100vh", 
      width: "100vw",
      padding: isMobile ? 2 : 0,
      
    }}>
      <Paper sx={{ 
        padding: 4, 
        borderRadius: 3, 
        width: isMobile ? "90%" : 400, 
        textAlign: "center", 
        backgroundColor: "#e3f2fd",
        boxShadow: 3
      }}>
        <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold", marginBottom: 3 }}>
          ADMIN LOGIN
        </Typography>
        {serverError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {serverError}
          </Alert>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.admin_name}
            onChange={(e) => setFormData({ ...formData, admin_name: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
            error={!!errors.admin_password}
            helperText={errors.password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button 
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 3,
              padding: 1.5,
              fontWeight: "bold",
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" }
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
