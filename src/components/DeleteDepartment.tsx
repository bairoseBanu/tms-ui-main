import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import TMSDropdown from "./TMSDropdown";
import { formatDeptOptions } from "lib/formatDropdownOptions";
import { Department, DepartmentDoc } from "types/api-response";
import { FC, useState } from "react";
import TMSConfirmationModal from "./TMSConfirmModal";

interface Props {
  departments: DepartmentDoc[];
  onDelete: (deptId: string) => void;
}
const DeleteDepartment: FC<Props> = ({ onDelete, departments }) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const handleSubmit = () => {
    setConfirmModal(true);
    // onDelete(selectedDept.id);
  };
  const [selectedDept, setSelectedDept] = useState<DepartmentDoc>();
  const departmentOptions = formatDeptOptions(
    departments as unknown as Department[]
  );

  const handleDepartmentIdChange = (
    _name: string,
    _value: string,
    id: string
  ) => {
    const dept = departments.find((dep) => dep.id === id);
    setSelectedDept(dept);
  };

  const handleConfirmChoose = (chosenOption: string) => {
    if (chosenOption === "cancel") {
      setConfirmModal(false);
      return;
    }
    if (chosenOption === "confirm") {
      onDelete(selectedDept.id);
    }
  };

  return (
    <>
      <MDBox p={3} pt={0} bgcolor={"info"}>
        <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
          <MDTypography my={1.5} variant={"h4"}>
            Delete Department
          </MDTypography>
        </Box>
        <TMSDropdown
          options={departmentOptions}
          label="Department Name"
          name="deptId"
          width="100%"
          onInputChange={handleDepartmentIdChange}
        />
        {selectedDept && (
          <Box mt={4} mb={1}>
            <MDButton
              variant="contained"
              fullWidth
              endIcon={<SendIcon />}
              color="info"
              onClick={handleSubmit}
            >
              Delete Department
            </MDButton>
          </Box>
        )}
        <TMSConfirmationModal
          open={confirmModal}
          onChoose={handleConfirmChoose}
        />
      </MDBox>
    </>
  );
};

export default DeleteDepartment;
