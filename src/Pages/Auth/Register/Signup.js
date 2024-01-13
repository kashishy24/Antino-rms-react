import * as React from "react";
import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import background from "../../../Assets/Images/background/1.jpg";
import logo from "../../../Assets/Images/background/logo.png";
import "../../../Assets/CSS/Auth/Signup.css";
import { Link } from "react-router-dom";
import signupSchema from "./SignupSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { getSignUpValidation } from "../../../Redux/Slices/Auth/SignupSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(getSignUpValidation(data));
  };

  return (
    <>
      <Grid container sx={{ overflow: "hidden", height: "100vh" }}>
        <Grid item md={5} xs={12} className="signupinputcontainer">
          <Grid
            container
            component="form"
            noValidate
            autoComplete="off"
            mx={4}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid container justifyContent={"center"} mb={2}>
              {" "}
              <img
                style={{
                  height: "2.5rem",
                }}
                src={logo}
                alt="company logo"
              />
            </Grid>

            <Grid item md={5.5} xs={12} className="signupinputbox">
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    marginTop: "1rem",
                  },
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  name="firstName"
                  size="small"
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Last Name"
                  mt={1}
                  name="lastName"
                  size="small"
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Designation"
                  size="small"
                  name="designation"
                  {...register("designation")}
                  error={errors.designation ? true : false}
                  helperText={errors.designation?.message}
                />
              </Box>
            </Grid>

            <Grid item md={5.5} xs={12} className="signupinputbox">
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    marginTop: "1rem",
                  },
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Year of Experience"
                  size="small"
                  name="yearOfExperience"
                  {...register("yearOfExperience")}
                  error={errors.yearOfExperience ? true : false}
                  helperText={errors.yearOfExperience?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  size="small"
                  name="email"
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Phone Number"
                  size="small"
                  name="phoneNumber"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber ? true : false}
                  helperText={errors.phoneN99umber?.message}
                />
              </Box>
            </Grid>

            <Grid
              container
              justifyContent="center"
              sx={{
                flexWrap: "nowrap",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                className="signupbutton"
                variant="contained"
              >
                Signup
              </Button>
              <Typography
                variant="body"
                display="block"
                gutterBottom
                sx={{ marginTop: "1rem" }}
              >
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#49C5B6" }}>
                  {" "}
                  Login{" "}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={7}>
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
