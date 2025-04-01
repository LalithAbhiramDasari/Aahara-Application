import React, { useEffect, useState } from "react";
import { Avatar, Typography, Box } from "@mui/material";
import axios from "axios";

const FoodPosterDetails = ({ userId, PostedDate}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8080/userdashboard", null, {
        params: { user_id: userId },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) =>
        console.error("Error fetching user details in FoodPosterDetails:", err)
      );
  }, [userId]);

  if (!user) return null;

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar
        src={user.profile_pic || ""}
        sx={{ width: 50, height: 50, mr: 2 }}
      >
        {!user.profile_pic && (
          <Typography variant="caption">{user.name[0]}</Typography>
        )}
      </Avatar>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="caption" display="block">
          {user.email}
        </Typography>
        <Typography variant="caption" display="block">
          Phone: {user.phone}
        </Typography>
        <Typography variant="caption" display="block">
          Posted on: {PostedDate}
        </Typography>
      </Box>
    </Box>
  );
};

export default FoodPosterDetails;
