import axios from "axios";
import { HolidayDurationDoc } from "types/api-response";

const newOrUpdateHolidayDuration = async (
  holidayDuratinDoc: HolidayDurationDoc
) => {
  const values = {
    type: holidayDuratinDoc.type,
    branchId: holidayDuratinDoc.branchId,
  };
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holidayduration`,
    values,
    { withCredentials: true }
  );
};

export { newOrUpdateHolidayDuration };
