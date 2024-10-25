import axios from "axios";
import { BranchValues } from "types/branch-values";
import { ConfigOptions } from "types/config-options";

export const newBranch = async (branchValues: BranchValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/branch`,
    branchValues,
    { withCredentials: true }
  );
};

export const configBranch = async (configOptions: ConfigOptions) => {
  let queries = "?";
  const {
    isDepartment,
    isDesignation,
    isPaygrade,
    isHolidayType,
    isHolidayDuration,
    branchId,
    isFirstBranch,
  } = configOptions;

  isDepartment
    ? (queries += "&isDepartment=true")
    : (queries += "&isDepartment=false");
  isDesignation
    ? (queries += "&isDesignation=true")
    : (queries += "&isDesignation=false");
  isPaygrade
    ? (queries += "&isPaygrade=true")
    : (queries += "&isPaygrade=false");
  isHolidayType
    ? (queries += "&isHolidayType=true")
    : (queries += "&isHolidayType=false");
  isHolidayDuration
    ? (queries += "&isHolidayDuration=true")
    : (queries += "&isHolidayDuration=false");
  isFirstBranch
    ? (queries += "&isFirstBranch=true")
    : (queries += "&isFirstBranch=false");
  if (branchId) queries += `&branchId=${branchId}`;

  console.log();

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/defaultconfigs${queries}`,
    { withCredentials: true }
  );
};

export const editBranch = async (branchValues: Partial<BranchValues>) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/branch`,
    branchValues,
    { withCredentials: true }
  );
};
