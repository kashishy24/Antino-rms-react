import * as yup from "yup";

const CreateProjectSchema = yup.object({
  projectName: yup
    .string()
    .required("Project name is required")
    .matches(/^([^\s]*[A-Za-z0-9]\s*)*$/, "Enter valid data "),
  clientName: yup.string().required("Client name is required"),
  startDate: yup
    .date()
    .typeError("Enter a valid date")
    .required("Start date is required"),
  // startDate: yup
  //   .date("enter a valid date")
  //   .nullable()
  //   .transform((curr, orig) =>
  //     orig === "" || orig === "Invalid Date" ? null : curr
  //   )
  //   .required("Date of Joining Required"),
  // estimatedEndDate: yup.string().required("Estimated end date is required"),
  typeOfProject: yup.string().required("Project type is required").nullable(),
  // demoUrls: yup
  //   .string()
  //   .required("Demo URL is required")
  //   .matches(
  //     /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  //     "Enter a valid url"
  //   ),
  clientPointOfContact: yup
    .string()
    .required("Client contact is required")
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
      "Enter a valid mobile number"
    )
    .min(10, "please input valid number")
    .max(10, "please input valid number"),
  status: yup.string().required("Status is required").nullable(),
  techStack: yup.array().min(1, "Tech Stack is required"),
  // internalMeetingDays: yup.array().min(1, "Internal meeting days is required"),
  // internalMeetingTime: yup
  //   .string()
  //   .required("Internal meeting time is required")
  //   .nullable(),
  // clientMeetingDays: yup.array().min(1, "Client meeting days is required"),
  // clientMeetingTime: yup
  //   .string()
  //   .required("Client meeting time is required")
  //   .nullable(),
  // description: yup.string().max(500).required("Description is required"),
});
//   .shape({});

export default CreateProjectSchema;
