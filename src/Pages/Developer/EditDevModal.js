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
  IconButton,

} from "@mui/material";
import VisibilityOff  from '@mui/icons-material/VisibilityOff';
import Visibility  from '@mui/icons-material/Visibility';

import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import "../../Assets/CSS/RegDev/RegDev.css";
import RegDevSchema from "./RegDevSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { get_users } from "../../Redux/Slices/getUsersSlice";
import { resetStatus, update_user } from "../../Redux/Slices/Auth/RegDevSlice";
import { assign_group } from "../../Redux/Slices/getUsersSlice";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getProjects } from "../../Redux/Slices/Lists/ListsSlice";
import { ref } from "yup";

const EditDevModal = ({ open, onClose }) => {
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

  const { status, msg, isLoading, userData } = useSelector(
    (store) => store.regDev
  );

  const [isFresher, setIsFresher] = useState("true");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const seniority=["Junior", "Assistant","Intern","Senior","Full Time"];

  const { techStacks, designations, groups, user, projectManagers } =
    useSelector((store) => store.lists);

  useEffect(() => {
    if (status === 200) {
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(RegDevSchema),
    defaultValues:{seniority:userData.seniority ||""}
  });
  console.log(errors, "===========");


  const onSubmit = (data) => {
    console.log(data, "data");
    dispatch(resetStatus());
    // console.log("dataidch",data);
    // data=data.designation;
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
    // dispatch(assign_group({ userId: userData._id, groupId: data.group }));
    dispatch(update_user({ id: userData._id, data }));
    // // setTimeout(() => {
    //   dispatch(get_users("/api/v2/users/search"));
    //   onClose();
    // }, 1000);
  };
  const handleChange = (event) => {
    setIsFresher(event.target.value);
    console.log(event.target, "updatedadt");
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
                Edit Developer
                <Button
                  sx={{
                    color: "black",
                    fontSize: "1rem",
                  }}
                  onClick={onClose}
                >
                  <CloseIcon sx={{ cursor: "pointer" }} />
                </Button>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                component="form"
                noValidate
                autoComplete="off"
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
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Full Name"
                    name="fullName"
                    defaultValue={userData.fullName}
                    type={"text"}
                    size="small"
                    {...register("fullName")}
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    required
                    label="Email"
                    size="small"
                    name="email"
                    defaultValue={userData.email}
                    type={"email"}
                    style={{ width: "100%" }}
                    {...register("email")}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Date of Joining"
                    size="small"
                    defaultValue={moment(userData.joiningDate).format(
                      "YYYY-MM-DD"
                    )}
                    type={"date"}
                    name="joiningDate"
                    {...register("joiningDate")}
                    error={errors.joiningDate ? true : false}
                    helperText={errors.joiningDate?.message}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Exp(Years) prior to joining antino"
                    placeholder="Years"
                    size="small"
                    type={"number"}
                    defaultValue={Math.floor(
                      userData.workingExperienceInMonths / 12
                    )}
                    name="workingExperienceInYears"
                    {...register("workingExperienceInYears")}
                    error={errors.workingExperienceInYears ? true : false}
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
                    defaultValue={userData.workingExperienceInMonths % 12}
                    name="workingExperienceInMonths"
                    {...register("workingExperienceInMonths")}
                    error={errors.workingExperienceInMonths ? true : false}
                    helperText={errors.workingExperienceInMonths?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    select
                    name="seniority"
                    label="seniority"
                    type={"text"}
                    defaultValue={userData.seniority}
                    onChange={(e)=>setValue("seniority",e.target.value)}
                    size="small"
                    // {...register("seniority")}
                    error={errors.isAvailable ? true : false}
                  >
                    <MenuItem key="Junior" value="Junior">
                      Junior
                    </MenuItem>
                    <MenuItem key="MidLevel" value="Mid Level">
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
                {/* <Grid item xs={6}>
                  <TextField
                    select
                    label="Reporting PM"
                    size="small"
                    onChange={handleChange}
                    defaultValue={userData.reportingPm?._id}
                    type={"text"}
                    name="reportingPm"
                    {...register("reportingPm")}
                    error={errors.reportingPm ? true : false}
                    helperText={errors.reportingPm?.message}
                  >
                    {projectManagers.map((projectManager) => (
                      <MenuItem
                        key={projectManager.name}
                        value={projectManager._id}
                      >
                        {projectManager.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                {/* <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    select
                    label="seniority"
                    type={"text"}
                    onClick={()=>handleChange()}
                    
                    size="small"
                    {...register("seniority")}
                    error={errors.isAvailable ? true : false}
                  >
                    <MenuItem key="Junior" value="Junior">
                      Junior
                    </MenuItem>
                    <MenuItem key="Assistant" value="Assistant">
                    Assistant
                    </MenuItem>
                    <MenuItem key="Intern" value="Intern">
                    Intern
                    </MenuItem>
                    <MenuItem key="Senior" value="Senior">
                    Senior
                    </MenuItem>
                    <MenuItem key="FullTime" value="FullTime">
                    Full Time
                    </MenuItem>
                  </TextField>
                </Grid> */}
                <Grid item xs={6}>
                  <TextField
                    required
                    select
                    id="outlined-required"
                    label="Designation"
                    onChange={handleChange}
                    size="small"
                    defaultValue={userData.designation?._id}
                    type={"text"}
                    name="designation"
                    {...register("designation")}
                    error={errors.designation ? true : false}
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
                    id="outlined-required"
                    select
                    label="Tech Stack"
                    type={"text"}
                    defaultValue={userData.techStack?._id}
                    onChange={handleChange}
                    name="techStack"
                    size="small"
                    {...register("techStack")}
                    error={errors.techStack ? true : false}
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
                    select
                    id="outlined-required"
                    label="Secondary Tech Stack"
                    size="small"
                    onChange={handleChange}
                    defaultValue={userData.secondaryTechStack?._id}
                    type={"text"}
                    name="secondaryTechStack"
                    {...register("secondaryTechStack")}
                    error={errors.secondaryTechStack ? true : false}
                    helperText={errors.secondaryTechStack?.message}
                  >
                    {techStacks.map((techStack) => (
                      <MenuItem key={techStack.name} value={techStack._id}>
                        {techStack.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* <Grid item xs={6}>
                  <TextField
                    select
                    label="Billable"
                    type={"text"}
                    defaultValue={userData.billable}
                    onChange={handleChange}
                    name="billable"
                    size="small"
                    {...register("billable")}
                    error={errors.billable ? true : false}
                  >
                    <MenuItem key="Billable" value="Billable">
                      Billable
                    </MenuItem>
                    <MenuItem key="Non-billable" value="Non-billable">
                      Non-Billable
                    </MenuItem>
                  </TextField>
                </Grid> */}
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    select
                    label="Available"
                    type={"text"}
                    defaultValue={userData.isAvailable}
                    onChange={handleChange}
                    name="isAvailable"
                    size="small"
                    {...register("isAvailable")}
                    error={errors.isAvailable ? true : false}
                  >
                    <MenuItem key="available" value="Available">
                      Available
                    </MenuItem>
                    <MenuItem key="NotAvailable" value="Not Available">
                      Not Available
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Mobile Number"
                    size="small"
                    defaultValue={userData.phoneNumber}
                    type={"tel"}
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber ? true : false}
                    helperText={errors.phoneNumber?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Emergency Contact Number"
                    size="small"
                    defaultValue={userData.emergencyContactNumber}
                    type={"tel"}
                    name="emergencyContactNumber"
                    {...register("emergencyContactNumber")}
                    error={errors.emergencyContactNumber ? true : false}
                    helperText={errors.emergencyContactNumber?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Employee ID"
                    name="empId"
                    defaultValue={userData.empId}
                    type={"text"}
                    size="small"
                    {...register("empId")}
                    error={errors.empId ? true : false}
                    helperText={errors.empId?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Remarks"
                    size="small"
                    type={"text"}
                    defaultValue={
                      userData.remarks === null ? "" : userData.remarks
                    }
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
                  Update
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </>
  );
};

export default EditDevModal;
