import { EmployeeProof } from "types/employee-proof.type";
import useApiCall from "hooks/useApiCall";
import { ProofFormValues } from "types/proof-form-values";
import TMSEmployeeProofs from "components/TMSEmployeeProofs";
import TMSLoader from "components/TMSLoader";

const EmployeeProof = () => {
  const state = useApiCall("rtwdocsurl");
  const proofData = state.data as EmployeeProof[];
  console.log({ proofData });

  const handleSubmitForm = (values: ProofFormValues) => {
    console.log({ values }, "at final");
  };

  const { isLoading, error } = state;
  if (isLoading) return <TMSLoader />;
  if (error) return <>Erorr....</>;

  return (
    <TMSEmployeeProofs proofData={proofData} onProofSubmit={handleSubmitForm} />
  );
};
export default EmployeeProof;
