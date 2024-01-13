import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import "../../Assets/CSS/Dashboard/dashboard.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import LogoutIcon from "@mui/icons-material/Logout";
import Breadcrumb from "../../utils/Breadcrumb";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  teamLeadListItems,
  projectManagerListItems,
} from "./consts/drawerListItems";
import antino_logo from "../../Assets/Images/antino_logo.png";
import DashboardItem from "./DashboardItem";
import { makeStyles } from "@mui/styles";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3) ,
    padding: `0px ${theme.spacing(3)} 0px ${theme.spacing(3)}`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState("");
  // console.log(localStorage,'>>>>>>>>>>>?');
  React.useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const logoutHandler = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };

  console.log('projectManagerListItems',projectManagerListItems);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* <AppBar
          position="fixed"
          open={open}
          style={{ height: "40px", justifyContent: "center" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <div className="logo">
                <img src={antino_logo} height={20}></img>
                Antino RMS
              </div>
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              color: "black",
              // backgroundColor: "white"
              background: "white",
            },
          }}
          variant="persistent"
          // variant="temporary"
          // onEscapeKeyDown={handleDrawerClose}
          // onBackdropClick={handleDrawerClose}
          anchor="left"
          open={open}
        >
          <DrawerHeader
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h6" noWrap component="div">
              <div className="logo">
                <img src={antino_logo} height={25}></img>
                Antino RMS
              </div>
            </Typography>
            {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton> */}
            <KeyboardArrowRightIcon
              onClick={handleDrawerClose}
              sx={{ cursor: "pointer" }}
            />
          </DrawerHeader>
          <Divider />
          <List>
            {localStorage.getItem("designation") === "AVP" || localStorage.getItem("designation") === "VP"
              ? teamLeadListItems.map((items, index) => (
                  <ListItemButton
                    key={items.id}
                    onClick={() => {
                      navigate(items.route);
                      // handleDrawerClose();
                      setSelected(items.route);
                    }}
                    sx={{
                      "&:hover": {
                        background: selected === items?.route && "black",
                      },
                      background: selected === items?.route && "black",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selected === items?.route ? "white" : "#000000",
                      }}
                    >
                      {items.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={items.label}
                      sx={{
                        color: selected === items?.route ? "white" : "#000000",
                      }}
                    />
                  </ListItemButton>
                ))
              : projectManagerListItems.map((items, index) => (
                  <ListItemButton
                    key={items.id}
                    sx={{
                      "&:hover": {
                        background: selected === items?.route && "black",
                      },
                      background: selected === items?.route && "black",
                    }}
                    onClick={() => {
                      navigate(items.route);
                      setSelected(items?.route);
                      // handleDrawerClose();
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selected === items?.route ? "white" : "#000000",
                      }}
                    >
                      {items.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={items.label}
                      sx={{
                        color: selected === items?.route ? "white" : "#000000",
                      }}
                    />
                  </ListItemButton>
                ))}
          </List>

          {/* <Divider />
          <List>
            <ListItem disablePadding sx={{ color: "#000000" }}>
              <ListItemButton onClick={logoutHandler}>
                <ListItemIcon sx={{ color: "#000000" }}>
                  <LogoutIcon />
                </ListItemIcon>{" "}
                Logout
                <ListItemText />
              </ListItemButton>
            </ListItem>
          </List> */}
        </Drawer>
        <Main open={open}>
          <Breadcrumb handleDrawerOpen={handleDrawerOpen} open={open} />
          {pathname === "/dashboard" && <DashboardItem />}
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
