import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { assignGroup } from "../../../apis/TeamsApi";
import * as yup from "yup";
import { getGroups } from "../../../Redux/Slices/Lists/ListsSlice";
import { getTeams } from "../../../Redux/Slices/Teams/TeamSlice";

const AssignGroup = ({ open, onClose, userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups());
  }, []);

  const { groups } = useSelector((store) => store?.lists);
  console.log(groups,"hhhhhhhhhhhhh")
  const group_name = groups
  ?.map((group) => {
      return {
        groupName: group?.group[0]?.groupName,
      };
    });

  const schema = yup.object().shape({
    groupId: yup.string().required("Group is a required field."),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    assignGroup({
      ...data,
      userId: userId,
    })
      .then((resp) => {
        toast("Group Assigned Successfully.");
        dispatch(getTeams());
        onClose();
      })
      .catch((error) => {
        toast(error?.response?.data?.message);
      });
  };

  return (
    <form>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              minWidth: "18rem",
              justifyContent: "space-between",
            }}
          >
            <Typography>Assign Group</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container flexDirection={"column"} gap={2} mb={2}>
          {console.log(groups[0]?.group[0]?.groupName,"...............................")}
          
            <Autocomplete
              options={groups || []}
              getOptionLabel={(role) => role?.group[0]?.groupName}
              // {...register("designation")}
              onChange={(e, value) => setValue("groupId", value?._id)}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  required
                  name="group"
                  label="Group"
                  helperText={errors && errors?.groupId?.message}
                />
              )}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {option?.group[0]?.groupName}
                  </li>
                );
              }}
            />
          </Grid>
          <Box display="flex" justifyContent={"center"}>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ color: "white" }}
            >
              Assign
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default AssignGroup;
