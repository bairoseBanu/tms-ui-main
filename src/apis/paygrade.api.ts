import axios from "axios";
import { PaygradeDoc } from "types/api-response";
import { PaygradeValues } from "types/paygrade-values";

const newPaygrade = async (values: PaygradeValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/paygrade`,
    values,
    { withCredentials: true }
  );
};
const editPaygrade = async (values: PaygradeValues) => {
  if (values.paygradeId) {
    const body = {
      name: values.name,
      duration: values.duration,
      minimumRange: values.minimumRange,
      maximumRange: values.maximumRange,
      isActive: values.isActive,
      branchId: values.branchId,
    };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return axios.put(
      `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/paygrade/${
        values.paygradeId
      }`,
      body,
      { withCredentials: true }
    );
  }
};

const updatePaygrades = async (paygrades: PaygradeDoc[]) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/paygrades`,
    paygrades,
    { withCredentials: true }
  );
};
const deletePaygrade = async (paygradeId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/paygrade/${paygradeId}`,
    { withCredentials: true }
  );
};

export { updatePaygrades, newPaygrade, editPaygrade, deletePaygrade };
