import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Card, Switch, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormikWrapper from "components/FormikWrapper";
import { ErrorMessage, Field, useFormikContext } from "formik";
import ErrorMsg from "components/ErrorMsg";
import { SigninValues } from "types/signin-values";
import { SigninValidationSchema } from "validations/signin-validation";
import { signinUser } from "./signin.api";
import { AxiosError } from "axios";
import { extractPayload } from "lib/auth";

type FormStatus = {
  errorMessage: string;
  loading: boolean;
};
type Props = {
  formStatus: FormStatus;
};

const initialValues: SigninValues = {
  email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
  password: "",
  rememberMe: localStorage.getItem("email") ? true : false,
};

const SigninForm: FC<Props> = ({ formStatus }) => {
  const [rememberMe, setRememberMe] = useState<boolean>(
    localStorage.getItem("email") ? true : false
  );
  const { errorMessage, loading } = formStatus;
  const { setFieldValue } = useFormikContext();

  const handleSetRememberMe = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(!rememberMe);
    setFieldValue("rememberMe", event.target.checked);
  };

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
          Sign in
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        {errorMessage && (
          <Typography fontSize={14} textAlign={"center"} color="error" pb={1}>
            {errorMessage}
          </Typography>
        )}
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
          <MDBox mb={2}>
            <Field
              id="password"
              label="Password"
              name="password"
              variant="outlined"
              fullWidth
              type="password"
              as={MDInput}
            />
            <ErrorMessage name="password" component={ErrorMsg} />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Switch
              name="rememberMe"
              checked={rememberMe}
              onChange={handleSetRememberMe}
            />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Remember me
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              disabled={loading}
              type="submit"
              variant="gradient"
              color="info"
              fullWidth
            >
              Sign In
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography component={"div"} variant="button" color="text">
              Don&apos;t have an account?{" "}
              <MDTypography
                component={Link}
                to="/auth/signup"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </MDTypography>
            </MDTypography>
            <MDTypography variant="button" color="text">
              Forgot Password?{" "}
              <MDTypography
                component={Link}
                to="/auth/forgotpwd"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Click Here
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default function Signin() {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<FormStatus>({
    errorMessage: "",
    loading: false,
  });

  const handleSubmit = async (values: SigninValues) => {
    setFormStatus({ ...formStatus, loading: true });
    try {
      const response = await signinUser(values);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        if (values.rememberMe) {
          localStorage.setItem("email", values.email);
        } else {
          localStorage.removeItem("email");
        }
        setFormStatus({ ...formStatus, loading: false });
        const { branchId, isPaid, plan } = extractPayload();
        if (!isPaid) {
          navigate("/subscription", { state: { plan } });
          return;
        }
        if (branchId === null) {
          navigate("/settings/branch");
          return;
        }

        navigate("/", { state: token });

        return;
      }
      if (response.status === 401) {
        setFormStatus({ errorMessage: "Invalid Credentials", loading: false });
        return;
      }
      setFormStatus({
        errorMessage: "Something went wrong..!!!",
        loading: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response.status === 401) {
          setFormStatus({ errorMessage: "Bad Credentials!!", loading: false });
          return;
        }
        setFormStatus({
          errorMessage: "Something went wrong!!!",
          loading: false,
        });
      }
      setFormStatus({
        errorMessage: "Something went wrong!!!",
        loading: false,
      });
    }
  };

  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={SigninValidationSchema}
        children={<SigninForm formStatus={formStatus} />}
        onSubmit={handleSubmit}
      />
    </>
  );
}
