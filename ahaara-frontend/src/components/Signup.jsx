// import { Button, TextField, InputAdornment, Typography, Paper, Box, useMediaQuery, IconButton, Link} from '@mui/material';
// import { AccountCircle, Lock, Email, Visibility, VisibilityOff } from '@mui/icons-material';
// import React, { useState } from 'react';
// import {useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Phone } from 'lucide-react';


// const Signup = () => {
//     const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//     });

//     const [errors, setErrors] = useState({});
//     const [serverError, setServerError] = useState("");
//     const isMobile = useMediaQuery("(max-width:600px)");
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    

//     // const inputHandler = (e) => {
//     //     setData({ ...data, [e.target.name]: e.target.value });
//     // };

//     const validateField = (name, value) => {
//         let error = "";
    
//         if (name === "name") {
//           const namePattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
//           if (!value) error = "Full Name is required";
//           else if (!namePattern.test(value)) error = "Only alphabets and spaces allowed";
//         } else if (name === "email") {
//           if (!value) error = "Email is required";
//           else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email";
//         } else if (name === "password") {
//           if (!value) error = "Password is required";
//           else if (value.length < 8) error = "At least 8 characters required";
//           else if (!/[A-Z]/.test(value)) error = "Include at least one uppercase letter";
//           else if (!/[0-9]/.test(value)) error = "Include at least one number";
//           else if (!/[!@#$%^&*]/.test(value)) error = "Include at least one special character";
//           else if (/\s/.test(value)) error = "No spaces allowed in password";
//         } else if (name === "confirmPassword") {
//           if (!value) error = "Confirm Password is required";
//           else if (value !== formData.password) error = "Passwords do not match";
//         } else if (name === "phone") {
//           if (!value) error = "Phone number is required";
//           else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//         }
//         return error;
//       };

//     const validateForm = () => {
//         let newErrors = {};
//         Object.keys(formData).forEach((field) => {
//           const error = validateField(field, formData[field]);
//           if (error) newErrors[field] = error;
//         });
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//       };
    
//       // 🔹 Handle change with real-time validation
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
    
//         // Validate the field in real-time
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: validateField(name, value),
//         }));
//       };
    
//       // 🔹 Handle form submission
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
    
//         setServerError("");
    
//         try {
//           const response = await axios.post("http://localhost:8080/register", formData, {
//             headers: { "Content-Type": "application/json" },
//           });
    
//           const { user_id, token } = response.data;
    
//           sessionStorage.setItem("user_id", user_id);
//           sessionStorage.setItem("token", token);
//           console.log(sessionStorage.getItem("user_id"));
//           console.log(sessionStorage.getItem("token"));
    
//           // Redirect to findcars page
//           navigate("/UserMain");
//         } catch (error) {
//           if (error.response?.data === "Email already registered! Please use a different email.") {
//             setErrors((prev) => ({ ...prev, email: "Email already in use" }));
//           } else {
//             setServerError(error.response?.data || "Something went wrong!");
//           }
//         }
//       };
    

    
    
//     return (
//         <Box sx={{ 
//             display: "flex", 
//             justifyContent: "center", 
//             alignItems: "center",  
//             height: "100vh", 
//             width: "100vw",
//             padding: isMobile ? 2 : 0
//         }}>
//             <Paper sx={{ 
//                 padding: 4, 
//                 borderRadius: 3, 
//                 width: isMobile ? "90%" : 400, 
//                 textAlign: "center", 
//                 backgroundColor: "#e3f2fd",
//                 boxShadow: 3
//             }}>
//                 <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", marginBottom: 3 }}>
//                     SIGN UP
//                 </Typography>
//             <form onSubmit={handleSubmit} noValidate>
//                 <TextField 
//                     label="Full Name" 
//                     variant="outlined" 
//                     onChange={handleChange} 
//                     onBlur={(e) => validateField("name", e.target.value)} 
//                     name="name" 
//                     fullWidth 
//                     margin="normal" 
//                     error={!!errors.name} 
//                     helperText={errors.name} 
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} 
//                 />

//                 <TextField 
//                     label="Email" 
//                     variant="outlined" 
//                     onChange={handleChange} 
//                     onBlur={(e) => validateField("email", e.target.value)} 
//                     name="email" 
//                     fullWidth 
//                     margin="normal" 
//                     error={!!errors.email} 
//                     helperText={errors.email} 
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><Email/> </InputAdornment>) }} 
//                 />
//                 <TextField
//                     label="Phone Number"
//                     name="phone"
//                     type="tel"
//                     variant="outlined" 
//                     onBlur={(e) => validateField("phone", e.target.value)} 
//                     fullWidth
//                     margin="normal"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     error={!!errors.phone}
//                     helperText={errors.phone}
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} 
                    
