// import { Button, TextField, InputAdornment, Typography, Paper, Box, useMediaQuery } from '@mui/material';
// import { Email, Lock } from '@mui/icons-material';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [data, setData] = useState({ email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const [errorMessage, setErrorMessage] = useState("");
//     const isMobile = useMediaQuery("(max-width:600px)");
//     const navigate = useNavigate();

//     const inputHandler = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };


//     const handleSubmit = async () => {
//         ["email", "password"].forEach(field => validateField(field, data[field]));

//         if (Object.values(errors).some(error => error !== "")) {
//             alert("Please correct the errors before submitting.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:8080/api/login", data);
//             const userData = response.data;
            
//             if (userData.success) {
//                 sessionStorage.setItem("user", JSON.stringify(userData.user));
//                 navigate("/CreateBookings"); // Redirect to user account page
//             } else {
//                 setErrorMessage("Invalid credentials, please try again.");
//             }
//         } catch (error) {
//             setErrorMessage("Login failed. Please check your credentials.");
//         }
//     };

//     return (
//         <Box sx={{ 
//             display: "flex", 
//             justifyContent: isMobile ? "center" : "flex-start", 
//             alignItems: "center",  
//             height: "100vh", 
//             width: "100vw",
//             backgroundImage: "url('src/assets/loginbg.png')", 
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             padding: isMobile ? 2 : 0
//         }}>
//             <Paper sx={{ 
//                 padding: 4, 
//                 borderRadius: 3, 
//                 width: isMobile ? "90%" : 400, 
//                 textAlign: "center", 
//                 backgroundColor: "#e3f2fd",
//                 marginLeft: isMobile ? 0 : "5%", 
//                 boxShadow: 3
//             }}>
//                 <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", marginBottom: 3 }}>
//                     Login
//                 </Typography>

//                 <TextField 
//                     label="Email" 
//                     variant="outlined" 
//                     onChange={inputHandler} 
//                     onBlur={(e) => validateField("email", e.target.value)} 
//                     name="email" 
//                     fullWidth 
//                     margin="normal" 
//                     error={!!errors.email} 
//                     helperText={errors.email} 
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }} 
//                 />

//                 <TextField 
//                     label="Password" 
//                     variant="outlined" 
//                     onChange={inputHandler} 
//                     onBlur={(e) => validateField("password", e.target.value)} 
//                     name="password" 
//                     type="password" 
//                     fullWidth 
//                     margin="normal" 
//                     error={!!errors.password} 
//                     helperText={errors.password} 
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>) }} 
//                 />

//                 {errorMessage && <Typography color="error">{errorMessage}</Typography>}

//                 <Button 
//                     variant="contained" 
//                     color="primary" 
//                     fullWidth 
//                     sx={{ marginTop: 3, padding: 1.5, fontWeight: "bold", backgroundColor: "#007BFF", "&:hover": { backgroundColor: "#0056b3" } }} 
//                     onClick={handleSubmit}>
//                     Login
//                 </Button>
//                 <br />
//                 <br />
//                 <div className='flex flex-row justify-center items-center -mt-2 -mb-5'>
//                     <h3 className='-mt-1'>Already a user?</h3>
//                     <Link to={'/signup'}> <Button color='primary'>Signup</Button> </Link>
//                 </div>
//             </Paper>
//         </Box>
//     );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Alert,
//   Link,
//   Box,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.email.match(/^[a-zA-Z][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//       newErrors.email = "Enter a valid email";
//     }
//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setServerError("");

//     try {
//       const response = await axios.post("http://localhost:8080/login", formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.message === "Success") {
//         const { user_id, token } = response.data;
//         sessionStorage.setItem("user_id", user_id);
//         sessionStorage.setItem("token", token);
//         window.location.href = "/UserMain";
//       }
//     } catch (error) {
//       if (error.response) {
//         const { data } = error.response;

//         if (data === "User not found") {
//           setServerError("User not found. Please register first.");
//         } else if (data === "Invalid password") {
//           setServerError("Incorrect password. Try again.");
//         } else if (data === "Your account is banned due to unusual activity.") {
//           setServerError("Your account is banned due to unusual activity.");
//         } else {
//           setServerError("Something went wrong! Please try again.");
//         }
//       } else {
//         setServerError("Something went wrong! Please try again.");
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f4f6f8",
//         padding: 2,
//       }}
//     >
//       <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 3, borderRadius: 3 }}>
//         <CardContent>
//           <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: 2 }}>
//             Login
//           </Typography>

//           {serverError && (
//             <Alert severity="error" sx={{ marginBottom: 2 }}>
//               {serverError}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit} noValidate>
//             {/* Email Field with Icon */}
//             <TextField
//               label="Email"
//               type="email"
//               fullWidth
//               margin="normal"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               error={!!errors.email}
//               helperText={errors.email}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlined color="action" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Password Field with Icon & Toggle Visibility */}
//             <TextField
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               fullWidth
//               margin="normal"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               error={!!errors.password}
//               helperText={errors.password}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlined color="action" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 marginTop: 3,
//                 padding: 1.5,
//                 fontWeight: "bold",
//                 backgroundColor: "#1976d2",
//                 "&:hover": { backgroundColor: "#115293" },
//               }}
//             >
//               Login
//             </Button>
//           </form>

//           <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
//             Don't have an account?
//             <Link href="/signup" sx={{ marginLeft: 1, color: "#1976d2", fontWeight: "bold" }}>
//               Sign Up
//             </Link>
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Login;





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

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.match(/^[a-zA-Z][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Enter a valid email";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setServerError("");

    try {
      const response = await axios.post("http://localhost:8080/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.message === "Success") {
        const { user_id, token } = response.data;
        sessionStorage.setItem("user_id", user_id);
        sessionStorage.setItem("token", token);
        navigate("/UserMain");
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
          LOGIN
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
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!errors.password}
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
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account? 
          <Link href="/signup" sx={{ marginLeft: 1, color: "#1976d2", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
