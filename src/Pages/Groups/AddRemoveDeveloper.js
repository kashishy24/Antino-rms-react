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
import {
  addDevelopers,
  getGroups,
  removeDeveloper,
} from "../../Redux/Slices/Groups/GroupsSlice";
import { toast } from "react-toastify";

const groupSchema = yup.object().shape({
  developers: yup.array(),
});

const AddRemoveDeveloper = ({
  open,
  onClose,
  developers,
  groupId,
  remove,
}) => {
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
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //  groupId: '',
      developers: [],
      developerId: "",
    },
    resolver: yupResolver(groupSchema),
  });
  const dispatch = useDispatch();
  const [isFresher, setIsFresher] = useState("true");

  const submitHandler = (data) => {
    const requiredData = { groupId, ...data };
    if (remove == true) {
      delete requiredData.developers;
      if (requiredData.developerId === "") {
        toast("Add Developer");
      } else {

        dispatch(removeDeveloper(requiredData)).then((response) => {
          // console.log(response);
          if (response.payload.status === 404) {
            toast("Error");
          } else {
            // toast("Developers removed successfully");
            setTimeout(() => {
              reset();
              dispatch(getGroups());
              onClose();
            }, 1000);
          }
        });
      }
    } else {
      if (requiredData.userId.length === 0) {
        toast("Add Developers");
      } else {
        dispatch(addDevelopers(requiredData)).then((response) => {
          if (response?.error) {
            toast(response.payload.data.message);
          } else {
            toast("Developers added successfully");
            setTimeout(() => {
              reset();
              dispatch(getGroups());
              onClose();
            }, 1000);
          }
        });
      }
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
              {remove == true ? "Remove Developer" : "Add Developer"}
              <Button
                
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
                {remove == true ? (
                  <Autocomplete
                    options={developers || []}
                    getOptionLabel={(item) =>
                      `${item?.fullName})`
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
                        helperText={errors && errors?.developers?.message}
                      />
                    )}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option._id}>
                          {option?.isDeleted
                            ? ""
                            : `${option?.fullName}`}
                        </li>
                      );
                    }}
                  />
                ) : (
                  <Autocomplete
                    id="outlined-required"
                    options={developers || []}
                    getOptionLabel={(item) =>
                      `${item?.fullName}`
                    }
                    size="small"
                    //    value={}
                    onChange={(event, value) =>
                      setValue(
                        "userId",
                        value?.map((item) => item?._id)
                      )
                    }
                    disableCloseOnSelect={true}
                    filterSelectedOptions
                    multiple
                    sx={{
                      width: "100%",
                      marginTop: "1rem",
                    }}
                    renderInput={(params) => (
                      <div>
                        <TextField
                          fullWidth
                          required
                          {...params}
                          name="userId"
                          label="Developers"
                          helperText={errors && errors?.developers?.message}
                        ></TextField>
                      </div>
                    )}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option._id}>
                          {option?.isDeleted
                            ? ""
                            : `${option?.fullName}`}
                        </li>
                      );
                    }}
                  />
                )}

                {/* <TextField
                           required
                           id='outlined-required'
                           select
                           label='Developers'
                           name='developers'
                           type={'text'}
                           size='small'
                           onChange={handleChange}
                           defaultValue=''
                           sx={{ width: '100%', marginTop: '1rem' }}
                           autoComplete='off'
                           //    SelectProps={{ multiple: true }}
                           {...register('user_id')}
                           error={errors.user_id ? true : false}
                           helperText={errors.user_id?.message}>
                           {developers?.map(developer => (
                              <MenuItem key={developer.name} value={developer._id}>
                                 {`${developer.firstName} ${developer.lastName}`}
                              </MenuItem>
                           ))}
                        </TextField> */}
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit(submitHandler)}
              variant="contained"
              sx={{ color: "white" }}
            >
              {remove == true ? "Remove" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AddRemoveDeveloper;