//               />

//                 <TextField 
//                     label="Password" 
//                     variant="outlined" 
//                     onChange={handleChange} 
//                     onBlur={(e) => validateField("password", e.target.value)} 
//                     name="password" 
//                     type={showPassword ? "text" : "password"}
//                     fullWidth 
//                     margin="normal" 
//                     error={!!errors.password} 
//                     helperText={errors.password} 
//                     InputProps={{
//                         startAdornment: (<InputAdornment position="start"><Lock/></InputAdornment>),
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }} 
                    
//                 />
                

//                 <TextField 
//                     label="Confirm Password" 
//                     variant="outlined" 
//                     onChange={handleChange} 
//                     onBlur={(e) => validateField("confirmPassword", e.target.value)} 
//                     name="confirmPassword" 
//                     type={showConfirmPassword ? "text" : "password"}
                    
//                     fullWidth 
//                     margin="normal" 
//                     error={!!errors.confirmPassword} 
//                     helperText={errors.confirmPassword} 
//                     InputProps={{
//                         startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
//                                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }} 
//                 />

//                 <Button 
//                     variant="contained" 
                    
//                     type="submit"
//                     fullWidth 
//                     sx={{ marginTop: 3, padding: 1.5, fontWeight: "bold", backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }} 
//                     >
                        
//                     Sign up
//                 </Button>
//             </form>
//                     <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
//                     Already an User?
//                     <Link href="/login" sx={{ marginLeft: 1, color: "#1976d2", fontWeight: "bold" }}>
//                     Login
//                     </Link>
//                 </Typography>
//             </Paper>
//         </Box>
//     );
// };

// export default Signup;



// import { 
//   Button, 
//   TextField, 
//   InputAdornment, 
//   Typography, 
//   Paper, 
//   Box, 
//   useMediaQuery, 
//   IconButton, 
//   Link 
// } from '@mui/material';
// import { 
//   AccountCircle, 
//   Lock, 
//   Email, 
//   Visibility, 
//   VisibilityOff, 
//   Image 
// } from '@mui/icons-material';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Phone } from 'lucide-react';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//   });

//   // New state for aadhar file and its preview
//   const [aadharFile, setAadharFile] = useState(null);
//   const [aadharPreview, setAadharPreview] = useState(null);

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Field validation function (as in your current code)
//   const validateField = (name, value) => {
//     let error = "";
//     if (name === "name") {
//       const namePattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
//       if (!value) error = "Full Name is required";
//       else if (!namePattern.test(value)) error = "Only alphabets and spaces allowed";
//     } else if (name === "email") {
//       if (!value) error = "Email is required";
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email";
//     } else if (name === "password") {
//       if (!value) error = "Password is required";
//       else if (value.length < 8) error = "At least 8 characters required";
//       else if (!/[A-Z]/.test(value)) error = "Include at least one uppercase letter";
//       else if (!/[0-9]/.test(value)) error = "Include at least one number";
//       else if (!/[!@#$%^&*]/.test(value)) error = "Include at least one special character";
//       else if (/\s/.test(value)) error = "No spaces allowed in password";
//     } else if (name === "confirmPassword") {
//       if (!value) error = "Confirm Password is required";
//       else if (value !== formData.password) error = "Passwords do not match";
//     } else if (name === "phone") {
//       if (!value) error = "Phone number is required";
//       else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//     }
//     return error;
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     Object.keys(formData).forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) newErrors[field] = error;
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle text field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Real-time validation
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: validateField(name, value),
//     }));
//   };

//   // New handler for Aadhar image file change
//   const handleAadharChange = (e) => {
//     const file = e.target.files[0];
//     setAadharFile(file);
//     setAadharPreview(URL.createObjectURL(file));
//   };

//   // Update the submission to use FormData to include the file
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setServerError("");

//     try {
//       const payload = new FormData();
//       payload.append("name", formData.name);
//       payload.append("email", formData.email);
//       payload.append("password", formData.password);
//       payload.append("phone", formData.phone);
//       // Append aadhar file if provided
//       if (aadharFile) {
//         payload.append("aadhar_image", aadharFile);
//       }
//       // If your API requires confirmPassword, you can also append it:
//       // payload.append("confirmPassword", formData.confirmPassword);

//       const response = await axios.post("http://localhost:8080/register", payload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const { user_id, token } = response.data;
//       sessionStorage.setItem("user_id", user_id);
//       sessionStorage.setItem("token", token);

