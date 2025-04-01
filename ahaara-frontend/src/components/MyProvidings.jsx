// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid2,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   useMediaQuery,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControlLabel,
//   Switch,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import vegIcon from '../assets/veg.png';
// import eggIcon from '../assets/egg.png';
// import nonVegIcon from '../assets/nonveg.png';
// import dayjs from "dayjs";

// const MyProvidings = () => {
//   const navigate = useNavigate();
//   const user_id = sessionStorage.getItem("user_id");
//   const token = sessionStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const [myFoods, setMyFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [confirmDialog, setConfirmDialog] = useState({ open: false, foodId: null });

//   const [filters, setFilters] = useState({
//     veg: true,
//     egg: true,
//     nonVeg: true,
//   });

//   useEffect(() => {
//     if (!user_id || !token || !token.startsWith("User")) {
//       navigate("/error");
//       return;
//     }

//     const fetchMyFood = async () => {
//       try {
//         const response = await axios.post("http://localhost:8080/viewMyFood", {
//           user_id: user_id,
//         });

//         let foodList = response.data;
//         if (!Array.isArray(foodList)) {
//           foodList = [foodList];
//         }

//         const now = dayjs();
//         console.log("Current time:", now.format());

//         const updatedFoodList = await Promise.all(foodList.map(async (food) => {
//           const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
//           console.log(`Food ID: ${food.food_id}, Expiry: ${food.expiry_date}, Parsed: ${expiry.format()}`);

//           if (food.food_status === "Available" && expiry.isValid() && expiry.isBefore(now)) {
//             console.log(`Food ID ${food.food_id} is expired. Marking as expired.`);
//             try {
//               await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
//               return { ...food, food_status: "Expired" };
//             } catch (error) {
//               console.error("Failed to mark food as expired:", error);
//               return food;
//             }
//           }
//           return food;
//         }));

//         const sortedFoods = updatedFoodList.sort((a, b) => {
//           const statusOrder = { Available: 0, Expired: 1, Deleted: 2 };
//           return statusOrder[a.food_status] - statusOrder[b.food_status];
//         });

//         setMyFoods(sortedFoods);
//       } catch (err) {
//         setError("Failed to fetch your food listings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyFood();
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

//   const handleDelete = async (foodId) => {
//     try {
//       await axios.put(`http://localhost:8080/deleteFood/${foodId}`);
//       setMyFoods((prevFoods) =>
//         prevFoods
//           .map((food) =>
//             food.food_id === foodId ? { ...food, food_status: "Deleted" } : food
//           )
//           .sort((a, b) => {
//             const statusOrder = { Available: 0, Expired: 1, Deleted: 2 };
//             return statusOrder[a.food_status] - statusOrder[b.food_status];
//           })
//       );
//       setConfirmDialog({ open: false, foodId: null });
//     } catch (err) {
//       console.error("Failed to delete food:", err);
//     }
//   };

//   const handleFilterChange = (event) => {
//     setFilters({ ...filters, [event.target.name]: event.target.checked });
//   };

//   const filteredFoods = myFoods.filter((food) => {
//     if (food.food_category === "Veg" && !filters.veg) return false;
//     if (food.food_category === "Contains Egg" && !filters.egg) return false;
//     if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
//     return true;
//   });

//   return (
//     <Box sx={{ padding: 4, minHeight: "100vh" }}>
//       <Typography variant="h4" mb={3} fontWeight="bold">
//         My Providings
//       </Typography>

