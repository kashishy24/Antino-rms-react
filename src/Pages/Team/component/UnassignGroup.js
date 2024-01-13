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
import * as yup from "yup";
import { unassignGroup } from "../../../apis/TeamsApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTeams } from "../../../Redux/Slices/Teams/TeamSlice";

const groupSchema = yup.object().shape({
  developers: yup.array(),
});

// const handleUnassignGroup = () => {
//   const obj = {
//     group_id: user?.group?._id,
//     user_id: user?.id,
//   };
//   unassignGroup(obj)
//     .then((res) => {
//       toast("Group unassigned successfully");
//       dispatch(getTeams());
//       setIsSuccess(true);
//     })
//     .catch((error) => toast(error));
// };

const UnassignGroup = ({ open, onClose, groupData ,gpid,gpName}) => {
  console.log("gpname",gpName)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      group_id: "",
    },
    resolver: yupResolver(groupSchema),
  });
  const dispatch = useDispatch();

  const submitHandler = (data) => {
    const requiredData = { group_id: data?.group_id, user_id: groupData.id };

    console.log(requiredData);
    if (requiredData.group_id === "") {
      toast("Add group");
    } else {
      unassignGroup(requiredData).then((response) => {
        toast("Group Unassigned successfully");
        setTimeout(() => {
          reset();
          dispatch(getTeams());
          onClose();
        }, 1000);
      });
    }
  };

  // const handleDeveloperChange = (value) => {
  //   console.log(value);
  //   const data = getValues()?.developers;
  //   setValue("developers", [...data, value?.id]);
  //   console.log(getValues());
  // };

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
              UnAssign Group
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
            <Box spacing={1}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                  flexDirection: "column",
                }}
              >
                <Autocomplete
                  options={gpName || []}
                  getOptionLabel={(item) => item.groupName}
                  onChange={(e, value) => setValue("group_id", value?._id)}
                  filterSelectedOptions
                  sx={{ width: "100%", marginTop: "1rem" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      name="group_id"
                      label="group"
                      helperText={errors && errors?.group_id?.message}
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option?.groupName}
                      </li>
                    );
                  }}
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
              Unassign
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default UnassignGroup;
