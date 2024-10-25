import axios from "axios";
import { DesignationDoc } from "types/api-response";
import { DesignationValues } from "types/designation-values";

const newDesignation = async (values: DesignationValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/designation`,
    values,
    { withCredentials: true }
  );
};
const editDesignation = async (values: DesignationValues) => {
  if (values.designationId) {
    const body = {
      name: values.name,
      description: values.description,
      isActive: values.isActive,
      branchId: values.branchId,
    };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return axios.put(
      `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/designation/${
        values.designationId
      }`,
      body,
      { withCredentials: true }
    );
  }
};

const updateDesignations = async (paygrades: DesignationDoc[]) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/designations`,
    paygrades,
    { withCredentials: true }
  );
};
const deleteDesignation = async (designationId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/designation/${designationId}`,
    { withCredentials: true }
  );
};

export {
  updateDesignations,
  newDesignation,
  editDesignation,
  deleteDesignation,
};
