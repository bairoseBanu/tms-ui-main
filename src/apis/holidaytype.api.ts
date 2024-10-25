import axios from "axios";
import { HolidayTypeDoc } from "types/api-response";
import { HolidayTypeValues } from "types/holidaytype-values";

const newHolidayType = async (values: HolidayTypeValues) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.post(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holidaytype`,
    values,
    { withCredentials: true }
  );
};
const editHolidayType = async (values: HolidayTypeValues) => {
  if (values.holidayTypeId) {
    const body = {
      name: values.name,
      description: values.description,
      isPaidLeave: values.isPaidLeave,
      maxAllowedDaysPerYear: values.maxAllowedDaysPerYear,
      carryOverAllowed: values.carryOverAllowed,
      carryOverLimit: values.carryOverLimit,
      isActive: values.isActive,
      branchId: values.branchId,
    };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return axios.put(
      `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holidaytype/${
        values.holidayTypeId
      }`,
      body,
      { withCredentials: true }
    );
  }
};

const updateHolidayTypes = async (holidayTypes: HolidayTypeDoc[]) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.put(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holidaytypes`,
    holidayTypes,
    { withCredentials: true }
  );
};
const deleteHolidayType = async (holidayTypeId: string) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axios.delete(
    `${import.meta.env.VITE_TMS_EMPLOYEE_BACKEND}/holidaytype/${holidayTypeId}`,
    { withCredentials: true }
  );
};

export {
  updateHolidayTypes,
  newHolidayType,
  editHolidayType,
  deleteHolidayType,
};
