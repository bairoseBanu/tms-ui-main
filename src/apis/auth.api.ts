import axios from "axios";

export const refreshToken = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const response = await axios.get(
    `${import.meta.env.VITE_TMS_AUTH_BACKEND}/refreshtoken`,
    { withCredentials: true }
  );
  const { token: newToken } = response.data;
  localStorage.setItem("token", newToken);
  return token;
};
