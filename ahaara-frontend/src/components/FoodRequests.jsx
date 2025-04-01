// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
//   CardMedia,
//   FormControlLabel,
//   Switch,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   Button,
// } from "@mui/material";
// import Grid2 from "@mui/material/Grid2";
// import dayjs from "dayjs";
// import FoodPosterDetails from "./FoodPosterDetails";


// import { useNavigate } from "react-router-dom";

// import customParseFormat from "dayjs/plugin/customParseFormat";

// dayjs.extend(customParseFormat);


// // Import icons (adjust paths as needed)
// import vegIcon from "../assets/veg.png";
// import eggIcon from "../assets/egg.png";
// import nonVegIcon from "../assets/nonveg.png";

// // Helper to return the correct icon based on food category
// const getCategoryIcon = (category) => {
//   switch (category) {
//     case "Veg":
//       return vegIcon;
//     case "Contains Egg":
//       return eggIcon;
//     case "Non-Veg":
//       return nonVegIcon;
//     default:
//       return null;
//   }
// };

// const FoodRequests = () => {
//     const navigate = useNavigate();
//     const user_id = sessionStorage.getItem("user_id");
//     const token = sessionStorage.getItem("token");
  
//     const [foodRequests, setFoodRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const [filters, setFilters] = useState({ veg: true, egg: true, nonVeg: true });
//     const [selectedCategory, setSelectedCategory] = useState("All");
  
//     useEffect(() => {
//       // Validate user_id and token
//       if (!user_id || !token || !token.startsWith("User")) {
//         navigate("/error");
//         return;
//       }
  
//       const fetchFoodRequests = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.post(
//             "http://localhost:8080/getRequestsForMyFood",
//             null,
//             { params: { user_id } }
//           );
//           const requests = response.data;
  
//           const enrichedRequests = await Promise.all(
//             requests.map(async (req) => {
//               try {
//                 const foodResponse = await axios.get("http://localhost:8080/viewFoodById", {
//                   params: { foodId: req.food_id },
//                 });
//                 const food = foodResponse.data;
  
//                 // Expiry check logic similar to OtherUserFood component
//                 const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
//                 if (
//                   food.food_status === "Available" &&
//                   expiry.isValid() &&
//                   expiry.isBefore(dayjs())
//                 ) {
//                   try {
//                     await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
//                     food.food_status = "Expired";
//                   } catch (err) {
//                     console.error("Error marking food as expired", err);
//                   }
//                 }
  
//                 return { ...req, food };
//               } catch (err) {
//                 console.error("Error fetching food details:", err);
//                 return { ...req, food: null };
//               }
//             })
//           );
  
//           setFoodRequests(enrichedRequests);
//         } catch (err) {
//           console.error("Error fetching food requests:", err);
//           setError("Failed to fetch food requests.");
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchFoodRequests();
//     }, [user_id, token, navigate]);
  



//   // Filter requests based on dietary options and food type
//   const filteredRequests = foodRequests.filter((req) => {
//     const food = req.food;
//     if (!food) return true;
//     if (food.food_category === "Veg" && !filters.veg) return false;
//     if (food.food_category === "Contains Egg" && !filters.egg) return false;
//     if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
//     if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
//     return true;
//   });

//   // Handler for approving a request
//   const handleApproveRequest = async (req) => {
//     try {
//       const response = await axios.put(`http://localhost:8080/food-requests/approve/${req.request_id}`);
//       alert(response.data);
//       // Update request status locally
//       setFoodRequests((prevRequests) =>
//         prevRequests.map((r) =>
//           r.request_id === req.request_id ? { ...r, request_status: "Approved" } : r
//         )
//       );
//     } catch (err) {
//       console.error("Error approving request:", err);
//       alert("Error approving request: " + (err.response?.data || "Unknown error"));
//     }
//   };

//   // Handler for declining a request
//   const handleDeclineRequest = async (req) => {
//     try {
//       const response = await axios.put(`http://localhost:8080/food-requests/decline/${req.request_id}`);
//       alert(response.data);
//       // Update request status locally
//       setFoodRequests((prevRequests) =>
//         prevRequests.map((r) =>
//           r.request_id === req.request_id ? { ...r, request_status: "Declined" } : r
//         )
//       );
//     } catch (err) {
//       console.error("Error declining request:", err);
//       alert("Error declining request: " + (err.response?.data || "Unknown error"));
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }
//   if (error) {
//     return (
//       <Typography color="error" align="center" mt={4}>
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ padding: 4, minHeight: "100vh" }}>
//       <Typography variant="h4" mb={3} fontWeight="bold" align="center">
//         Requests for Your Food Posts
//       </Typography>

