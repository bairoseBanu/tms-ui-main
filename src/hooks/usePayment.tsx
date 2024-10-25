import { useState, useEffect } from "react";
import axios from "axios";
import { refreshToken } from "apis/auth.api";

const usePayment = (url: string) => {
  //   const { paymentId } = useParams();
  const fullUrl = `${import.meta.env.VITE_TMS_PAYMENT_BACKEND}/${url}`;
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function makeApiCall() {
      const response = await axios.get(fullUrl, { withCredentials: true });
      const data = await response.data;
      if (data.errors) {
        setState({
          data: null,
          isLoading: false,
          error: data.errors,
        });
      } else {
        setState({
          data,
          isLoading: false,
          error: null,
        });
      }
      await refreshToken();
    }

    makeApiCall();
  }, [url, fullUrl]);

  return state;
};
export default usePayment;
