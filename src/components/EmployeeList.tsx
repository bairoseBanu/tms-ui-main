import MDBox from "./MDBox";
import { Card, Icon, IconButton, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import DataTable from "./Tables/DataTable";
import { useCallback, useState } from "react";
import { useAppData } from "hooks/useAppData";
import TMSModal from "./TMSModal";
import MDButton from "./MDButton";
import EmployeeForm from "./EmployeeForm";
import useApiCall from "hooks/useApiCall";
import { Employee } from "types/api-response";
import TMSLoader from "./TMSLoader/TMSLoader";
import TMSProfileCard from "./TMSProfileCard";
import { Close } from "@mui/icons-material";
import { getRtwdocs } from "apis/rtw.api";
import { EmployeeProof } from "types/employee-proof.type";
import TMSEmployeeProofs from "./TMSEmployeeProofs";
import TMSSnackbar from "./TMSSnackbar";
import { Message } from "types/message";
import { getDesignationName } from "lib/getDesignationName";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 2,

  maxHeight: "90%",
  overflowY: "auto",
  borderRadius: "10px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ddd",
    borderRadius: "8px",
    boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.5)`,
  },

  "&::-webkit-scrollbar-track": {
    backgroundColor: "#fff",
    outline: "1,5px solid slategrey",
  },
};
const Columns = [
  { Header: "Name", accessor: "firstName" },
  { Header: "Email", accessor: "email" },
  { Header: "Department", accessor: "dept" },
  { Header: "Role", accessor: "role" },
  { Header: "Working Hours", accessor: "workingHours" },
  { Header: "", accessor: "edit" },
];

function EmployeeList() {
  const { appData, isAppDataLoading } = useAppData();
  const response = useApiCall("employee");
  const employees = response.data as Employee[];
  const { isLoading: isEmployeeLoading } = response;
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"profilecard" | "proof">(
    "profilecard"
  );
  const [proofData, setProofData] = useState<EmployeeProof[]>();
  const [employee, setEmployee] = useState<Employee>();
  const [isLoading, setIsloading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEmployeeClose = () => setOpen(false);

  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });

  const handleEdit = useCallback(
    (id: string) => {
      handleOpen();
      const emp = employees.find((employee: Employee) => employee.id === id);
      setEmployee(emp);
    },
    [employees]
  );

  const renderData = useCallback(() => {
    const { departments, designationsDocs } = appData;
    const findDepName = (id: string) => {
      return departments?.find((dept) => dept.id === id);
    };

    const rows =
      employees?.map((employee: Employee) => ({
        firstName: employee.firstName,
        email: employee.email,
        dept: findDepName(employee.deptId)?.name,
        role: getDesignationName(employee.designation, designationsDocs),
        workingHours: employee.workingHours,
        edit: (
          <Tooltip title="View">
            <IconButton
              color="secondary"
              onClick={() => handleEdit(employee.id)}
            >
              <Icon>visibility</Icon>
            </IconButton>
          </Tooltip>
        ),
      })) || [];
    return { columns: [...Columns], rows: [...rows] };
  }, [appData, employees, handleEdit]);

  const handleMessageClose = () => {
    setMessage({ message: "", severity: "success" });
  };

  const handleViewProof = async (employeeId: string) => {
    setIsloading(true);
    try {
      const response = await getRtwdocs(employeeId);
      if (response.status === 200) {
        setProofData(response.data);
        setModalType("proof");
      } else {
        setMessage({ message: "Failed to Load", severity: "error" });
      }
    } catch (e: unknown) {
      setMessage({ message: "Failed to Load", severity: "error" });
    }

    setIsloading(false);
  };

  if (isAppDataLoading) {
    return <TMSLoader />;
  }
  const { departments } = appData;

  return (
    <MDBox>
      {/* <Card> */}
      {employees && (
        <Card>
          <DataTable
            isAddModal={false}
            entriesPerPage={{ defaultValue: 6, entries: [5, 10, 15, 20, 25,30] }}
            table={renderData()}
            title="Employee Lists"
            canSearch
          ></DataTable>
          <TMSModal
            isButton={true}
            modalText={
              <MDButton variant="gradient" color="info" fullWidth>
                <Icon>add</Icon> ADD EMPLOYEE
              </MDButton>
            }
          >
            {
              <EmployeeForm
                style={{
                  height: "70vh",
                  overflowY: "auto",
                  padding: "10px",
                  maxHeight: "50%",
                }}
              />
            }
          </TMSModal>
        </Card>
      )}

      {isEmployeeLoading || isLoading ? (
        <MDBox
          sx={{
            position: "fixed",
            top: "60%",
            left: "60%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TMSLoader />
        </MDBox>
      ) : (
        <></>
      )}
      {employees && departments && (
        <Modal
          open={open}
          onClose={handleEmployeeClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            sx={{
              position: "relative",
              width: "70%",
              height: "100%",
              margin: "auto",
              backgroundColor: "#ffffff",
            }}
          >
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: "1px",
                right: "5px",
                boxShadow: 10,
              }}
              onClick={handleEmployeeClose}
            >
              <Close onClick={handleEmployeeClose}></Close>
            </IconButton>

            <MDBox sx={style}>
              {modalType === "profilecard" && (
                <TMSProfileCard
                  employeeId={employee?.id}
                  departments={departments}
                  isCurrentUser={false}
                  onViewEmpProof={handleViewProof}
                />
              )}
              {modalType === "proof" && (
                <>
                  <Tooltip title="Return to Employee Lists">
                    <IconButton onClick={() => setModalType("profilecard")}>
                      <Icon>arrow_back</Icon>
                    </IconButton>
                  </Tooltip>
                  {proofData && (
                    <TMSEmployeeProofs
                      isUserOnly={false}
                      proofData={proofData}
                    />
                  )}
                </>
              )}
            </MDBox>
          </Card>
        </Modal>
      )}
      {message.message && (
        <TMSSnackbar
          open={true}
          message={message.message}
          severity={message.severity}
          handleClose={handleMessageClose}
        />
      )}
    </MDBox>
  );
}

export default EmployeeList;
