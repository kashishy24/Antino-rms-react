import api from "../apiclient";

export const updateGroup = async (data) => {
  const res = await api.post("api/v2/group/edit-group", data);
  return res?.data;
};

export const deleteGroup = async (data) => {
  const res = await api.delete(`api/v2/group/remove-group/${data}`);
  return res?.data;
};


export const getAvailableDevelopers = async () => {
  const res = await api.get(`api/v2/group/getAvailableDevs`);
  return res?.data.data;
};


export const getGroupDevelopers = async (id) => {
  const res = await api.get(`api/v2/group/getDevelopers?groupId=${id}`);
  return res?.data;
};
