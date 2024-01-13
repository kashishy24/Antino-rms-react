import api from "../apiclient";

export const addMember = async (data) => {
  return await api.post("api/v2/teams/add-teamMember", data);
};

export const editMember = async (data) => {
  return await api.post("api/v2/teams/update-teamMember", data);
};

export const assignGroup = async (data) => {
  return await api.post("api/v2/teams/assign-group", data);
};

export const unassignGroup = async (data) => {
  console.log(data);
  return await api.post("api/v2/teams/unassign-group", data);
};

export const removeTeam = async (data) => {
  console.log(data);
  return await api.delete("api/v2/teams/delete-teamMember", { data });
};
