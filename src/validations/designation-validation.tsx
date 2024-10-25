import * as Yup from "yup";

export const designationValidationSchema = Yup.object({
  designationId: Yup.string().optional(),
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  branchId: Yup.string().required("Required"),
});
