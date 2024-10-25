import * as Yup from "yup";

export const HolidayValidation = Yup.object({
  fromDate: Yup.date().required("Required"),
  fromDateDuration: Yup.string().required("Required"),
  toDate: Yup.date().optional(),
  toDateDuration: Yup.string().optional(),
  holidayType: Yup.string().required("required"),
});
