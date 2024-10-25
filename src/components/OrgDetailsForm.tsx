import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import MDButton from "./MDButton";
import FormikWrapper from "./FormikWrapper";
import { orgDetailsValidationSchema } from "validations/org-details-validation";
import { OrgDetailsValues } from "types/org-details-values";
import { FC } from "react";

const initialValues: OrgDetailsValues = {
  phone: "",
  website: "",
  addressLineOne: "",
  addressLineTwo: "",
  city: "",
  country: "",
  postCode: "",
};

const Form = () => {
  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Organization Details
        </MDTypography>
      </Box>

      <TMSInput
        id="org-phone"
        label="Phone Number"
        name="phone"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="website"
        label="Website"
        name="website"
        variant="outlined"
        fullWidth
      />

      <TMSInput
        id="addressLineOne"
        label="Address Line One"
        name="addressLineOne"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="addressLineTwo"
        label="Address Line Two"
        name="addressLineTwo"
        variant="outlined"
        fullWidth
      />

      <TMSInput
        id="city"
        label="City"
        name="city"
        variant="outlined"
        fullWidth
      />

      <TMSInput
        id="country"
        label="Country"
        name="country"
        variant="outlined"
        fullWidth
      />

      <TMSInput
        id="postCode"
        label="Postal Code"
        name="postCode"
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
          Add Organization Details
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmit: (values: OrgDetailsValues) => void;
}
const OrgDetailsForm: FC<Props> = ({ onSubmit }) => {
  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={orgDetailsValidationSchema}
        onSubmit={onSubmit}
        children={<Form />}
      />
    </>
  );
};

export default OrgDetailsForm;
