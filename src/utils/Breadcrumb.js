import { Box, IconButton } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ handleDrawerOpen, open }) => {
  //   console.log(pathname);

  const { pathname } = useLocation();

  const pathName = (paths, index) => {
    // console.log(
    //   paths
    //     .filter((path, pathIndex) => pathIndex !== 0 && pathIndex <= index)
    //     .join("/")
    // );
    return paths
      .filter((path, pathIndex) => pathIndex !== 0 && pathIndex <= index)
      .join("/");
  };
  const func = () => {
    const paths = pathname.split("/");
    // console.log(paths);
    return paths.map(
      (path, index) =>
        index !== 0 && (
          <Link
            style={{
              textDecoration: "none",
              color: index === paths.length - 1 ? "#49C5B6" : "white",
            }}
            to={`/${pathName(paths, index)}`}
          >{`${path?.charAt(0)?.toUpperCase() + path.slice(1).toLowerCase()} ${
            index !== paths.length - 1 ? ">" : ""
          } `}</Link>
        )
    );
  };
  return (
    <Box
      component="div"
      sx={{
        padding: "10px 10px 0px 10px",
        // backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: !open ? "space-between" : "flex-end",
      }}
    >
      {!open && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            // color: "white",
            color: "black",
            padding: "10px 10px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* <p
        style={{
          fontSize: "15px",
          paddingLeft: "10px",
          // padding: "5px 10px",
          // backgroundColor: "black",
        }}
      >
        {func()}
      </p> */}
      <Profile />
    </Box>
  );
};

export default Breadcrumb;
