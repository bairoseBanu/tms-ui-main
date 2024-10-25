import { ThemeDoc } from "types/api-response";
import axios from "axios";

const newOrUpdateTheme = async (themeDoc: ThemeDoc) => {
  const values = {
    type: themeDoc.type,
    branchId: themeDoc.branchId,
  };
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/theme`,
    values,
    { withCredentials: true }
  );
};

export { newOrUpdateTheme };
