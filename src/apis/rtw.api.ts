import axios from "axios";
import { ProofType, VerificationStatus } from "types/employee-proof.type";

const getSignedUrlToUploadRtw = async () => {
  //const base64Image = await toBase64(selectedImage);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.get(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/rtwuploadurl`,
    {
      withCredentials: true,
    }
  );
};
const deleteEmployeeProofDoc = async (docType: string, employeeId: string) => {
  //const base64Image = await toBase64(selectedImage);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/rtwdocdelete`,
    { docType, employeeId },
    {
      withCredentials: true,
    }
  );
};

const getRtwdocs = async (employeeId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.get(
    `${
      import.meta.env.VITE_TMS_EMPLOYEE_BACKEND
    }/rtwdocsurl?employeeId=${employeeId}`,
    {
      withCredentials: true,
    }
  );
};

const verifyRtwdocs = async (
  employeeId: string,
  docType: ProofType,
  updatedStatus: VerificationStatus
) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/verifyrtw`,
    { employeeId, docType, status: updatedStatus },
    {
      withCredentials: true,
    }
  );
};

export {
  getSignedUrlToUploadRtw,
  deleteEmployeeProofDoc,
  getRtwdocs,
  verifyRtwdocs,
};
