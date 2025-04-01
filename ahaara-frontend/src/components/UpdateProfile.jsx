// import { 
//     Button, 
//     TextField, 
//     InputAdornment, 
//     Typography, 
//     Paper, 
//     Box, 
//     useMediaQuery, 
//     IconButton, 
//     Divider, 
//     Grid,
//     Alert,
//   } from '@mui/material';
//   import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
//   import { Phone } from 'lucide-react';
//   import React, { useEffect, useState } from 'react';
//   import { useNavigate } from 'react-router-dom';
//   import axios from 'axios';
  
//   const UpdateProfile = () => {
//     const id = sessionStorage.getItem("user_id");
//     const token = sessionStorage.getItem("token");
//     const navigate = useNavigate();
//     const isMobile = useMediaQuery("(max-width:600px)");
  
//     const [user, setUser] = useState({
//       user_id: "",
//       name: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//       profile_pic: "",
//     });
//     const [errors, setErrors] = useState({
//       name: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [profileFile, setProfileFile] = useState(null);
//     const [uploadMessage, setUploadMessage] = useState("");
  
//     useEffect(() => {
//       fetchUserDetails();
//     }, [id]);
  
//     async function fetchUserDetails() {
//       try {
//         const response = await axios.post("http://localhost:8080/userdashboard", null, {
//           params: { user_id: id },
//         });
//         if (response.data) {
//           setUser({
//             ...response.data,
//             confirmPassword: response.data.password, // Pre-fill confirm password
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     }
  
//     const validateField = (name, value) => {
//       let error = "";
//       if (name === "name") {
//         const namePattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
//         if (!value) error = "Full Name is required";
//         else if (!namePattern.test(value)) error = "Only alphabets and spaces allowed";
//       } else if (name === "phone") {
//         if (!value) error = "Phone number is required";
//         else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//       } else if (name === "password") {
//         if (!value) error = "Password is required";
//         else if (value.length < 8) error = "At least 8 characters required";
//         else if (!/[A-Z]/.test(value)) error = "Include at least one uppercase letter";
//         else if (!/[0-9]/.test(value)) error = "Include at least one number";
//         else if (!/[!@#$%^&*]/.test(value)) error = "Include at least one special character";
//         else if (/\s/.test(value)) error = "No spaces allowed in password";
//       } else if (name === "confirmPassword") {
//         if (!value) error = "Confirm Password is required";
//         else if (value !== user.password) error = "Passwords do not match";
//       }
//       setErrors(prev => ({ ...prev, [name]: error }));
//       return error;
//     };
  
//     const validateForm = () => {
//       let newErrors = {};
//       ['name', 'phone', 'password', 'confirmPassword'].forEach(field => {
//         const err = validateField(field, user[field]);
//         if (err) newErrors[field] = err;
//       });
//       setErrors(newErrors);
//       return Object.keys(newErrors).length === 0;
//     };
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setUser(prev => ({ ...prev, [name]: value }));
//       // Real-time validation
//       setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
//     };
  
//     const handleUpdate = async (e) => {
//       e.preventDefault();
//       if (!validateForm()) {
//         alert("Please fix the validation errors");
//         return;
//       }
//       try {
//         await axios.put("http://localhost:8080/updateprofile", user);
//         navigate('/myprofile');
//       } catch (error) {
//         console.error("Error updating profile:", error);
//       }
//     };
  
//     const handleProfilePicUpload = async () => {
//       if (!profileFile) {
//         setUploadMessage("Please select a profile picture to upload.");
//         return;
//       }
//       const formData = new FormData();
//       formData.append("profile_pic", profileFile);
//       try {
//         const response = await axios.post(`http://localhost:8080/upload-profile/${id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//         setUploadMessage(response.data.message);
//         if (response.data.fileUrl) {
//           setUser(prev => ({ ...prev, profile_pic: response.data.fileUrl }));
//         }
//       } catch (error) {
//         console.error("Error updating profile picture:", error);
//         setUploadMessage("Failed to update profile picture.");
//       }
//     };
  