//       navigate("/UserMain");
//     } catch (error) {
//       if (error.response?.data === "Email already registered! Please use a different email.") {
//         setErrors((prev) => ({ ...prev, email: "Email already in use" }));
//       } else {
//         setServerError(error.response?.data || "Something went wrong!");
//       }
//     }
//   };

//   return (
//     <Box sx={{ 
//       display: "flex", 
//       justifyContent: "center", 
//       alignItems: "center",  
//       height: "130vh", 
//       width: "100vw",
//       padding: isMobile ? 2 : 0
//     }}>
//       <Paper sx={{ 
//         padding: 4, 
//         borderRadius: 3, 
//         width: isMobile ? "90%" : 400, 
//         textAlign: "center", 
//         backgroundColor: "#e3f2fd",
//         boxShadow: 3,
//         marginTop: 10
       
//       }}>
//         <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", marginBottom: 3 }}>
//           SIGN UP
//         </Typography>
//         <form onSubmit={handleSubmit} noValidate>
//           <TextField 
//             label="Full Name" 
//             variant="outlined" 
//             onChange={handleChange} 
//             onBlur={(e) => validateField("name", e.target.value)} 
//             name="name" 
//             fullWidth 
//             margin="normal" 
//             error={!!errors.name} 
//             helperText={errors.name} 
//             InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} 
//           />

//           <TextField 
//             label="Email" 
//             variant="outlined" 
//             onChange={handleChange} 
//             onBlur={(e) => validateField("email", e.target.value)} 
//             name="email" 
//             fullWidth 
//             margin="normal" 
//             error={!!errors.email} 
//             helperText={errors.email} 
//             InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }} 
//           />

//           <TextField 
//             label="Phone Number"
//             name="phone"
//             type="tel"
//             variant="outlined" 
//             onBlur={(e) => validateField("phone", e.target.value)} 
//             fullWidth
//             margin="normal"
//             value={formData.phone}
//             onChange={handleChange}
//             error={!!errors.phone}
//             helperText={errors.phone}
//             InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} 
//           />

//           <TextField 
//             label="Password" 
//             variant="outlined" 
//             onChange={handleChange} 
//             onBlur={(e) => validateField("password", e.target.value)} 
//             name="password" 
//             type={showPassword ? "text" : "password"}
//             fullWidth 
//             margin="normal" 
//             error={!!errors.password} 
//             helperText={errors.password} 
//             InputProps={{
//               startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }} 
//           />

//           <TextField 
//             label="Confirm Password" 
//             variant="outlined" 
//             onChange={handleChange} 
//             onBlur={(e) => validateField("confirmPassword", e.target.value)} 
//             name="confirmPassword" 
//             type={showConfirmPassword ? "text" : "password"}
//             fullWidth 
//             margin="normal" 
//             error={!!errors.confirmPassword} 
//             helperText={errors.confirmPassword} 
//             InputProps={{
//               startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
//                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }} 
//           />

//           {/* New Aadhar upload field */}
//           <Button 
//             variant="outlined"
//             component="label"
//             startIcon={<Image />}
//             sx={{ 
//               marginTop: 2, 
//               color: "green", 
//               borderColor: "green", 
//               "&:hover": { borderColor: "darkgreen", color: "darkgreen" } 
//             }}
//           >
//             Upload Aadhar Image
//             <input
//               type="file"
//               name="aadhar"
//               hidden
//               accept="image/*"
//               onChange={handleAadharChange}
//             />
//           </Button>

//           {aadharPreview && (
//             <Box mt={2}>
//               <img
//                 src={aadharPreview}
//                 alt="Aadhar Preview"
//                 style={{ 
//                   width: "100%", 
//                   maxHeight: "200px", 
//                   objectFit: "cover", 
//                   borderRadius: 8 
//                 }}
//               />
//             </Box>
//           )}

//           <Button 
//             variant="contained" 
//             type="submit"
//             fullWidth 
//             sx={{ 
//               marginTop: 3, 
//               padding: 1.5, 
//               fontWeight: "bold", 
//               backgroundColor: "green", 
//               "&:hover": { backgroundColor: "darkgreen" } 
//             }} 
//           >
//             Sign up
//           </Button>
//         </form>
//         <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
//           Already a User?
//           <Link href="/login" sx={{ marginLeft: 1, color: "#1976d2", fontWeight: "bold" }}>
//             Login
//           </Link>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default Signup;






