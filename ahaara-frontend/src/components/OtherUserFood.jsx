// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   FormControlLabel,
//   Switch,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   useMediaQuery, Grid2
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import vegIcon from "../assets/veg.png";
// import eggIcon from "../assets/egg.png";
// import nonVegIcon from "../assets/nonveg.png";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import FoodPosterDetails from "./FoodPosterDetails"; // Adjust path if needed

// dayjs.extend(customParseFormat);

// const OtherUserFood = () => {
//   const navigate = useNavigate();
//   const user_id = sessionStorage.getItem("user_id");
//   const token = sessionStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const [allFoods, setAllFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [filters, setFilters] = useState({
//     veg: true,
//     egg: true,
//     nonVeg: true,
//   });

//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     if (!user_id || !token || !token.startsWith("User")) {
//       navigate("/error");
//       return;
//     }

//     const fetchAllFood = async () => {
//       try {
//         const response = await axios.post("http://localhost:8080/viewUsersFood", {
//           user_id: user_id,
//         });

//         let foodList = response.data;
//         if (!Array.isArray(foodList)) foodList = [foodList];

//         const now = dayjs();

//         const updatedFoodList = await Promise.all(
//           foodList.map(async (food) => {
//             const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
//             if (food.food_status === "Available" && expiry.isValid() && expiry.isBefore(now)) {
//               try {
//                 await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
//                 return { ...food, food_status: "Expired" };
//               } catch (error) {
//                 console.error("Failed to mark as expired:", error);
//                 return food;
//               }
//             }
//             return food;
//           })
//         );

//         const sortedFoods = updatedFoodList.sort((a, b) => {
//           const statusOrder = { Available: 0, Expired: 1, Deleted: 2 };
//           return statusOrder[a.food_status] - statusOrder[b.food_status];
//         });

//         setAllFoods(sortedFoods);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Failed to fetch food listings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllFood();

//     const interval = setInterval(() => {
//       fetchAllFood();
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [navigate, token, user_id]);

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case "Veg":
//         return vegIcon;
//       case "Contains Egg":
//         return eggIcon;
//       case "Non-Veg":
//         return nonVegIcon;
//       default:
//         return null;
//     }
//   };

//   const handleFilterChange = (event) => {
//     setFilters({ ...filters, [event.target.name]: event.target.checked });
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const filteredFoods = allFoods.filter((food) => {
//     if (food.food_category === "Veg" && !filters.veg) return false;
//     if (food.food_category === "Contains Egg" && !filters.egg) return false;
//     if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
//     if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
//     return true;
//   });

//   return (
//     <Box sx={{ padding: 4, minHeight: "100vh" }}>
//       <Typography variant="h4" mb={3} fontWeight="bold">
//         Available Food
//       </Typography>

//       {/* Filters */}
//       <Box mb={3} display="flex" flexWrap="wrap" gap={3} alignItems="center">
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.veg}
//               onChange={handleFilterChange}
//               name="veg"
//               sx={{
//                 '& .MuiSwitch-switchBase.Mui-checked': { color: 'green' },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'green' }
//               }}
//             />
//           }
//           label={<img src={vegIcon} alt="Veg" width="20" height="20" />}
//         />
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.egg}
//               onChange={handleFilterChange}
//               name="egg"
//               sx={{
//                 '& .MuiSwitch-switchBase.Mui-checked': { color: 'yellow' },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'yellow' }
//               }}
//             />
//           }
//           label={<img src={eggIcon} alt="Egg" width="20" height="20" />}
//         />
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.nonVeg}
//               onChange={handleFilterChange}
//               name="nonVeg"
//               sx={{
//                 '& .MuiSwitch-switchBase.Mui-checked': { color: 'red' },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'red' }
//               }}
//             />
//           }
//           label={<img src={nonVegIcon} alt="Non-Veg" width="20" height="20" />}
//         />

