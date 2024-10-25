import axios from "axios";

export const pwdRequest = async (values: { email: string }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_TMS_AUTH_BACKEND}/forgotpwd`,
    values
    // { withCredentials: true }
  );
  return response;
};
