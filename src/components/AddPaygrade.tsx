import { useFormikContext } from "formik";
import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import FormikWrapper from "./FormikWrapper";
import TMSDropdown from "./TMSDropdown";
import { useAppData } from "hooks/useAppData";
import TMSLoader from "./TMSLoader";
import { FC, useState } from "react";
import { PaygradeDuration, PaygradeValues } from "types/paygrade-values";
import { paygradeValidationSchema } from "validations/paygrade-validation";
import { getPaygradeDurationOptions } from "lib/getPaygradeDurationOptions";

const initialValues = {
  name: "",
  duration: "year" as PaygradeDuration,
  minimumRange: 0,
  maximumRange: 0,
  branchId: "",
  isActive: true,
};

const Form = () => {
  const {
    appData: { currentBranch },
    isAppDataLoading,
  } = useAppData();

  const { setFieldValue } = useFormikContext();
  const handleDropdownChange = (name: string, value: string) => {
    setFieldValue(name, value);
    // Adding Current Branch for now by default
    setFieldValue("branchId", currentBranch.id);
  };
  if (isAppDataLoading) {
    return <TMSLoader />;
  }

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create a new paygrade
        </MDTypography>
      </Box>

      <TMSInput
        id="paygrade-name"
        label="Paygrade Name"
        name="name"
        variant="outlined"
        fullWidth
      />
      <TMSDropdown
        options={getPaygradeDurationOptions()}
        label="Paygrade Duration"
        name="duration"
        width="100%"
        onInputChange={handleDropdownChange}
      />
      <TMSInput
        id="paygrade-minimumrange"
        label="Minimum Pay Range"
        name="minimumRange"
        variant="outlined"
        type="number"
        fullWidth
      />
      <TMSInput
        id="paygrade-maximumrange"
        label="Maximum Pay Range"
        name="maximumRange"
        variant="outlined"
        type="number"
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
          Create Paygrade
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: PaygradeValues) => void;
}
const AddPaygrade: FC<Props> = ({ onSubmitForm }) => {
  const [error, setError] = useState("");
  const handleSubmit = async (values: PaygradeValues) => {
    if (values.minimumRange > values.maximumRange) {
      setError("* Minimum Range must be lower than Maximum");
      return;
    }
    onSubmitForm(values);
  };

  //   const onFormChange = () => {
  //     setError("");
  //   };
  return (
    <MDBox p={2}>
      <FormikWrapper
        // onFormikProps={onFormChange}
        initialValues={initialValues}
        validationSchema={paygradeValidationSchema}
        onSubmit={handleSubmit}
        children={<Form />}
      />
      {error && (
        <MDTypography color="error" fontSize="1rem">
          {error}
        </MDTypography>
      )}
    </MDBox>
  );
};

export default AddPaygrade;
