import * as Yup from "yup";

export const branchValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});
