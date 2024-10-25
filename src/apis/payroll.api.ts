import axios from "axios";
import {
  PayrollFormValues,
  UpdatePayrollValues,
} from "types/payroll-form-values";

export const newPayroll = async (payrollValues: PayrollFormValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/payroll`,
    payrollValues,
    { withCredentials: true }
  );
};

export const updatePayroll = async (
  updatePayrollValues: UpdatePayrollValues
) => {
  const { payrollId, name, isUploaded } = updatePayrollValues;
  const body = {
    name,
    isUploaded,
  };
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/payroll/${payrollId}`,
    body,
    { withCredentials: true }
  );
};

export const deletePayroll = async (payrollId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/payroll/${payrollId}`,
    {
      withCredentials: true,
    }
  );
};
