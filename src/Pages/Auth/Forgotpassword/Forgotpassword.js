import React from "react";
import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import background from "../../../Assets/Images/background/1.jpg";
import logo from "../../../Assets/Images/background/logo.png";
import "../../../Assets/CSS/Auth/Forgotpassword.css";
import { Link } from "react-router-dom";
import signupschema from "../Register/SignupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupschema),
  });

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Grid container sx={{ overflow: "hidden" }}>
        <Grid item md={4} xs={12} className="logininputcontainer">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { marginTop: "1rem", width: "100%" },
              width: "70%",
            }}
            noValidate
            autoComplete="off"
          >
            <Box>
              <img src={logo} alt="company logo" />
            </Box>

            <TextField
              required
              id="outlined-required"
              label="Old Password"
              size="small"
            />

            <TextField
              required
              id="outlined-required"
              label="New Password"
              size="small"
              type="password"
            />

            <TextField
              required
              id="outlined-required"
              label="Confirm New Password"
              size="small"
              type="password"
            />

            <Button className="forgotbutton" variant="contained">
              Reset Password
            </Button>

            <Typography
              variant="body"
              display="block"
              gutterBottom
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              know your password?{" "}
              <Link to="/" style={{ color: "#49C5B6" }}>
                {" "}
                Login{" "}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8}>
          <img
            src={background}
            className="sidebackground"
            alt="sidebackground"
          />
        </Grid>
      </Grid>
    </>
  );
}
