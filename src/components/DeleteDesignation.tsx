import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import TMSDropdown from "./TMSDropdown";
import { formatDesignationDocOptions } from "lib/formatDropdownOptions";
import { DesignationDoc } from "types/api-response";
import { FC, useState } from "react";
import TMSConfirmationModal from "./TMSConfirmModal";

interface Props {
  designations: DesignationDoc[];
  onDelete: (designationId: string) => void;
}
const DeleteDesignation: FC<Props> = ({ onDelete, designations }) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const handleSubmit = () => {
    setConfirmModal(true);
  };
  const [selectedDesignation, setSelectedDesignation] =
    useState<DesignationDoc>();
  const designationOptions = formatDesignationDocOptions(designations);

  const handleDesignationIdChange = (
    _name: string,
    _value: string,
    id: string
  ) => {
    const desig = designations.find((des) => des.id === id);
    setSelectedDesignation(desig);
  };

  const handleConfirmChoose = (chosenOption: string) => {
    if (chosenOption === "cancel") {
      setConfirmModal(false);
      return;
    }
    if (chosenOption === "confirm") {
      onDelete(selectedDesignation.id);
    }
  };

  return (
    <>
      <MDBox p={3} pt={0} bgcolor={"info"}>
        <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
          <MDTypography my={1.5} variant={"h4"}>
            Delete Designation
          </MDTypography>
        </Box>
        <TMSDropdown
          options={designationOptions}
          label="Designation Name"
          name="designationId"
          width="100%"
          onInputChange={handleDesignationIdChange}
        />
        {selectedDesignation && (
          <Box mt={4} mb={1}>
            <MDButton
              variant="contained"
              fullWidth
              endIcon={<SendIcon />}
              color="info"
              onClick={handleSubmit}
            >
              Delete Designation
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

export default DeleteDesignation;
