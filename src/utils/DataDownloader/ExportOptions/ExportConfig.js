import moment from "moment"
// use this fn to format the array of object and make it string 
function FormatArray(array) {
  let response = ""
  for (let item of array) {
    response += `${item.name ?? ""} `
  }
  return response

}
export const DeveloperConfig = [
  {
    valueHeader: "Full Name",
    valueKey: "fullName",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Availability",
    valueKey: "isAvailable",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Group",
    valueKey: "group",
    valueFormatter: value => (value ? FormatArray(value) : "NA"),
  },
  {
    valueHeader: "Project Manager",
    valueKey: "reportingPm",
    valueFormatter: value => (value ? FormatArray(value) : "NA"),
  },
  {
    valueHeader: "Projects",
    valueKey: "projects",
    valueFormatter: value => (value ? FormatArray(value) : "NA"),
  },
  {
    valueHeader: "Experience",
    valueKey: "experience",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Seniority",
    valueKey: "seniority",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Tech Stack",
    valueKey: "techStack",
    valueFormatter: value => (value ? FormatArray(value) : "NA"),
  },
  {
    valueHeader: "Secondary Tech Stack",
    valueKey: "secondaryTechStack",
    valueFormatter: value => (value ? FormatArray(value) : "NA"),
  },
  {
    valueHeader: "designation",
    valueKey: "datetime",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Phone Number",
    valueKey: "phoneNumber",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Emergency Number",
    valueKey: "emergencyContactNumber",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Email",
    valueKey: "email",
    valueFormatter: value => (value ? value : "NA"),
  },
  {
    valueHeader: "Joining Date",
    valueKey: "joiningDate",
    valueFormatter: value =>
      value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : "NA",
  },
  {
    valueHeader: "Remarks",
    valueKey: "remarks",
    valueFormatter: value => (value ? value : "NA"),
  },
]
