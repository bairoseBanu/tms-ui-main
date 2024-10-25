import axios from "axios";
import { DeactivateEmployee } from "types/deactivate-employee-values";
import { EmployeeValues } from "types/employee-values";
interface FormattedEmployeeValues extends EmployeeValues {
  role: string;
  password: string;
  branchId: string;
  grade: string;
}

const newEmployee = async (
  employeeValues: EmployeeValues,
  branchId: string
) => {
  const formattedEmployeeValues: FormattedEmployeeValues = {
    ...employeeValues,
    role: employeeValues.isManager ? "Admin" : "Employee",
    password: "12345",
    branchId,
  };

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/employee`,
    formattedEmployeeValues,
    { withCredentials: true }
  );
};

const editEmployee = async (
  employeeValues: Partial<EmployeeValues>,
  employeeId: string
) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/employee/${employeeId}`,
    employeeValues,
    { withCredentials: true }
  );
};

const fetchProfilePic = async (profilePic: string) => {
  //  const imageUrl = URL.createObjectURL(
  //    new Blob([imageData], { type: "image/jpeg" })
  //  );
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.get(
    `${
      import.meta.env.VITE_TMS_EMPLOYEE_BACKEND
    }/employee/profileimg/${profilePic}`,
    { withCredentials: true }
  );
};
const uploadProfilePic = async (profilePic: string) => {
  //const base64Image = await toBase64(selectedImage);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/employee/profileimg`,
    { imageData: profilePic },
    { withCredentials: true }
  );
};
const getSignedUrlToUploadProfile = async (employeeId: string | null) => {
  //const base64Image = await toBase64(selectedImage);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  if (employeeId) {
    return axios.get(
      `${
        import.meta.env.VITE_TMS_EMPLOYEE_BACKEND
      }/profileuploadurl?employeeId=${employeeId}`,
      {
        withCredentials: true,
      }
    );
  }

  return axios.get(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/profileuploadurl`,
    {
      withCredentials: true,
    }
  );
};

const deActivateEmployee = async (values: DeactivateEmployee) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/deactivate/employee`,
    values,
    {
      withCredentials: true,
    }
  );
};

export {
  editEmployee,
  newEmployee,
  fetchProfilePic,
  uploadProfilePic,
  getSignedUrlToUploadProfile,
  deActivateEmployee,
};