//     return (
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: isMobile ? "column" : "row",
//         justifyContent: "center", 
//         alignItems: "center",  
//         minHeight: "100vh", 
//         width: "100vw",
//         padding: isMobile ? 2 : 4,
//         boxSizing: "border-box",
//         marginTop: isMobile ? 7 : 7,
//       }}>
//         <Paper sx={{ 
//           padding: 4, 
//           borderRadius: 3, 
//           width: isMobile ? "100%" : 800, 
//           backgroundColor: "white",
//           boxShadow: 3,
//           marginBottom: isMobile ? 3 : 0,
//         }}>
//           <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", textAlign: "center", marginBottom: 3 }}>
//             UPDATE PROFILE
//           </Typography>
//           <Grid container spacing={3}>
//             {/* Form Section */}
//             <Grid item xs={12} md={6}>
//               <form onSubmit={handleUpdate} noValidate>
//                 <TextField 
//                   label="Full Name" 
//                   variant="outlined" 
//                   onChange={handleChange} 
//                   onBlur={(e) => validateField("name", e.target.value)} 
//                   name="name" 
//                   fullWidth 
//                   margin="normal" 
//                   value={user.name || ""}
//                   error={!!errors.name} 
//                   helperText={errors.name} 
//                   InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} 
//                 />
  
//                 <TextField 
//                   label="Phone Number" 
//                   variant="outlined" 
//                   onChange={handleChange} 
//                   onBlur={(e) => validateField("phone", e.target.value)} 
//                   name="phone" 
//                   fullWidth 
//                   margin="normal" 
//                   value={user.phone || ""}
//                   error={!!errors.phone} 
//                   helperText={errors.phone} 
//                   InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} 
//                 />
  
//                 <TextField 
//                   label="Password" 
//                   variant="outlined" 
//                   onChange={handleChange} 
//                   onBlur={(e) => validateField("password", e.target.value)} 
//                   name="password" 
//                   type={showPassword ? "text" : "password"}
//                   fullWidth 
//                   margin="normal" 
//                   value={user.password || ""}
//                   error={!!errors.password} 
//                   helperText={errors.password} 
//                   InputProps={{
//                     startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }} 
//                 />
  
//                 <TextField 
//                   label="Confirm Password" 
//                   variant="outlined" 
//                   onChange={handleChange} 
//                   onBlur={(e) => validateField("confirmPassword", e.target.value)} 
//                   name="confirmPassword" 
//                   type={showConfirmPassword ? "text" : "password"}
//                   fullWidth 
//                   margin="normal" 
//                   value={user.confirmPassword || ""}
//                   error={!!errors.confirmPassword} 
//                   helperText={errors.confirmPassword} 
//                   InputProps={{
//                     startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
//                           {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }} 
//                 />
//                 <Typography variant="subtitle1" fontWeight="bold">Update Profile Picture</Typography>
//                 <TextField 
//                   type="file"
//                   fullWidth
//                   inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
//                   onChange={(e) => setProfileFile(e.target.files[0])}
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" color="secondary" fullWidth onClick={handleProfilePicUpload}>
//                   Update Profile Picture
//                 </Button>
//                 {uploadMessage && <Alert severity="info" sx={{ mt: 2 }}>{uploadMessage}</Alert>}
  
