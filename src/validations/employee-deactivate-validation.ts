import * as Yup from "yup";

export const employeeDeactivateValidationSchema = Yup.object({
  employeeId: Yup.string().required("Required"),
  endingDate: Yup.string().required("Required"),
});
