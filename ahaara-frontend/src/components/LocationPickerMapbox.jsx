// LocationPickerMapbox.jsx
// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";
// import { Box, TextField, Button, InputAdornment } from "@mui/material";
// import { Search, MyLocation } from "@mui/icons-material";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZGFzYXJpLWxhbGl0aCIsImEiOiJjbThycHBrMHowbjhyMm5wbGI1YWUxZHh0In0.W23Lxwk9xLXzTwQsIAy4cg";

// const LocationPickerMapbox = ({ onSelectLocation }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);

//   const [lng, setLng] = useState(78.9629);
//   const [lat, setLat] = useState(20.5937);
//   const [zoom, setZoom] = useState(4);
//   const [marker, setMarker] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     if (map.current) return; // initialize only once

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.on("click", (e) => {
//       const newLng = e.lngLat.lng;
//       const newLat = e.lngLat.lat;

//       setLng(newLng);
//       setLat(newLat);

//       if (marker) marker.remove();

//       const newMarker = new mapboxgl.Marker().setLngLat([newLng, newLat]).addTo(map.current);
//       setMarker(newMarker);

//       axios
//         .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${newLng},${newLat}.json`, {
//           params: {
//             access_token: mapboxgl.accessToken,
//           },
//         })
//         .then((res) => {
//           const place = res.data.features[0]?.place_name || "Dropped pin";
//           setAddress(place);
//           onSelectLocation({ lat: newLat, lng: newLng, address: place });
//         });
//     });
//   }, [marker, onSelectLocation]);

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
//         {
//           params: {
//             access_token: mapboxgl.accessToken,
//             limit: 1,
//           },
//         }
//       );

//       const [newLng, newLat] = res.data.features[0].center;
//       const place = res.data.features[0].place_name;

//       map.current.flyTo({ center: [newLng, newLat], zoom: 14 });

//       if (marker) marker.remove();
//       const newMarker = new mapboxgl.Marker().setLngLat([newLng, newLat]).addTo(map.current);
//       setMarker(newMarker);

//       setLng(newLng);
//       setLat(newLat);
//       setAddress(place);
//       onSelectLocation({ lat: newLat, lng: newLng, address: place });
//     } catch (err) {
//       alert("Location not found");
//     }
//   };

//   const useCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const newLat = pos.coords.latitude;
//       const newLng = pos.coords.longitude;

//       map.current.flyTo({ center: [newLng, newLat], zoom: 14 });

//       if (marker) marker.remove();
//       const newMarker = new mapboxgl.Marker().setLngLat([newLng, newLat]).addTo(map.current);
//       setMarker(newMarker);

//       axios
//         .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${newLng},${newLat}.json`, {
//           params: {
//             access_token: mapboxgl.accessToken,
//           },
//         })
//         .then((res) => {
//           const place = res.data.features[0]?.place_name || "Current location";
//           setAddress(place);
//           onSelectLocation({ lat: newLat, lng: newLng, address: place });
//         });
//     });
//   };

//   return (
//     <Box>
//       <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
//         <TextField
//           label="Search Address"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           fullWidth
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Button onClick={handleSearch} variant="outlined">
//           Search
//         </Button>
//         <Button onClick={useCurrentLocation} startIcon={<MyLocation />}>
//           Use Current
//         </Button>
//       </Box>

//       <div ref={mapContainer} style={{ height: "300px", width: "100%", borderRadius: 8 }} />

//       {address && (
//         <Box mt={2}>
//           <strong>Address:</strong> {address}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default LocationPickerMapbox;


import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Button,
} from "@mui/material";
import { Search, MyLocation } from "@mui/icons-material";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFzYXJpLWxhbGl0aCIsImEiOiJjbThycHBrMHowbjhyMm5wbGI1YWUxZHh0In0.W23Lxwk9xLXzTwQsIAy4cg";

const LocationPickerMapbox = ({ onSelectLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(78.9629);
  const [lat, setLat] = useState(20.5937);
  const [zoom] = useState(4);
  // const [marker, setMarker] = useState(null);
  const markerRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", handleMapClick);
  }, []);

  const handleMapClick = (e) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    updateMarkerAndLocation(lat, lng);
  };

  const updateMarkerAndLocation = async (lat, lng) => {
    // Remove previous marker if exists
    if (markerRef.current) {
      markerRef.current.remove();
    }
  
    // Create and store new marker
    const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    markerRef.current = newMarker;
  
    setLat(lat);
    setLng(lng);
  
    // Get address using reverse geocoding
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
      {
        params: { access_token: mapboxgl.accessToken },
      }
    );
  
    const label = res.data.features[0]?.place_name || "Dropped pin";
    setAddress(label);
    onSelectLocation({ lat, lng, address: label });
  };
  

  const handleSearchChange = async (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            autocomplete: true,
            limit: 5,
          },
        }
      );
      setSuggestions(res.data.features);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (feature) => {
    const [lng, lat] = feature.center;
    const label = feature.place_name;

    map.current.flyTo({ center: [lng, lat], zoom: 14 });
    updateMarkerAndLocation(lat, lng);
    setSearchText(label);
    setSuggestions([]);
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      map.current.flyTo({ center: [lng, lat], zoom: 14 });
      updateMarkerAndLocation(lat, lng);
    });
  };

  return (
    <Box>
      <Box sx={{ position: "relative", mb: 1 }}>
        <TextField
          fullWidth
          label="Search Address"
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {suggestions.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              zIndex: 10,
              width: "100%",
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            <List dense>
              {suggestions.map((item, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton onClick={() => handleSuggestionClick(item)}>
                    {item.place_name}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      <Button onClick={useCurrentLocation} startIcon={<MyLocation />} sx={{ mb: 2 }}>
        Use Current Location
      </Button>

      <div
        ref={mapContainer}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: 8,
        }}
      />

      {address && (
        <Box mt={2}>
          <strong>Selected Address:</strong> {address}
        </Box>
      )}
    </Box>
  );
};

export default LocationPickerMapbox;
