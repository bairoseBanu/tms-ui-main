import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import TMSDropdown from "./TMSDropdown";
import { formatHolidayTypeOptions } from "lib/formatDropdownOptions";
import { HolidayTypeDoc } from "types/api-response";
import { FC, useState } from "react";
import TMSConfirmationModal from "./TMSConfirmModal";

interface Props {
  holidayTypes: HolidayTypeDoc[];
  onDelete: (holidayTypeId: string) => void;
}
const DeleteHolidayType: FC<Props> = ({ onDelete, holidayTypes }) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const handleSubmit = () => {
    setConfirmModal(true);
  };
  const [selectedHolidayType, setSelectedHolidayType] =
    useState<HolidayTypeDoc>();
  const holidayTypesOptions = formatHolidayTypeOptions(holidayTypes);

  const handleHTIdChange = (_name: string, _value: string, id: string) => {
    const holiType = holidayTypes.find((ht) => ht.id === id);
    setSelectedHolidayType(holiType);
  };

  const handleConfirmChoose = (chosenOption: string) => {
    if (chosenOption === "cancel") {
      setConfirmModal(false);
      return;
    }
    if (chosenOption === "confirm") {
      onDelete(selectedHolidayType.id);
    }
  };

  return (
    <>
      <MDBox p={3} pt={0} bgcolor={"info"}>
        <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
          <MDTypography my={1.5} variant={"h4"}>
            Delete Holiday Type
          </MDTypography>
        </Box>
        <TMSDropdown
          options={holidayTypesOptions}
          label="Holiday Type Name"
          name="holidayTypeId"
          width="100%"
          onInputChange={handleHTIdChange}
        />
        {selectedHolidayType && (
          <Box mt={4} mb={1}>
            <MDButton
              variant="contained"
              fullWidth
              endIcon={<SendIcon />}
              color="info"
              onClick={handleSubmit}
            >
              Delete Holiday Type
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

export default DeleteHolidayType;
