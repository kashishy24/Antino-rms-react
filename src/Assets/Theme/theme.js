import React from "react";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      // main: "#49C5B6",
      // main: "#1F3F49",
    },
    background: {
      default: "#F1F1F1",
    },
    fontFamily: "'Kanit', sans-serif",
  },
  button: {
    "&:hover": {
      backgroundColor: "black !important",
    },
  },
  text: {
    secondary: {
      main: "#808080",
    },
  },
  shape: {
    borderRadius: 5,
  },
});

export default theme;
