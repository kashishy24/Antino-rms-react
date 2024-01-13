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

import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getProjects,
  removeDeveloper,
} from "../../../Redux/Slices/Project/ProjectsSlice";

// const groupSchema = yup.object().shape({
//   developers: yup.array().required("Developers are Required"),
// });

const DeboardDialog = ({ open, onClose, developers, projectId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      developerId: "",
    },
    // resolver: yupResolver(groupSchema),
  });
  const dispatch = useDispatch();

  const submitHandler = (data) => {
    const requiredData = { projectId, ...data };
    if (requiredData.developerId === "") {
      toast("Add Developer");
    } else {
      dispatch(removeDeveloper(requiredData)).then((response) => {
        toast("Developers removed successfully");
        setTimeout(() => {
          reset();
          dispatch(getProjects());
          onClose();
        }, 1000);
      });
    }
  };
  // console.log(developers);
  return (
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
            Remove Developer
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
              <Autocomplete
                options={developers || []}
                getOptionLabel={(item) =>
                  item?.firstName + " " + item?.lastName
                }
                onChange={(e, value) => setValue("developerId", value?._id)}
                filterSelectedOptions
                sx={{ width: "100%", marginTop: "1rem" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    name="developerId"
                    label="Developer"
                    //   helperText={errors && errors?.developers?.message}
                  />
                )}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit(submitHandler)}
            variant="contained"
            sx={{ color: "white" }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeboardDialog;
