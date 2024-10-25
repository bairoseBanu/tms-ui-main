import axios from "axios";
import { SigninValues } from "types/signin-values";

export const signinUser = async (signinValues: SigninValues) => {
  const response = await axios.post(
    `${import.meta.env.VITE_TMS_AUTH_BACKEND}/signin`,
    {
      email: signinValues.email,
      password: signinValues.password,
    },
    { withCredentials: true }
  );
  return response;
};
