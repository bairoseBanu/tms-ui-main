import { Card, Stack, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { sendOtp, verifyOtp } from "./signup.api";
import Organization from "components/organization";
import MDSnackbar from "components/MDSnackbar";
import TMSPayment from "components/TMSPayment";

type OTPSentScreenP = {
  back: () => unknown;
  email: string;
  userId: string;
  errors?: Errors;
};

type SignupFormData =
  | { state: "email_submit"; email: string }
  | { state: "otp_submit"; email: string; userId: string; otp: string }
  | {
      state: "org_submit";
      userId: string;
      firstName: string;
      lastName: string;
      name: string;
      password: string;
      phone: string;
      plan: string;
    }
  | {
      state: "pay_plan";
      email: string;
      userId: string;
      iStandingOrder: boolean;
      plan: string;
    };

// eslint-disable-next-line react-refresh/only-export-components
export const action: ActionFunction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData()) as SignupFormData;
  if (data.state === "email_submit") {
    const sendOtpResponse = await sendOtp(data.email);
    if (sendOtpResponse.error) {
      return { errors: { email: sendOtpResponse.message } };
    }
    return {
      next: { name: "otp", email: data.email, userId: sendOtpResponse.data.id },
    };
  } else if (data.state === "otp_submit") {
    const verifyOtpResponse = await verifyOtp({
      email: data.email,
      userId: data.userId,
      otp: data.otp,
    });
    if (verifyOtpResponse.error) {
      return { errors: { otp: verifyOtpResponse.message } };
    }
    return {
      next: { name: "org", email: data.email, userId: data.userId },
    };
  } else if (data.state === "org_submit") {
    return redirect("/");
  }
};

const OTPSentScreen: React.FC<OTPSentScreenP> = ({
  back,
  email,
  userId,
  errors,
}) => {
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
        <Stack direction="row" alignItems="stretch">
          <MDBox>
            <MDButton variant="text" onClick={back}>
              <ArrowBack style={{ color: "white" }}></ArrowBack>
            </MDButton>
          </MDBox>
          <MDBox flex={1}>
            <MDTypography
              variant="h4"
              width="8.3em"
              fontWeight="medium"
              color="white"
            >
              Enter OTP
            </MDTypography>
          </MDBox>
        </Stack>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component={OTPForm} role="form">
          <input type="hidden" defaultValue={userId} name="userId" />
          <input type="hidden" defaultValue={email} name="email" />
          <MDBox mb={5}>
            <MDTypography
              // fontWeight="medium"
              // mt={1}
              textAlign="center"
              color="text"
            >
              We have sent an OTP to {email}. Please enter the OTP
            </MDTypography>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="Password"
              label="Enter The OTP"
              fullWidth
              name="otp"
            ></MDInput>
            {errors && errors.otp && (
              <Typography fontSize={14} color="error">
                {errors.otp}
              </Typography>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDButton variant="gradient" type="submit" fullWidth color="info">
              Verify
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

type EmailScreenProps = {
  email?: string;
  errors?: Errors;
};

const OTPForm = ({ children }: React.PropsWithChildren) => {
  return (
    <Form method="post" action="">
      <input type="hidden" defaultValue="otp_submit" name="state" />
      {children}
    </Form>
  );
};

const EmailForm = ({ children }: React.PropsWithChildren) => {
  return (
    <Form method="post" action="">
      {children}
    </Form>
  );
};

const EmailScreen: React.FC<EmailScreenProps> = ({ email, errors }) => {
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
          Sign Up
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component={EmailForm} role="form">
          <input type="hidden" defaultValue="email_submit" name="state"></input>
          <MDBox mb={2}>
            <MDInput
              type="Email"
              label="Provide your email"
              fullWidth
              name="email"
              defaultValue={email}
            ></MDInput>
            {errors && errors.email && (
              <Typography p={1} fontSize={14} color="error">
                {errors.email}
              </Typography>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDButton variant="gradient" fullWidth color="info" type="submit">
              Proceed
            </MDButton>
          </MDBox>
          <MDBox mb={2}>
            <MDBox textAlign="center">
              <MDTypography variant="button" color="text">
                Already have account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Signin
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

type Screens =
  | { name: "signup"; email?: string }
  | { name: "otp"; email: string; userId: string }
  | { name: "org"; email: string; userId: string }
  | { name: "plan"; plan?: string };
type Errors = {
  email?: string;
  otp?: string;
};

type SingupActionData =
  | undefined
  | {
      errors: Errors;
    }
  | { next: Screens };

export type SnackBarInfo = {
  color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "light";
  title: string;
  content: string;
};
export default function Signup() {
  const [screen, setScreen] = useState<Screens>({ name: "signup" });
  const [errors, setErrors] = useState<Errors>();
  const signupActionData = useActionData() as SingupActionData;
  const [show, setShow] = useState<boolean>(false);
  const toggleSnackbar = () => setShow(!show);
  const [snackBarInfo, setSnackBarInfo] = useState<SnackBarInfo>({
    color: "error",
    title: "Sorry",
    content: "Something went wrong!!",
  });

  const setSnackInfo = (args: SnackBarInfo) => {
    setSnackBarInfo(args);
  };
  // const { setAppData } = useAppData();
  // useEffect(() => {
  //   setAppData({});
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (signupActionData && "next" in signupActionData) {
      setScreen(signupActionData.next);
    }
    if (signupActionData && "errors" in signupActionData) {
      setErrors(signupActionData.errors);
    }
  }, [signupActionData]);

  const onNext = (plan: string) => {
    setScreen({ name: "plan", plan });
  };

  if (screen.name === "signup") {
    return <EmailScreen email={screen.email} errors={errors} />;
  } else if (screen.name === "otp") {
    return (
      <OTPSentScreen
        email={screen.email}
        userId={screen.userId}
        back={() => setScreen({ name: "signup", email: screen.email })}
        errors={errors}
      />
    );
  } else if (screen.name === "org") {
    return (
      <Card
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "200%" },
          marginY: "3em",
          marginLeft: { sm: "0em", md: "0em", lg: "-9em" },
        }}
      >
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
          <Stack direction="row" alignItems="stretch">
            <MDBox>
              <MDButton
                variant="text"
                onClick={() =>
                  setScreen({
                    name: "otp",
                    email: screen.email,
                    userId: screen.userId,
                  })
                }
              >
                <ArrowBack style={{ color: "white" }}></ArrowBack>
              </MDButton>
            </MDBox>
            <MDBox
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              flex={1}
            >
              <MDTypography
                variant="h4"
                width="8.3em"
                fontWeight="medium"
                color="white"
                textAlign="center"
              >
                Create Account
              </MDTypography>
            </MDBox>
          </Stack>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Organization
            userId={screen.userId}
            setSnackInfo={setSnackInfo}
            toggleSnackbar={toggleSnackbar}
            onNext={onNext}
          />
        </MDBox>
        <MDSnackbar
          color={snackBarInfo.color}
          icon="notifications"
          title={snackBarInfo.title}
          content={snackBarInfo.content}
          dateTime="Now"
          open={show}
          close={toggleSnackbar}
        />
      </Card>
    );
  } else if (screen.name === "plan") {
    return <TMSPayment plan={screen.plan} />;
  }
  return null;
}
