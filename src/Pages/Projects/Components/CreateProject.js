import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";

import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { addProject } from "../../../apis/ProjectApi";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../Redux/Slices/Project/ProjectsSlice";
import { getTechStacks } from "../../../Redux/Slices/Lists/ListsSlice";
import { toast } from "react-toastify";
import CreateProjectSchema from "./CreateProjectSchema";
import * as yup from "yup";

// import { get_techStack } from "../../../Redux/Slices/getUsersSlice";

const CreateProject = ({ open, onClose, data }) => {
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
  const dispatch = useDispatch();

  // const [internalMeetingDays, setInternalMeetingDays] = useState([]);
  // const [internalMeetingTime, setInternalMeetingTime] = useState("");
  // const [clientMeetingDays, setClientMeetingDays] = useState([]);
  // const [clientMeetingTime, setClientMeetingTime] = useState("");

  const handleSubmit = (values) => {
    // const internalMeetingDaysAndTimings = {};
    // for (let day of values?.internalMeetingDays) {
    //   internalMeetingDaysAndTimings[day] = `${values?.internalMeetingTime}`;
    // }

    // const clientMeetingDaysAndTimings = {};
    // for (let day of values?.clientMeetingDays) {
    //   clientMeetingDaysAndTimings[day] = `${values?.clientMeetingTime}`;
    // }

    const techStackIds = values?.techStack.map((stack) => stack._id);

    let obj = {
      projectName: values?.projectName,
      clientName: values?.clientName,
      startDate: values?.startDate,
      estimatedEndDate: values?.estimatedEndDate,
      techStack: techStackIds,
      typeOfProject: values?.typeOfProject,
      demoUrls: values?.demoUrls,
      clientPointOfContact: values?.clientPointOfContact,
      status: values?.status,
      description: values?.description,
      // internalMeetingDaysAndTimings: JSON.stringify(
      //   internalMeetingDaysAndTimings
      // ),
      // clientMeetingDaysAndTimings: JSON.stringify(clientMeetingDaysAndTimings),
    };

    addProject(obj)
      .then((res) => {
        formik.handleReset();
        onClose();
        dispatch(getProjects());
        toast(res?.message);
      })
      .catch((error) => toast(error?.response?.data?.message));
  };

  const formik = useFormik({
    initialValues: {
      projectName: "",
      clientName: "",
      startDate: "",
      estimatedEndDate: "",
      techStack: [],
      typeOfProject: "",
      demoUrls: "",
      clientPointOfContact: "",
      status: "",
      description: "",
      // internalMeetingDays: [],
      // clientMeetingDays: [],
      // internalMeetingTime: "",
      // clientMeetingTime: "",
    },
    validationSchema: CreateProjectSchema,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    dispatch(getTechStacks());
  }, []);

  // console.log(formik.errors);
  const techStack = useSelector((store) => store?.lists?.techStacks);

  // const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const projectType = ["Fixed Scope Budget", "Fixed Scope Premium", "Developers On Demand", "Dedicated Team Model", "Shared Tech Team","Monthly Maintenance"];
  
  const status = ["Active", "Inactive"];

  // console.log(data);

  const handleClose = () => {
    formik.handleReset();
    onClose();
  };

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit} autocomplete="off">
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
                Create Project
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
                // className={classes.container}
                sx={{
                  "& 	.MuiAutocomplete-popper": {
                    paddingBottom: "1rem",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#D32F2F",
                  },
                }}
                mt={1}
                spacing={2}
              >
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    className={classes.inputItem}
                    required
                    value={formik.values.projectName}
                    name="projectName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Project Name"
                    //   error={formik.errors.projectName}
                    helperText={
                      formik.touched.projectName
                        ? formik.errors.projectName
                        : ""
                    }
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    className={classes.inputItem}
                    required
                    value={formik.values.clientName}
                    name="clientName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Client Name"
                    //   error={formik.errors.clientName}
                    helperText={
                      formik.touched.clientName ? formik.errors.clientName : ""
                    }
                    autoComplete="off"
                  />
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={6}>
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      label="Start date"
                      value={formik.values.startDate || null}
                      onChange={(newValue) => {
                        // console.log(newValue);
                        // newValue === "Invalid Date"
                        //   ? formik.setFieldValue("startDate", "")
                        //   :
                        formik.setFieldValue(
                          "startDate",
                          moment(newValue).format("MM-DD-YYYY")
                        );
                      }}
                      invalidDateMessage="Computer says no"
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          required
                          fullWidth
                          {...params}
                          onBlur={(e) => {
                            formik.setFieldTouched("startDate", true);
                          }}
                          helperText={
                            formik.touched.startDate
                              ? formik.errors.startDate
                              : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DesktopDatePicker
                      label="Estimated End date "
                      disabled={!formik.values.startDate}
                      shouldDisableDate={(date) =>
                        moment(date).isBefore(
                          moment(formik.values.startDate).add(1, "day")
                        )
                      }
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.estimatedEndDate || null}
                      onChange={(newValue) =>
                        formik.setFieldValue(
                          "estimatedEndDate",
                          moment(newValue).format("MM-DD-YYYY")
                        )
                      }
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          {...params}
                          //  error={formik.errors.estimatedEndDate}
                          helperText={
                            formik.touched.estimatedEndDate
                              ? formik.errors.estimatedEndDate
                              : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                </LocalizationProvider>

                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.inputItem}
                    options={techStack || []}
                    multiple
                    disablePortal={true}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={(event, value) =>
                      formik.setFieldValue("techStack", value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik?.values?.techStack}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        name="techStack"
                        label="Tech Stack"
                        // error={formik.errors.techStack}
                        helperText={
                          formik.touched.techStack
                            ? formik.errors.techStack
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={projectType}
                    disablePortal={true}
                    className={classes.inputItem}
                    name="typeOfProject"
                    getOptionLabel={(option) =>
                      option?.isDeleted ? "" : option
                    }
                    sx={{
                      "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                        visibility: "hidden",
                      },
                    }}
                    // onChange={formik.handleChange}
                    value={formik.values.typeOfProject}
                    onChange={(event, value) =>
                      formik.setFieldValue("typeOfProject", value)
                    }
                    onBlur={formik.handleBlur}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        value={formik.values.typeOfProject}
                        name="typeOfProject"
                        label="Project Type"
                        // error={formik.errors.typeOfProject}
                        helperText={
                          formik.touched.typeOfProject
                            ? formik.errors.typeOfProject
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={status}
                    disablePortal={true}
                    className={classes.inputItem}
                    name="status"
                    getOptionLabel={(option) =>
                      option?.isDeleted ? "" : option
                    }
                    sx={{
                      "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                        visibility: "hidden",
                      },
                    }}
                    value={formik.values.status}
                    onChange={(event, value) =>
                      formik.setFieldValue("status", value)
                    }
                    onBlur={formik.handleBlur}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        value={formik.values.status}
                        name="status"
                        label="Status"
                        // error={formik.errors.status}
                        helperText={
                          formik.touched.status ? formik.errors.status : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    className={classes.inputItem}
                    value={formik.values.demoUrls}
                    name="demoUrls"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Demo urls"
                    //   error={formik.errors.demoUrls}
                    helperText={
                      formik.touched.demoUrls ? formik.errors.demoUrls : ""
                    }
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    className={classes.inputItem}
                    required
                    value={formik.values.clientPointOfContact}
                    name="clientPointOfContact"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Client Contact Details"
                    //   error={formik.errors.clientPointOfContact}
                    helperText={
                      formik.touched.clientPointOfContact
                        ? formik.errors.clientPointOfContact
                        : ""
                    }
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    className={classes.inputItem}
                    value={formik.values.description}
                    name="description"
                    onChange={formik.handleChange}
                    label="Description(500 words)"
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.description
                        ? formik.errors.description
                        : ""
                    }
                    autoComplete="off"
                  />
                </Grid>
                {/* <Box className={classes.containerItem}>
                  <Box className={classes.inputItem}>
                    <Autocomplete
                      options={days}
                      multiple
                      disablePortal={true}
                      getOptionLabel={(option) =>
                        option?.isDeleted ? "" : option
                      }
                      onChange={(event, value) =>
                        formik.setFieldValue("internalMeetingDays", [
                          ...formik.values.internalMeetingDays,
                          value,
                        ])
                      }
                      renderInput={(params) => (
                        <TextField
                        size="small"
                          // fullWidth
                          {...params}
                          value={formik.values.internalMeetingDays}
                          required
                          name="internalMeetingDays"
                          label="Internal Meeting Days"
                          //   error={formik.errors.internalMeetingDays}
                          helperText={formik.errors.internalMeetingDays}
                        />
                      )}
                    ></Autocomplete>
                  </Box>
                  <Box className={classes.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Internal Meeting Time"
                        inputValue={formik.values.internalMeetingTime}
                        // format="hh:mm A"
                        value={formik.values.internalMeetingTime || null}
                        onChange={(newValue) => {
                          formik.setFieldValue("internalMeetingTime", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                          size="small"
                            required
                            fullWidth
                            {...params}
                            name="internalMeetingTime"
                            inputProps={{
                              ...params.inputProps,
                              placeholder: "hh:mm",
                            }}
                            //  error={formik.errors.internalMeetingTime}
                            helperText={formik.errors.internalMeetingTime}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box> */}
                {/* <Box className={classes.containerItem}>
                  <Box className={classes.inputItem}>
                    <Autocomplete
                      options={days}
                      multiple
                      disablePortal={true}
                      getOptionLabel={(option) =>
                        option?.isDeleted ? "" : option
                      }
                      onChange={(event, value) =>
                        formik.setFieldValue("clientMeetingDays", [
                          ...formik.values.clientMeetingDays,
                          value,
                        ])
                      }
                      renderInput={(params) => (
                        <TextField
                        size="small"
                          {...params}
                          required
                          value={formik.values.clientMeetingDays}
                          name="clientMeetingDays"
                          label="Client Meeting Days"
                          //   error={formik.errors.clientMeetingDays}
                          helperText={formik.errors.clientMeetingDays}
                        />
                      )}
                    ></Autocomplete>
                  </Box>
                  <Box className={classes.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Client Meeting Time"
                        required
                        // format="hh:mm"
                        value={formik.values.clientMeetingTime || null}
                        onChange={(newValue) => {
                          formik.setFieldValue("clientMeetingTime", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                          size="small"
                            fullWidth
                            required
                            {...params}
                            name="clientMeetingTime"
                            inputProps={{
                              ...params.inputProps,
                              placeholder: "hh:mm",
                            }}
                            //  error={formik.errors.clientMeetingTime}
                            helperText={formik.errors.clientMeetingTime}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box> */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Box sx={{ margin: "8px 20px" }}>
                <Button
                  onClick={formik.handleSubmit}
                  sx={{ color: "white" }}
                  variant="contained"
                >
                  Add Project
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </>
  );
};

export default CreateProject;
