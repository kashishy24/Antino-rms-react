import {
  Autocomplete,
  Button,
  createFilterOptions,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onboardDeveloper } from "../../../apis/ProjectApi";
import { getDevelopersProject} from "../../../Redux/Slices/Lists/ListsSlice";
import { get_users } from "../../../Redux/Slices/getUsersSlice";
import { getProjects } from "../../../Redux/Slices/Project/ProjectsSlice";
import { toast } from "react-toastify";

const OnboardDialog = ({ open, onClose, projectId }) => {
  const query = "/api/v2/users/search?isDeleted=false";
  const { dataPerPage, currentPage } = useSelector((state) => state?.project);
  const {developersProject,totalDevelopers}=useSelector((state)=>state?.lists)
  console.log("newdeveloeprcount",totalDevelopers)
  const billingType = ["Billable", "Non Billable"];
  const projectType = ["Full Time", "Part Time"];

  const formik = useFormik({
    initialValues: {
      userId: "",
      onBoardingDate: "",
      projectType: "",
      billingType: "",
    },

    onSubmit: async (values) => {
      
      // values.developerId = values.developerId.map((developer) => developer.first());
      console.log(values, "@@@@@");
      values.userId=values.userId[0]._id
      // values.developerId[0].values
      values.projectId = projectId;
      onboardDeveloper(values)
        .then((res) => {
          toast(res?.message);
          setTimeout(() => {
            dispatch(getProjects());
            closeHandler();
          }, 1000);
        })
        .catch((error) => toast(error?.response?.data?.message));
    },
    
  });

  const closeHandler = () => {
    onClose();
  };

  // useEffect(() => {
  //   formik.setFieldValue("projectId", projectId);
  // }, [projectId]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDevelopersProject(totalDevelopers));
    // dispatch(getDevelopers(query))
  }, []);

  const { developers,newdevelopers } = useSelector((store) => store?.lists);
  // console.log("developeravaable",newdevelopers)
  return (

    
    <>
      <form onSubmit={formik.handleSubmit}>
        <Dialog
          open={open}
          onClose={closeHandler}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "465px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Onboard developer</Typography>
              <Typography sx={{ cursor: "pointer" }} onClick={closeHandler}>
                <CloseIcon sx={{ cursor: "pointer" }} onClick={closeHandler} />
              </Typography>
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box mb={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  label="Onboarding date"
                  value={formik.values.onBoardingDate || null}
                  onChange={(newValue) =>
                    formik.setFieldValue(
                      "onBoardingDate",
                      moment(newValue).format("MM-DD-YYYY")
                    )
                  }
                  renderInput={(params) => (
                    <TextField required fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box mb={2}>
              <Autocomplete
                options={
                  developersProject.filter(
                    (developer) => developer.isDeleted !== true
                  ) || []
                }
                getOptionLabel={(option) =>
                  option?.isDeleted
                    ? ""
                    : `${option?.fullName} (${option?.techStack[0]?.name})`
                }
                multiple
                filterSelectedOptions
                // disableCloseOnSelect={false}
                onChange={(event, value) =>
                  formik.setFieldValue("userId", value)
                }
                // value={formik?.values?.developerId}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    sx={{
                      minWidth: "200px  !important",
                    }}
                    value={developersProject?.firstName}
                    name="developer"
                    label="Developer"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    // console.log(option,'optiondataon')
                    <li {...props} key={option._id}>
                      {option?.isDeleted
                        ? " "
                        : `${option?.fullName} (${option?.techStack[0]?.name})`}
                    </li>
                  );
                }}
              />
            </Box>

            <Box>
              <TextField
                mb={2}
                select
                sx={{ marginRight: "16px !important", width: "200px" }}
                name="projectType"
                onChange={formik.handleChange}
                label="Engagement Type"
                value={formik.values.projectType}
              >
                {projectType?.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
              <TextField
                mb={2}
                select
                sx={{
                  width: "200px",
                }}
                name="billingType"
                onChange={formik.handleChange}
                label="Billing Type"
                value={formik.values.billingType}
              >
                {billingType.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button onClick={formik.handleSubmit} variant="contained">
                Submit
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};

export default OnboardDialog;
