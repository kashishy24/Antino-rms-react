import { idID } from "@mui/material/locale";
import api from "../apiclient";

export const getDevelopers = async () => {
  const res = await api.get("/api/v2/users/search");
  return res?.data;
};
export const getDeveloperfullname = async (id) => {
  const res = await api.get(`api/v2/users/get-bilable?id=${id}`);
  return res?.data;
};

