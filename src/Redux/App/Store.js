import { configureStore } from '@reduxjs/toolkit';
import SignupReducer from '../Slices/Auth/SignupSlice.js';
import loginReducer from '../Slices/Auth/loginSlice.js';
import RegisterTeamMemberReducer from '../Slices/Auth/RegTeamMemSlice.js';
import GetUserReducer from '../Slices/getUsersSlice';
import RegDevReducer from '../Slices/Auth/RegDevSlice';
import ProjectReducer from '../Slices/Project/ProjectsSlice.js';
import ListsReducer from '../Slices/Lists/ListsSlice.js';
import DesignationReducer from '../Slices/DesignationSlice.js';
import { TeamsReducer } from '../Slices/Teams/TeamSlice.js';
import { GroupsReducer } from '../Slices/Groups/GroupsSlice.js';

const store = configureStore({
   reducer: {
      signup: SignupReducer,
      login: loginReducer,
      getUsers: GetUserReducer,
      regTeamMem: RegisterTeamMemberReducer,
      regDev: RegDevReducer,
      project: ProjectReducer,
      lists: ListsReducer,
      designation: DesignationReducer,
      team: TeamsReducer,
      groups: GroupsReducer,
   },
});

export default store;
