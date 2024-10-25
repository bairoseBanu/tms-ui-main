import { FC, useEffect, useState } from "react";
import EmployeeProofStatus from "components/EmployeeProofStatus";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  EmployeeProof,
  ProofType,
  VerificationStatus,
} from "types/employee-proof.type";
import TMSEmployeeProof from "components/TMSEmployeeProof";
import { RTWList } from "types/api-response";
import { verifyRtwdocs } from "apis/rtw.api";

interface Props {
  proofData: EmployeeProof[];
  rtws: RTWList[];
  onVerify?: (
    employeeId: string,
    docType: ProofType,
    updatedStatus: VerificationStatus
  ) => void;
}
const EmployeeProofView: FC<Props> = ({ proofData, rtws, onVerify }) => {
  const [employeeProofs, setEmployeeProofs] = useState<EmployeeProof[]>();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (proofData) {
      setEmployeeProofs(proofData);
    }
  }, [proofData]);

  const handleVerify = async (
    employeeId: string,
    docType: ProofType,
    updatedStatus: VerificationStatus
  ) => {
    setLoading(true);
    const response = await verifyRtwdocs(employeeId, docType, updatedStatus);
    if (response.status === 201) {
      const clonedEmployeeProofs = [...employeeProofs];
      clonedEmployeeProofs.forEach((proof) => {
        if (proof.employeeId === employeeId && proof.type === docType) {
          proof.status = updatedStatus;
        }
      });
      setEmployeeProofs(clonedEmployeeProofs);
    }
    setLoading(false);
    onVerify(employeeId, docType, updatedStatus);
  };

  if (isLoading) return <>Loading...</>;

  return (
    <MDBox maxHeight={"90vh"}>
      <MDTypography variant="h3" fontWeight="medium" textAlign="center">
        Employee Proofs for {rtws[0].name}
      </MDTypography>
      <MDBox
        display="grid"
        gridTemplateColumns={"1fr 1fr"}
        justifyContent={"space-around"}
        alignItems={"center"}
        mt={2}
        maxHeight="70vh"
        overflow={"scroll"}
      >
        {!isLoading && (
          <>
            {employeeProofs?.map((proof) => {
              if (proof.src && proof.src.length > 0) {
                return (
                  <TMSEmployeeProof
                    sx={{ flexBasis: "80%", width: "70%", padding: 1 }}
                    proof={proof}
                    rtws={rtws}
                    onVerify={handleVerify}
                    isUserOnly={false}
                  />
                );
              }
            })}
          </>
        )}
        {isLoading && <MDBox>Loading...</MDBox>}
      </MDBox>
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
        {/* <MDTypography> */}
        <EmployeeProofStatus isContentVisible content="approved" />
        {/* </MDTypography> */}
        {/* <MDTypography> */}
        <EmployeeProofStatus isContentVisible content="rejected" />
        {/* </MDTypography> */}
        {/* <MDTypography> */}
        <EmployeeProofStatus isContentVisible content="pending" />
        {/* </MDTypography> */}
      </MDBox>
    </MDBox>
  );
};
export default EmployeeProofView;
