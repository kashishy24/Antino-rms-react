import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import { VisibilityOff,Visibility } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import "../../Assets/CSS/RegDev/RegDev.css";
import RegDevSchema from "./RegDevSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getTechStacks,
  getDesignations,
  getDevelopers,
} from "../../Redux/Slices/Lists/ListsSlice";
import { reg_dev_vld, resetStatus } from "../../Redux/Slices/Auth/RegDevSlice";
import { get_users } from "../../Redux/Slices/getUsersSlice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterDeveloper = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const useStyles = makeStyles({
    container: {
      gap: "10px",
    },
    inputItem: {
      width: "100%",
    },
    paper: { minWidth: "500px" },
  });

  const classes = useStyles();

  const handleClose = () => {
    reset();
    onClose();
  };

  const { status, code, msg, isLoading, role } = useSelector(
    (store) => store.regDev
  );
    console.log("statsttttt",status);
  const { techStacks, designations } = useSelector((store) => store.lists);
  const [isFresher, setIsFresher] = useState("true");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegDevSchema),
  });
  // const seniority=["Junior", "Assistant","Intern","Senior","Full Time"];
  // dispatch(clearAll());

  useEffect(() => {
    dispatch(getTechStacks());
    dispatch(getDesignations());
  }, []);

  useEffect(() => {
    if (status === 201) {
      setTimeout(() => {
        dispatch(get_users("api/v2/users/search?isDeleted=false"));
        dispatch(resetStatus());
        onClose();
      }, 1000);
    }
    if (status === false) {
      toast.error(msg);
    }
  }, [status]);

  const onSubmit = (data) => {
    console.log(data,"data")
    dispatch(resetStatus());
    data.workingExperienceInMonths =
      data.workingExperienceInYears * 12 + data.workingExperienceInMonths;
    delete data.workingExperienceInYears;
    // data.seniority =
    //   data.workingExperienceInMonths <= 6
    //     ? "Intern"
    //     : data.workingExperienceInMonths > 6 &&
    //       data.workingExperienceInMonths <= 12
    //     ? "Junior"
    //     : data.workingExperienceInMonths > 12 &&
    //       data.workingExperienceInMonths <= 24
    //     ? "Assistant"
    //     : "Senior";
    dispatch(reg_dev_vld(data));
    if (status === 200) {
      setTimeout(() => {
        dispatch(get_users("api/v2/users/search?isDeleted=false"));
        dispatch(resetStatus());
        handleClose();
        // onClose();

      }, 1000);
    }
    //  if (status === 200) {
    //   setTimeout(() => {
    //     dispatch(get_users("api/v2/users/search?isDeleted=false"));
    //     dispatch(resetStatus());
    //     handleClose();
    //   }, 1000);
    // }
    // if (status === false) {
    //   toast.error(msg);
    // }
  };

  const handleChange = (event) => {
    setIsFresher(event.target.value);
  };

  return (
    <>
      <Box>
        <form>
          <Dialog
            className={classes.paper}
            maxWidth={"md"}
            open={open}
            close={onClose}
            sx={{
              "& .MuiDialogActions-root": {
                padding: "0px !important",
              },
            }}
          >
            <DialogTitle>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Add Developer
                <Button
                  sx={{
                    color: "black",
                    fontSize: "1rem",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
                </Button>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                component="form"
                noValidate="on"
                autoComplete="off"
                // sx={{
                //   width: "100%",
                //   display: "flex",
                //   flexDirection: "column",
                //   justifyContent: "space-between",
                //   alignItems: "center",
                //   maxWidth: "100%",
                //   background: "white",
                //   borderRadius: "10px",
                // }}
                spacing={2}
                sx={{
                  marginTop: "4px",
                  "& .MuiTextField-root": {
                    width: "100%",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#D32F2F",
                  },
                }}
              >
                {/* <Grid
                  item
                  xs={8}
                  className="signupinputbox"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "100% !important",
                    // padding: "10px 20px",
                  }}
                >
                  <Box
                    sx={{
                      "& .MuiTextField-root": {
                        marginTop: "1rem",
                        width: "100%",
                      },
                      width: "60vw",
                      "& .MuiFormHelperText-root": {
                        color: "#D32F2F",
                      },
                    }}
                  > */}
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Full Name"
                    name="fullName"
                    type={"text"}
                    size="small"
                    {...register("fullName")}
                    helperText={errors.fullName?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required="hhhh"
                    id="outlined-required"
                    label="Email"
                    size="small"
                    name="email"
                    type={"email"}
                    style={{ width: "100%" }}
                    {...register("email")}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={6}>
                    <Controller
                      name="joiningDate"
                      control={control}
                      defaultValue={null}
                      render={({ field, ...props }) => (
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          label="Date of Joining"
                          onChange={(date) => field.onChange(date)}
                          value={field.value}
                          renderInput={(params) => (
                            <TextField
                              required
                              fullWidth
                              {...params}
                              size="small"
                              helperText={errors.joiningDate?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </LocalizationProvider>

                {/* <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Date of Joining"
                    size="small"
                    type={"date"}
                    name="joiningDate"
                    {...register("joiningDate")}
                    helperText={errors.joiningDate?.message}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid> */}
                <Grid item xs={3}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Exp(Years) prior to joining antino"
                    placeholder="Years"
                    size="small"
                    type={"number"}
                    name="workingExperienceInYears"
                    {...register("workingExperienceInYears")}
                    helperText={errors.workingExperienceInYears?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Exp(Months) prior to joining antino"
                    placeholder="Months"
                    size="small"
                    type={"number"}
                    name="workingExperienceInMonths"
                    {...register("workingExperienceInMonths")}
                    helperText={errors.workingExperienceInMonths?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    select
                    label="seniority"
                    type={"text"}
                    // defaultValue={userData.seniority?._id}

                    onChange={(e)=>setValue("seniority",e.target.value)}
                    name="seniority"
                    size="small"
                    // {...register("seniority")}
                    error={errors.isAvailable ? true : false}
                  >
                    <MenuItem key="Junior" value="Junior">
                      Junior
                    </MenuItem>
                    <MenuItem key="MidLevel" value="MidLevel">
                    Mid Level
                    </MenuItem>
                    <MenuItem key="Intern" value="Intern">
                    Intern
                    </MenuItem>
                    <MenuItem key="Senior" value="Senior">
                    Senior
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
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
                    helperText={errors.designation?.message}
                  >
                    {designations.map((designation) => (
                      <MenuItem key={designation.name} value={designation._id}>
                        {designation.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                <Grid item xs={6}>
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
                    helperText={errors.techStack?.message}
                  >
                    {techStacks.map((techStack) => (
                      <MenuItem key={techStack.name} value={techStack._id}>
                        {techStack.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    id="outlined-required"
                    label="Secondary Tech Stack"
                    size="small"
                    onChange={handleChange}
                    type={"text"}
                    name="secondaryTechStack"
                    {...register("secondaryTechStack")}
                    helperText={errors.secondaryTechStack?.message}
                  >
                    {techStacks.map((techStack) => (
                      <MenuItem key={techStack.name} value={techStack._id}>
                        {techStack.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Mobile Number"
                    size="small"
                    type={"tel"}
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    helperText={errors.phoneNumber?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Emergency Contact Number"
                    size="small"
                    type={"tel"}
                    name="emergencyContactNumber"
                    {...register("emergencyContactNumber")}
                    helperText={errors.emergencyContactNumber?.message}
                    sx={{ width: "100% " }}
                  />
                </Grid>

                <Grid item xs={6}>
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

                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Remarks"
                    size="small"
                    type={"text"}
                    name="remarks"
                    {...register("remarks")}
                    error={errors.remarks ? true : false}
                    helperText={errors.remarks?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    size="small"
                    // type={"password"}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("password")}
                    helperText={errors.password?.message}
                    sx={{ width: "100% " }}
                  />
                </Grid>

                {/* </Box>
                </Grid> */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Box sx={{ margin: "8px 20px" }}>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  sx={{ color: "white" }}
                  variant="contained"
                  disabled={isLoading}
                >
                  Register
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </>
  );
};

export default RegisterDeveloper;
