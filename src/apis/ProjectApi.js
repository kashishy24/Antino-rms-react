import api from "../apiclient";

export const getProject = async (id) => {
  const res = await api.get(`api/v2/projects/getDetails?projectId=${id}`);
  console.log(res?.data , "consoling data res")
  return res?.data;
};
export const getDeveloper = async (id) => {
  const res = await api.get(`api/v2/projects/getDevelopers?projectId=${id}`);
  return res?.data;
};
// export const onboardDeveloper = async (id,data) => {
//   console.log(id,"dev")
//   const res = await api.get(`api/v2/projects/onboard?userId=${id}`,data);
//   return res?.data;
// };

export const onboardDeveloper = async (data) => {
  const res = await api.post("/api/v2/projects/onboard", data);
  return res?.data;
};


export const assignProjectManager = async (data) => {

  const res = await api.post("/api/v2/projects/onboard", data);
  return res?.data;
};
export const unAssignProjectManager = async (data) => {

  const res = await api.post("/api/v2/projects/onboard", data);
  return res?.data;
};

export const addProject = async (payload) => {

  const res = await api.post("api/v2/projects/project-add", payload);
  return res?.data;
};

export const editProject = async (payload) => {

  const res = await api.put("api/v2/projects/project-update", payload);
  return res?.data;
};
