import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import { useState } from "react";
import FormikWrapper from "components/FormikWrapper";
import { ErrorMessage, Field } from "formik";
import ErrorMsg from "components/ErrorMsg";
import { ForgotPwdValidationSchema } from "validations/forgotpwd-validation";
import { pwdRequest } from "./forgotPwd.api";
import TMSResetPwdMsg from "components/TMSResetPwdMsg";

function ForgotPwdForm() {
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Enter EMail
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox>
          <MDBox mb={2}>
            <Field
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              as={MDInput}
            />
            <ErrorMessage name="email" component={ErrorMsg} />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              Send Request
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

const initialValues = {
  email: "",
};

export default function ForgotPwd() {
  const handleSubmit = async (values: { email: string }) => {
    console.log({ values });
    const response = await pwdRequest(values);
    if (response.status === 200) {
      setIsSubmitted(true);
      setEmail(values.email);
    }
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <>
      {isSubmitted && <TMSResetPwdMsg email={email} />}
      {!isSubmitted && (
        <FormikWrapper
          initialValues={initialValues}
          validationSchema={ForgotPwdValidationSchema}
          children={<ForgotPwdForm />}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
