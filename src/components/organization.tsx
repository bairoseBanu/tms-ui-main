import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Plan from "components/Plan";
import { OrgValidationSchema } from "validations/org-validation";
import { Field, ErrorMessage, useFormikContext } from "formik";
import MDInput from "components/MDInput";
import FormikWrapper from "components/FormikWrapper";
import ErrorMsg from "components/ErrorMsg";
import MDButton from "./MDButton";
import { FC } from "react";
import { OrgFormikValues } from "types/org-values";
import { createOrg } from "routes/auth/signup/signup.api";
import { useNavigate } from "react-router-dom";
import { SnackBarInfo } from "routes/auth/signup/signup";
import { PlanItem } from "types/plan-details";
const planDetails: PlanItem[] = [
  {
    id: "1",
    features: [
      { content: "lorem ipsum", id: "1" },
      { content: "lorem ipsum sit amet", id: "2" },
    ],
    planName: "Silver",
    price: "50",
  },
  {
    id: "2",
    features: [
      { content: "lorem ipsum dolor", id: "1" },
      { content: "lorem ipsum", id: "2" },
    ],
    planName: "Gold",
    price: "100",
  },
  {
    id: "3",
    features: [
      { content: "lorem ipsum sit amet", id: "1" },
      { content: "lorem dolor sit amet", id: "2" },
    ],
    planName: "Platinum",
    price: "150",
  },
];
const initialValues = {
  firstName: "",
  lastName: "",
  name: "",
  password: "",
  confirmPassword: "",
  phone: "",
  plan: "Gold",
};
type OrgProps = {
  userId: string;
  toggleSnackbar: () => void;
  setSnackInfo: (args: SnackBarInfo) => void;
  onNext: (plan: string) => void;
};

const CustomForm = () => {
  const formikContext = useFormikContext();
  console.log({ formikContext });

  return (
    <Box p={3} bgcolor={"info"}>
      <Box mx={2} mt={-3} p={3} mb={1} textAlign={"center"}>
        {/* <img
          style={{ maxWidth: "100px", width: "100px" }}
          src={logo}
          alt="Logo"
        /> */}
      </Box>
      <Box mb={2}>
        <Field
          id="first-name"
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          as={MDInput}
        />
        <ErrorMessage name="firstName" component={ErrorMsg} />
      </Box>
      <Box mb={2}>
        <Field
          id="last-name"
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          as={MDInput}
        />
        <ErrorMessage name="lastName" component={ErrorMsg} />
      </Box>
      <Box mb={2}>
        <Field
          id="org-name"
          label="Organization Name"
          name="name"
          variant="outlined"
          fullWidth
          as={MDInput}
        />
        <ErrorMessage name="org" component={ErrorMsg} />
      </Box>

      <Box mb={2}>
        <Field
          id="password"
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          as={MDInput}
          type="password"
        />
        <ErrorMessage name="password" component={ErrorMsg} />
      </Box>
      <Box mb={2}>
        <Field
          id="confirm-password"
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          fullWidth
          as={MDInput}
          type="password"
        />
        <ErrorMessage name="confirmPassword" component={ErrorMsg} />
      </Box>
      <Box mb={2}>
        {/* // country Select code needs to be redesigned and added into FOrmik */}
        {/* <CountrySelect /> */}
        <Field
          id="phone"
          label="Phone"
          name="phone"
          variant="outlined"
          fullWidth
          as={MDInput}
        />
        <ErrorMessage name="phone" component={ErrorMsg} />
      </Box>
      {/* Plan Details must be converted into Radio button and added into formik  */}
      <Box mb={2} sx={{ display: { sm: "block", md: "block", lg: "flex" } }}>
        <Plan name="plan" items={planDetails} />
        {/* <CustomRadioGroup /> */}
      </Box>
      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Account
        </MDButton>
      </Box>
    </Box>
  );
};

const Organization: FC<OrgProps> = ({
  userId,
  toggleSnackbar,
  setSnackInfo,
  onNext,
}) => {
  const navigate = useNavigate();
  const onSubmit = async (values: OrgFormikValues) => {
    console.log({ values, userId });
    const {
      firstName,
      lastName,
      name,
      password,
      plan,
      confirmPassword,
      phone,
    } = values;
    if (password === confirmPassword) {
      const response = await createOrg(
        { firstName, lastName, plan, phone, name, password },
        userId
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setSnackInfo({
        color: "success",
        title: "Congratulations!!",
        content: "You have successfully careated an account!!!",
      });
      toggleSnackbar();
      if (plan == "free") {
        navigate("/");
      } else {
        onNext(plan);
      }
    }
  };
  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={OrgValidationSchema}
        onSubmit={onSubmit}
        children={<CustomForm />}
      />
      {/* <MDBox>
        <MDButton variant="text" onClick={back}>
          <ArrowBack style={{ color: "black" }}></ArrowBack>
        </MDButton>
      </MDBox> */}
    </>
  );
};

export default Organization;
