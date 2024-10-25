import axios from "axios";
import { OrgDetailsValues } from "types/org-details-values";

export const getOrg = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.get(`${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/org`, {
    withCredentials: true,
  });
};

export const newOrgDetails = async (orgDetailsValues: OrgDetailsValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/orgdetails`,
    orgDetailsValues,
    { withCredentials: true }
  );
};
