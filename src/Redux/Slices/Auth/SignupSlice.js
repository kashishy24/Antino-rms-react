import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../../apiclient';


const initialState = {
  isLoading: false,
  signUpItems: [],
};
export const getSignUpValidation = createAsyncThunk(
  'signUp/getSignUpValidation',
  async (data1) => {
     console.log(data1)
    
    try {
      let res = await api.post('auth/signup' ,{
          firstName: 'thishgfvh',
          lastName: 'djjebd',
          designation: 'Project manager',
          userType: 'PM',
          yearsOfExperience: '2.5',
          email: 'ppankaj@gmail.com',
          phoneNumber: '7005604849',
        })
        console.log(res)
      return res.data;
    } catch (error){console.log(error)}
  
  }
);

const SignupSlice = createSlice({
  name: 'signUp',
  initialState,
  reducer:{},
  extraReducers: {
    [getSignUpValidation.pending]:(state)=>{
      state.isLoading = false;
    },
    [getSignUpValidation.fulfilled]:(state,action)=>{
    console.log(action)
    console.log(action.payload);
    },
    [getSignUpValidation.rejected]:(state)=>{
      state.isLoading = false;
    },
  }
  ,
});

// Action creators are generated for each case reducer function
// export const {} = SignupSlice.actions;

export default SignupSlice.reducer;
// var data = JSON.stringify({
//   firstName: 'thishgfvh',
//   lastName: 'djjebd',
//   designation: 'Project manager',
//   userType: 'PM',
//   yearsOfExperience: '2.5',
//   email: 'nikkitam1999@gmail.com',
//   phoneNumber: '7005604849',
// });

// var config = {
//   method: 'post',
//   url: 'https://rms-be.antino.ca/superAdmin/register',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   data: data,
// };

// (builder) => {
//   builder
//     .addCase(getSignUpValidation.pending, (state) => {
//       state.isLoading = false;
//     })
//     .addCase(getSignUpValidation.fulfilled, (state, action) => {
//       console.log(action)
//       console.log(action.payload);
//     })
//     .addCase(getSignUpValidation.rejected, (state) => {
//       state.isLoading = false;
//     });
//   }