//         <FormControl
//           sx={{
//             minWidth: 200,
//             borderRadius: 1,
//             '& .MuiOutlinedInput-root': {
//               backgroundColor: 'black',
//               color: 'rgba(134, 239, 172, 0.8)',
//               '& fieldset': { borderColor: 'rgba(134, 239, 172, 0.8)' },
//               '&:hover fieldset': { borderColor: 'rgba(134, 239, 172, 0.8)' },
//               '&.Mui-focused fieldset': { borderColor: 'rgba(134, 239, 172, 0.8)' },
//             },
//             '& .MuiInputLabel-root': {
//               color: 'rgba(134, 239, 172, 0.8)',
//             },
//             '& .MuiInputLabel-root.Mui-focused': {
//               color: 'rgba(134, 239, 172, 0.8)',
//             },
//           }}
//         >
//           <InputLabel id="category-filter-label">Filter by Type</InputLabel>
//           <Select
//             labelId="category-filter-label"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             label="Filter by Type"
//             MenuProps={{
//               PaperProps: {
//                 sx: {
//                   backgroundColor: 'black',
//                   color: 'rgba(134, 239, 172, 0.8)',
//                 },
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

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : filteredFoods.length === 0 ? (
//         <Typography>No food available</Typography>
//       ) : (
//         <Grid2 container spacing={3} justifyContent="center">
//           {filteredFoods.map((food, index) => (
//             <Grid2 item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   maxWidth: 345,
//                   height: 570,
//                   backgroundColor: food.food_status !== "Available" ? "#999" : "white",
//                   border: "6px solid rgba(134, 239, 172, 0.8)",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Box sx={{ px: 2, pt: 2, pb: 0.5 }}>
//                   <FoodPosterDetails
//                     userId={food.user_id}
//                     PostedDate={dayjs(food.posted_date).format("DD-MM-YYYY HH:mm:ss")}
//                   />
//                 </Box>

//                 <CardMedia
//                   component="img"
//                   image={food.food_image}
//                   alt={food.description}
//                   sx={{
//                     width: "100%",
//                     height: 200,
//                     objectFit: "cover",
//                     filter: food.food_status !== "Available" ? "grayscale(100%)" : "none",
//                   }}
//                 />

//                 <CardContent sx={{ flex: 1, pt: 1 }}>
//                   <Box display="flex" alignItems="center" gap={1} mb={1}>
//                     <Box component="img" src={getCategoryIcon(food.food_category)} alt={food.food_category} sx={{ width: 20, height: 20 }} />
//                     <Typography variant="body1">{food.description}</Typography>
//                   </Box>
//                   <Typography variant="body2" color="text.secondary">
//                     Serves: {food.posted_quantity} people
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Available For: {food.quantity} people
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Type: {food.food_type}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Expires on: {food.expiry_date}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
//                     Address: {food.address}
//                   </Typography>
//                   {food.latitude && food.longitude && (
//                     <Typography variant="body2" color="primary">
//                       <a
//                         href={`https://www.google.com/maps?q=${food.latitude},${food.longitude}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ textDecoration: "none", color: "inherit" }}
//                       >
//                         📍 View on Map
//                       </a>
//                     </Typography>
//                   )}
//                   <Typography variant="body2" color="text.secondary">
//                     Status: {food.food_status}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid2>
//           ))}
//         </Grid2>
//       )}
//     </Box>
//   );
// };

// export default OtherUserFood;



























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   FormControlLabel,
//   Switch,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   TextField,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import Grid2 from "@mui/material/Grid2";
// import { useNavigate } from "react-router-dom";
// import vegIcon from "../assets/veg.png";
// import eggIcon from "../assets/egg.png";
// import nonVegIcon from "../assets/nonveg.png";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import FoodPosterDetails from "./FoodPosterDetails";
// import LocationPickerMapbox from "./LocationPickerMapbox";

// dayjs.extend(customParseFormat);

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoiZGFzYXJpLWxhbGl0aCIsImEiOiJjbThycHBrMHowbjhyMm5wbGI1YWUxZHh0In0.W23Lxwk9xLXzTwQsIAy4cg";

// // ------------------------------------------------------------------
// // UPDATED getRouteInfo to handle "same location" scenario
// // ------------------------------------------------------------------
// const getRouteInfo = async (from, to) => {
//   // 1) Check if from and to are basically the same spot (or very close)
//   const isSameLocation =
//     Math.abs(from.lat - to.lat) < 0.00001 &&
//     Math.abs(from.lng - to.lng) < 0.00001;

//   if (isSameLocation) {
//     // If so, skip the API call and return a flag
//     return {
//       distance_km: 0,
//       duration_min: 0,
//       sameLocation: true,
//     };
//   }

//   // Otherwise, call Mapbox Directions as usual
//   const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${from.lng},${from.lat};${to.lng},${to.lat}?access_token=${MAPBOX_TOKEN}&overview=false`;
//   const res = await axios.get(url);
//   const route = res.data.routes[0];
//   return {
//     distance_km: route.distance / 1000,
//     duration_min: Math.round(route.duration / 60),
//     sameLocation: false,
//   };
// };

// const OtherUserFood = () => {
//   const navigate = useNavigate();
//   const user_id = sessionStorage.getItem("user_id");
//   const token = sessionStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const [allFoods, setAllFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Filters: dietary, type, and distance filter (in km)
//   const [filters, setFilters] = useState({ veg: true, egg: true, nonVeg: true });
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [distanceFilter, setDistanceFilter] = useState(null);

//   // Location dialog states
//   const [locationDialogOpen, setLocationDialogOpen] = useState(true);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [submittingLocation, setSubmittingLocation] = useState(false);

//   // Request dialog states for API call
//   const [requestDialog, setRequestDialog] = useState({ open: false, food: null });
//   const [requestedQuantity, setRequestedQuantity] = useState(1);

//   useEffect(() => {
//     if (!user_id || !token || !token.startsWith("User")) {
//       navigate("/error");
//       return;
//     }
//     if (!locationDialogOpen) fetchAllFood();
//     const interval = setInterval(() => {
//       if (!locationDialogOpen) fetchAllFood();
//     }, 60000);
//     return () => clearInterval(interval);
//   }, [navigate, token, user_id, locationDialogOpen]);

//   const fetchAllFood = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/viewUsersFood", { user_id });
//       let foodList = response.data;
//       if (!Array.isArray(foodList)) foodList = [foodList];
//       const now = dayjs();
//       const updatedFoodList = await Promise.all(
//         foodList.map(async (food) => {
//           const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
//           if (food.food_status === "Available" && expiry.isValid() && expiry.isBefore(now)) {
//             try {
//               await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
//               return { ...food, food_status: "Expired" };
//             } catch {
//               return food;
//             }
//           }
//           return food;
//         })
//       );
//       // Enrich with route info (traffic-aware) if user location exists
//       if (selectedLocation) {
//         const enriched = await Promise.all(
//           updatedFoodList.map(async (food) => {
//             if (food.latitude && food.longitude) {
//               try {
//                 const route = await getRouteInfo(
//                   { lat: selectedLocation.lat, lng: selectedLocation.lng },
//                   { lat: food.latitude, lng: food.longitude }
//                 );
//                 return {
//                   ...food,
//                   routeDistance: route.distance_km,
//                   routeDuration: route.duration_min,
//                   sameLocation: route.sameLocation,
//                 };
//               } catch {
//                 return { ...food, routeDistance: null, routeDuration: null, sameLocation: false };
//               }
//             }
//             return food;
//           })
//         );
//         setAllFoods(enriched);
//       } else {
//         setAllFoods(updatedFoodList);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch food listings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitLocation = async () => {
//     if (!selectedLocation) return;
//     try {
//       setSubmittingLocation(true);
//       await axios.post("http://localhost:8080/updateUserLocation/", null, {
//         params: {
//           latitude: selectedLocation.lat,
//           longitude: selectedLocation.lng,
//           user_id,
//         },
//       });
//       setLocationDialogOpen(false);
//     } catch (err) {
//       console.error("Error updating location:", err);
//     } finally {
//       setSubmittingLocation(false);
//     }
//   };

//   // API call for requesting food
//   const handleRequestFood = async () => {
//     if (!requestDialog.food) return;
//     try {
//       const foodId = requestDialog.food.food_id;
//       const response = await axios.put(
//         `http://localhost:8080/requestFood/${foodId}/${user_id}/${requestedQuantity}`
//       );
//       alert(response.data);
//       setRequestDialog({ open: false, food: null });
//       // Refresh food listings after request
//       fetchAllFood();
//     } catch (err) {
//       console.error("Error requesting food", err);
//       alert("Error requesting food: " + (err.response?.data || "Unknown error"));
//     }
//   };

//   // Filter foods based on dietary, type, and distance criteria
//   const filteredFoods = allFoods
//     .filter((food) => {
//       if (food.food_category === "Veg" && !filters.veg) return false;
//       if (food.food_category === "Contains Egg" && !filters.egg) return false;
//       if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
//       if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
//       if (distanceFilter && food.routeDistance && food.routeDistance > distanceFilter) return false;
//       return true;
//     })
//     .sort((a, b) => {
//       if (a.routeDistance != null && b.routeDistance != null) {
//         return a.routeDistance - b.routeDistance;
//       }
//       return 0;
//     });

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case "Veg":
//         return vegIcon;
//       case "Contains Egg":
//         return eggIcon;
//       case "Non-Veg":
//         return nonVegIcon;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ padding: 4, minHeight: "100vh" }}>
//       <Typography variant="h4" mb={3} fontWeight="bold">
//         Available Food
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
//             "& .MuiInputLabel-root": {
//               color: "rgba(134, 239, 172, 0.8)",
//             },
//             "& .MuiInputLabel-root.Mui-focused": {
//               color: "rgba(134, 239, 172, 0.8)",
//             },
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
//                 sx: {
//                   backgroundColor: "black",
//                   color: "rgba(134, 239, 172, 0.8)",
//                 },
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

//         <FormControl sx={{ minWidth: 150 }}>
//           <TextField
//             label="Distance (km)"
//             type="number"
//             variant="outlined"
//             value={distanceFilter || ""}
//             onChange={(e) => setDistanceFilter(Number(e.target.value) || null)}
//             InputProps={{
//               sx: {
//                 backgroundColor: "black",
//                 color: "rgba(134, 239, 172, 0.8)",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(134, 239, 172, 0.8)",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(134, 239, 172, 0.8)",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(134, 239, 172, 0.8)",
//                 },
//               },
//             }}
//             InputLabelProps={{
//               sx: {
//                 color: "rgba(134, 239, 172, 0.8)",
//                 "&.Mui-focused": { color: "rgba(134, 239, 172, 0.8)" },
//               },
//             }}
//           />
//         </FormControl>
//       </Box>

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : filteredFoods.length === 0 ? (
//         <Typography>No food available</Typography>
//       ) : (
//         <Grid2 container spacing={3} justifyContent="center">
//           {filteredFoods.map((food, index) => {
//             const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
//             const willExpireBeforeArrival =
//               food.routeDuration &&
//               dayjs().add(food.routeDuration, "minute").isAfter(expiry);

//             return (
//               <Grid2 item xs={12} sm={6} md={4} key={index}>
//                 <Card
//                   sx={{
//                     maxWidth: 345,
//                     height: 650,
//                     border: "6px solid rgba(134, 239, 172, 0.8)",
//                     display: "flex",
//                     flexDirection: "column",
//                     backgroundColor:
//                       food.food_status === "Deleted" || food.food_status === "Expired"
//                         ? "#999"
//                         : "white",
//                   }}
//                 >
//                   <Box sx={{ px: 2, pt: 2 }}>
//                     <FoodPosterDetails
//                       userId={food.user_id}
//                       PostedDate={dayjs(food.posted_date).format("DD-MM-YYYY HH:mm:ss")}
//                     />
//                   </Box>
//                   <CardMedia
//                     component="img"
//                     image={food.food_image}
//                     alt={food.description}
//                     sx={{
//                       height: 200,
//                       objectFit: "cover",
//                       filter:
//                         food.food_status !== "Available" &&
//                         food.food_status !== "Requested to Collect"
//                           ? "grayscale(100%)"
//                           : "none",
//                     }}
//                   />
//                   <CardContent>
//                     <Box display="flex" alignItems="center" gap={1} mb={1}>
//                       <Box
//                         component="img"
//                         src={getCategoryIcon(food.food_category)}
//                         alt={food.food_category}
//                         sx={{ width: 20, height: 20 }}
//                       />
//                       <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
//                         {food.description}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary">
//                       Serves: {food.posted_quantity} people
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Available Quantity: {food.quantity} people
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Type: {food.food_type}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Expires on: {food.expiry_date}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" mt={1}>
//                       Address: {food.address}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" mt={1}>
//                       Status: {food.food_status}
//                     </Typography>
//                     {food.latitude && food.longitude && (
//                       <>
//                         <Typography variant="body2" color="primary">
//                           <a
//                             href={`https://www.google.com/maps?q=${food.latitude},${food.longitude}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{ textDecoration: "none", color: "inherit" }}
//                           >
//                             📍 View on Map
//                           </a>
//                         </Typography>
//                         {food.routeDistance != null && food.routeDuration != null && (
//                           // 2) Conditionally render a special message if sameLocation
//                           food.sameLocation ? (
//                             <Typography variant="body2">
//                               📍 You are already at this location!
//                             </Typography>
//                           ) : (
//                             <Typography variant="body2">
//                               📍 {food.routeDistance.toFixed(1)} km • ~{food.routeDuration} mins by vehicle
//                             </Typography>
//                           )
//                         )}
//                       </>
//                     )}
//                   </CardContent>
//                   <Box display="flex" justifyContent="center" mb={2}>
//                     {willExpireBeforeArrival ? (
//                       <Typography color="error" variant="body2" align="center">
//                         You can't request because food will expire before you reach.
//                       </Typography>
//                     ) : (
//                       <Button
//                         variant="contained"
//                         sx={{
//                           backgroundColor: "green",
//                           "&:hover": { backgroundColor: "darkgreen" },
//                         }}
//                         disabled={food.quantity === 0}
//                         onClick={() => {
//                           setRequestDialog({ open: true, food });
//                           setRequestedQuantity(1);
//                         }}
//                       >
//                         Request Food
//                       </Button>
//                     )}
//                   </Box>
//                 </Card>
//               </Grid2>
//             );
//           })}
//         </Grid2>
//       )}

//       {/* Request Food Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={() => setRequestDialog({ open: false, food: null })}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogTitle>Request Food</DialogTitle>
//         <DialogContent>
//           <Typography variant="body2" mb={2}>
//             {requestDialog.food &&
//               `Available Quantity: ${requestDialog.food.quantity}`}
//           </Typography>
//           <TextField
//             label="Requested Quantity"
//             type="number"
//             fullWidth
//             value={requestedQuantity}
//             onChange={(e) => setRequestedQuantity(Number(e.target.value))}
//             InputProps={{
//               inputProps: {
//                 min: 1,
//                 max: requestDialog.food ? requestDialog.food.quantity : 1,
//               },
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setRequestDialog({ open: false, food: null })}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleRequestFood}>
//             Submit Request
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Location Picker Dialog */}
//       <Dialog open={locationDialogOpen} fullWidth maxWidth="sm">
//         <DialogTitle>Select Your Location</DialogTitle>
//         <DialogContent>
//           <Typography sx={{ mb: 2 }}>
//             Please select your current location to view nearby food items.
//           </Typography>
//           <LocationPickerMapbox onSelectLocation={(loc) => setSelectedLocation(loc)} />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleSubmitLocation}
//             variant="contained"
//             disabled={!selectedLocation || submittingLocation}
//           >
//             {submittingLocation ? "Submitting..." : "Submit Location"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default OtherUserFood;