//       {/* Filters */}
//       <Box mb={3} display="flex" gap={3} alignItems="center">
//         <FormControlLabel
//           control={
//             <Switch
//               checked={filters.veg}
//               onChange={handleFilterChange}
//               name="veg"
//               sx={{
//                 '& .MuiSwitch-switchBase.Mui-checked': {
//                   color: 'green',
//                 },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                   backgroundColor: 'green',
//                 },
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
//                 '& .MuiSwitch-switchBase.Mui-checked': {
//                   color: 'yellow',
//                 },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                   backgroundColor: 'yellow',
//                 },
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
//                 '& .MuiSwitch-switchBase.Mui-checked': {
//                   color: 'red',
//                 },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                   backgroundColor: 'red',
//                 },
//               }}
//             />
//           }
//           label={<img src={nonVegIcon} alt="Non-Veg" width="20" height="20" />}
//         />
//       </Box>

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : filteredFoods.length === 0 ? (
//         <Typography>No food found</Typography>
//       ) : (
//         <Grid2 container spacing={3} justifyContent="center">
//           {filteredFoods.map((food, index) => (
//             <Grid2 item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   maxWidth: 345,
//                   height: 510,
//                   backgroundColor:
//                     food.food_status === "Deleted" || food.food_status === "Expired"
//                       ? "#888"
//                       : "white",
//                   border: "6px solid rgba(134, 239, 172, 0.8)",
//                   justifyContent: "space-between",
//                   position: "relative",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={food.food_image}
//                   alt={food.description}
//                   sx={{
//                     width: "100%",
//                     height: 200,
//                     objectFit: "cover",
//                     borderRadius: "4px 4px 0 0",
//                     filter:
//                       food.food_status === "Deleted" || food.food_status === "Expired"
//                         ? "grayscale(100%)"
//                         : "none",
//                   }}
//                 />

//                 <Box
//                   sx={{
//                     flex: 1,
//                     padding: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "flex-start",
//                   }}
//                 >
//                   <Box>
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
//                       Serves: {food.quantity} people
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
//                   </Box>

//                   {food.food_status === "Available" && (
//                     <Box
//                       display="flex"
//                       justifyContent="center"
//                       sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
//                     >
//                       <Button
//                         variant="contained"
//                         size="small"
//                         color="error"
//                         onClick={() =>
//                           setConfirmDialog({ open: true, foodId: food.food_id })
//                         }
//                       >
//                         Delete Food
//                       </Button>
//                     </Box>
//                   )}
//                 </Box>
//               </Card>
//             </Grid2>
//           ))}
//         </Grid2>
//       )}

//       <Dialog
//         open={confirmDialog.open}
//         onClose={() => setConfirmDialog({ open: false, foodId: null })}
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this food item?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             sx={{ backgroundColor: "green", color: "white", '&:hover': { backgroundColor: "darkgreen" } }}
//             onClick={() => setConfirmDialog({ open: false, foodId: null })}
//           >
//             Cancel
//           </Button>
//           <Button
//             color="error"
//             variant="contained"
//             onClick={() => handleDelete(confirmDialog.foodId)}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MyProvidings;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid2,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   useMediaQuery,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControlLabel,
//   Switch,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import vegIcon from '../assets/veg.png';
// import eggIcon from '../assets/egg.png';
// import nonVegIcon from '../assets/nonveg.png';
// import dayjs from "dayjs";

// const MyProvidings = () => {
//   const navigate = useNavigate();
//   const user_id = sessionStorage.getItem("user_id");
//   const token = sessionStorage.getItem("token");
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const [myFoods, setMyFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [confirmDialog, setConfirmDialog] = useState({ open: false, foodId: null });
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const [filters, setFilters] = useState({
//     veg: true,
//     egg: true,
//     nonVeg: true,
//   });

//   useEffect(() => {
//     if (!user_id || !token || !token.startsWith("User")) {
//       navigate("/error");
//       return;
//     }

//     const fetchMyFood = async () => {
//       try {
//         const response = await axios.post("http://localhost:8080/viewMyFood", {
//           user_id: user_id,
//         });
    
//         let foodList = response.data;
//         if (!Array.isArray(foodList)) foodList = [foodList];
    
//         const now = dayjs();
//         console.log("Current Date (now):", now.format("DD-MM-YYYY HH:mm:ss"));
    
//         const updatedFoodList = await Promise.all(
//           foodList.map(async (food) => {
//             const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
//             console.log(`Food ID: ${food.food_id}`);
//             console.log("Raw Expiry Date:", food.expiry_date);
//             console.log("Parsed Expiry Date (dayjs object):", expiry.format("DD-MM-YYYY HH:mm:ss"));
//             console.log("Is Expired:", expiry.isBefore(now));
//             console.log("Is Valid Date:", expiry.isValid());
    
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
    
//         setMyFoods(sortedFoods);
//       } catch (err) {
//         setError("Failed to fetch your food listings.");
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchMyFood();
//   }, [navigate, token, user_id]);

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case "Veg": return vegIcon;
//       case "Contains Egg": return eggIcon;
//       case "Non-Veg": return nonVegIcon;
//       default: return null;
//     }
//   };

//   const handleDelete = async (foodId) => {
//     try {
//       await axios.put(`http://localhost:8080/deleteFood/${foodId}`);
//       setMyFoods((prevFoods) =>
//         prevFoods.map((food) =>
//           food.food_id === foodId ? { ...food, food_status: "Deleted" } : food
//         ).sort((a, b) => {
//           const statusOrder = { Available: 0, Expired: 1, Deleted: 2 };
//           return statusOrder[a.food_status] - statusOrder[b.food_status];
//         })
//       );
//       setConfirmDialog({ open: false, foodId: null });
//     } catch (err) {
//       console.error("Failed to delete food:", err);
//     }
//   };

//   const handleFilterChange = (event) => {
//     setFilters({ ...filters, [event.target.name]: event.target.checked });
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const filteredFoods = myFoods.filter((food) => {
//     if (food.food_category === "Veg" && !filters.veg) return false;
//     if (food.food_category === "Contains Egg" && !filters.egg) return false;
//     if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
//     if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
//     return true;
//   });

//   return (
//     <Box sx={{ padding: 4, minHeight: "100vh" }}>
//       <Typography variant="h4" mb={3} fontWeight="bold">
//         My Providings
//       </Typography>

//       {/* Filters */}
//       <Box mb={3} display="flex" flexWrap="wrap" gap={3} alignItems="center">
//         <FormControlLabel
//           control={<Switch checked={filters.veg} onChange={handleFilterChange} name="veg" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'green' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'green' } }} />}
//           label={<img src={vegIcon} alt="Veg" width="20" height="20" />}
//         />
//         <FormControlLabel
//           control={<Switch checked={filters.egg} onChange={handleFilterChange} name="egg" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'yellow' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'yellow' } }} />}
//           label={<img src={eggIcon} alt="Egg" width="20" height="20" />}
//         />
//         <FormControlLabel
//           control={<Switch checked={filters.nonVeg} onChange={handleFilterChange} name="nonVeg" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'red' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'red' } }} />}
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
//         <Typography>No food found</Typography>
//       ) : (
//         <Grid2 container spacing={3} justifyContent="center">
//           {filteredFoods.map((food, index) => (
//             <Grid2 item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   maxWidth: 345,
//                   height: 510,
//                   backgroundColor: food.food_status === "Deleted" || food.food_status === "Expired" ? "#999" : "white",
//                   border: "6px solid rgba(134, 239, 172, 0.8)",
//                   justifyContent: "space-between",
//                   position: "relative",
//                 }}
//               >
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
//                 <Box sx={{ flex: 1, padding: 2 }}>
//                   <Box display="flex" alignItems="center" gap={1} mb={1}>
//                     <Box component="img" src={getCategoryIcon(food.food_category)} alt={food.food_category} sx={{ width: 20, height: 20 }} />
//                     <Typography variant="body1" sx={{ lineHeight: 1.2 }}>{food.description}</Typography>
//                   </Box>
//                   <Typography variant="body2" color="text.secondary">Serves: {food.quantity} people</Typography>
//                   <Typography variant="body2" color="text.secondary">Type: {food.food_type}</Typography>
//                   <Typography variant="body2" color="text.secondary">Expires on: {food.expiry_date}</Typography>
//                   <Typography variant="body2" color="text.secondary" mt={1}>Address: {food.address}</Typography>
//                   <Typography variant="body2" color="text.secondary" mt={1}>Status: {food.food_status}</Typography>
//                 </Box>
//                 {food.food_status === "Available" && (
//                   <Box display="flex" justifyContent="center" sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       color="error"
//                       onClick={() => setConfirmDialog({ open: true, foodId: food.food_id })}
//                     >
//                       Delete Food
//                     </Button>
//                   </Box>
//                 )}
//               </Card>
//             </Grid2>
//           ))}
//         </Grid2>
//       )}

//       <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, foodId: null })}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this food item?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button sx={{ backgroundColor: "green", color: "white", '&:hover': { backgroundColor: "darkgreen" } }} onClick={() => setConfirmDialog({ open: false, foodId: null })}>
//             Cancel
//           </Button>
//           <Button color="error" variant="contained" onClick={() => handleDelete(confirmDialog.foodId)}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MyProvidings;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import vegIcon from "../assets/veg.png";
import eggIcon from "../assets/egg.png";
import nonVegIcon from "../assets/nonveg.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const MyProvidings = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({ open: false, foodId: null });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filters, setFilters] = useState({
    veg: true,
    egg: true,
    nonVeg: true,
  });

  useEffect(() => {
    if (!user_id || !token || !token.startsWith("User")) {
      navigate("/error");
      return;
    }

    const fetchMyFood = async () => {
      try {
        const response = await axios.post("http://localhost:8080/viewMyFood", {
          user_id: user_id,
        });

        let foodList = response.data;
        if (!Array.isArray(foodList)) foodList = [foodList];

        const now = dayjs();
        console.log("Current Date (now):", now.format("DD-MM-YYYY HH:mm:ss"));

        const updatedFoodList = await Promise.all(
          foodList.map(async (food) => {
            const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");

            console.log(`Food ID: ${food.food_id}`);
            console.log("Raw Expiry Date:", food.expiry_date);
            console.log("Parsed Expiry Date:", expiry.format("DD-MM-YYYY HH:mm:ss"));
            console.log("Is Valid:", expiry.isValid());
            console.log("Is Expired:", expiry.isBefore(now));

            if (
                (food.food_status === "Available" || food.food_status === "Requested to Collect") &&
                expiry.isValid() &&
                expiry.isBefore(dayjs())
                ) {
              try {
                await axios.put(`http://localhost:8080/markExpired/${food.food_id}`);
                return { ...food, food_status: "Expired" };
              } catch (error) {
                console.error("Failed to mark as expired:", error);
                return food;
              }
            }
            return food;
          })
        );

        const sortedFoods = updatedFoodList.sort((a, b) => {
          const statusOrder = { Available: 0, Expired: 1, Deleted: 2 };
          return statusOrder[a.food_status] - statusOrder[b.food_status];
        });

        setMyFoods(sortedFoods);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch your food listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyFood(); // Initial load

    const interval = setInterval(() => {
      fetchMyFood(); // Repeat every 1 min
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate, token, user_id]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Veg": return vegIcon;
      case "Contains Egg": return eggIcon;
      case "Non-Veg": return nonVegIcon;
      default: return null;
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await axios.put(`http://localhost:8080/deleteFood/${foodId}`);
      setMyFoods((prevFoods) =>
        prevFoods.map((food) =>
          food.food_id === foodId ? { ...food, food_status: "Deleted" } : food
        ).sort((a, b) => {
          const statusOrder = { Available: 0, Expired: 1, Deleted: 2 };
          return statusOrder[a.food_status] - statusOrder[b.food_status];
        })
      );
      setConfirmDialog({ open: false, foodId: null });
    } catch (err) {
      console.error("Failed to delete food:", err);
    }
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredFoods = myFoods.filter((food) => {
    if (food.food_category === "Veg" && !filters.veg) return false;
    if (food.food_category === "Contains Egg" && !filters.egg) return false;
    if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
    if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
    return true;
  });

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Typography variant="h4" mb={3} fontWeight="bold" align="center">
        My Providings
      </Typography>

      {/* Filters */}
      <Box mb={3} display="flex" flexWrap="wrap" gap={3} alignItems="center">
        <FormControlLabel
          control={<Switch checked={filters.veg} onChange={handleFilterChange} name="veg" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'green' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'green' } }} />}
          label={<img src={vegIcon} alt="Veg" width="20" height="20" />}
        />
        <FormControlLabel
          control={<Switch checked={filters.egg} onChange={handleFilterChange} name="egg" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'yellow' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'yellow' } }} />}
          label={<img src={eggIcon} alt="Egg" width="20" height="20" />}
        />
        <FormControlLabel
          control={<Switch checked={filters.nonVeg} onChange={handleFilterChange} name="nonVeg" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'red' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'red' } }} />}
          label={<img src={nonVegIcon} alt="Non-Veg" width="20" height="20" />}
        />

        <FormControl
          sx={{
            minWidth: 200,
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'black',
              color: 'rgba(134, 239, 172, 0.8)',
              '& fieldset': { borderColor: 'rgba(134, 239, 172, 0.8)' },
              '&:hover fieldset': { borderColor: 'rgba(134, 239, 172, 0.8)' },
              '&.Mui-focused fieldset': { borderColor: 'rgba(134, 239, 172, 0.8)' },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(134, 239, 172, 0.8)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'rgba(134, 239, 172, 0.8)',
            },
          }}
        >
          <InputLabel id="category-filter-label">Filter by Type</InputLabel>
          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Filter by Type"
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'black',
                  color: 'rgba(134, 239, 172, 0.8)',
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
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredFoods.length === 0 ? (
        <Typography>No food found</Typography>
      ) : (
        <Grid2 container spacing={3} justifyContent="center">
          {filteredFoods.map((food, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 345,
                  height: 540,
                  backgroundColor: 
                  food.food_status === "Deleted" || food.food_status === "Expired" 
                    ? "#999" 
                    : food.food_status === "Collected" 
                      ? "#e0f2f1" 
                      : "white",

                  border: "6px solid rgba(134, 239, 172, 0.8)",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={food.food_image}
                  alt={food.description}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    filter: food.food_status !== "Available" && food.food_status !== "Requested to Collect" ? "grayscale(100%)" : "none",
                  }}
                />
                <Box sx={{ flex: 1, padding: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Box component="img" src={getCategoryIcon(food.food_category)} alt={food.food_category} sx={{ width: 20, height: 20 }} />
                    <Typography variant="body1" sx={{ lineHeight: 1.2 }}>{food.description}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">Serves: {food.posted_quantity} people</Typography>
                  <Typography variant="body2" color="text.secondary">Type: {food.food_type}</Typography>
                  <Typography variant="body2" color="text.secondary">Posted Date: {food.food_type}</Typography>
                  <Typography variant="body2" color="text.secondary">Expires on: {food.expiry_date}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>Address: {food.address}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>Status: {food.food_status}</Typography>
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
                </Box>
                {food.food_status === "Available" && (
                  <Box display="flex" justifyContent="center" sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => setConfirmDialog({ open: true, foodId: food.food_id })}
                    >
                      Delete Food
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, foodId: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this food item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: "green", color: "white", '&:hover': { backgroundColor: "darkgreen" } }} onClick={() => setConfirmDialog({ open: false, foodId: null })}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(confirmDialog.foodId)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyProvidings;
