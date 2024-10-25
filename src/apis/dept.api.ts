import axios from "axios";
import { DepartmentDoc, DepartmentValues } from "types/api-response";

const newDepartment = async (values: DepartmentValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/dept`,
    values,
    { withCredentials: true }
  );
};
const editDepartment = async (values: DepartmentValues) => {
  if (values.deptId) {
    const body = {
      code: values.code,
      name: values.name,
      branchId: values.branchId,
      manager: values.manager,
    };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return axios.put(
      `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/dept/${values.deptId}`,
      body,
      { withCredentials: true }
    );
  }
};
const deleteDepartment = async (deptId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/dept/${deptId}`,
    { withCredentials: true }
  );
};

const updateDepartments = async (departments: DepartmentDoc[]) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/depts`,
    departments,
    { withCredentials: true }
  );
};

export { updateDepartments, newDepartment, editDepartment, deleteDepartment };
