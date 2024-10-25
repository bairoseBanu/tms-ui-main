import * as Yup from "yup";
export const profileThreeValidationSchema = Yup.object({
  ni: Yup.string().nullable(),
  passportNumber: Yup.string().nullable(),
  passportExpiry: Yup.string().nullable(),
  brp: Yup.string().nullable(),
  brpExpiry: Yup.string().nullable(),
});
