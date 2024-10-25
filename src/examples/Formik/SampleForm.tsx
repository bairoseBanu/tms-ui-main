import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});
/* eslint-disable @typescript-eslint/no-explicit-any */
const onSubmit = (values: any) => {
  console.log("Form data", values);
};
const SampleForm = () => {
  return (
    <MDBox sx={{ width: "100vw" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <MDBox
            width="50%"
            textAlign={"center"}
            p={5}
            margin={"auto"}
            border={"1px solid black"}
            bgColor="white"
          >
            <MDBox mb={2}>
              <Field
                id="email"
                name="email"
                fullWidth
                placeholder="email"
                as={MDInput}
              />
              <ErrorMessage name="email" />
            </MDBox>
            <MDBox mb={2}>
              <Field
                id="password"
                name="password"
                fullWidth
                placeholder="password"
                as={MDInput}
              />
              <ErrorMessage name="password" />
            </MDBox>
            <MDBox mb={2}>
              <MDButton
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Submit
              </MDButton>
            </MDBox>
          </MDBox>
        </Form>
      </Formik>
    </MDBox>
  );
};

export default SampleForm;
