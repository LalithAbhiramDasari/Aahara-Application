


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Alert, Avatar, Divider, Card, CardContent, Typography, Button, TextField } from "@mui/material";
// import { Person, CreditCard } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const MyProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [aadharFile, setAadharFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = sessionStorage.getItem("user_id");
//     if (!userId) {
//       setError("User not logged in");
//       setLoading(false);
//       return;
//     }

//     axios
//       .post("http://localhost:8080/userdashboard", null, {
//         params: { user_id: userId },
//       })
//       .then((response) => {
//         setUser(response.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load profile");
//         setLoading(false);
//       });
//   }, []);

//   const handleUpdateClick = () => {
//     navigate(`/update-profile/`);
//   };

//   const handleAadharUpload = async () => {
//     if (!user || !user.user_id) return;
//     if (!aadharFile) {
//       setUploadMessage("Please select an Aadhar Image to upload.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("aadhar", aadharFile);
//     try {
//       const response = await axios.post(`http://localhost:8080/upload-aadhar/${user.user_id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setUploadMessage(response.data.message);
//       setUser({ ...user, aadhar: response.data.fileUrl });
//     } catch (error) {
//       setUploadMessage("Failed to upload Aadhar Image.");
//     }
//   };

//   if (loading) return <CircularProgress className="m-auto" />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card sx={{ backgroundColor: "rgba(134, 239, 172, 0.8)", padding: 4, boxShadow: 5, borderRadius: 3, marginTop: 10 }}>
//         <div className="flex gap-6">
//           {/* Profile Card */}
//           <Card sx={{ width: 350, p: 3, boxShadow: 3, backgroundColor: "white" }}>
//             <CardContent className="flex flex-col items-center">
//               <Avatar src={user.profile_pic || ""} sx={{ width: 100, height: 100, mb: 2 }}>
//                 {!user.profile_pic && <Person sx={{ fontSize: 50 }} />}
//               </Avatar>
//               <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
//               <Divider sx={{ my: 1, width: "100%" }} />
//               <Typography color="textSecondary">{user.email}</Typography>
//               <Divider sx={{ my: 1, width: "100%" }} />
//               <Typography><strong>Phone:</strong> {user.phone}</Typography>
//               <Divider sx={{ my: 2, width: "100%" }} />
//               <Button variant="contained" color="primary" fullWidth onClick={handleUpdateClick}>
//                 Edit
//               </Button>
//               <Divider sx={{ my: 2, width: "100%" }} />
//             </CardContent>
//           </Card>

//           {/* Upload Aadhar Card */}
//           <Card sx={{ width: 350, p: 3, boxShadow: 3, backgroundColor: "white" }}>
//             <CardContent className="flex flex-col items-center">
//               <Divider sx={{ my: 2, width: "100%" }} />
//               <Avatar
//                 src={user.aadhar || ""}
//                 variant="square"
//                 sx={{ width: 120, height: 80, mb: 2 }}
//               >
//                 {!user.aadhar && <CreditCard sx={{ fontSize: 50 }} />}
//               </Avatar>
//               <Typography variant="subtitle1" fontWeight="bold">Upload Aadhar Image</Typography>
//               <TextField 
//                 type="file"
//                 fullWidth
//                 inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
//                 onChange={(e) => setAadharFile(e.target.files[0])}
//                 sx={{ my: 1 }}
//               />
//               <Button variant="contained" color="secondary" fullWidth onClick={handleAadharUpload}>
//                 Upload Aadhar
//               </Button>
//               <Divider sx={{ my: 2, width: "100%" }} />
//               {uploadMessage && <Alert severity="info" sx={{ mt: 2 }}>{uploadMessage}</Alert>}
//             </CardContent>
//           </Card>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default MyProfile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress, Alert, Avatar, Divider, Card, CardContent, Typography, Button, TextField, Box } from "@mui/material";
// import { Person, CreditCard } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const MyProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [aadharFile, setAadharFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = sessionStorage.getItem("user_id");
//     const token = sessionStorage.getItem("token");
//     if (!userId || !token || !token.startsWith("User")) {
//         navigate("/error");
//       }
    

//     axios
//       .post("http://localhost:8080/userdashboard", null, {
//         params: { user_id: userId },
//       })
//       .then((response) => {
//         setUser(response.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load profile");
//         setLoading(false);
//       });
//   }, []);

//   const handleUpdateClick = () => {
//     navigate(`/update-profile/`);
//   };

