// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//     return (
//         <div>
//             <header class=" body-font">
//                 <div class="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
//                     <a class="flex title-font font-medium items-center mb-4 md:mb-0">
//                         <Link to="/"> <img src="src\assets\meal.svg" alt="logo" className='w-10' /></Link>
//                         <Link to="/">  <span class="ml-1 text-xl font-semibold text-white">Aahara App</span></Link>


//                     </a>
//                     <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
//                         <a class="mr-5 hover:text-gray-900"><Link to={'/login'}>Login</Link></a>
//                         <a class="mr-5 hover:text-gray-900"><Link to={'/signup'}>Signup</Link> </a>
//                         {/* <a class="mr-5 hover:text-gray-900">Third Link</a>
//                         <a class="mr-5 hover:text-gray-900">Fourth Link</a> */}
//                     </nav>
//                     <Link to={'/login'}>
//                     <button class="inline-flex text-white items-center bg-[#08426a] border-0 py-1 px-3 focus:outline-none hover:bg-[#08426a] rounded text-base mt-4 md:mt-0"><Link to={"/bookcar"}><p className='pr-2 pl-2'>XYZ</p></Link>
//                     </button></Link>
//                 </div>
//             </header>
//         </div>
//     )
// }

// export default Navbar



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

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Login", path: "/login", textOnly: true },
    { text: "Signup", path: "/signup", textOnly: true } ,
    { text: "Admin", path: "/adminLogin", textOnly: true },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black", boxShadow: 2,borderBottom: "4px solid rgba(134, 239, 172, 0.8)" }}>
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
                  <Link to={item.path} style={{ textDecoration: "none", color: "rgba(134, 239, 172, 0.8)" }}>
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
            <ListItem button key={item.text} onClick={handleDrawerToggle} >
              <ListItemText>
                <Link
                  to={item.path}
                  style={{ color: "rgba(134, 239, 172, 0.8)" , textDecoration: "none" }}
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

export default NavBar;
