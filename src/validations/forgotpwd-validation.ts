import * as Yup from "yup";

export const ForgotPwdValidationSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Required"),
});