//                 <Button 
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   sx={{ marginTop: 3, padding: 1.5, fontWeight: "bold", backgroundColor: "#007BFF", "&:hover": { backgroundColor: "#0056b3" } }}
//                 >
//                   Update Profile
//                 </Button>
//               </form>
//             </Grid>
//             {/* Preview Card Section with Profile Pic Upload Option */}
//             <Grid item xs={12} md={6}>
//               <Paper elevation={3} sx={{ 
//                 padding: 2, 
//                 backgroundColor: "rgba(134, 239, 172, 0.8)", 
//                 display: "flex", 
//                 flexDirection: "column",
//                 alignItems: "center",
//                 textAlign: "center",
//               }}>
//                 <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
//                   Profile Preview
//                 </Typography>
//                 {user.profile_pic ? (
//                   <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
//                     <img 
//                       src={user.profile_pic} 
//                       alt="Profile" 
//                       style={{ display: 'block', margin: '0 auto', width: "100%", maxWidth: 200, borderRadius: "50%" }} 
//                     />
//                   </Box>
//                 ) : (
//                   <AccountCircle sx={{ fontSize: 100 }} />
//                 )}
//                 <Divider sx={{ my: 2, width: "100%" }} />
//                 <Typography variant="body1"><strong>Name:</strong> {user.name || "Your Name"}</Typography>
//                 <Typography variant="body1"><strong>Phone:</strong> {user.phone || "Your Phone Number"}</Typography>
//                 <Typography variant="body1"><strong>email:</strong> {user.email || "Your Phone Number"}</Typography>
                
//                 <Divider sx={{ my: 2, width: "100%" }} />
//               </Paper>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     );
//   };
  
//   export default UpdateProfile;


// import { 
//     Button, 
//     TextField, 
//     InputAdornment, 
//     Typography, 
//     Paper, 
//     Box, 
//     useMediaQuery, 
//     IconButton, 
//     Divider, 
//     Grid,
//     Alert,
//   } from '@mui/material';
//   import { AccountCircle } from '@mui/icons-material';
//   import { Phone } from 'lucide-react';
//   import React, { useEffect, useState } from 'react';
//   import { useNavigate } from 'react-router-dom';
//   import axios from 'axios';
  
//   const UpdateProfile = () => {
//     const id = sessionStorage.getItem("user_id");
//     const token = sessionStorage.getItem("token");
//     const navigate = useNavigate();
//     const isMobile = useMediaQuery("(max-width:600px)");
  
//     const [user, setUser] = useState({
//       user_id: "",
//       name: "",
//       phone: "",
//       profile_pic: "",
//       email: "",
//     });
//     const [errors, setErrors] = useState({
//       name: "",
//       phone: "",
//     });
//     const [profileFile, setProfileFile] = useState(null);
//     const [uploadMessage, setUploadMessage] = useState("");
  
//     useEffect(() => {
//       if (!id || !token || !token.startsWith("User")) {
//         navigate("/error");
//       }
//       fetchUserDetails();
//     }, [id]);
  
//     async function fetchUserDetails() {
//       try {
//         const response = await axios.post("http://localhost:8080/userdashboard", null, {
//           params: { user_id: id },
//         });
//         if (response.data) {
//           setUser({
//             ...response.data,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     }
  
//     const validateField = (name, value) => {
//       let error = "";
//       if (name === "name") {
//         const namePattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
//         if (!value) error = "Full Name is required";
//         else if (!namePattern.test(value)) error = "Only alphabets and spaces allowed";
//       } else if (name === "phone") {
//         if (!value) error = "Phone number is required";
//         else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
//       }
//       setErrors(prev => ({ ...prev, [name]: error }));
//       return error;
//     };
  
//     const validateForm = () => {
//       let newErrors = {};
//       ['name', 'phone'].forEach(field => {
//         const err = validateField(field, user[field]);
//         if (err) newErrors[field] = err;
//       });
//       setErrors(newErrors);
//       return Object.keys(newErrors).length === 0;
//     };
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setUser(prev => ({ ...prev, [name]: value }));
//       // Real-time validation
//       setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
//     };
  
//     const handleUpdate = async (e) => {
//       e.preventDefault();
//       if (!validateForm()) {
//         alert("Please fix the validation errors");
//         return;
//       }
//       try {
//         await axios.put("http://localhost:8080/updateprofile", user);
//         navigate('/myprofile');
//       } catch (error) {
//         console.error("Error updating profile:", error);
//       }
//     };
  
