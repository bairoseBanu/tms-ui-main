import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FormikWrapper from "components/FormikWrapper";
import MDButton from "./MDButton";
import { BranchValues } from "types/branch-values";
import { branchValidationSchema } from "validations/branch-validation";
import MDTypography from "./MDTypography";
import MDBox from "./MDBox";
import TMSInput from "./TMSInput";
import { newBranch } from "apis/branch.api";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "apis/auth.api";

const initialValues: BranchValues = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
};

const Form = () => {
  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create Branch
        </MDTypography>
      </Box>

      <TMSInput
        id="branch-name"
        label="Branch Name"
        name="name"
        variant="outlined"
        fullWidth
      />

      <TMSInput
        id="addressLine1"
        label="Address Line 1"
        name="addressLine1"
        variant="outlined"
        fullWidth
      />

      <TMSInput
        id="addressLine2"
        label="Address Line Two"
        name="addressLine2"
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
        id="postalCode"
        label="Postal Code"
        name="postalCode"
        variant="outlined"
        fullWidth
      />
      <Box>
        {/* // country Select code needs to be redesigned and added into FOrmik */}
        {/* <CountrySelect /> */}
        <TMSInput
          id="phone"
          label="Phone"
          name="phone"
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Branch
        </MDButton>
      </Box>
    </MDBox>
  );
};

const Branch = () => {
  const navigate = useNavigate();
  const onSubmit = async (values: BranchValues) => {
    const response = await newBranch(values);
    if (response.status === 201) {
      if (response.data.isFirstBranch) {
        await refreshToken();
        navigate("/settings/branchconfig", {
          state: {
            isFirstBranch: true,
          },
        });
      } else {
        navigate("/settings/branchconfig");
      }
    } else {
      console.log("Error in new branch", response.data);
    }
  };
  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={branchValidationSchema}
        onSubmit={onSubmit}
        children={<Form />}
      />
    </>
  );
};

export default Branch;
