import * as Yup from "yup";

export const SigninValidationSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Required"),
  password: Yup.string().required("Required"),
  rememberMe: Yup.string().required(""),
});
