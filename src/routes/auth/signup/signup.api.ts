import axios, { AxiosError } from "axios";
import { UserDoc } from "types/api-response";
import { OrgValues } from "types/org-values";
import { PayValues } from "types/pay-values";
type SendOtpResponse = {
  error: null | string;
  message: string;
  data: null | UserDoc;
};

export const sendOtp = async (email: string): Promise<SendOtpResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_TMS_AUTH_BACKEND}/createEmail`,
      {
        email,
      }
    );
    if (response.status === 200) {
      return {
        error: null,
        message: "success",
        data: response.data as UserDoc,
      };
    } else {
      return {
        error: "UNKNOWN_ERROR",
        message: "something went wrong!!!",
        data: null,
      };
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error.code,
        message: error.response?.data?.errors
          ? error.response?.data?.errors[0]?.message
          : error.message,
        data: null,
      };
    }
    return {
      error: "UNKNOWN_ERROR",
      message: "something went wrong!!!",
      data: null,
    };
  }
};

export const verifyOtp = async ({
  email,
  userId,
  otp,
}: {
  email: string;
  userId: string;
  otp: string;
}): Promise<SendOtpResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_TMS_OTP_BACKEND}/verifyOtp`,
      {
        email,
        userId,
        otp,
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      return {
        error: null,
        message: "success",
        data: response.data as UserDoc,
      };
    } else {
      return {
        error: "UNKNOWN_ERROR",
        message: "something went wrong!!!",
        data: null,
      };
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error.code,
        message: error.response?.data?.errors
          ? error.response?.data?.errors[0]?.message
          : error.message,
        data: null,
      };
    }
    return {
      error: "UNKNOWN_ERROR",
      message: "something went wrong!!!",
      data: null,
    };
  }
};

export const createOrg = (org: OrgValues, userId: string) => {
  return axios.post(
    `${import.meta.env.VITE_TMS_AUTH_BACKEND}/createorg/${userId}`,
    org,
    { withCredentials: true }
  );
};
export const makePayment = (payValues: PayValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(
    `${import.meta.env.VITE_TMS_PAYMENT_BACKEND}/newcheckout`,
    payValues,
    { withCredentials: true }
  );
};