//       {/* Filters */}
//       <Box mb={3} display="flex" flexWrap="wrap" gap={3} alignItems="center">
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.veg}
//               onChange={(e) => setFilters({ ...filters, veg: e.target.checked })}
//               name="veg"
//               sx={{
//                 "& .MuiSwitch-switchBase.Mui-checked": { color: "green" },
//                 "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "green" },
//               }}
//             />
//           }
//           label={<img src={vegIcon} alt="Veg" width="20" height="20" />}
//         />
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.egg}
//               onChange={(e) => setFilters({ ...filters, egg: e.target.checked })}
//               name="egg"
//               sx={{
//                 "& .MuiSwitch-switchBase.Mui-checked": { color: "yellow" },
//                 "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "yellow" },
//               }}
//             />
//           }
//           label={<img src={eggIcon} alt="Egg" width="20" height="20" />}
//         />
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.nonVeg}
//               onChange={(e) => setFilters({ ...filters, nonVeg: e.target.checked })}
//               name="nonVeg"
//               sx={{
//                 "& .MuiSwitch-switchBase.Mui-checked": { color: "red" },
//                 "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "red" },
//               }}
//             />
//           }
//           label={<img src={nonVegIcon} alt="Non-Veg" width="20" height="20" />}
//         />
//         <FormControl
//           sx={{
//             minWidth: 200,
//             borderRadius: 1,
//             "& .MuiOutlinedInput-root": {
//               backgroundColor: "black",
//               color: "rgba(134, 239, 172, 0.8)",
//               "& fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
//               "&:hover fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
//               "&.Mui-focused fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
//             },
//             "& .MuiInputLabel-root": { color: "rgba(134, 239, 172, 0.8)" },
//             "& .MuiInputLabel-root.Mui-focused": { color: "rgba(134, 239, 172, 0.8)" },
//           }}
//         >
//           <InputLabel id="category-filter-label">Filter by Type</InputLabel>
//           <Select
//             labelId="category-filter-label"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             label="Filter by Type"
//             MenuProps={{
//               PaperProps: {
//                 sx: { backgroundColor: "black", color: "rgba(134, 239, 172, 0.8)" },
//               },
//             }}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Cooked food (meals)">Cooked food (meals)</MenuItem>
//             <MenuItem value="Raw Fruits/Vegetables">Raw Fruits/Vegetables</MenuItem>
//             <MenuItem value="Packed Food/Beverage">Packed Food/Beverage</MenuItem>
//             <MenuItem value="Bakery">Bakery</MenuItem>
//             <MenuItem value="Dairy Products">Dairy Products</MenuItem>
//             <MenuItem value="Others">Others</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {filteredRequests.length === 0 ? (
//         <Typography variant="body1" align="center">
//           No requests match your filters.
//         </Typography>
//       ) : (
//         <Grid2 container spacing={3} justifyContent="center">
//           {filteredRequests.map((req) => {
//             const {
//               request_id,
//               rid,
//               requested_date,
//               requested_quantity,
//               request_status,
//               food_provider_feedback,
//               food_receiver_feedback,
//               food,
//             } = req;
//             // Set card background similar to OtherUserFoods if food status is Deleted/Expired
//             const cardBgColor =
//               food && (food.food_status === "Deleted" || food.food_status === "Expired")
//                 ? "#999"
//                 : "white";

