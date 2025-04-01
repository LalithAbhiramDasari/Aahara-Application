
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   Button,
//   useMediaQuery,
//   Divider,
// } from "@mui/material";
// import {
//   Fastfood,
//   PeopleAlt,
//   Image,
//   CalendarMonth,
//   Home,
// } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import LocationPickerMapbox from "./LocationPickerMapbox";

// const AddFood = () => {
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const user_id = sessionStorage.getItem("user_id");
//   const token = sessionStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     description: "",
//     quantity: "",
//     expiry_date: "",
//     house_number: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [location, setLocation] = useState({ lat: "", lng: "", address: "" });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!user_id || !token || !token.startsWith("User")) {
//       navigate("/error");
//     }
//   }, [user_id, token, navigate]);

//   const validateField = (name, value) => {
//     let error = "";

//     if (name === "description") {
//       if (!value.trim()) error = "Description is required";
//     } else if (name === "quantity") {
//       if (!value || value < 1) error = "Quantity must be at least 1";
//     } else if (name === "expiry_date") {
//       const now = new Date();
//       const selected = new Date(value);
//       if (!value || selected <= now) {
//         error = "Please select a future date and time";
//       }
//     } else if (name === "house_number") {
//       if (!value.trim()) error = "House/Door Number is required";
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const validateForm = () => {
//     const validations = [
//       validateField("description", formData.description),
//       validateField("quantity", formData.quantity),
//       validateField("expiry_date", formData.expiry_date),
//       validateField("house_number", formData.house_number),
//     ];

//     if (!location.lat || !location.lng || !location.address) {
//       setErrors((prev) => ({
//         ...prev,
//         location: "Please select a location on the map",
//       }));
//       validations.push("location");
//     }

//     return validations.every((v) => v === "");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     if (!imageFile) {
//       setMessage("Please upload an image.");
//       return;
//     }

//     try {
//       const payload = new FormData();
//       payload.append("description", formData.description);
//       payload.append("quantity", formData.quantity);
//       payload.append("user_id", user_id);

//       // ✅ Format to ISO 8601 that Spring understands: yyyy-MM-dd'T'HH:mm:ss
//       const formattedExpiry = dayjs(formData.expiry_date).format("YYYY-MM-DDTHH:mm:ss");
//       payload.append("expiry_date", formattedExpiry);

//       payload.append("latitude", location.lat);
//       payload.append("longitude", location.lng);
    //   payload.append("address", `${formData.house_number}, ${location.address}`);
//       payload.append("image", imageFile);

//       const response = await axios.post("http://localhost:8080/postFood", payload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.status === 200) {
//         const saved = response.data;
//         setMessage(`Food submitted successfully! Food ID: ${saved.fid}`);
//         setFormData({ description: "", quantity: "", expiry_date: "", house_number: "" });
//         setLocation({ lat: "", lng: "", address: "" });
//         setImageFile(null);
//         setImagePreview(null);
//         setErrors({});
//       }
//     } catch (err) {
//       setMessage("Error submitting food. Please try again.");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%", width: "100%", padding: isMobile ? 2 : 4 }}>
//       <Paper sx={{ padding: 4, borderRadius: 3, width: isMobile ? "100%" : "900px", backgroundColor: "#e3f2fd", boxShadow: 3 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
//           PROVIDE FOOD
//         </Typography>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
//             <TextField
//               label="Food Description"
//               name="description"
//               multiline
//               minRows={3}
//               variant="outlined"
//               value={formData.description}
//               onChange={handleChange}
//               fullWidth
//               required
//               error={!!errors.description}
//               helperText={errors.description}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><Fastfood /></InputAdornment>,
//               }}
//             />

//             <TextField
//               label="Serves (No. of People)"
//               name="quantity"
//               type="number"
//               variant="outlined"
//               value={formData.quantity}
//               onChange={handleChange}
//               fullWidth
//               required
//               error={!!errors.quantity}
//               helperText={errors.quantity}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><PeopleAlt /></InputAdornment>,
//               }}
//             />

//             <TextField
//               label="Expiry Date & Time"
//               name="expiry_date"
//               type="datetime-local"
//               variant="outlined"
//               value={formData.expiry_date}
//               onChange={handleChange}
//               fullWidth
//               required
//               error={!!errors.expiry_date}
//               helperText={errors.expiry_date}
//               InputLabelProps={{ shrink: true }}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><CalendarMonth /></InputAdornment>,
//               }}
//             />

//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<Image />}
//               sx={{
//                 color: "green",
//                 borderColor: "green",
//                 "&:hover": { borderColor: "darkgreen", color: "darkgreen" },
//               }}
//             >
//               Upload Image
//               <input
//                 type="file"
//                 name="image"
//                 hidden
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </Button>
//           </Box>

//           {imagePreview && (
//             <Box mt={4} display="flex" justifyContent="center">
//               <img
//                 src={imagePreview}
//                 alt="Food Preview"
//                 style={{ width: "50%", maxHeight: "50%", objectFit: "cover", borderRadius: 8 }}
//               />
//             </Box>
//           )}

//           <Divider sx={{ my: 3 }} />

//           <LocationPickerMapbox onSelectLocation={(loc) => setLocation(loc)} />
//           {errors.location && (
//             <Typography color="error" mt={1}>
//               {errors.location}
//             </Typography>
//           )}

//           <Divider sx={{ my: 3 }} />

//           <TextField
//             label="House/Door Number"
//             name="house_number"
//             variant="outlined"
//             value={formData.house_number}
//             onChange={handleChange}
//             fullWidth
//             required
//             error={!!errors.house_number}
//             helperText={errors.house_number}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Home />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 3,
//               py: 1.5,
//               fontWeight: "bold",
//               backgroundColor: "green",
//               "&:hover": { backgroundColor: "darkgreen" },
//             }}
//           >
//             Submit Food
//           </Button>
//         </form>

//         {message && (
//           <Typography color="primary" sx={{ mt: 2 }}>
//             {message}
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default AddFood;




import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Fastfood,
  PeopleAlt,
  Image,
  CalendarMonth,
  Home,
  RestaurantMenu,
  Category,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import LocationPickerMapbox from "./LocationPickerMapbox";

const AddFood = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    expiry_date: "",
    house_number: "",
    food_type: "",
    food_category: "",
  });

  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState({ lat: "", lng: "", address: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user_id || !token || !token.startsWith("User")) {
      navigate("/error");
    }
  }, [user_id, token, navigate]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "description") {
      if (!value.trim()) error = "Description is required";
    } else if (name === "quantity") {
      if (!value || value < 1) error = "Quantity must be at least 1";
    } else if (name === "expiry_date") {
      const now = new Date();
      const selected = new Date(value);
      if (!value || selected <= now) {
        error = "Please select a future date and time";
      }
    } else if (name === "house_number") {
      if (!value.trim()) error = "House/Door Number is required";
    } else if (name === "food_type") {
      if (!value) error = "Food type is required";
    } else if (name === "food_category") {
      if (!value) error = "Food category is required";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const fieldsToValidate = [
      "description",
      "quantity",
      "expiry_date",
      "house_number",
      "food_type",
      "food_category",
    ];

    const validations = fieldsToValidate.map((field) =>
      validateField(field, formData[field])
    );

    if (!location.lat || !location.lng || !location.address) {
      setErrors((prev) => ({
        ...prev,
        location: "Please select a location on the map",
      }));
      validations.push("location");
    }

    return validations.every((v) => v === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!imageFile) {
      setMessage("Please upload an image.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("description", formData.description);
      payload.append("quantity", formData.quantity);
      payload.append("posted_quantity", formData.quantity);
      payload.append("user_id", user_id);
      payload.append(
        "expiry_date",
        dayjs(formData.expiry_date).format("YYYY-MM-DDTHH:mm:ss")
      );
      payload.append("food_type", formData.food_type);
      payload.append("food_category", formData.food_category);
      payload.append("latitude", location.lat);
      payload.append("longitude", location.lng);
      payload.append("address", `${formData.house_number}, ${location.address}`);
      payload.append("image", imageFile);

      const response = await axios.post("http://localhost:8080/postFood", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        navigate("/myProvidings");
      }
    } catch (err) {
      setMessage("Error submitting food. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%", width: "100%", padding: isMobile ? 2 : 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 3, width: isMobile ? "100%" : "900px", backgroundColor: "#e3f2fd", boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
          PROVIDE FOOD
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Food Description"
              name="description"
              multiline
              minRows={3}
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.description}
              helperText={errors.description}
              InputProps={{ startAdornment: <InputAdornment position="start"><Fastfood /></InputAdornment> }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Serves (No. of People)"
              name="quantity"
              type="number"
              variant="outlined"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.quantity}
              helperText={errors.quantity}
              InputProps={{ startAdornment: <InputAdornment position="start"><PeopleAlt /></InputAdornment> }}
            />

            <TextField
              label="Expiry Date & Time"
              name="expiry_date"
              type="datetime-local"
              variant="outlined"
              value={formData.expiry_date}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.expiry_date}
              helperText={errors.expiry_date}
              InputLabelProps={{ shrink: true }}
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonth /></InputAdornment> }}
            />

            <FormControl fullWidth required error={!!errors.food_type}>
              <InputLabel id="food-type-label">Food Type</InputLabel>
              <Select
                labelId="food-type-label"
                label="Food Type"
                name="food_type"
                value={formData.food_type}
                onChange={handleChange}
              >
                <MenuItem value="Cooked food (meals)">Cooked food (meals)</MenuItem>
                <MenuItem value="Raw Fruits/Vegetables">Raw Fruits/Vegetables</MenuItem>
                <MenuItem value="Packed Food/Beverage">Packed Food/Beverage</MenuItem>
                <MenuItem value="Bakery">Bakery</MenuItem>
                <MenuItem value="Dairy Products">Dairy Products</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              <Typography variant="caption" color="error">{errors.food_type}</Typography>
            </FormControl>

            <FormControl fullWidth required error={!!errors.food_category}>
              <InputLabel id="food-category-label">Food Category</InputLabel>
              <Select
                labelId="food-category-label"
                label="Food Category"
                name="food_category"
                value={formData.food_category}
                onChange={handleChange}
              >
                <MenuItem value="Veg">Veg</MenuItem>
                <MenuItem value="Contains Egg">Contains Egg</MenuItem>
                <MenuItem value="Non-Veg">Non-Veg</MenuItem>
              </Select>
              <Typography variant="caption" color="error">{errors.food_category}</Typography>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<Image />}
              sx={{
                color: "green",
                borderColor: "green",
                "&:hover": { borderColor: "darkgreen", color: "darkgreen" },
                width: "fit-content"
              }}
            >
              Upload Food Image
              <input
                type="file"
                name="image"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>

          {imagePreview && (
            <Box mt={4} display="flex" justifyContent="center">
              <img
                src={imagePreview}
                alt="Food Preview"
                style={{ width: "50%", maxHeight: "50%", objectFit: "cover", borderRadius: 8 }}
              />
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <LocationPickerMapbox onSelectLocation={(loc) => setLocation(loc)} />
          {errors.location && (
            <Typography color="error" mt={1}>{errors.location}</Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <TextField
            label="House/Door Number"
            name="house_number"
            variant="outlined"
            value={formData.house_number}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.house_number}
            helperText={errors.house_number}
            InputProps={{ startAdornment: <InputAdornment position="start"><Home /></InputAdornment> }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
          >
            Submit Food
          </Button>
        </form>

        {message && (
          <Typography color="primary" sx={{ mt: 2 }}>{message}</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AddFood;