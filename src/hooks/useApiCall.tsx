import { useState, useEffect } from "react";
import axios, { Method } from "axios";

const useApiCall = <T,>(
  url: string,
  method: Method = "GET",
  body?: unknown
): { data: T; isLoading: boolean; error: unknown } => {
  const fullUrl = url
    ? `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/${url}`
    : undefined;
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
    triggerApiCall: null,
  });
  const [triggerApiCall, setTriggerApiCall] = useState(true);
  useEffect(() => {
    async function makeApiCall() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      // const response = await axios.get(fullUrl, { withCredentials: true });
      const response = await axios({
        method,
        url: fullUrl,
        data: body ? body : null,
      });
      const data = await response.data;
      if (data.errors) {
        setState({
          data: null,
          isLoading: false,
          error: data.errors,
          triggerApiCall: null,
        });
      } else {
        setState({
          data,
          isLoading: false,
          error: null,
          triggerApiCall: setTriggerApiCall,
        });
      }
    }
    if (triggerApiCall && fullUrl) {
      makeApiCall();
    }
    setTriggerApiCall(false);
  }, [url, fullUrl, method, body, triggerApiCall]);

  return state;
};
export default useApiCall;
