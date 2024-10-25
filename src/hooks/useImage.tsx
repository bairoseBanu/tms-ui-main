import { useState, useEffect } from "react";
import axios from "axios";

const useImage = (fileName: string) => {
  console.log("I came", fileName);
  let fullUrl: string;
  if (fileName) {
    fullUrl = `${
      import.meta.env.VITE_TMS_EMPLOYEE_BACKEND
    }/employee/profileimg/${fileName}`;
  }
  const [state, setState] = useState({
    imageUrl: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function makeApiCall() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.get(fullUrl, { withCredentials: true });
      const data = await response.data;
      if (response.status === 200) {
        if (data?.errors) {
          setState({
            imageUrl: null,
            isLoading: false,
            error: data.errors,
          });
        } else {
          setState({
            imageUrl: data,
            isLoading: false,
            error: null,
          });
        }
      }
    }
    if (fullUrl) {
      makeApiCall();
    }
  }, [fileName, fullUrl]);

  return state;
};
export default useImage;
