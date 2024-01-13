import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import PeopleSharpIcon from "@mui/icons-material/PeopleSharp";
import CodeSharpIcon from "@mui/icons-material/CodeSharp";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GroupsIcon from "@mui/icons-material/Groups";

export const teamLeadListItems = [
  {
    id: "0",
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    id: "1",
    icon: <WorkSharpIcon />,
    label: "Projects",
    route: "/dashboard/projects",
  },
  {
    id: "2",
    icon: <CodeSharpIcon />,
    label: "Developer",
    route: "/dashboard/developer",
  },
  // {
  //   id: "3",
  //   icon: <EngineeringIcon />,
  //   label: "Utilization",
  //   route: "/dashboard/utilization",
  // },
  {
    id: "4",
    icon: <GroupsIcon />,
    label: "Groups",
    route: "/dashboard/groups",
  },
  {
    id: "5",
    icon: <PeopleSharpIcon />,
    label: "Access Management",
    route: "/dashboard/teams",
  },
];

export const projectManagerListItems = [
  {
    id: "0",
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    id: "1",
    icon: <WorkSharpIcon />,
    label: "Projects",
    route: "/dashboard/projects",
  },
  {
    id: "2",
    icon: <CodeSharpIcon />,
    label: "Developer",
    route: "/dashboard/developer",
  },
  {
    id: "3",
    icon: <GroupsIcon />,
    label: "Groups",
    route: "/dashboard/groups",
  },
];
