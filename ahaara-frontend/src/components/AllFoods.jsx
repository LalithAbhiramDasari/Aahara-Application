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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import vegIcon from "../assets/veg.png";
import eggIcon from "../assets/egg.png";
import nonVegIcon from "../assets/nonveg.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FoodPosterDetails from "./FoodPosterDetails";

dayjs.extend(customParseFormat);

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userMap, setUserMap] = useState({});
  const [filters, setFilters] = useState({ veg: true, egg: true, nonVeg: true });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const admin_id = sessionStorage.getItem("admin_id");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!admin_id || !token || !token.startsWith("Admin")) {
      navigate("/error");
      return;
  }
    fetchAllFoods();
  }, []);

  const fetchAllFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8080/viewAllFood");
      const now = dayjs();
      
      const updatedFoods = await Promise.all(
        response.data.map(async (food) => {
          const expiry = dayjs(food.expiry_date, "DD-MM-YYYY HH:mm:ss");
          if (
            (food.food_status === "Available" || food.food_status === "Requested to Collect") &&
            expiry.isValid() &&
            expiry.isBefore(now)
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
  
      const sortedFoods = updatedFoods.sort((a, b) => {
        const order = { Available: 0, Collected: 1, Deleted: 2, Expired: 2 };
        return order[a.food_status] - order[b.food_status];
      });
      setFoods(sortedFoods);
  
      // Fetch user info
      const uniqueUserIds = [...new Set(sortedFoods.map(food => food.user_id))];
      const userMapTemp = {};
      await Promise.all(
        uniqueUserIds.map(async (id) => {
          try {
            const res = await axios.post("http://localhost:8080/userdashboard", null, {
              params: { user_id: id },
            });
            userMapTemp[id] = res.data;
          } catch (err) {
            console.error(`Failed to fetch user ${id}`);
          }
        })
      );
      setUserMap(userMapTemp);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch foods.");
    } finally {
      setLoading(false);
    }
  };
  

  const filteredFoods = foods
    .filter((food) => {
      if (food.food_category === "Veg" && !filters.veg) return false;
      if (food.food_category === "Contains Egg" && !filters.egg) return false;
      if (food.food_category === "Non-Veg" && !filters.nonVeg) return false;
      if (selectedCategory !== "All" && food.food_type !== selectedCategory) return false;
      return true;
    })
    .filter((food) => {
      const term = searchTerm.toLowerCase();
      const user = userMap[food.user_id] || {};
      
      return (
        food.fid?.toString().toLowerCase().includes(term) ||
        food.description?.toLowerCase().includes(term) ||
        user.uid?.toLowerCase().includes(term) ||
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
      );
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

  const getCardBgColor = (status) => {
    switch (status) {
      case "Collected":
        return "#e0f2f1";
      case "Deleted":
      case "Expired":
        return "#999";
      default:
        return "white";
    }
  };

  return (
    <Box sx={{ padding: 4, minHeight: "100vh", marginTop: 8 }}>
      <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
        All Foods
      </Typography>

      {/* Search Bar */}
      <Box mb={3} display="flex" justifyContent="center">
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 500,
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
        />
      </Box>

      {/* Filters */}
      <Box mb={3} display="flex" flexWrap="wrap" gap={3} alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={filters.veg}
              onChange={(e) => setFilters({ ...filters, veg: e.target.checked })}
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

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : filteredFoods.length === 0 ? (
        <Typography align="center">No food items found.</Typography>
      ) : (
        <Grid2 container spacing={3} justifyContent="center">
          {filteredFoods.map((food, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: 400,
                  height: 620,
                  border: "6px solid rgba(134, 239, 172, 0.8)",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: getCardBgColor(food.food_status),
                }}
              >
                <Box sx={{ px: 2, pt: 2 }}>
                  <FoodPosterDetails
                    userId={food.user_id}
                    uid={food.uid || userMap[food.user_id]?.uid}
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
                    filter: food.food_status !== "Available" ? "grayscale(100%)" : "none",
                  }}
                />
                <CardContent>
                  <Typography variant="caption" color="text.secondary" mb={0.5}>
                    FID: {food.fid} | UID: {userMap[food.user_id]?.uid}
                  </Typography>
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
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default AllFoods;
