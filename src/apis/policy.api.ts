import axios from "axios";
import { PolicyValues, UpdatePolicyValues } from "types/policy-values";

export const newPolicy = async (policyValues: PolicyValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/policy`,
    policyValues,
    { withCredentials: true }
  );
};
export const deletePolicy = async (policyId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/policy/${policyId}`,
    {
      withCredentials: true,
    }
  );
};
export const updatePolicy = async (updatePolicyValues: UpdatePolicyValues) => {
  const { policyId, name, isUploaded } = updatePolicyValues;
  const body = {
    name,
    isUploaded,
  };
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/policy/${policyId}`,
    body,
    { withCredentials: true }
  );
};