import { 
  Button, 
  TextField, 
  InputAdornment, 
  Typography, 
  Paper, 
  Box, 
  useMediaQuery, 
  IconButton, 
  Link 
} from '@mui/material';
import { 
  AccountCircle, 
  Lock, 
  Email, 
  Visibility, 
  VisibilityOff, 
  Image 
} from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Phone } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [aadharFile, setAadharFile] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [formError, setFormError] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      const namePattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
      if (!value) error = "Full Name is required";
      else if (!namePattern.test(value)) error = "Only alphabets and spaces allowed";
    } else if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email";
    } else if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8) error = "At least 8 characters required";
      else if (!/[A-Z]/.test(value)) error = "Include at least one uppercase letter";
      else if (!/[0-9]/.test(value)) error = "Include at least one number";
      else if (!/[!@#$%^&*]/.test(value)) error = "Include at least one special character";
      else if (/\s/.test(value)) error = "No spaces allowed in password";
    } else if (name === "confirmPassword") {
      if (!value) error = "Confirm Password is required";
      else if (value !== formData.password) error = "Passwords do not match";
    } else if (name === "phone") {
      if (!value) error = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
    }
    return error;
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    if (!aadharFile) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleAadharChange = (e) => {
    const file = e.target.files[0];
    setAadharFile(file);
    setAadharPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setServerError("");

    const isValid = validateForm();

    if (!isValid) {
      setFormError("Please fill all required fields and upload your Aadhar image.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("phone", formData.phone);
      if (aadharFile) {
        payload.append("aadhar_image", aadharFile);
      }

      const response = await axios.post("http://localhost:8080/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { user_id, token } = response.data;
      sessionStorage.setItem("user_id", user_id);
      sessionStorage.setItem("token", token);

      navigate("/UserMain");
    } catch (error) {
      if (error.response?.data === "Email already registered! Please use a different email.") {
        setErrors((prev) => ({ ...prev, email: "Email already in use" }));
      } else {
        setServerError(error.response?.data || "Something went wrong!");
      }
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",  
      height: "130vh", 
      width: "100vw",
      padding: isMobile ? 2 : 0
    }}>
      <Paper sx={{ 
        padding: 4, 
        borderRadius: 3, 
        width: isMobile ? "90%" : 400, 
        textAlign: "center", 
        backgroundColor: "#e3f2fd",
        boxShadow: 3,
        marginTop: 10
      }}>
        <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", marginBottom: 3 }}>
          SIGN UP
        </Typography>

        {formError && (
          <Typography variant="body2" color="error" sx={{ mb: 2, fontWeight: "bold" }}>
            {formError}
          </Typography>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField 
            label="Full Name" 
            variant="outlined" 
            onChange={handleChange} 
            name="name" 
            fullWidth 
            margin="normal" 
            error={!!errors.name} 
            helperText={errors.name} 
            InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} 
          />

          <TextField 
            label="Email" 
            variant="outlined" 
            onChange={handleChange} 
            name="email" 
            fullWidth 
            margin="normal" 
            error={!!errors.email} 
            helperText={errors.email} 
            InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }} 
          />

          <TextField 
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined" 
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} 
          />

          <TextField 
            label="Password" 
            variant="outlined" 
            onChange={handleChange} 
            name="password" 
            type={showPassword ? "text" : "password"}
            fullWidth 
            margin="normal" 
            error={!!errors.password} 
            helperText={errors.password} 
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }} 
          />

          <TextField 
            label="Confirm Password" 
            variant="outlined" 
            onChange={handleChange} 
            name="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"}
            fullWidth 
            margin="normal" 
            error={!!errors.confirmPassword} 
            helperText={errors.confirmPassword} 
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }} 
          />

          <Button 
            variant="outlined"
            component="label"
            startIcon={<Image />}
            sx={{ 
              marginTop: 2, 
              color: "green", 
              borderColor: "green", 
              "&:hover": { borderColor: "darkgreen", color: "darkgreen" } 
            }}
          >
            Upload Aadhar Image
            <input
              type="file"
              name="aadhar"
              hidden
              accept="image/*"
              onChange={handleAadharChange}
            />
          </Button>

          {aadharPreview && (
            <Box mt={2}>
              <img
                src={aadharPreview}
                alt="Aadhar Preview"
                style={{ 
                  width: "100%", 
                  maxHeight: "200px", 
                  objectFit: "cover", 
                  borderRadius: 8 
                }}
              />
            </Box>
          )}

          <Button 
            variant="contained" 
            type="submit"
            fullWidth 
            sx={{ 
              marginTop: 3, 
              padding: 1.5, 
              fontWeight: "bold", 
              backgroundColor: "green", 
              "&:hover": { backgroundColor: "darkgreen" } 
            }} 
          >
            Sign up
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already a User?
          <Link href="/login" sx={{ marginLeft: 1, color: "#1976d2", fontWeight: "bold" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;

