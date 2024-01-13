import * as React from "react";
import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "../../Assets/CSS/RegDev/RegDev.css";
import RegDevSchema from "../../Pages/Developer/RegDevSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { update_user } from "../../Redux/Slices/Auth/RegDevSlice";
import { assign_group } from "../../Redux/Slices/getUsersSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import moment from "moment";

export default function EditDev() {
  const nextPath = "/dashboard/developer";
  const regPath = "/dashboard/developer/register-developer"; // regPath- registration page path
  const { status, code, msg, isLoading, userData, keyword } = useSelector(
    (store) => store.regDev
  );
  const [path, setPath] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFresher, setIsFresher] = useState("true");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { techStacks, designations, roles, groups } = useSelector(
    (store) => store.lists
  );

  // dispatch(clearAll());
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (status === true) {
      setTimeout(() => {
        navigate(nextPath);
      }, 1000);
    }
    if (status === false) {
      if (keyword === "email") {
        toast.error("Email already exist");
      }
      if (keyword === "phoneNumber") {
        toast.error("Phone Number already exist");
      }
      if (keyword === "empId") {
        toast.error("Employee Id already exist");
      }
    }
  }, [status]);

  console.log(userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegDevSchema),
  });

  const onSubmit = (data) => {
    console.log("hi");
    console.log(data);
    data.workingExperienceInMonths =
      data.workingExperienceInYears * 12 + data.workingExperienceInMonths;
    delete data.workingExperienceInYears;
    // data.isAvailable = data.isAvailable === "Yes" ? true : false;
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
    console.log(JSON.stringify(data));
    dispatch(update_user({ id: userData._id, data }));
    dispatch(assign_group({ userId: userData._id, groupId: data.group }));
  };
  const handleChange = (event) => {
    setIsFresher(event.target.value);
  };

  // console.log(props);
  // const [firstName, lastName] = userData.fullName.split(" ");
  console.log(isLoading);
  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    if (Object.keys(userData).length === 0) {
      return (
        <>
          <Grid
            container
            sx={{
              height: "74vh",
              marginTop: "8%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "2rem" }}>Page Not Found</p>
            <button
              style={{
                padding: "5px",
                fontSize: "15px",
                backgroundColor: "#49C5B6",
                border: "1px solid",
                marginTop: "1rem",
              }}
              onClick={() => {
                navigate("/dashboard/developer");
              }}
            >
              Go Back !!!
            </button>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid
            container
            sx={{ height: "74vh", justifyContent: "center", marginTop: "2rem" }}
          >
            <Grid item xs={8} className="signupinputcontainer">
              <Grid
                container
                component="form"
                noValidate
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
                    padding: "10px 20px ",
                  }}
                >
                  <Box
                    sx={{
                      "& .MuiTextField-root": {
                        marginTop: "11px",
                        width: "100%",
                      },
                      width: "60vw",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item sx={{ width: "50%" }}>
                        <TextField
                          required
                          id="outlined-required"
                          label="First Name"
                          name="firstName"
                          defaultValue={userData.firstName}
                          type={"text"}
                          size="small"
                          {...register("firstName")}
                          error={errors.firstName ? true : false}
                          helperText={errors.firstName?.message}
                        />
                      </Grid>
                      <Grid item sx={{ width: "50%" }}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Last Name"
                          name="lastName"
                          defaultValue={userData.lastName}
                          type={"text"}
                          size="small"
                          {...register("lastName")}
                          error={errors.lastName ? true : false}
                          helperText={errors.lastName?.message}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item sx={{ width: "50%" }}>
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
                      <Grid item sx={{ width: "50%" }}>
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
                    </Grid>

                    <Grid container spacing={2}>
                      {/* <Grid item sx={{ width: "50%" }}>
                        <TextField
                          id="outlined-required"
                          select
                          label="Group"
                          type={"text"}
                          defaultValue={userData.group?._id}
                          onChange={handleChange}
                          name="group"
                          size="small"
                          {...register("group")}
                          error={errors.isAvailable ? true : false}
                        >
                          {groups.map((group) => (
                            <MenuItem key={group.group_name} value={group._id}>
                              {group.group_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid> */}
                      <Grid item sx={{ width: "25%" }}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Experience"
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
                      <Grid item sx={{ width: "25%" }}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Experience"
                          placeholder="Months"
                          size="small"
                          type={"number"}
                          defaultValue={userData.workingExperienceInMonths % 12}
                          name="workingExperienceInMonths"
                          {...register("workingExperienceInMonths")}
                          error={
                            errors.workingExperienceInMonths ? true : false
                          }
                          helperText={errors.workingExperienceInMonths?.message}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item sx={{ width: "50%" }}>
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
                          defaultValue={userData.role?._id}
                          type={"text"}
                          name="role"
                          {...register("role")}
                          error={errors.role ? true : false}
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
                            <MenuItem
                              key={techStack.name}
                              value={techStack._id}
                            >
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
                          defaultValue={userData.phoneNumber}
                          type={"tel"}
                          name="phoneNumber"
                          {...register("phoneNumber")}
                          error={errors.phoneNumber ? true : false}
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
                          defaultValue={userData.emergencyContactNumber}
                          type={"tel"}
                          name="emergencyContactNumber"
                          {...register("emergencyContactNumber")}
                          error={errors.emergencyContactNumber ? true : false}
                          helperText={errors.emergencyContactNumber?.message}
                        />
                      </Grid>
                      <Grid item sx={{ width: "40%" }}>
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
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item sx={{ width: "40%" }}>
                        <TextField
                          required
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
                      <Grid item sx={{ width: "30%" }}>
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
                          <MenuItem key="Nonbillable" value="Non-billable">
                            Non-Billable
                          </MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item sx={{ width: "30%" }}>
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
                          <MenuItem key="engaged" value="engaged">
                            Engaged
                          </MenuItem>
                          <MenuItem
                            key="mayBeAvailable"
                            value="may be available"
                          >
                            May be Available
                          </MenuItem>
                          <MenuItem key="available" value="available">
                            Available
                          </MenuItem>
                        </TextField>
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
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    }
  }
}
