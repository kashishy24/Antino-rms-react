import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import moment from "moment";

const AddStatus = ({ open, onClose, passedFrom }) => {
  const useStyles = makeStyles({
    // container: {
    //   gap: "10px",
    // },
    // containerItem: {
    //   width: "100%",
    //   display: "flex",
    //   justifyContent: "space-between",
    // },
    // inputItem: {
    //   width: "40%",
    // },
    paper: { minWidth: "500px" },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:
      passedFrom === "developer"
        ? {
            status: "",
            utilization: "",
            remarks: "",
          }
        : {
            status: "",
          },
  });

  const [isFresher, setIsFresher] = useState("true");

  const handleChange = (event) => {
    setIsFresher(event.target.value);
  };

  const submitHandler = (data) => {
    console.log(data);
    // create a global state named data store the output and set default values in the current week status
    reset();
    onClose();
  };

  return (
    <>
      <Box>
        <Dialog
          // className={classes.paper}
          // maxWidth={"md"}
          open={open}
          close={onClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "400px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle sx={{ padding: "16px 16px 6px 24px" }}>
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                // color: "#49C5B6",
              }}
            >
              Add Status
              <Button
                sx={{
                  fontSize: "13px",
                  minWidth: "0px",
                  padding: "0px",
                }}
                onClick={onClose}
              >
                X
              </Button>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Box
              // mt={3}
              spacing={1}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                  flexDirection: "column",
                }}
              >
                {passedFrom === "developer" ? (
                  <TextField
                    required
                    id="outlined-required"
                    select
                    label="Status"
                    name="status"
                    type={"text"}
                    size="small"
                    defaultValue=""
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                    {...register("status")}
                    // error={errors.firstName ? true : false}
                    // helperText={errors.firstName?.message}
                  >
                    <MenuItem
                      key="Task assigned and able to do"
                      value="Task assigned and able to do "
                    >
                      Task assigned and able to do
                    </MenuItem>
                    <MenuItem
                      key="Task assigned and partially able to do"
                      value="Task assigned and partially able to do"
                    >
                      Task assigned and partially able to do
                    </MenuItem>
                    <MenuItem
                      key="Task assigned and not able to do"
                      value="Task assigned and not able to do"
                    >
                      Task assigned and not able to do
                    </MenuItem>
                    <MenuItem key="Task not assigned" value="Task not assigned">
                      Task not assigned
                    </MenuItem>{" "}
                  </TextField>
                ) : (
                  <TextField
                    required
                    id="outlined-required"
                    select
                    label="Status"
                    name="status"
                    type={"text"}
                    size="small"
                    defaultValue=""
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                    {...register("status")}
                    // error={errors.firstName ? true : false}
                    // helperText={errors.firstName?.message}
                  >
                    <MenuItem key="All Good" value="All Good">
                      All Good
                    </MenuItem>
                    <MenuItem key="Need Improvement" value="Need Improvement">
                      Need Improvement
                    </MenuItem>{" "}
                  </TextField>
                )}
                {passedFrom === "developer" && (
                  <>
                    <TextField
                      required
                      id="outlined-required"
                      select
                      label="Utilization"
                      size="small"
                      onChange={handleChange}
                      type={"text"}
                      name="utilization"
                      defaultValue=""
                      sx={{ width: "100%", marginTop: "1rem" }}
                      {...register("utilization")}
                      // error={errors.designation ? true : false}
                      // helperText={errors.designation?.message}
                    >
                      <MenuItem key=">100%" value=">100%">
                        {">"}100 %
                      </MenuItem>
                      <MenuItem key="76-100%" value="76-100%">
                        76-100 %
                      </MenuItem>
                      <MenuItem
                        key="Task assigned and not able to do"
                        value="Task assigned and not able to do"
                      >
                        51-75 %
                      </MenuItem>
                      <MenuItem key="<50%" value="<50%">
                        {"<"}50 %
                      </MenuItem>
                    </TextField>
                  </>
                )}
                <TextField
                  required
                  id="outlined-required"
                  label="Remarks"
                  name="remarks"
                  type={"text"}
                  size="small"
                  defaultValue=""
                  sx={{ width: "100%", marginTop: "1rem" }}
                  autoComplete="off"
                  {...register("remarks")}
                  // error={errors.firstName ? true : false}
                  // helperText={errors.firstName?.message}
                />
                {/* <Typography
                    fontSize={18}
                  >{`${data?.firstName} ${data?.lastName}  `}</Typography>
                  <Typography fontSize={13}>
                    ({data?.designation?.name})
                  </Typography>
                </div>
                <div>
                  <Typography mt={1}></Typography>
                  <Grid
                    container
                    sx={{ display: "flex", fontSize: "13px" }}
                    spacing={4}
                  >
                    <Grid item sx={6}>
                      <Typography fontSize={14}>
                        Email - {data?.email}
                      </Typography>
                      <Typography fontSize={14}>
                        Joining Date -{" "}
                        {moment(data?.joiningDate)?.format("DD/MM/YYYY")}
                      </Typography>
                      <Typography fontSize={14}>
                        Contact No.- {data?.phoneNumber}
                      </Typography>
                      <Typography fontSize={14}>
                        Role - {data?.role?.name}
                      </Typography>
                      <Typography fontSize={14}>
                        TechStack - {data?.techStack?.name}
                      </Typography>
                      <Typography fontSize={14}>
                        Seniority - {data?.seniority}
                      </Typography>
                      <Typography fontSize={14}>
                        experience - {yearString + monthString}
                      </Typography>
                    </Grid>
                    <Grid item sx={6}>
                      <Typography fontSize={14}>
                        Projects - {data?.projects.join(" ")}
                      </Typography>
                      <Typography fontSize={14}>
                        Reporting PM -{" "}
                        {data?.reportingPm === null ? "N/A" : data?.reportingPm}
                      </Typography>
                      <Typography fontSize={14}>
                        billable - {data?.billable?.type}
                      </Typography>
                      <Typography fontSize={14}>
                        Availability - {data?.isAvailable}
                      </Typography>
                      <Typography fontSize={14}>
                        Group - {data?.group?.group_name}
                      </Typography>
                      <Tooltip title={data?.remarks || ""}>
                        <Typography
                          fontSize={14}
                          sx={{
                            width: "170px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            cursor: "default",
                          }}
                        >
                          Remarks - {data?.remarks}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid> */}
                {/*  <Grid item sx={6}>
                        Email
                      </Grid>
                      <Grid item sx={6}>
                        {data?.email}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ display: "flex", fontSize: "13px" }}>
                      <Grid item sx={6}>
                        Email
                      </Grid>
                      <Grid item sx={6}>
                        {data?.email}
                      </Grid>*/}
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit(submitHandler)}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AddStatus;
