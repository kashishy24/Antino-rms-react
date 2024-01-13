import * as React from "react";
import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "../../../Assets/CSS/RegDev/RegDev.css";
import RegDevSchema from "./RegDevSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getTechStacks,
  getDesignations,
  getRoles,
} from "../../../Redux/Slices/Lists/ListsSlice";
import { reg_dev_vld, clearAll } from "../../../Redux/Slices/Auth/RegDevSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegDev() {
  const nextPath = "/dashboard/developer";
  const regPath = "/dashboard/developer/register-developer"; // regPath- registration page path
  const { status, code, msg, isLoading, role } = useSelector(
    (store) => store.regDev
  );

  const { techStacks, designations, roles } = useSelector(
    (store) => store.lists
  );
  const [path, setPath] = useState("");
  const [success, setSuccess] = useState("");
  const [btnMsg, setBtnMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFresher, setIsFresher] = useState("true");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegDevSchema),
  });

  dispatch(clearAll());

  useEffect(() => {
    dispatch(getTechStacks());
    dispatch(getDesignations());
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    if (status === true) {
      setTimeout(() => {
        navigate(nextPath);
      }, 1000);
    }
    if (status === false) {
      toast.error(msg);
      console.log(msg);
    }
  }, [status]);

  const onSubmit = (data) => {
    data.workingExperienceInMonths =
      data.workingExperienceInYears * 12 + data.workingExperienceInMonths;
    delete data.workingExperienceInYears;
    data.seniority =
      data.workingExperienceInMonths <= 6
        ? "Intern"
        : data.workingExperienceInMonths > 6 &&
          data.workingExperienceInMonths <= 12
        ? "Junior"
        : data.workingExperienceInMonths > 12 &&
          data.workingExperienceInMonths <= 24
        ? "Assistant"
        : "Senior";
    console.log(data);

    dispatch(reg_dev_vld(data));
    console.log(status);
  };

  const handleChange = (event) => {
    setIsFresher(event.target.value);
  };

  const hideModal = () => {
    setShowModal(false);
    dispatch(clearAll());
    setPath("");
  };

  // console.log(props);
  return (
    <>
      <Grid container sx={{ justifyContent: "center", marginTop: "2rem" }}>
        <Grid item xs={8} className="signupinputcontainer">
          <Grid
            container
            component="form"
            noValidate="on"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "100%",
              border: "1px black solid",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <Grid
              item
              xs={8}
              className="signupinputbox"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "100% !important",
                padding: "10px 20px",
              }}
            >
              <Box
                sx={{
                  "& .MuiTextField-root": { marginTop: "1rem", width: "100%" },
                  width: "60vw",
                  "& .MuiFormHelperText-root": {
                    color: "#D32F2F",
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item sx={{ width: "50%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="First Name"
                      name="firstName"
                      type={"text"}
                      size="small"
                      {...register("firstName")}
                      // error={errors.firstName ? true : false}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item sx={{ width: "50%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Last Name"
                      name="lastName"
                      type={"text"}
                      size="small"
                      {...register("lastName")}
                      // error={errors.lastName ? true : false}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="outlined-required"
                  required
                  label="Email"
                  size="small"
                  name="email"
                  type={"email"}
                  style={{ width: "100%" }}
                  {...register("email")}
                  // error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />

                <Grid container spacing={2}>
                  <Grid item sx={{ width: "50%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Date of Joining"
                      size="small"
                      type={"date"}
                      name="joiningDate"
                      {...register("joiningDate")}
                      // error={errors.joiningDate ? true : false}
                      helperText={errors.joiningDate?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Joining"
                        value={isFresher}
                        onChange={(newValue) => {
                          setIsFresher(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register("workingExperienceInYears")}
                          />
                        )}
                      />
                    </LocalizationProvider> */}
                  </Grid>
                  <Grid item sx={{ width: "25%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Exp(Years)"
                      placeholder="Years"
                      size="small"
                      type={"number"}
                      name="workingExperienceInYears"
                      {...register("workingExperienceInYears")}
                      // error={errors.workingExperienceInYears ? true : false}
                      helperText={errors.workingExperienceInYears?.message}
                    />
                  </Grid>
                  <Grid item sx={{ width: "25%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Exp(Months)"
                      placeholder="Months"
                      size="small"
                      type={"number"}
                      name="workingExperienceInMonths"
                      {...register("workingExperienceInMonths")}
                      // error={errors.workingExperienceInMonths ? true : false}
                      helperText={errors.workingExperienceInMonths?.message}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sx={{ width: "50%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      select
                      label="Designation"
                      size="small"
                      onChange={handleChange}
                      type={"text"}
                      name="designation"
                      {...register("designation")}
                      // error={errors.designation ? true : false}
                      helperText={errors.designation?.message}
                    >
                      {designations.map((designation) => (
                        <MenuItem
                          key={designation.name}
                          value={designation._id}
                        >
                          {designation.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item sx={{ width: "50%" }}>
                    <TextField
                      required
                      select
                      id="outlined-required"
                      label="Role"
                      size="small"
                      onChange={handleChange}
                      type={"text"}
                      name="role"
                      {...register("role")}
                      // error={errors.role ? true : false}
                      helperText={errors.role?.message}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.name} value={role._id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item sx={{ width: "40%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      select
                      label="Tech Stack"
                      type={"text"}
                      onChange={handleChange}
                      name="techStack"
                      size="small"
                      {...register("techStack")}
                      // error={errors.techStack ? true : false}
                      helperText={errors.techStack?.message}
                    >
                      {techStacks.map((techStack) => (
                        <MenuItem key={techStack.name} value={techStack._id}>
                          {techStack.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item sx={{ width: "60%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Mobile Number"
                      size="small"
                      type={"tel"}
                      name="phoneNumber"
                      {...register("phoneNumber")}
                      // error={errors.phoneNumber ? true : false}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item sx={{ width: "60%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Emergency Contact Number"
                      size="small"
                      type={"tel"}
                      name="emergencyContactNumber"
                      {...register("emergencyContactNumber")}
                      // error={errors.emergencyContactNumber ? true : false}
                      helperText={errors.emergencyContactNumber?.message}
                    />
                  </Grid>
                  <Grid item sx={{ width: "40%" }}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Employee ID"
                      name="empId"
                      type={"text"}
                      size="small"
                      {...register("empId")}
                      // error={errors.empId ? true : false}
                      helperText={errors.empId?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid
              container
              flexDirection={"row-reverse"}
              justifyContent={"center"}
              sx={{ paddingBottom: "20px" }}
            >
              <Button
                type="submit"
                className="signupbutton"
                variant="contained"
              >
                Register
              </Button>

              <Typography
                variant="body"
                display="block"
                gutterBottom
              ></Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item md={7}>
          <img
            src={background}
            className="sidebackground"
            alt="sidebackground"
          />
        </Grid> */}
      </Grid>
      {/* {showModal ? (
        <BasicModal
          // code={code}
          type={success}
          msg={msg}
          path={path}
          btnTitle={btnMsg}
          btnAction={hideModal}
          // status={status}
          // regPath={regPath}
        />
      ) : null} */}
    </>
  );
}
