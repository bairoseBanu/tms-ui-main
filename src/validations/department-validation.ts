import * as Yup from "yup";

export const deptValidationSchema = Yup.object({
  deptId: Yup.string().optional(),
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  manager: Yup.string().required("Required"),
  branchId: Yup.string().required("Required"),
});