import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControlLabel,
  Switch,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import vegIcon from "../assets/veg.png";
import eggIcon from "../assets/egg.png";
import nonVegIcon from "../assets/nonveg.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FoodPosterDetails from "./FoodPosterDetails";
import LocationPickerMapbox from "./LocationPickerMapbox";

dayjs.extend(customParseFormat);

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGFzYXJpLWxhbGl0aCIsImEiOiJjbThycHBrMHowbjhyMm5wbGI1YWUxZHh0In0.W23Lxwk9xLXzTwQsIAy4cg";

// ------------------------------------------------------------------
// UPDATED getRouteInfo to handle "same location" scenario
// ------------------------------------------------------------------
const getRouteInfo = async (from, to) => {
  const isSameLocation =
    Math.abs(from.lat - to.lat) < 0.00001 &&
    Math.abs(from.lng - to.lng) < 0.00001;

  if (isSameLocation) {
    return {
      distance_km: 0,
      duration_min: 0,
      sameLocation: true,
    };
  }

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${from.lng},${from.lat};${to.lng},${to.lat}?access_token=${MAPBOX_TOKEN}&overview=false`;
  const res = await axios.get(url);
  const route = res.data.routes[0];
  return {
    distance_km: route.distance / 1000,
    duration_min: Math.round(route.duration / 60),
    sameLocation: false,
  };
};

const OtherUserFood = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters: dietary, type, and distance filter (in km)
  const [filters, setFilters] = useState({ veg: true, egg: true, nonVeg: true });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [distanceFilter, setDistanceFilter] = useState(null);

  // Location dialog states
  const [locationDialogOpen, setLocationDialogOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [submittingLocation, setSubmittingLocation] = useState(false);

  // Request dialog states for API call
  const [requestDialog, setRequestDialog] = useState({ open: false, food: null });
  const [requestedQuantity, setRequestedQuantity] = useState(1);

  // New: Confirm Round Trip dialog state
  const [confirmRoundTripDialog, setConfirmRoundTripDialog] = useState({
    open: false,
    food: null,
  });

  useEffect(() => {
    if (!user_id || !token || !token.startsWith("User")) {
      navigate("/error");
      return;
    }
    if (!locationDialogOpen) fetchAllFood();
    const interval = setInterval(() => {
      if (!locationDialogOpen) fetchAllFood();
    }, 60000);
    return () => clearInterval(interval);
  }, [navigate, token, user_id, locationDialogOpen]);

  const fetchAllFood = async () => {
    try {
      const response = await axios.post("http://localhost:8080/viewUsersFood", { user_id });
      let foodList = response.data;
      if (!Array.isArray(foodList)) foodList = [foodList];
      const now = dayjs();
      const updatedFoodList = await Promise.all(
        foodList.map(async (food) => {
          const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
          if (
              (food.food_status === "Available" || food.food_status === "Requested to Collect") &&
              expiry.isValid() &&
              expiry.isBefore(dayjs())
            ) {
            try {
              await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
              return { ...food, food_status: "Expired" };
            } catch {
              return food;
            }
          }
          return food;
        })
      );
      if (selectedLocation) {
        const enriched = await Promise.all(
          updatedFoodList.map(async (food) => {
            if (food.latitude && food.longitude) {
              try {
                const route = await getRouteInfo(
                  { lat: selectedLocation.lat, lng: selectedLocation.lng },
                  { lat: food.latitude, lng: food.longitude }
                );
                return {
                  ...food,
                  routeDistance: route.distance_km,
                  routeDuration: route.duration_min,
                  sameLocation: route.sameLocation,
                };
              } catch {
                return { ...food, routeDistance: null, routeDuration: null, sameLocation: false };
              }
            }
            return food;
          })
        );
        setAllFoods(enriched);
      } else {
        setAllFoods(updatedFoodList);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch food listings.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLocation = async () => {
    if (!selectedLocation) return;
    try {
      setSubmittingLocation(true);
      await axios.post("http://localhost:8080/updateUserLocation/", null, {
        params: {
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
          user_id,
        },
      });
      setLocationDialogOpen(false);
    } catch (err) {
      console.error("Error updating location:", err);
    } finally {
      setSubmittingLocation(false);
    }
  };

  // API call for requesting food
  const handleRequestFood = async () => {
    if (!requestDialog.food) return;
    try {
      const foodId = requestDialog.food.food_id;
      const response = await axios.put(
        `http://localhost:8080/requestFood/${foodId}/${user_id}/${requestedQuantity}`
      );
      setRequestDialog({ open: false, food: null });
      fetchAllFood();
    } catch (err) {
      console.error("Error requesting food", err);
      alert("Error requesting food: " + (err.response?.data || "Unknown error"));
    }
  };

  // Handler for continuing after confirming round trip warning
  const handleConfirmRoundTripContinue = () => {
    const food = confirmRoundTripDialog.food;
    setConfirmRoundTripDialog({ open: false, food: null });
    setRequestDialog({ open: true, food });
    setRequestedQuantity(1);
  };

  // Filter foods based on dietary, type, and distance criteria
  const filteredFoods = allFoods
    .filter((food) => {
      if (food.food_category === "Veg" && !filters.veg) return false;
      if (food.food_category === "Contains Egg" && !filters.egg) return false;
      if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
      if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
      if (distanceFilter && food.routeDistance && food.routeDistance > distanceFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.routeDistance != null && b.routeDistance != null) {
        return a.routeDistance - b.routeDistance;
      }
      return 0;
    });

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

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Typography variant="h4" mb={3} fontWeight="bold" align={"center"}>
        Available Food
      </Typography>

      {/* Filters */}
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
            "& .MuiInputLabel-root": {
              color: "rgba(134, 239, 172, 0.8)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "rgba(134, 239, 172, 0.8)",
            },
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
                sx: {
                  backgroundColor: "black",
                  color: "rgba(134, 239, 172, 0.8)",
                },
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

        <FormControl sx={{ minWidth: 150 }}>
          <TextField
            label="Distance (km)"
            type="number"
            variant="outlined"
            value={distanceFilter || ""}
            onChange={(e) => setDistanceFilter(Number(e.target.value) || null)}
            InputProps={{
              sx: {
                backgroundColor: "black",
                color: "rgba(134, 239, 172, 0.8)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(134, 239, 172, 0.8)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(134, 239, 172, 0.8)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(134, 239, 172, 0.8)",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "rgba(134, 239, 172, 0.8)",
                "&.Mui-focused": { color: "rgba(134, 239, 172, 0.8)" },
              },
            }}
          />
        </FormControl>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredFoods.length === 0 ? (
        <Typography>No food available</Typography>
      ) : (
        <Grid2 container spacing={3} justifyContent="center">
          {filteredFoods.map((food, index) => {
            const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
            // Check if food would expire by the time you arrive (one-way)
            const willExpireBeforeArrival =
              food.routeDuration &&
              dayjs().add(food.routeDuration, "minute").isAfter(expiry);
            // Check if food might be expired by the time you return (round-trip)
            const willExpireBeforeReturn =
              food.routeDuration &&
              dayjs().add(food.routeDuration * 2, "minute").isAfter(expiry);

            return (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 400,
                    height: 680,
                    border: "6px solid rgba(134, 239, 172, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor:
                      food.food_status === "Deleted" || food.food_status === "Expired"
                        ? "#999"
                        : "white",
                  }}
                >
                  <Box sx={{ px: 2, pt: 2 }}>
                    <FoodPosterDetails
                      userId={food.user_id}
                      PostedDate={dayjs(food.posted_date).format("DD-MM-YYYY HH:mm:ss")}
                    />
                  </Box>
                  <CardMedia
                    component="img"
                    image={food.food_image}
                    alt={food.description}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                      filter:
                        food.food_status !== "Available" &&
                        food.food_status !== "Requested to Collect"
                          ? "grayscale(100%)"
                          : "none",
                    }}
                  />
                  <CardContent>
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
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Status: {food.food_status}
                    </Typography>
                    {food.latitude && food.longitude && (
                      <>
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
                        {food.routeDistance != null && food.routeDuration != null && (
                          food.sameLocation ? (
                            <Typography variant="body2">
                              📍 You are already at this location!
                            </Typography>
                          ) : (
                            <Typography variant="body2">
                              📍 {food.routeDistance.toFixed(1)} km • ~{food.routeDuration} mins by vehicle
                            </Typography>
                          )
                        )}
                      </>
                    )}
                  </CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    {willExpireBeforeArrival ? (
                      <Typography color="error" variant="body2" align="center">
                        You can't request because food will expire before you reach.
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green",
                          "&:hover": { backgroundColor: "darkgreen" },
                        }}
                        disabled={food.quantity === 0}
                        onClick={() => {
                          // If round trip time causes a risk, ask for confirmation.
                          if (willExpireBeforeReturn) {
                            setConfirmRoundTripDialog({ open: true, food });
                          } else {
                            setRequestDialog({ open: true, food });
                            setRequestedQuantity(1);
                          }
                        }}
                      >
                        Request Food
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      )}

      {/* Request Food Dialog */}
      <Dialog
        open={requestDialog.open}
        onClose={() => setRequestDialog({ open: false, food: null })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Request Food</DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={2}>
            {requestDialog.food &&
              `Available Quantity: ${requestDialog.food.quantity}`}
          </Typography>
          <TextField
            label="Requested Quantity"
            type="number"
            fullWidth
            value={requestedQuantity}
            onChange={(e) => setRequestedQuantity(Number(e.target.value))}
            InputProps={{
              inputProps: {
                min: 1,
                max: requestDialog.food ? requestDialog.food.quantity : 1,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setRequestDialog({ open: false, food: null })}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleRequestFood}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Round Trip Dialog */}
      <Dialog
        open={confirmRoundTripDialog.open}
        onClose={() => setConfirmRoundTripDialog({ open: false, food: null })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Request</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            The round-trip time to fetch this food might cause it to expire by the time you return.
            Do you still want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setConfirmRoundTripDialog({ open: false, food: null })}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleConfirmRoundTripContinue}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Location Picker Dialog */}
      <Dialog open={locationDialogOpen} fullWidth maxWidth="sm">
        <DialogTitle>Select Your Location</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Please select your current location to view nearby food items.
          </Typography>
          <LocationPickerMapbox onSelectLocation={(loc) => setSelectedLocation(loc)} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitLocation}
            variant="contained"
            color="success"
            disabled={!selectedLocation || submittingLocation}
          >
            {submittingLocation ? "Submitting..." : "Submit Location"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OtherUserFood;
