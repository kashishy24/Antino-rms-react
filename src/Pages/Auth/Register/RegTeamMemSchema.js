import * as yup from 'yup';

let RegTeamMemSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    .max(20, 'maximum 20 letters are allowed'),

  lastName: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    .max(20, 'maximum 20 letters are allowed'),

  designation: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),

  yearsOfExperience: yup
    .string()
    .required()
    .matches(/^\d+$/, 'The field should have digits only'),

  email: yup.string().email().required(),
  
  userType: yup
  .string()
  .required()
  .matches(/^[aA-zZ]+$/, 'Only alphabets are allowed for this field ')
  .max(2, 'maximum 2 letters are allowed'),

  phoneNumber: yup
    .string()
    .required()
    .matches(/^\d+$/, 'The field should have digits only')
    .min(10, 'please input valid number')
    .max(10, 'please input valid number'),
});

export default RegTeamMemSchema;
