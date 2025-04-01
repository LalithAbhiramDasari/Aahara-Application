// import React, { useEffect } from "react";
// import { Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const UserMain = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user_id = sessionStorage.getItem("user_id");
//     const token = sessionStorage.getItem("token");

//     if (!user_id || !token || !token.startsWith("User")) {
//       navigate("/error");
//     }
//   }, [navigate]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         gap: 2,
//       }}
//     >
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ width: "200px", padding: 1.5, fontWeight: "bold" }}
//         onClick={() => navigate("/addFood")}
//       >
//         Provide Food
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         sx={{ width: "200px", padding: 1.5, fontWeight: "bold" }}
//         onClick={() => navigate("/otherUserFood")}
//       >
//         Request Food
//       </Button>
//     </Box>
//   );
// };

// export default UserMain;





import React, { useEffect } from "react";
import { Button, Box, Typography, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const UserMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");

    if (!user_id || !token || !token.startsWith("User")) {
      navigate("/error");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, black, rgba(134, 239, 172, 0.8))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 6,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          maxWidth: 450,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <VolunteerActivismIcon sx={{ fontSize: 60, color: "#4caf50" }} />
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
          Welcome to Aahara
        </Typography>

        <Typography variant="body1" textAlign="center" color="text.secondary">
          Aahara is a community-driven platform that connects people with surplus food to those who need it.
          Reduce food waste and make a real difference—one meal at a time.
        </Typography>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Typography variant="subtitle1" color="success.main" textAlign="center">
          🌍 Over 5,000 meals shared and counting!
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<RestaurantIcon />}
          sx={{
            width: "100%",
            padding: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2,
          }}
          onClick={() => navigate("/addFood")}
        >
          Provide Food
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<EmojiFoodBeverageIcon />}
          sx={{
            width: "100%",
            padding: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2,
          }}
          onClick={() => navigate("/otherUserFood")}
        >
          Request Food
        </Button>
      </Paper>
    </Box>
  );
};

export default UserMain;
