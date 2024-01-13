import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          {localStorage
            .getItem("name")
            ?.split(" ")
            .map((ele) => ele.slice(0, 1).toUpperCase() + ele.slice(1))
            .join(" ")}
        </MenuItem>
        <Divider />
        <MenuItem>Email - {localStorage.getItem("email")}</MenuItem>
        <MenuItem>Role - {localStorage.getItem("designation")}</MenuItem>
        <Divider />
        <ListItemButton onClick={logoutHandler}>
          <ListItemIcon sx={{ color: "#000000" }}>
            <LogoutIcon />
          </ListItemIcon>{" "}
          Logout
          <ListItemText />
        </ListItemButton>
      </Menu>
    </div>
  );
}
