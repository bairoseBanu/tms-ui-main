import * as Yup from "yup";

export const paygradeValidationSchema = Yup.object({
  paygradeId: Yup.string().optional(),
  name: Yup.string().required("Required"),
  duration: Yup.string().required("Required"),
  minimumRange: Yup.number().required("Required"),
  maximumRange: Yup.number().required("Required"),
  branchId: Yup.string().required("Required"),
});
