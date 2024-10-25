import axios from "axios";
import { VerificationStatus } from "types/employee-proof.type";
import { HolidayFormValues } from "types/holiday-form-values";

export const newHoliday = async (holidayValues: HolidayFormValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holiday`,
    holidayValues,
    { withCredentials: true }
  );
};

export const deleteHoliday = async (id: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holiday/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const approveHoliday = async (
  id: string,
  status: VerificationStatus
) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holidayapproval/${id}`,
    { status },
    {
      withCredentials: true,
    }
  );
};
