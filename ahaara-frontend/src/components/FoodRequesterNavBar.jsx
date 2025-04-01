
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import logo from "../assets/meal.svg";

const FoodRequesterNavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");

  const [user, setUser] = useState({
    user_id: "",
    name: "",
    phone: "",
    profile_pic: "",
    email: "",
  });

  // Token validation
  useEffect(() => {
    if (!token || !token.startsWith("User")|| !id ) {
      navigate("/error");
    } else {
      fetchUserDetails();
    }
  }, [token, navigate]);

  // Fetch user details
  async function fetchUserDetails() {
    try {
      const response = await axios.post("http://localhost:8080/userdashboard", null, {
        params: { user_id: id }
      });

      if (response.data) {
        setUser({ ...response.data });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Profile dropdown handlers
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  // Navigation items
  const desktopNavItems = [
    { text: "Request Food", path: "/otherUserFood" },
    { text: "My Requests", path: "/myRequests" },
  ];

  const mobileNavItems = [

    { text: "Request Food", path: "/otherUserFood" },
    { text: "My Requests", path: "/myRequests" },
    { text: "My Profile", path: "/myprofile" },
    { text: "Logout", path: "/" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",
          boxShadow: 2,
          borderBottom: "4px solid rgba(134, 239, 172, 0.8)",
        }}
      >
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Mobile Menu Button */}
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" }, color: "rgba(134, 239, 172, 0.8)" }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo & Brand Name */}
            <Box display="flex" alignItems="center">
              <Link to="/UserMain" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <img src={logo} alt="logo" style={{ width: "50px", height: "50px" }} />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold", color: "white" }}>
                  Aahara
                </Typography>
              </Link>
            </Box>

            {/* Desktop Navigation Items */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
              {desktopNavItems.map((item) => (
                <Typography key={item.text} sx={{ color: "rgba(134, 239, 172, 0.8)" }}>
                  <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
                    {item.text}
                  </Link>
                </Typography>
              ))}

              {/* Profile icon with dropdown */}
              <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                {user.profile_pic ? (
                  <img
                    src={user.profile_pic}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <AccountCircle sx={{ fontSize: 40, color: "rgba(134, 239, 172, 0.8)" }} />
                )}
              </IconButton>

              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ "& .MuiPaper-root": { backgroundColor: "black" } }}
              >
                <MenuItem
                  onClick={() => {
                    handleProfileMenuClose();
                    navigate("/myprofile");
                  }}
                  sx={{ color: "rgba(134, 239, 172, 0.8)" }}
                >
                  My Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileMenuClose();
                    navigate("/");
                  }}
                  sx={{ color: "rgba(134, 239, 172, 0.8)" }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Drawer Menu */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ "& .MuiDrawer-paper": { backgroundColor: "black" } }}
        >
          <List sx={{ width: 250 }}>
            {mobileNavItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  handleDrawerToggle();
                  navigate(item.path);
                }}
              >
                <ListItemText
                  primary={<Typography sx={{ color: "rgba(134, 239, 172, 0.8)" }}>{item.text}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>

      {/* Add a placeholder toolbar to offset the fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default FoodRequesterNavBar;
