import { useState } from "react";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon"; // Import ListItemIcon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BarChartIcon from "@mui/icons-material/BarChart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

// Your component imports
import Customerlist from "./components/Customerlist";
import Trainerlist from "./components/Trainerlist";

function App() {
  // State variable to manage the open/close state of the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Function to handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    handleMenuClose();
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen} // Open the menu when clicked
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu component */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom", // Anchor menu to bottom of button
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose} // Close the menu when clicked outside
      >
        {/* Menu items */}
        <MenuItem
          onClick={() => handleNavigation("/customerlist")}
          component={Link}
          to="/customerlist"
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Customers
        </MenuItem>

        <MenuItem
          onClick={() => handleNavigation("/traininglist")}
          component={Link}
          to="/traininglist"
        >
          <ListItemIcon>
            <DirectionsRunIcon fontSize="small" />
          </ListItemIcon>
          Trainings
        </MenuItem>

        <MenuItem onClick={handleNavigation}>
          <ListItemIcon>
            <CalendarTodayIcon fontSize="small" />
          </ListItemIcon>
          Calendar
        </MenuItem>

        <MenuItem onClick={handleNavigation}>
          <ListItemIcon>
            <BarChartIcon fontSize="small" />
          </ListItemIcon>
          Statistics
        </MenuItem>
      </Menu>

      <Router>
        <Routes>
          <Route path="/customerlist" element={<Customerlist />} />
          <Route path="/traininglist" element={<Trainerlist />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
