import { useFormikContext } from "formik";
import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import FormikWrapper from "./FormikWrapper";
import { useAppData } from "hooks/useAppData";
import TMSLoader from "./TMSLoader";
import { FC, useEffect } from "react";
import { DesignationValues } from "types/designation-values";
import { designationValidationSchema } from "validations/designation-validation";

const initialValues = {
  name: "",
  description: "",
  branchId: "",
  isActive: true,
};

const Form = () => {
  const {
    appData: { currentBranch },
    isAppDataLoading,
  } = useAppData();

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("branchId", currentBranch.id);
  }, [currentBranch.id, setFieldValue]);

  if (isAppDataLoading) {
    return <TMSLoader />;
  }

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create a New Designation
        </MDTypography>
      </Box>

      <TMSInput
        id="designation-name"
        label="designation Name"
        name="name"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="designation-description"
        label="Description"
        name="description"
        variant="outlined"
        fullWidth
      />
      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Designation
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: DesignationValues) => void;
}
const AddDesignation: FC<Props> = ({ onSubmitForm }) => {
  const handleSubmit = async (values: DesignationValues) => {
    onSubmitForm(values);
  };

  return (
    <MDBox p={2}>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={designationValidationSchema}
        onSubmit={handleSubmit}
        children={<Form />}
      />
    </MDBox>
  );
};

export default AddDesignation;
