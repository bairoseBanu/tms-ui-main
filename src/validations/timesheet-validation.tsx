import * as Yup from "yup";

export const TimeSheetValidation = Yup.object({
  date: Yup.date().required("Required"),
  fromOne: Yup.string().required("Required"),
  toOne: Yup.string().required("required"),
  isTimeSplit: Yup.boolean().required("required"),
  fromTwo: Yup.string().optional(),
  toTwo: Yup.string().optional(),
  workedWith: Yup.string().required("required"),
});