//             return (
//               <Grid2 item xs={12} sm={6} md={4} key={request_id}>
//                 <Card
//                   sx={{
//                     maxWidth: 345,
//                     height: 750,
//                     border: "6px solid rgba(134, 239, 172, 0.8)",
//                     display: "flex",
//                     flexDirection: "column",
//                     backgroundColor: cardBgColor,
//                   }}
//                 >
//                   {/* Requester Details */}
//                   <Box sx={{ px: 2, pt: 2 }}>
//                     <FoodPosterDetails
//                       userId={req.user_id}
//                       PostedDate={dayjs(req.requested_date).format("DD-MM-YYYY HH:mm:ss")}
//                     />
//                   </Box>
//                   {/* Food Details */}
//                   {food && (
//                     <CardMedia
//                       component="img"
//                       image={food.food_image}
//                       alt={food.description}
//                       sx={{
//                         height: 200,
//                         objectFit: "cover",
//                         filter:
//                           food.food_status !== "Available" &&
//                           food.food_status !== "Requested to Collect"
//                             ? "grayscale(100%)"
//                             : "none",
//                       }}
//                     />
//                   )}
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     {food ? (
//                       <>
//                         <Box display="flex" alignItems="center" gap={1} mb={1}>
//                           <Box
//                             component="img"
//                             src={getCategoryIcon(food.food_category)}
//                             alt={food.food_category}
//                             sx={{ width: 20, height: 20 }}
//                           />
//                           <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
//                             {food.description}
//                           </Typography>
//                         </Box>
//                         <Typography variant="body2" color="text.secondary">
//                           Serves: {food.posted_quantity} people
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Available Quantity: {food.quantity} people
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Type: {food.food_type}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Expires on: {food.expiry_date}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" mt={1}>
//                           Address: {food.address}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" mt={1}>
//                           Food Status: {food.food_status}
//                         </Typography>
//                       </>
//                     ) : (
//                       <Typography variant="body2" color="error">
//                         Food details not available.
//                       </Typography>
//                     )}
//                     <Box mt={2}>
//                       <Typography variant="subtitle1">Request Details</Typography>
//                       <Typography variant="body2">Request ID: {rid}</Typography>
//                       <Typography variant="body2">
//                         Requested Date: {dayjs(requested_date).format("DD-MM-YYYY HH:mm:ss")}
//                       </Typography>
//                       <Typography variant="body2">
//                         Requested Quantity: {requested_quantity}
//                       </Typography>
//                       <Typography variant="body2">
//                         Request Status: {request_status}
//                       </Typography>
//                       {food_provider_feedback && (
//                         <Typography variant="body2">
//                           Provider Feedback: {food_provider_feedback}
//                         </Typography>
//                       )}
//                       {food_receiver_feedback && (
//                         <Typography variant="body2">
//                           Receiver Feedback: {food_receiver_feedback}
//                         </Typography>
//                       )}
//                     </Box>
//                     <Box mt={2} display="flex" justifyContent="space-around">
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={() => handleApproveRequest(req)}
//                         disabled={request_status !== "Pending"}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDeclineRequest(req)}
//                         disabled={request_status !== "Pending"}
//                       >
//                         Decline
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid2>
//             );
//           })}
//         </Grid2>
//       )}
//     </Box>
//   );
// };

// export default FoodRequests;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  Switch,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
import FoodPosterDetails from "./FoodPosterDetails";

// Import icons
import vegIcon from "../assets/veg.png";
import eggIcon from "../assets/egg.png";
import nonVegIcon from "../assets/nonveg.png";

dayjs.extend(customParseFormat);

const getCategoryIcon = (category) => {
  switch (category) {
    case "Veg":
      return vegIcon;
    case "Contains Egg":
      return eggIcon;
    case "Non-Veg":
      return nonVegIcon;
    default:
      return null;
  }
};

const FoodRequests = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");

  const [foodRequests, setFoodRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ veg: true, egg: true, nonVeg: true });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    if (!user_id || !token || !token.startsWith("User")) {
      navigate("/error");
      return;
    }

    const fetchFoodRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/getRequestsForMyFood",
          null,
          { params: { user_id } }
        );
        const requests = response.data;

        const enrichedRequests = await Promise.all(
          requests.map(async (req) => {
            try {
              const foodResponse = await axios.get("http://localhost:8080/viewFoodById", {
                params: { foodId: req.food_id },
              });
              const food = foodResponse.data;

              const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
              if (
                (food.food_status === "Available" || food.food_status === "Requested to Collect") &&
                expiry.isValid() &&
                expiry.isBefore(dayjs())
              ) {
                try {
                  await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
                  food.food_status = "Expired";
                } catch (err) {
                  console.error("Error marking food as expired", err);
                }
              }

              return { ...req, food };
            } catch (err) {
              console.error("Error fetching food details:", err);
              return { ...req, food: null };
            }
          })
        );

        setFoodRequests(enrichedRequests);
      } catch (err) {
        console.error("Error fetching food requests:", err);
        setError("Failed to fetch food requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodRequests();
  }, [user_id, token, navigate]);

  const filteredRequests = foodRequests.filter((req) => {
    const food = req.food;
    if (!food) return true;
    if (food.food_category === "Veg" && !filters.veg) return false;
    if (food.food_category === "Contains Egg" && !filters.egg) return false;
    if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
    if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
    return true;
  });

  const getCardPriority = (req) => {
    const { food, request_status, food_receiver_feedback } = req;
    
    if (food && (food.food_status === "Deleted" || food.food_status === "Expired")) return 4; // grey
    if (request_status === "Declined") return 3; // red
    if (request_status === "Collected" && food_receiver_feedback) return 2; // green
    return 1; // white
  };
  
  const sortedRequests = [...filteredRequests].sort(
    (a, b) => getCardPriority(a) - getCardPriority(b)
  );

  const handleApproveRequest = async (req) => {
    try {
      const response = await axios.put(`http://localhost:8080/food-requests/approve/${req.request_id}`);
      
      setFoodRequests((prev) =>
        prev.map((r) =>
          r.request_id === req.request_id ? { ...r, request_status: "Approved" } : r
        )
      );
    } catch (err) {
      alert("Error approving request: " + (err.response?.data || "Unknown error"));
    }
  };

  const handleDeclineRequest = async (req) => {
    try {
      const response = await axios.put(`http://localhost:8080/food-requests/decline/${req.request_id}`);
      setFoodRequests((prev) =>
        prev.map((r) =>
          r.request_id === req.request_id ? { ...r, request_status: "Declined" } : r
        )
      );
    } catch (err) {
      alert("Error declining request: " + (err.response?.data || "Unknown error"));
    }
  };

  const handleOpenFeedbackDialog = (requestId) => {
    setSelectedRequestId(requestId);
    setOpenFeedbackDialog(true);
  };

  const handleCloseFeedbackDialog = () => {
    setOpenFeedbackDialog(false);
    setFeedbackText("");
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/food-requests/${selectedRequestId}/provider-feedback`,
        null,
        { params: { feedback: feedbackText } }
      );
      setFoodRequests((prev) =>
        prev.map((r) =>
          r.request_id === selectedRequestId
            ? { ...r, food_provider_feedback: feedbackText }
            : r
        )
      );
      handleCloseFeedbackDialog();
    } catch (err) {
      alert("Failed to submit feedback: " + (err.response?.data || "Unknown error"));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Typography variant="h4" mb={3} fontWeight="bold" align="center">
        Requests for My Food Posts
      </Typography>

      <Box mb={3} display="flex" flexWrap="wrap" gap={3} alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={filters.veg}
              onChange={(e) => setFilters({ ...filters, veg: e.target.checked })}
              name="veg"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "green" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "green" },
              }}
            />
          }
          label={<img src={vegIcon} alt="Veg" width="20" height="20" />}
        />
        <FormControlLabel
          control={
            <Switch
              checked={filters.egg}
              onChange={(e) => setFilters({ ...filters, egg: e.target.checked })}
              name="egg"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "yellow" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "yellow" },
              }}
            />
          }
          label={<img src={eggIcon} alt="Egg" width="20" height="20" />}
        />
        <FormControlLabel
          control={
            <Switch
              checked={filters.nonVeg}
              onChange={(e) => setFilters({ ...filters, nonVeg: e.target.checked })}
              name="nonVeg"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "red" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "red" },
              }}
            />
          }
          label={<img src={nonVegIcon} alt="Non-Veg" width="20" height="20" />}
        />
        <FormControl
          sx={{
            minWidth: 200,
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "black",
              color: "rgba(134, 239, 172, 0.8)",
              "& fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
              "&:hover fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
              "&.Mui-focused fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
            },
            "& .MuiInputLabel-root": { color: "rgba(134, 239, 172, 0.8)" },
            "& .MuiInputLabel-root.Mui-focused": { color: "rgba(134, 239, 172, 0.8)" },
          }}
        >
          <InputLabel id="category-filter-label">Filter by Type</InputLabel>
          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Filter by Type"
            MenuProps={{
              PaperProps: {
                sx: { backgroundColor: "black", color: "rgba(134, 239, 172, 0.8)" },
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Cooked food (meals)">Cooked food (meals)</MenuItem>
            <MenuItem value="Raw Fruits/Vegetables">Raw Fruits/Vegetables</MenuItem>
            <MenuItem value="Packed Food/Beverage">Packed Food/Beverage</MenuItem>
            <MenuItem value="Bakery">Bakery</MenuItem>
            <MenuItem value="Dairy Products">Dairy Products</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredRequests.length === 0 ? (
        <Typography variant="body1" align="center">
          No requests match your filters.
        </Typography>
      ) : (
        <Grid2 container spacing={3} justifyContent="center">
          {sortedRequests.map((req) => {
            const {
              request_id,
              rid,
              requested_date,
              requested_quantity,
              request_status,
              food_provider_feedback,
              food_receiver_feedback,
              food,
            } = req;

            const cardBgColor =
              food && (food.food_status === "Deleted" || food.food_status === "Expired")
                ? "#999"
                : request_status === "Declined"
                ? "#f8d7da" // Light red shade
                : request_status === "Collected" && food_provider_feedback
                ? "#e0f2f1"
                : "white";

            return (
              <Grid2 item xs={12} sm={6} md={4} key={request_id}>
                <Card
                  sx={{
                    maxWidth: 400,
                    height: 780,
                    border: "6px solid rgba(134, 239, 172, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: cardBgColor,
                  }}
                >
                  <Box sx={{ px: 2, pt: 2 }}>
                    <FoodPosterDetails
                      userId={req.user_id}
                      PostedDate={dayjs(req.requested_date).format("DD-MM-YYYY HH:mm:ss")}
                    />
                  </Box>
                  {food && (
                    <CardMedia
                      component="img"
                      image={food.food_image}
                      alt={food.description}
                      sx={{
                        height: 200,
                        objectFit: "cover",
                        filter:
                          food.food_status !== "Available" &&
                          food.food_status !== "Collected" &&
                          food.food_status !== "Requested to Collect"
                            ? "grayscale(100%)"
                            : "none",
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    {food ? (
                      <>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Box
                            component="img"
                            src={getCategoryIcon(food.food_category)}
                            alt={food.food_category}
                            sx={{ width: 20, height: 20 }}
                          />
                          <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                            {food.description}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Serves: {food.posted_quantity} people
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Available Quantity: {food.quantity} people
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Type: {food.food_type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Expires on: {food.expiry_date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          Address: {food.address}
                        </Typography>
                        {food.latitude && food.longitude && (
                                                              <Typography variant="body2" color="primary">
                                                                <a
                                                                  href={`https://www.google.com/maps?q=${food.latitude},${food.longitude}`}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  style={{ textDecoration: "none", color: "inherit" }}
                                                                >
                                                                  📍 View on Map
                                                                </a>
                                                              </Typography>
                                                            )}
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          Food Status: {food.food_status}
                        </Typography>
                        
                      </>
                    ) : (
                      <Typography variant="body2" color="error">
                        Food details not available.
                      </Typography>
                    )}
                    <Box mt={2}>
                      <Typography variant="subtitle1">Request Details</Typography>
                      <Typography variant="body2" color="text.secondary" >Request ID: {rid}</Typography>
                      <Typography variant="body2" color="text.secondary" >
                        Requested Date: {dayjs(requested_date).format("DD-MM-YYYY HH:mm:ss")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" >
                        Requested Quantity: {requested_quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>Request Status: {request_status}</Typography>
                      
                    </Box>
                    <Box mt={2} display="flex" justifyContent="space-around">
                    {request_status === "Collected" && !food_provider_feedback ? (
                        <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenFeedbackDialog(request_id)}
                        >
                        Provide Feedback
                        </Button>
                    ) : request_status === "Pending" ? (
                        <>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleApproveRequest(req)}
                            disabled={food.food_status === "Expired"}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeclineRequest(req)}
                            disabled={food.food_status === "Expired"}
                        >
                            Decline
                        </Button>
                        </>
                    ) : null}
                    </Box>

                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      )}

      {/* Feedback Dialog */}
      <Dialog open={openFeedbackDialog} onClose={handleCloseFeedbackDialog}>
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Feedback"
            fullWidth
            multiline
            rows={4}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedbackDialog}color="error">Cancel</Button>
          <Button onClick={handleSubmitFeedback} variant="contained"  color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodRequests;