//     const handleProfilePicUpload = async () => {
//       if (!profileFile) {
//         setUploadMessage("Please select a profile picture to upload.");
//         return;
//       }
//       const formData = new FormData();
//       formData.append("profile_pic", profileFile);
//       try {
//         const response = await axios.post(`http://localhost:8080/upload-profile/${id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//         setUploadMessage(response.data.message);
//         if (response.data.fileUrl) {
//           setUser(prev => ({ ...prev, profile_pic: response.data.fileUrl }));
//         }
//       } catch (error) {
//         console.error("Error updating profile picture:", error);
//         setUploadMessage("Failed to update profile picture.");
//       }
//     };
  
//     return (
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: isMobile ? "column" : "row",
//         justifyContent: "center", 
//         alignItems: "center",  
//         minHeight: "100vh", 
//         width: "100vw",
//         padding: isMobile ? 2 : 4,
//         boxSizing: "border-box",
//         marginTop: isMobile ? 7 : 7,
//       }}>
//         <Paper sx={{ 
//           padding: 4, 
//           borderRadius: 3, 
//           width: isMobile ? "100%" : 800, 
//           backgroundColor: "white",
//           boxShadow: 3,
//           marginBottom: isMobile ? 3 : 0,
//         }}>
//           <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", textAlign: "center", marginBottom: 3 }}>
//             UPDATE PROFILE
//           </Typography>
//           <Grid container spacing={3}>
//             {/* Form Section */}
//             <Grid item xs={12} md={6}>
//               <form onSubmit={handleUpdate} noValidate>
//                 <TextField 
//                   label="Full Name" 
//                   variant="outlined" 
//                   onChange={handleChange} 
//                   onBlur={(e) => validateField("name", e.target.value)} 
//                   name="name" 
//                   fullWidth 
//                   margin="normal" 
//                   value={user.name || ""}
//                   error={!!errors.name} 
//                   helperText={errors.name} 
//                   InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} 
//                 />
  
//                 <TextField 
//                   label="Phone Number" 
//                   variant="outlined" 
//                   onChange={handleChange} 
//                   onBlur={(e) => validateField("phone", e.target.value)} 
//                   name="phone" 
//                   fullWidth 
//                   margin="normal" 
//                   value={user.phone || ""}
//                   error={!!errors.phone} 
//                   helperText={errors.phone} 
//                   InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} 
//                 />
  
//                 <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
//                   Update Profile Picture
//                 </Typography>
//                 <TextField 
//                   type="file"
//                   fullWidth
//                   inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
//                   onChange={(e) => setProfileFile(e.target.files[0])}
//                   sx={{ my: 1 }}
//                 />
//                 <Button variant="contained" color="secondary" fullWidth onClick={handleProfilePicUpload}>
//                   Update Profile Picture
//                 </Button>
//                 {uploadMessage && <Alert severity="info" sx={{ mt: 2 }}>{uploadMessage}</Alert>}
  
