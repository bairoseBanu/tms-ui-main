import * as Yup from "yup";

export const holidayTypeValidationSchema = Yup.object({
  holidayTypeId: Yup.string().optional(),
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  isPaidLeave: Yup.boolean().required("Required"),
  maxAllowedDaysPerYear: Yup.number().required("Required"),
  carryOverAllowed: Yup.boolean().required("Required"),
  carryOverLimit: Yup.number().required("Required"),
  branchId: Yup.string().required("Required"),
});
