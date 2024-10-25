import * as Yup from "yup";

export const orgDetailsValidationSchema = Yup.object({
  phone: Yup.string().optional(),
  website: Yup.string().optional(),
  addressLineOne: Yup.string().optional(),
  addressLineTwo: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().optional(),
  postalCode: Yup.string().optional(),
});
