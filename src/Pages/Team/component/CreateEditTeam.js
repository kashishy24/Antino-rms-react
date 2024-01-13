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
import React, { useEffect, useMemo } from "react";
import { getTeams } from "../../../Redux/Slices/Teams/TeamSlice";
import { getAllDesignation } from "../../../Redux/Slices/DesignationSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { addMember, editMember } from "../../../apis/TeamsApi";

const CreateEditTeam = ({ open, onClose, user }) => {
  const createSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Name Required"),
    email: yup.string().email().required("Email Required"),
    designation: yup.string().required("Designation Required"),
    password: yup
      .string()
      .required("Password Required ")
      .matches(/^\S*$/, "Enter a valid password"),
    // password: yup
    //   .string()
    //   .required("Password Required ")
    //   .matches(/^\S*$/, "Enter a valid password"),
  });

  //   console.log(user);

  const editSchema = yup.object().shape({
    fullName: yup
      .string()
      .required(),
    email: yup.string().email().required(),
    designation: yup.string().required(),
    password: yup.string().matches(/^\S*$/, "Enter a valid password"),
    // password: yup.string(),
  });
  const designations = ["AVP" , "VP" , "PM"];


  const { error, isLoading } = useSelector(
    (store) => store?.designation
  );
  if (error) {
    toast(error);
    console.log(error);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      console.log(user,"lakjdflhsdaf");
      return {
        designation: user?.designationName,
        email: user?.email,
        fullName: user?.name,
      };
    }, [user]),
    resolver: yupResolver(user ? editSchema : createSchema),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDesignation());
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    if (!data.password) {
      delete data.password;
    }
    if (user) {
      const obj = {
        ...data,
        id: user?.id,
      };
      editMember(obj)
        .then((response) => {
          toast("Team member successfully updated.");
          dispatch(getTeams());
          onClose();
        })
        .catch((error) => {
          toast(error?.response?.data?.msg);
        });
    } else {
      addMember(data)
        .then((response) => {
          toast("Team member successfully added.");
          // console.log(response);
          dispatch(getTeams());
          onClose();
        })
        .catch((error) => {
          toast(error?.response?.data?.message);
        });
    }
  };
  console.log(errors,"ahlkandln")
  return (
    <form>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              minWidth: "18rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              {user ? "Edit Team Member" : "Add Team Member"}
            </Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            container
            flexDirection={"column"}
            gap={2}
            mb={2}
            sx={{
              "& .MuiFormHelperText-root": {
                color: "#D32F2F",
              },
            }}
          >
            <TextField
              name="fullName"
              label="Name"
              required
              autoComplete="off"
              {...register("fullName")}
              helperText={errors && errors?.fullName?.message}
            />
            <TextField
              required
              name="email"
              label="Email"
              {...register("email")}
              autoComplete="off"
              helperText={errors && errors?.email?.message}
            />
            <Autocomplete
              options={designations || []}
              getOptionLabel={(role) => role}
              defaultValue={user?.designationName}
              // value={user ? user?.designation?._id : ""}
              onChange={(e, value) => {
                // console.log(value._id);
                setValue("designation", value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  required
                  name="designation"
                  label="Designation"
                  helperText={errors && errors?.designation?.message}
                />
              )}
            />
            {/* {!user && (
              <TextField
                name="bodyPassword"
                required
                label="Password"
                // type={"password"}
                {...register("bodyPassword")}
                helperText={errors && errors?.bodyPassword?.message}
              />
            )} */}
            <TextField
              name="password"
              required
              label="Password"
              type="password"
              autoComplete="off"
              // type={"password"}
              {...register("password")}
              helperText={errors && errors?.password?.message}
            />
          </Grid>
          <Box display="flex" justifyContent={"center"}>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ color: "white" }}
            >
              {user ? "Save" : "Add"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </form>
  );
};
export default CreateEditTeam;
