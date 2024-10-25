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
import { FC, useEffect, useState } from "react";
import TMSCheckBox from "./TMSCheckbox";
import { HolidayTypeValues } from "types/holidaytype-values";
import { holidayTypeValidationSchema } from "validations/holidaytype-validation";

const initialValues = {
  name: "",
  description: "",
  isPaidLeave: false,
  maxAllowedDaysPerYear: 0,
  carryOverAllowed: false,
  carryOverLimit: 0,
  branchId: "",
  isActive: true,
};

const Form = () => {
  const {
    appData: { currentBranch },
    isAppDataLoading,
  } = useAppData();

  const { setFieldValue } = useFormikContext();
  const [isPaidLeave, setIsPaidLeave] = useState(false);
  const [carryOverAllowed, setCarryOverAllowed] = useState(false);

  const handlePaidLeaveChange = (name: string, isChecked: boolean) => {
    setIsPaidLeave(isChecked);
    setFieldValue(name, isChecked);
  };
  const handleCarryOverAllowed = (name: string, isChecked: boolean) => {
    setCarryOverAllowed(isChecked);
    setFieldValue(name, isChecked);
  };

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
          Create a New Holiday Type
        </MDTypography>
      </Box>

      <TMSInput
        id="holidaytype-name"
        label="holidaytype Name"
        name="name"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="holidaytype-description"
        label="Description"
        name="description"
        variant="outlined"
        fullWidth
      />

      <TMSCheckBox
        id="isPaidLeave"
        label="Paid Leave"
        checked={isPaidLeave}
        onChange={handlePaidLeaveChange}
      />

      <TMSInput
        id="holidaytype-maxAllowedDaysPerYear"
        label="maximum Allowed Days / Year"
        name="maxAllowedDaysPerYear"
        variant="outlined"
        type="number"
        fullWidth
      />
      <TMSCheckBox
        id="carryOverAllowed"
        label="Allow Carryover"
        checked={carryOverAllowed}
        onChange={handleCarryOverAllowed}
      />
      {carryOverAllowed && (
        <TMSInput
          id="holidaytype-carryOverLimit"
          label="No of Holidays to carry over"
          name="carryOverLimit"
          variant="outlined"
          type="number"
          fullWidth
        />
      )}
      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Holiday Type
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: HolidayTypeValues) => void;
}
const AddHolidayType: FC<Props> = ({ onSubmitForm }) => {
  const handleSubmit = async (values: HolidayTypeValues) => {
    onSubmitForm(values);
  };

  return (
    <MDBox p={2}>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={holidayTypeValidationSchema}
        onSubmit={handleSubmit}
        children={<Form />}
      />
    </MDBox>
  );
};

export default AddHolidayType;
