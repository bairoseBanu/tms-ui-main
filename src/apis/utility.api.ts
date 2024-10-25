import axios from "axios";

export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/userDetails`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
  return null;
};
