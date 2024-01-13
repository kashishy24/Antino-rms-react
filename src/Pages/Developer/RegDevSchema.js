import * as yup from "yup";

let RegDevSchema = yup.object().shape({
  // fullName: yup
  //   .string()
  //   .required("First Name Required")
  //   .matches(
  //     /^[^-\s][a-zA-Z0-9_\s-]+$/,
  //     "Only alphabets are allowed for this field "
  //   )
  //   .max(30, "maximum 20 letters are allowed"),

  joiningDate: yup
    .date()
    .nullable()
    .typeError("Enter a valid Date")
    .required("Date of Joining Required"),

  // joiningDate: yup
  //   .date()
  //   .nullable()
  //   .transform((curr, orig) => (orig === "" ? null : curr))
  //   .required("Date of Joining Required"),

  workingExperienceInYears: yup
    .number()
    .typeError("Experience(Years) Required")
    .required()
    .integer("This field only accept Integer")
    .moreThan(-1, "Value of Year Should be more than or equal to 0"),

  workingExperienceInMonths: yup
    .number()
    .typeError("Experience(Months) Required")
    .required()
    .integer("This field only accept Integer")
    .moreThan(-1, "Value of month Should be more than or equal to 0")
    .lessThan(13, "Value of month Should be less than 12"),

  email: yup.string().email().required("Email Required"),

  phoneNumber: yup
    .string()
    .required("Mobile Number Required")
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
      "Enter a valid mobile number"
    )
    .min(10, "please input valid number")
    .max(10, "please input valid number"),

  // matches(
  //    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  //    'Enter a valid mobile number'
  // )

  // emergencyContactNumber: yup
  //   .string()
  //   .min(10, "please input valid number")
  //   .max(10, "please input valid number"),

  empId: yup
    .string()
    .required("Employee ID Required")
    .matches(
      /^ANTINO\d+$/,
      "Only Capital alphabets and numbers are allowed for this field "
    ),

  techStack: yup.string().required("Tech Stack Required"),
  // password: yup
  // .string()
  // .required("Password  Required")
  // .matches(
  //   /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]+[0-9]+$/,
  //   " First alphabets ,special character & numbers are allowed for this field "
  // ),
  // secondaryTechStack: yup.string().required("Secondary Tech Stack Required"),

  designation: yup.string().required("Designation Required"),
  seniority: yup.string().required("seniority Required"),
});

export default RegDevSchema;
