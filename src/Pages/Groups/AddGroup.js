import {
  Autocomplete,
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
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, getGroups } from "../../Redux/Slices/Groups/GroupsSlice";
import { toast } from "react-toastify";
import { updateGroup } from "../../apis/GroupApi";

const groupSchema = yup.object().shape({
  groupName: yup
    .string()
    .required("This Field is Required")
    .matches(/^([^\s]*[A-Za-z0-9]\s*)*$/, "Enter valid data "),
  user_id: yup.array().min(1, "This Field is Required")
  // teamLead: yup.string().required("This Field is Required"),
});

const AddGroup = ({ open, onClose, projectManagers, group , status }) => {
  const { error } = useSelector((store) => store?.groups);
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: group?.groupName,
      user_id: group?.assignedPm ? group?.assignedPm?.map((pm) => pm._id) : [],
      teamLead: group?.teamLead?._id,
    },
    resolver: yupResolver(groupSchema),
  });
  useEffect(() => {
    setValue("groupName", group?.groupName);
    setValue(
      "user_id",
      group?.assignedPm ? group?.assignedPm?.map((pm) => pm._id) : []
    );
    setValue("teamLead", group?.teamLead?._id);
  }, [group]);
  const dispatch = useDispatch();
  const [isFresher, setIsFresher] = useState("true");

  // console.log(useForm()?.defaultValues);
  const handleChange = (event) => {
    setIsFresher(event.target.value);
  };

  const submitHandler = (data) => {
    // console.log(data);
    if (group) {
      const obj = {
        ...data,
        id: group.id,
      };
      console.log(data, "hladhfkladhf");
      // { group_name: data.groupName, id: group.id }
      updateGroup(obj).then((res) => {
        toast("Group updated successfully");
        setTimeout(() => {
          reset();
          onClose();
          dispatch(getGroups(status));
        }, 1000);
      });
    } else {
      console.log(data);
      dispatch(addGroup(data)).then((response) => {
        if (!response?.error) {
          toast("Group created successfully");
          setTimeout(() => {
            reset();
            onClose();
            dispatch(getGroups(status));
          }, 1000);
        }
      });
    }
  };

  const closeHandler = () => {
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
          close={closeHandler}
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
              {group ? "Edit Group" : "Add Group"}
              <Button
                sx={{
                  fontSize: "13px",
                  minWidth: "0px",
                  padding: "0px",
                }}
                onClick={closeHandler}
              >
                <CloseIcon/>
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
                <TextField
                  label="Group Name"
                  name="groupName"
                  type={"text"}
                  size="small"
                  // defaultValue={group?.groupName}
                  // defaultValue="hello"
                  sx={{ width: "100%", marginTop: "1rem" }}
                  autoComplete="off"
                  {...register("groupName")}
                  error={errors.groupName ? true : false}
                  helperText={errors.groupName?.message}
                />
                <Autocomplete
                  options={projectManagers || []}
                  getOptionLabel={(item) => item?.fullName}
                  size="small"
                  onChange={(event, value) =>
                    setValue(
                      "user_id",
                      value?.map((item) => item?._id)
                    )
                  }
                  defaultValue={group?.assignedPm ? group?.assignedPm : []}
                  disableCloseOnSelect={true}
                  filterSelectedOptions
                  multiple
                  sx={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  isOptionEqualToValue={(option, compare) => {
                    return option._id === compare._id;
                  }}
                  renderInput={(params) => (
                    <div>
                      <TextField
                        fullWidth
                        required
                        {...params}
                        name="user_id"
                        label="Project Manager"
                        error={errors.user_id ? true : false}
                        helperText={errors?.user_id?.message}
                      ></TextField>
                    </div>
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option?.fullName}
                      </li>
                    );
                  }}
                />
                <Autocomplete
                  options={projectManagers || []}
                  getOptionLabel={(item) => item?.firstName}
                  size="small"
                  onChange={(event, value) => setValue("teamLead", value?._id)}
                  filterSelectedOptions
                  sx={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  defaultValue={group?.teamLead}
                  isOptionEqualToValue={(option, compare) => {
                    return option._id === compare._id;
                  }}
                  renderInput={(params) => (
                    <div>
                      <TextField
                        fullWidth
                        required
                        {...params}
                        name="teamLead"
                        label="Team Lead"
                        error={errors.teamLead ? true : false}
                        helperText={errors?.teamLead?.message}
                      />
                    </div>
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {option?.firstName}
                      </li>
                    );
                  }}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleSubmit(submitHandler)}
              sx={{ color: "white" }}
            >
              {group ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AddGroup;
