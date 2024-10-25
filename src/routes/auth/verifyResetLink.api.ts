import axios from "axios";

export const verifyResetLink = async (id: string) => {
  return axios.get(`${import.meta.env.VITE_TMS_OTP_BACKEND}/verifyreset/${id}`);
};
export const changePwd = async (token: string, newPassword: string) => {
  return axios.post(
    `${import.meta.env.VITE_TMS_AUTH_BACKEND}/resetpwd/${token}`,
    { newPassword }
  );
};