//                 <Button 
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   sx={{ marginTop: 3, padding: 1.5, fontWeight: "bold", backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
//                 >
//                   Update Profile
//                 </Button>
//               </form>
//               <Button 
//                 variant="outlined" 
//                 fullWidth 
//                 Change Password
//                 sx={{ marginTop: 2, padding: 1.5, fontWeight: "bold", color: "green", borderColor: "green", "&:hover": { backgroundColor: "", color: "white" } }}
//                 onClick={() => navigate('/changepassword')}
//               >
//                 Change Password
//               </Button>
//             </Grid>
//             {/* Preview Card Section with Profile Pic Upload Option */}
//             <Grid item xs={12} md={6}>
//               <Paper elevation={3} sx={{ 
//                 padding: 2, 
//                 backgroundColor: "rgba(134, 239, 172, 0.8)", 
//                 display: "flex", 
//                 flexDirection: "column",
//                 alignItems: "center",
//                 textAlign: "center",
//               }}>
//                 <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
//                   Profile Preview
//                 </Typography>
//                 {user.profile_pic ? (
//                   <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
//                     <img 
//                       src={user.profile_pic} 
//                       alt="Profile" 
//                       style={{ display: 'block', margin: '0 auto', width: "100%", maxWidth: 200, borderRadius: "50%" }} 
//                     />
//                   </Box>
//                 ) : (
//                   <AccountCircle sx={{ fontSize: 100 }} />
//                 )}
//                 <Divider sx={{ my: 2, width: "100%" }} />
//                 <Typography variant="body1"><strong>Name:</strong> {user.name || "Your Name"}</Typography>
//                 <Typography variant="body1"><strong>Phone:</strong> {user.phone || "Your Phone Number"}</Typography>
//                 <Typography variant="body1"><strong>Email:</strong> {user.email || "Your Email"}</Typography>
//                 <Divider sx={{ my: 2, width: "100%" }} />
//               </Paper>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     );
//   };
  
//   export default UpdateProfile;
  
import { 
  Button, 
  TextField, 
  InputAdornment, 
  Typography, 
  Paper, 
  Box, 
  useMediaQuery, 
  Divider, 
  Grid,
  Alert,
  Avatar,
} from '@mui/material';
import { AccountCircle, CreditCard } from '@mui/icons-material';
import { Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [user, setUser] = useState({
    user_id: "",
    name: "",
    phone: "",
    profile_pic: "",
    email: "",
    aadhar: "", // ensure aadhar field is included
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [aadharFile, setAadharFile] = useState(null);
  const [aadharUploadMessage, setAadharUploadMessage] = useState("");

  useEffect(() => {
    if (!id || !token || !token.startsWith("User")) {
      navigate("/error");
    }
    fetchUserDetails();
  }, [id, navigate, token]);

  async function fetchUserDetails() {
    try {
      const response = await axios.post("http://localhost:8080/userdashboard", null, {
        params: { user_id: id },
      });
      if (response.data) {
        setUser({
          ...response.data,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      const namePattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
      if (!value) error = "Full Name is required";
      else if (!namePattern.test(value)) error = "Only alphabets and spaces allowed";
    } else if (name === "phone") {
      if (!value) error = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(value)) error = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = () => {
    let newErrors = {};
    ['name', 'phone'].forEach(field => {
      const err = validateField(field, user[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    // Real-time validation
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fix the validation errors");
      return;
    }
    try {
      await axios.put("http://localhost:8080/updateprofile", user);
      navigate('/myprofile');
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePicUpload = async () => {
    if (!profileFile) {
      setUploadMessage("Please select a profile picture to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("profile_pic", profileFile);
    try {
      const response = await axios.post(`http://localhost:8080/upload-profile/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadMessage(response.data.message);
      if (response.data.fileUrl) {
        setUser(prev => ({ ...prev, profile_pic: response.data.fileUrl }));
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setUploadMessage("Failed to update profile picture.");
    }
  };

  const handleAadharUpload = async () => {
    if (!aadharFile) {
      setAadharUploadMessage("Please select an Aadhar image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("aadhar", aadharFile);
    try {
      const response = await axios.post(`http://localhost:8080/upload-aadhar/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAadharUploadMessage(response.data.message);
      if (response.data.fileUrl) {
        setUser(prev => ({ ...prev, aadhar: response.data.fileUrl }));
      }
    } catch (error) {
      console.error("Error uploading Aadhar:", error);
      setAadharUploadMessage("Failed to upload Aadhar image.");
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center", 
      alignItems: "center",  
      minHeight: "100vh", 
      width: "100vw",
      padding: isMobile ? 2 : 4,
      boxSizing: "border-box",
      marginTop: 7,
    }}>
      <Paper sx={{ 
        padding: 4, 
        borderRadius: 3, 
        width: isMobile ? "100%" : 800, 
        backgroundColor: "white",
        boxShadow: 3,
        marginBottom: isMobile ? 3 : 0,
      }}>
        <Typography variant="h5" sx={{ color: '#333', fontWeight: "bold", textAlign: "center", marginBottom: 3 }}>
          UPDATE PROFILE
        </Typography>
        <Grid container spacing={3}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleUpdate} noValidate>
              <TextField 
                label="Full Name" 
                variant="outlined" 
                onChange={handleChange} 
                onBlur={(e) => validateField("name", e.target.value)} 
                name="name" 
                fullWidth 
                margin="normal" 
                value={user.name || ""}
                error={!!errors.name} 
                helperText={errors.name} 
                InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) }} 
              />

              <TextField 
                label="Phone Number" 
                variant="outlined" 
                onChange={handleChange} 
                onBlur={(e) => validateField("phone", e.target.value)} 
                name="phone" 
                fullWidth 
                margin="normal" 
                value={user.phone || ""}
                error={!!errors.phone} 
                helperText={errors.phone} 
                InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} 
              />

              <Button 
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginTop: 3, padding: 1.5, fontWeight: "bold", backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
              >
                Update Profile
              </Button>
              <Button 
              variant="outlined" 
              fullWidth 
              sx={{ marginTop: 2, padding: 1.5, fontWeight: "bold", color: "green", borderColor: "green", "&:hover": { backgroundColor: "", color: "rgba(134, 239, 172, 0.8)" } }}
              onClick={() => navigate('/changepassword')}
            >
              Change Password
            </Button>

              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
                Update Profile Picture
              </Typography>
              <TextField 
                type="file"
                fullWidth
                inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                onChange={(e) => setProfileFile(e.target.files[0])}
                sx={{ my: 1 }}
              />
              <Button variant="contained" color="secondary" fullWidth onClick={handleProfilePicUpload}>
                Update Profile Picture
              </Button>
              {uploadMessage && <Alert severity="info" sx={{ mt: 2 }}>{uploadMessage}</Alert>}

              {/* Aadhar Upload Section */}
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
                Update Aadhar Image
              </Typography>
              <TextField 
                type="file"
                fullWidth
                inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                onChange={(e) => setAadharFile(e.target.files[0])}
                sx={{ my: 1 }}
              />
              <Button variant="contained" color="secondary" fullWidth onClick={handleAadharUpload}>
                Update Aadhar
              </Button>
              {aadharUploadMessage && <Alert severity="info" sx={{ mt: 2 }}>{aadharUploadMessage}</Alert>}

              
            </form>
            
          </Grid>
          {/* Preview Section with Profile and Aadhar Display */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ 
              padding: 2, 
              backgroundColor: "rgba(134, 239, 172, 0.8)", 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Profile Preview
              </Typography>
              {user.profile_pic ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <img 
                    src={user.profile_pic} 
                    alt="Profile" 
                    style={{ display: 'block', margin: '0 auto', width: "100%", maxWidth: 150, borderRadius: "50%" }} 
                  />
                </Box>
              ) : (
                <AccountCircle sx={{ fontSize: 100 }} />
              )}
              <Divider sx={{ my: 2, width: "100%" }} />
              <Typography variant="body1"><strong>Name:</strong> {user.name || "Your Name"}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {user.phone || "Your Phone Number"}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {user.email || "Your Email"}</Typography>
              
              {/* Aadhar Card Display */}
              <Divider sx={{ my: 2, width: "100%" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>Aadhar Card</Typography>
              <Avatar
                src={user.aadhar || ""}
                variant="square"
                sx={{ width: 200, height: 120, my: 1 }}
              >
                {!user.aadhar && <CreditCard sx={{ fontSize: 50 }} />}
              </Avatar>
              <Divider sx={{ my: 2, width: "100%" }} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UpdateProfile;
