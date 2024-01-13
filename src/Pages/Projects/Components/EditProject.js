import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
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
import { editProject, getProject } from "../../../apis/ProjectApi";
import { useDispatch, useSelector } from "react-redux";
import { getTechStacks } from "../../../Redux/Slices/Lists/ListsSlice";
import { toast } from "react-toastify";
import { getProjects } from "../../../Redux/Slices/Project/ProjectsSlice";
import CreateProjectSchema from "./CreateProjectSchema";

const EditProject = ({ open, onClose, id }) => {
  const [project, setProject] = useState();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    getProject(id)
    .then((res) => setProject(res.data))
    .catch((error) => console.log(error?.response?.data?.message));
  }, [id]);
  console.log("getprojectdata",project)

  // useEffect(() => {
  //   try {
  //     const data = JSON.parse(project?.internalMeetingDaysAndTimings);
  //     setInternalMeetingDays(Object.keys(data));
  //     setInternalMeetingTime(Object.values(data)[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   try {
  //     const data = JSON.parse(project?.clientMeetingDaysAndTimings);
  //     setClientMeetingDays(Object.keys(data));
  //     setClientMeetingTime(Object.values(data)[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [project]);

  const useStyles = makeStyles({
    container: {
      gap: "10px",
    },
    containerItem: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      marginTop: "12px",
    },
    inputItem: {
      width: "100%",
    },
    paper: { minWidth: "500px" },
  });

  const classes = useStyles();

  const projectType = ["Fixed Scope Budget", "Fixed Scope Premium", "Developers On Demand", "Dedicated Team Model", "Shared Tech Team","Monthly Maintenance"];
  const status = ["Active", "Inactive"];


  const handleSubmit = (values) => {
    // const internalMeetingDaysAndTimings = {};
    // for (let day in internalMeetingDays) {
    //   internalMeetingDaysAndTimings[
    //     internalMeetingDays[day]
    //   ] = `${internalMeetingTime}`;
    // }

    // const clientMeetingDaysAndTimings = {};
    // for (let day in clientMeetingDays) {
    //   clientMeetingDaysAndTimings[
    //     clientMeetingDays[day]
    //   ] = `${clientMeetingTime}`;
    // }

    const techStackIds = values?.techStack.map((stack) => stack?._id);

    let obj = {
      id: id,
      updateData: {
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
      },
    };

    console.log(values);
    if (obj.updateData.status === "Inactive") {
      obj.updateData.developers = project?.developers
        ? project?.developers
        : [];
    }

    editProject(obj)
      .then((res) => {
        toast(res?.message);
        setTimeout(() => {
          formik.handleReset();
          onClose();
          dispatch(getProjects());
        }, 1000);
      })
      .catch((error) => toast(error?.response?.data?.message));
  };

  console.log(project , "loging project");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: project?.projectName ? project?.projectName : "",
      clientName: project?.clientName ? project?.clientName : "",
      startDate: project?.startDate,
      estimatedEndDate: project?.estimatedEndDate
        ? project?.estimatedEndDate
        : "",
      techStack: project?.techStack ? project?.techStack : [],
      typeOfProject: project?.typeOfProject ? project?.typeOfProject : "",
      demoUrls: project?.demoUrls ? project?.demoUrls : "",
      clientPointOfContact: project?.clientPointOfContact
        ? project?.clientPointOfContact
        : "",
      status: project?.status ? project?.status : "",
      description: project?.description ? project?.description : "",
      // internalMeetingDaysAndTimings: project?.internalMeetingDaysAndTimings
      //   ? project?.internalMeetingDaysAndTimings
      //   : "",
      // clientMeetingDaysAndTimings: project?.clientMeetingDaysAndTimings
      //   ? project?.clientMeetingDaysAndTimings
      //   : "",
    },
    validationSchema: CreateProjectSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  console.log(formik, "consoling");

  const dispatch = useDispatch();

  const techStack = useSelector((store) => store?.lists?.techStacks);
  console.log("formik.touched.techStack",techStack);

  useEffect(() => {
    dispatch(getTechStacks());
  }, []);


  // const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // console.log(formik?.values)
  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit}>
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
                Edit Project
                <Button
                  sx={{
                    color: "black",
                    fontSize: "1rem",
                  }}
                  onClick={onClose}
                >
                  <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
                </Button>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="Project Name"
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="Client Name"
                    helperText={
                      formik.touched.clientName ? formik.errors.clientName : ""
                    }
                    autoComplete="off"
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={6}>
                    {" "}
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      label="Start date"
                      value={formik.values.startDate || null}
                      onChange={(newValue) =>
                        formik.setFieldValue(
                          "startDate",
                          moment(newValue).format("MM-DD-YYYY")
                        )
                      }
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
                    {" "}
                    <DesktopDatePicker
                      label="Estimated End date "
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.estimatedEndDate || null}
                      onBlur={formik.handleBlur}
                      onChange={(newValue) =>
                        formik.setFieldValue(
                          "estimatedEndDate",
                          moment(newValue).format("MM-DD-YYYY")
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          {...params}
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
                    freeSolo
                    options={
                      techStack?.filter(
                        (option) =>
                          !formik?.values?.techStack.some(
                            (item) => item === option?._id
                          )
                      ) 
                    }
                    disableCloseOnSelect={true}
                    multiple
                    getOptionLabel={(option) => option?.name }
                    value={formik.values.techStack}
                    onBlur={formik.handleBlur}
                    onChange={(event, value) =>
                      formik.setFieldValue("techStack", value)
                    }
                    filterSelectedOptions
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        name="techStack"
                        label="Tech Stack"
                        value={formik.values.techStack}
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
                    options={projectType || []}
                    className={classes.inputItem}
                    name="typeOfProject"
                    getOptionLabel={(option) =>
                      option?.isDeleted ? "" : option
                    }
                    value={formik.values.typeOfProject}
                    onBlur={formik.handleBlur}
                    onChange={(event, value) =>
                      formik.setFieldValue("typeOfProject", value)
                    }
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        value={formik.values.typeOfProject}
                        name="typeOfProject"
                        label="Project Type"
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
                    options={status || []}
                    className={classes.inputItem}
                    name="status"
                    getOptionLabel={(option) =>
                      option?.isDeleted ? "" : option
                    }
                    value={formik.values.status}
                    onBlur={formik.handleBlur}
                    onChange={(event, value) =>
                      formik.setFieldValue("status", value)
                    }
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        value={formik.values.status}
                        name="status"
                        label="Status"
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
                    required
                    className={classes.inputItem}
                    value={formik.values.demoUrls}
                    name="demoUrls"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="Demo urls"
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="Client Contact Details"
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
                    required
                    className={classes.inputItem}
                    value={formik.values.description}
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="Description(500 words)"
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
                      options={days || []}
                      multiple
                      getOptionLabel={(option) =>
                        option?.isDeleted ? "" : option
                      }
                      value={internalMeetingDays}
                      onChange={(event, value) => setInternalMeetingDays(value)}
                      renderInput={(params) => (
                        <TextField
                        size="small"
                          fullWidth
                          {...params}
                          required
                          name="internalMeetingDaysAndTimings"
                          label="Internal Meeting Days"
                        />
                      )}
                    ></Autocomplete>
                  </Box>
                  <Box className={classes.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Internal Meeting Time"
                        required
                        onChange={(newValue) => {
                          setInternalMeetingTime(newValue);
                        }}
                        value={internalMeetingTime || null}
                        renderInput={(params) => (
                          <TextField
                          size="small"
                            fullWidth
                            required
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: "hh:mm",
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box> */}
                {/* <Box className={classes.containerItem}>
                  <Box className={classes.inputItem}>
                    <Autocomplete
                      options={days || []}
                      multiple
                      getOptionLabel={(option) =>
                        option?.isDeleted ? "" : option
                      }
                      value={clientMeetingDays}
                      onChange={(event, value) => setClientMeetingDays(value)}
                      renderInput={(params) => (
                        <TextField
                        size="small"
                          {...params}
                          required
                          name="clientMeetingDaysAndTimings"
                          label="Client Meeting Days"
                        />
                      )}
                    ></Autocomplete>
                  </Box>
                  <Box className={classes.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Client Meeting Time"
                        required
                        value={clientMeetingTime || null}
                        onChange={(newValue) => {
                          setClientMeetingTime(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                          size="small"
                            fullWidth
                            required
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: "hh:mm",
                            }}
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
                  Save Project
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </>
  );
};

export default EditProject;
