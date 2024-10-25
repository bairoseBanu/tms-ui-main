import * as Yup from "yup";

export const PolicyValidationSchema = Yup.object({
  policyName: Yup.string().required("Required"),
});
