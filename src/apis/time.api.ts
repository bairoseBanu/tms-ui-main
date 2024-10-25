import axios from "axios";
import { VerificationStatus } from "types/employee-proof.type";
import { TimeSheetFormValues } from "types/timesheet-form-values";

export const newTimeSheet = async (timeValues: TimeSheetFormValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/timesheet`,
    timeValues,
    { withCredentials: true }
  );
};

export const getTimeSheet = async (date: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.get(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/timesheet/${date}`,
    {
      withCredentials: true,
    }
  );
};
export const deleteTimeSheet = async (date: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/timesheet/${date}`,
    {
      withCredentials: true,
    }
  );
};

export const approveTimeSheet = async (
  id: string,
  status: VerificationStatus
) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/timeapproval/${id}`,
    { status },
    {
      withCredentials: true,
    }
  );
};
