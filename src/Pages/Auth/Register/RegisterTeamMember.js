import * as React from 'react';
import { Grid, TextField, Box, Typography, Button, MenuItem } from '@mui/material';
import background from '../../../Assets/Images/background/1.jpg';
import '../../../Assets/CSS/Auth/Signup.css';
// import { useNavigate } from 'react-router-dom';
import RegTeamMemSchema from './RegTeamMemSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { reg_tm_member_vld } from '../../../Redux/Slices/Auth/RegTeamMemSlice';
import { useState } from 'react';

export default function RegisterDeveloper() {
  
  // const {isLoading,msg}= useSelector((store) => store.getTeam)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegTeamMemSchema),
  });
  const onSubmit = (data) =>{
    dispatch(reg_tm_member_vld(data));
    //  setModalIsOpen(true);
  } 
  const [userType,setUserType]=useState('');
 
  const handleChange = (event) => {
    setUserType(event.target.value);
    console.log('akhkhdsdgaksjdh')
  }; 

  return (
    <>
      <Grid container sx={{ overflow: 'hidden', height: '100vh' }}>
        <Grid item md={5} xs={12} className="signupinputcontainer">
          <Grid
            container
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: '80%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* <Grid container>
              {' '}
              <img src={logo} alt="company logo" /> for adding  above FirstNname
            </Grid> */}

            <Grid item md={5.5} xs={12} className="signupinputbox">
              <Box
                sx={{
                  '& .MuiTextField-root': { marginTop: '1rem', width: '100%' },
                  width: '100%',
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  name="firstName"
                  type={'text'}
                  size="small"
                  {...register('firstName')}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Last Name"
                  name="lastName"
                  type={'text'}
                  size="small"
                  {...register('lastName')}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Designation"
                  size="small"
                  type={'text'}
                  name="designation"
                  {...register('designation')}
                  error={errors.designation ? true : false}
                  helperText={errors.designation?.message}
                />
                 {/* <TextField
                  required
                  id="outlined-required"
                  label="User Type"
                  size="small"
                  type={'text'}
                  name="userType"
                  {...register('userType')}
                  error={errors.userType ? true : false}
                  helperText={errors.userType?.message}
                /> */}
                <TextField
                    required
                    id="outlined-required"
                    name="userType"
                    select
                    label="User Type"
                    size="small"
                    onChange={handleChange}
                    // value={userType}
                    
                    {...register('userType')}
                    error={errors.userType ? true : false}
                    helperText={errors.userType?.message}
                    
                  >
                     <MenuItem key='pm' value='PM'>PM</MenuItem>
                     <MenuItem key='tl' value='TL'>TL</MenuItem>
                  </TextField>
              </Box>
            </Grid>

            <Grid item md={5.5} xs={12} className="signupinputbox">
              <Box
                sx={{
                  '& .MuiTextField-root': { marginTop: '1rem', width: '100%' },
                  width: '100%',
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Year of Experience"
                  size="small"
                  type={'number'}
                  name="yearOfExperience"
                  {...register('yearsOfExperience')}
                  error={errors.yearOfExperience ? true : false}
                  helperText={errors.yearOfExperience?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  size="small"
                  name="email"
                  type={'email'}
                  {...register('email')}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Phone Number"
                  size="small"
                  type={'tel'}
                  name="phoneNumber"
                  {...register('phoneNumber')}
                  error={errors.phoneNumber ? true : false}
                  helperText={errors.phoneN99umber?.message}
                />
               <TextField
                    required
                    id="outlined-required"
                    label="Reporting PM"
                    size="small"
                    type={'text'}
                    name="reportingPm"
                    {...register('reportingPm')}
                    error={errors.reportingPm? true : false}
                    helperText={errors.reportingPm?.message}
                  />
				  <TextField
                    required
                    id="outlined-required"
                    label="Remarks"
                    size="small"
                    type={'text'}
                    name="remarks"
                    {...register('remarks')}
                    error={errors.remarks? true : false}
                    helperText={errors.remarks?.message}
                  />

              </Box>
            </Grid>

            <Grid container justifyContent="center">
              <Button
                type="submit"
                className="signupbutton"
                variant="contained"
              >
                Register Team Member
              </Button>
              <Typography
                variant="body"
                display="block"
                gutterBottom
                sx={{ marginTop: '1rem' }}
              >
              
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={7}>
          <img
            src={background}
            className="sidebackground"
            alt="sidebackground"
          />
        </Grid>
      </Grid>
      

    </>
  );
}
