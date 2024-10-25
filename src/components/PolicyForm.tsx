import { FC } from "react";
import FormikWrapper from "./FormikWrapper";
import { Box } from "@mui/material";
import MDButton from "./MDButton";
import TMSInput from "./TMSInput";
import MDTypography from "./MDTypography";
import SendIcon from "@mui/icons-material/Send";
import MDBox from "./MDBox";
import TMSFileUpload from "./TMSFileUpload";
import { PolicyFormValues } from "types/policy-form-values";
import { useFormikContext } from "formik";
import { PolicyValidationSchema } from "validations/policy-validation";

const initialValues = {
  policyName: "",
};

interface Props {
  onSubmitForm: (values: PolicyFormValues) => void;
  //   onError?: (errorMessage: string) => void;
}

interface FormProps {
  test?: string;
}

const Form: FC<FormProps> = () => {
  const { setFieldValue } = useFormikContext();
  const handleFileUpload = (name: string, value: File[]) => {
    console.log({ name, value });
    setFieldValue(name, value);
  };

  const handleFileRemove = (name: string, file: File) => {
    console.log({ name, file });
    setFieldValue(name, null);
  };
  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create a new Policy
        </MDTypography>
      </Box>

      <TMSInput
        id="policy-name"
        label="Policy Name"
        name="policyName"
        variant="outlined"
        fullWidth
      />

      <TMSFileUpload
        id="policyFile"
        name="policyFile"
        variant="outlined"
        fullWidth
        onUpload={handleFileUpload}
        onFileRemove={handleFileRemove}
      />

      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Policy
        </MDButton>
      </Box>
    </MDBox>
  );
};

const PolicyForm: FC<Props> = ({ onSubmitForm }) => {
  const handleSubmit = async (values: PolicyFormValues) => {
    console.log({ values });
    if (
      !values.policyFile ||
      values.policyFile.length < 1 ||
      values.policyFile[0].type !== "application/pdf"
    ) {
      return;
    }
    onSubmitForm(values);
  };

  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={PolicyValidationSchema}
        onSubmit={handleSubmit}
        children={<Form />}
      />
    </>
  );
};

export default PolicyForm;
