import React, { useState } from "react";
import background from "../../../Assets/Images/background/20944999.png";
import logo from "../../../Assets/Images/background/logo.png";
import "../../../Assets/CSS/Auth/login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import loginschema from "./LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getLoginValidation } from "../../../Redux/Slices/Auth/loginSlice";
import { useDispatch } from "react-redux";
// import { useSelector } from 'react-redux';

import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Radio,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useGridApiEventHandler } from "@mui/x-data-grid";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const {message, status}= useSelector((store)=> store.login)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginschema),
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(getLoginValidation({ data, navigate }));
  };

  // let body = new FormData();
  // body.append('email', formData.email);

  // setFormData(old=>({
  //   ...old,
  //   email: e.target.value
  // }))
  // const handleRoute=()=>{
  //    if ((localStorage.getItem('accessToken'))!==null)
  //   navigate('/dashboard')
  // }
  return (
    <>
      <Grid container sx={{ overflow: "hidden" }}>
        <Grid item md={4} xs={12} className="logininputcontainer">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              "& .MuiTextField-root": { marginTop: "1rem", width: "100%" },
              width: "70%",
            }}
            noValidate
            autoComplete="off"
          >
            <Box>
              <img src={logo} alt="company logo" width={150} height={40} />
            </Box>

            <TextField
              required
              id="outlined-required"
              name="email"
              label="Email"
              size="small"
              type="email"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />

            <TextField
              required
              name="password"
              id="outlined-required"
              label="Password"
              size="small"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <Radio
  checked={selectedValue === 'b'}
  // onChange={handleChange}
  value="b"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'B' }}
/> */}
            <Button type="submit" className="loginbutton" variant="contained">
              login
            </Button>

            {/* <Typography
              variant="body2"
              color="primary"
              display="block"
              gutterBottom
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              <Link to="/forgot-password" style={{ color: "#49C5B6" }}>
                Forgot password ?
              </Link>
            </Typography> */}

            {/* <Typography
              variant="body"
              display="block"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#49C5B6" }}>
                {" "}
                Signup{" "}
              </Link>
            </Typography> */}
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