//   const handleAadharUpload = async () => {
//     if (!user || !user.user_id) return;
//     if (!aadharFile) {
//       setUploadMessage("Please select an Aadhar Image to upload.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("aadhar", aadharFile);
//     try {
//       const response = await axios.post(`http://localhost:8080/upload-aadhar/${user.user_id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setUploadMessage(response.data.message);
//       setUser({ ...user, aadhar: response.data.fileUrl });
//     } catch (error) {
//       setUploadMessage("Failed to upload Aadhar Image.");
//     }
//   };

//   if (loading) return <CircularProgress className="m-auto" />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//       p={2}
//     >
//       <Card
//         sx={{
//           backgroundColor: "rgba(134, 239, 172, 0.8)",
//           p: 4,
//           boxShadow: 5,
//           borderRadius: 3,
//           width: { xs: "100%", sm: "80%", md: "70%" },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 6,
//           }}
//         >
//           {/* Profile Card */}
//           <Card sx={{ flex: 1, p: 3, boxShadow: 3, backgroundColor: "white" }}>
//             <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//               <Avatar
//                 src={user.profile_pic || ""}
//                 sx={{ width: 100, height: 100, mb: 2 }}
//               >
//                 {!user.profile_pic && <Person sx={{ fontSize: 50 }} />}
//               </Avatar>
//               <Typography variant="h5" fontWeight="bold">
//                 {user.name}
//               </Typography>
//               <Divider sx={{ my: 1, width: "100%" }} />
//               <Typography color="textSecondary">{user.email}</Typography>
//               <Divider sx={{ my: 1, width: "100%" }} />
//               <Typography>
//                 <strong>Phone:</strong> {user.phone}
//               </Typography>
//               <Divider sx={{ my: 2, width: "100%" }} />
//               <Button variant="contained" color="primary" fullWidth onClick={handleUpdateClick}>
//                 Edit
//               </Button>
//               <Divider sx={{ my: 2, width: "100%" }} />
//             </CardContent>
//           </Card>

//           {/* Upload Aadhar Card */}
//           <Card sx={{ flex: 1, p: 3, boxShadow: 3, backgroundColor: "white" }}>
//             <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//               <Divider sx={{ my: 2, width: "100%" }} />
//               <Avatar
//                 src={user.aadhar || ""}
//                 variant="square"
//                 sx={{ width: 120, height: 80, mb: 2 }}
//               >
//                 {!user.aadhar && <CreditCard sx={{ fontSize: 50 }} />}
//               </Avatar>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 Upload Aadhar Image
//               </Typography>
//               <TextField
//                 type="file"
//                 fullWidth
//                 inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
//                 onChange={(e) => setAadharFile(e.target.files[0])}
//                 sx={{ my: 1 }}
//               />
//               <Button variant="contained" color="secondary" fullWidth onClick={handleAadharUpload}>
//                 Upload Aadhar
//               </Button>
//               <Divider sx={{ my: 2, width: "100%" }} />
//               {uploadMessage && (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   {uploadMessage}
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default MyProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Alert, Avatar, Divider, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Person, CreditCard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");
    if (!userId || !token || !token.startsWith("User")) {
      navigate("/error");
    }

    axios
      .post("http://localhost:8080/userdashboard", null, {
        params: { user_id: userId },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [navigate]);

  const handleUpdateClick = () => {
    navigate(`/update-profile/`);
  };

  if (loading) return <CircularProgress className="m-auto" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    // rgba(134, 239, 172, 0.8)
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Card
        sx={{
          backgroundColor: "white",
          p: 4,
          boxShadow: 5,
          borderRadius: 3,
          width: { xs: "80%", sm: "80%", md: "40%" },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            src={user.profile_pic || ""}
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            {!user.profile_pic && <Person sx={{ fontSize: 50 }} />}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Divider sx={{ my: 1, width: "100%" }} />
          <Typography color="textSecondary">{user.email}</Typography>
          <Divider sx={{ my: 1, width: "100%" }} />
          <Typography>
            <strong>Phone:</strong> {user.phone}
          </Typography>

          {/* Aadhar Card Display */}
          <Divider sx={{ my: 2, width: "100%" }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Aadhar Card
          </Typography>
          <Avatar
            src={user.aadhar || ""}
            variant="square"
            sx={{ width: 200, height: 120, my: 2 }}
          >
            {!user.aadhar && <CreditCard sx={{ fontSize: 50 }} />}
          </Avatar>

          <Button variant="contained" color="success" fullWidth onClick={handleUpdateClick}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile;
