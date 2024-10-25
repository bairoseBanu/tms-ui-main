import ApprovalComponent from "./ApprovalComponent";
import EmployeeProofForm from "./EmployeeProofForm";
import { useEffect, useState } from "react";
import { ProofFormValues } from "types/proof-form-values";
import useApiCall from "hooks/useApiCall";
import { RTWList } from "types/api-response";
import { Card, Icon, IconButton, Modal, Tooltip } from "@mui/material";
import { getRtwdocs } from "apis/rtw.api";
import EmployeeProof from "screens/EmployeeProofScreen";
import EmployeeProofView from "./EmployeeProofView";
import MDBox from "./MDBox";
import CloseIcon from "@mui/icons-material/Close";
import { ProofType, VerificationStatus } from "types/employee-proof.type";

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Doc Type", accessor: "docType" },
  { Header: "Doc Number", accessor: "docNumber" },
  { Header: "Doc Expiry", accessor: "docExpiry" },
  { Header: "Status", accessor: "docStatus" },
  { Header: "view", accessor: "view" },
];
const approvedColumns = [
  { Header: "Name", accessor: "name" },
  { Header: "Doc Type", accessor: "docType" },
  { Header: "Doc Number", accessor: "docNumber" },
  { Header: "Doc Expiry", accessor: "docExpiry" },
  { Header: "Status", accessor: "docStatus" },
];

function EmployeeProofApproval() {
  const { data, isLoading } = useApiCall<RTWList[]>("rtwdocs");
  const rtwLists = data as RTWList[];

  const [pendingRtwLists, setPendingRtwLists] = useState<RTWList[]>([]);
  const [nonPendingRtwLists, setNonPendingRtwLists] = useState<RTWList[]>([]);

  useEffect(() => {
    if (rtwLists && rtwLists.length > 0) {
      const pendingLists = rtwLists.filter(
        (rtw) => rtw.docStatus === "pending"
      );
      setPendingRtwLists(pendingLists);
      const nonPendingLists = rtwLists.filter(
        (rtw) => rtw.docStatus !== "pending"
      );
      setNonPendingRtwLists(nonPendingLists);
    }
  }, [rtwLists]);

  const [proofData, setProofData] = useState<EmployeeProof[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [proofDataLoading, setProofDataLoading] = useState(false);
  const [currentUserRtws, setCurrentUserRtws] = useState<RTWList[]>();

  const handleView = async (employeeId: string) => {
    setProofDataLoading(true);
    const _rtwList = rtwLists.filter(
      (rtwList) => rtwList.employeeId === employeeId
    );
    setCurrentUserRtws(_rtwList);
    const response = await getRtwdocs(employeeId);
    const _proof = response.data as unknown as EmployeeProof[];

    setProofData(_proof);
    setProofDataLoading(false);
    setModalOpen(true);
  };

  const handleVerify = (
    employeeId: string,
    docType: ProofType,
    updatedStatus: VerificationStatus
  ) => {
    const clonedPendingRtwLists = [...pendingRtwLists];
    const clonedNonPendingRtwLists = [...nonPendingRtwLists];
    const newRtw = clonedPendingRtwLists.find((rtw, index, array) => {
      if (rtw.employeeId === employeeId && rtw.docType === docType) {
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    newRtw.docStatus = updatedStatus;
    clonedNonPendingRtwLists.push(newRtw);

    setPendingRtwLists(clonedPendingRtwLists);
    setNonPendingRtwLists(clonedNonPendingRtwLists);
  };
  const formatRtwLists = (rtwLists: RTWList[]) => {
    return rtwLists.map((rtwList) => ({
      name: rtwList.name,
      docType: rtwList.docType.toUpperCase(),
      docNumber: rtwList.docNumber ? rtwList.docNumber : undefined,
      docExpiry: rtwList.docExpiry ? rtwList.docExpiry.split("T")[0] : "-",
      docStatus: rtwList.docStatus,
      view: (
        <Tooltip title="View">
          <IconButton
            color="secondary"
            onClick={() => handleView(rtwList.employeeId)}
          >
            <Icon>visibility</Icon>
          </IconButton>
        </Tooltip>
      ),
    }));
  };

  const handleSubmitForm = (values: ProofFormValues) => {
    console.log("I am in proof submitteteted", values);
  };
  if (isLoading || proofDataLoading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <ApprovalComponent
          toBeApprovedData={formatRtwLists(pendingRtwLists)}
          toBeApprovedcolumns={columns}
          Approvedcolumns={approvedColumns}
          _ApprovedData={formatRtwLists(nonPendingRtwLists)}
          ChildForm={<EmployeeProofForm onSubmitForm={handleSubmitForm} />}
        />
        <Modal
          open={modalOpen}
          sx={{ width: "80%", maxHeight: "60%", marginX: "auto" }}
        >
          <Card>
            {proofDataLoading && <>Loading...</>}
            <MDBox>
              <MDBox display="flex" justifyContent="flex-end">
                <Tooltip title="close">
                  <IconButton onClick={() => setModalOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </MDBox>
              {proofData && proofData.length > 0 && (
                <EmployeeProofView
                  rtws={currentUserRtws}
                  proofData={proofData}
                  onVerify={handleVerify}
                />
              )}
            </MDBox>
          </Card>
        </Modal>
      </>
    );
  }
}

export default EmployeeProofApproval;
