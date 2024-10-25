import * as Yup from "yup";

export const PayrollValidationSchema = Yup.object({
  employeeId: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  month: Yup.string().required("required"),
  year: Yup.string().required("required"),
  doc: Yup.mixed().required("required"),
});
