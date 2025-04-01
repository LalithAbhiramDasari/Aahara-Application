import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/meal.svg";

const LoginPageNavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    // { text: "Login", path: "/login", buttonStyle: { backgroundColor: "white", color: "black" } },
    // { text: "Signup", path: "/signup", buttonStyle: { backgroundColor: "white", color: "black" } },
    // { text: "Admin", path: "/adminLogin", textOnly: true },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black", boxShadow: 2 ,borderBottom: "4px solid rgba(134, 239, 172, 0.8)"}}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo & Brand Name */}
          <Box display="flex" alignItems="center">
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: "50px", height: "50px" }} />
            </Link>
            <Typography
              variant="h6"
              sx={{ ml: 1, fontWeight: "bold" }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Aahara
              </Link>
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              item.textOnly ? (
                <Typography key={item.text} sx={{ color: "white" }}>
                  <Link to={item.path} style={{ textDecoration: "none", color: "white" }}>
                    {item.text}
                  </Link>
                </Typography>
              ) : (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  variant="contained"
                  sx={{ ...item.buttonStyle, "&:hover": { opacity: 0.8 } }}
                >
                  {item.text}
                </Button>
              )
            ))}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} sx={{ "& .MuiDrawer-paper": { backgroundColor: "black" } }}>
        <List sx={{ width: 250 }}>
          {navItems.map((item) => (
            <ListItem button key={item.text} onClick={handleDrawerToggle}>
              <ListItemText>
                <Link
                  to={item.path}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {item.text}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default LoginPageNavBar;
