import { Card } from "@mui/material";
import { FC } from "react";
import { EmployeeProof } from "types/employee-proof.type";
import MDTypography from "./MDTypography";
import MDBox from "./MDBox";
import TMSEmployeeProof from "./TMSEmployeeProof";
import TMSModal from "./TMSModal";
import EmployeeProofForm from "./EmployeeProofForm";
import EmployeeProofStatus from "./EmployeeProofStatus";
import { ProofFormValues } from "types/proof-form-values";

interface Props {
  proofData: EmployeeProof[];
  onProofSubmit?: (values: ProofFormValues) => void;
  isUserOnly?: boolean;
}

const TMSEmployeeProofs: FC<Props> = ({
  proofData,
  onProofSubmit,
  isUserOnly = true,
}) => {
  return (
    <Card sx={{ width: "100%" }}>
      <MDTypography
        variant="h3"
        fontWeight="medium"
        textAlign="center"
        mt={2}
        mb={2}
      >
        Employee Proofs
      </MDTypography>
      <MDTypography
        fontWeight="thin"
        textAlign="right"
        mt={0}
        mb={2}
        fontSize="small"
        mr={6}
      >
        * Max 2 files allowed per proof type
      </MDTypography>

      <MDBox
        display="grid"
        gridTemplateColumns={"1fr 1fr"}
        justifyContent={"space-around"}
        alignItems={"center"}
        mt={2}
      >
        {proofData.map((proof) => {
          if (proof.src && proof.src.length > 0) {
            return <TMSEmployeeProof rtws={[]} proof={proof} />;
          }
        })}
      </MDBox>
      <TMSModal
        modalText="New Proof"
        isButton={true}
        children={
          <EmployeeProofForm
            userOnly={isUserOnly}
            onSubmitForm={onProofSubmit}
          />
        }
        buttonProps={{
          fullWidth: true,
          variant: "contained",
          color: "primary",
          sx: { color: "#ffffff" },
        }}
      />
      <MDBox
        ml="1px"
        p={2}
        display="flex"
        justifyContent="end"
        alignItems={"center"}
      >
        <MDTypography mr={1} variant="h6">
          Statuses:{" "}
        </MDTypography>
        <EmployeeProofStatus isContentVisible content="approved" />
        <EmployeeProofStatus isContentVisible content="rejected" />
        <EmployeeProofStatus isContentVisible content="pending" />
      </MDBox>
    </Card>
  );
};

export default TMSEmployeeProofs;
