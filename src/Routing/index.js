import React from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Auth/Login/Login";
import Pagenotfound from "../Pages/Auth/Pagenotfound";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Projects from "../Pages/Projects/Projects";
import Teams from "../Pages/Team/Teams";
import Developer from "../Pages/Developer/Developer";
import RegisterTeamMember from "../Pages/Auth/Register/RegisterTeamMember";
import Utilization from "../Pages/Utilization/Utilization";
import ProjectDetails from "../Pages/Projects/ProjectDetails";
import PrivateRoute from "./PrivateRoute";
import Groups from "../Pages/Groups/Groups";

function Allroutes() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {/* <ErrorBoundary fallback={<div>Something went wrong</div>}> */}
              <Dashboard />
              {/* </ErrorBoundary> */}
            </PrivateRoute>
          }
        >
          <Route path="teams" element={<Teams />} />
          <Route
            path="teams/register_team_member"
            element={<RegisterTeamMember />}
          />
          <Route path="developer" element={<Developer />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="utilization" element={<Utilization />}></Route>
          <Route path="groups" element={<Groups />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default Allroutes;
