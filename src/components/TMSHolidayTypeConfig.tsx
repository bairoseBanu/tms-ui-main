import { Card, IconButton, Modal, Tooltip } from "@mui/material";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import TMSCheckBox from "./TMSCheckbox";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import useApiCall from "hooks/useApiCall";
import { HolidayTypeDoc } from "types/api-response";
import TMSLoader from "./TMSLoader";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteHolidayType,
  editHolidayType,
  newHolidayType,
  updateHolidayTypes,
} from "apis/holidaytype.api";
import { HolidayTypeValues } from "types/holidaytype-values";
import AddHolidayType from "./AddHolidayType";
import EditHolidayType from "./EditHolidayType";
import DeleteHolidayType from "./DeleteHolidayType";
import { Message } from "types/message";

interface Props {
  onMessage: (message: Message, source: string) => void;
}
const TMSHolidayTypeConfig: FC<Props> = ({ onMessage }) => {
  const { data, isLoading: isHolidayTypeLoading } =
    useApiCall<HolidayTypeDoc[]>("holidaytype");
  const [isLoading, setIsLoading] = useState(false);
  const [addHolidayTypeModal, setAddHolidayTypeModal] = useState(false);
  const [editHolidayTypeModal, setEditHolidayTypeModal] = useState(false);
  const [deleteHolidayTypeModal, setDeleteHolidayTypeModal] = useState(false);
  const [holidayTypes, setHolidayTypes] = useState<HolidayTypeDoc[]>([]);
  const [updatedHolidayTypes, setUpdatedHolidayTypes] = useState<
    HolidayTypeDoc[]
  >([]);

  useEffect(() => {
    if (data) {
      setHolidayTypes(data);
    }
  }, [data]);

  const sendUpdatedHolidayTypes = async () => {
    setIsLoading(true);
    try {
      const response = await updateHolidayTypes(updatedHolidayTypes);
      if (response.status === 201) {
        setUpdatedHolidayTypes([]);
        onMessage(
          {
            message: "Holidaytypes Updated Successfully!",
            severity: "success",
          },
          "holidayType"
        );
      } else {
        onMessage(
          {
            message: "Error in updating Holidaytypes",
            severity: "error",
          },
          "holidayType"
        );
      }
    } catch (error: unknown) {
      console.log("Error in Updating HolidayTypes");
      onMessage(
        {
          message: "Error in updating Holidaytypes",
          severity: "error",
        },
        "holidayType"
      );
    }
    setIsLoading(false);
  };

  const cancelUpdatedHolidayTypes = () => {
    const clonedHolidayTypes = [...holidayTypes];
    updatedHolidayTypes.forEach((updatedHT) => {
      clonedHolidayTypes.forEach((HT) => {
        if (HT.id === updatedHT.id) {
          HT.isActive = !updatedHT.isActive;
        }
      });
    });
    setHolidayTypes(clonedHolidayTypes);
    setUpdatedHolidayTypes([]);
  };

  const handleChange = (holidayTypeId: string, isChecked: boolean) => {
    const newHolidayTypes = [...holidayTypes];
    newHolidayTypes.forEach((ht) => {
      if (ht.id === holidayTypeId) {
        ht.isActive = isChecked;
        setUpdatedHolidayTypes((prev) => [...prev, ht]);
      }
    });
    setHolidayTypes(newHolidayTypes);
  };

  const createHolidayType = async (values: HolidayTypeValues) => {
    try {
      setIsLoading(true);
      const response = await newHolidayType(values);
      if (response.status === 201) {
        const clonedHolidayTypes = [...holidayTypes];
        const newHolidayType = response.data as HolidayTypeDoc;
        clonedHolidayTypes.push(newHolidayType);
        setHolidayTypes(clonedHolidayTypes);
        setAddHolidayTypeModal(false);
        onMessage(
          {
            message: "Holidaytype Created Successfully!",
            severity: "success",
          },
          "holidayType"
        );
      } else {
        onMessage(
          {
            message: "Error in Creating Holidaytype",
            severity: "error",
          },
          "holidayType"
        );
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error in Creating a HolidayType", error);
      onMessage(
        {
          message: "Error in Creating Holidaytype",
          severity: "error",
        },
        "holidayType"
      );
      setIsLoading(false);
    }
  };
  const editHT = async (values: HolidayTypeValues) => {
    try {
      setIsLoading(true);
      const response = await editHolidayType(values);
      if (response.status === 201) {
        const clonedHolidayTypes = [...holidayTypes].filter(
          (ht) => ht.id !== values.holidayTypeId
        );

        const newHolidayType = response.data as HolidayTypeDoc;
        clonedHolidayTypes.push(newHolidayType);
        setHolidayTypes(clonedHolidayTypes);
        setEditHolidayTypeModal(false);
        onMessage(
          {
            message: "Holidaytype Edited Successfully!",
            severity: "success",
          },
          "holidayType"
        );
      } else {
        onMessage(
          {
            message: "Error in editing Holidaytype",
            severity: "error",
          },
          "holidayType"
        );
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error in Editing the HolidayType", error);
      onMessage(
        {
          message: "Error in editing Holidaytype",
          severity: "error",
        },
        "holidayType"
      );
      setIsLoading(false);
    }
  };

  const DeleteHT = async (holidayTypeId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteHolidayType(holidayTypeId);
      if (response.status === 200) {
        console.log("designation deleted successfully");
        const clonedHolidayTypes = [...holidayTypes].filter(
          (ht) => ht.id !== holidayTypeId
        );
        setHolidayTypes(clonedHolidayTypes);
        setDeleteHolidayTypeModal(false);
        onMessage(
          {
            message: "Holidaytype deleted Successfully!",
            severity: "success",
          },
          "holidayType"
        );
      } else {
        console.log("Error in deleting the HolidayType");
        onMessage(
          {
            message: "Error in deleting Holidaytype",
            severity: "error",
          },
          "holidayType"
        );
      }
    } catch (error: unknown) {
      console.log("Error in deleting the HolidayType", error);
      onMessage(
        {
          message: "Error in deleting Holidaytype",
          severity: "error",
        },
        "holidayType"
      );
    }
    setIsLoading(false);
  };

  if (isLoading || isHolidayTypeLoading) {
    return <TMSLoader />;
  }

  return (
    <>
      <Card sx={{ p: 1 }}>
        <MDBox
          display="flex"
          justifyContent={"space-between"}
          px={2}
          py={1}
          bgColor="#00000029"
          sx={{ borderRadius: "1rem" }}
        >
          <MDTypography>Holiday Type</MDTypography>
          <MDBox>
            <MDButton
              startIcon={<EditIcon />}
              color="info"
              onClick={() => setEditHolidayTypeModal(true)}
              sx={{ m: 1 }}
            >
              Edit Existing Holiday Type
            </MDButton>
            <MDButton
              startIcon={<AddIcon />}
              color="info"
              onClick={() => setAddHolidayTypeModal(true)}
              sx={{ mx: 1 }}
            >
              Add Holiday Type
            </MDButton>
            <MDButton
              startIcon={<DeleteIcon />}
              color="error"
              variant="outlined"
              onClick={() => setDeleteHolidayTypeModal(true)}
              sx={{ mx: 1 }}
            >
              Delete Holiday Type
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox py={2} display={"flex"} flexWrap={"wrap"}>
          {holidayTypes.map((ht) => (
            <TMSCheckBox
              checked={ht.isActive}
              onChange={handleChange}
              id={ht.id}
              sx={{ px: 2 }}
              label={ht.name.toUpperCase()}
            />
          ))}
        </MDBox>
        {updatedHolidayTypes.length > 0 && (
          <MDBox display={"flex"} justifyContent={"flex-end"}>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={sendUpdatedHolidayTypes}
            >
              Save Changes
            </MDButton>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={cancelUpdatedHolidayTypes}
            >
              Cancel
            </MDButton>
          </MDBox>
        )}
      </Card>
      <Modal open={addHolidayTypeModal} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setAddHolidayTypeModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <AddHolidayType onSubmitForm={createHolidayType} />
        </MDBox>
      </Modal>
      <Modal open={editHolidayTypeModal} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setEditHolidayTypeModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <EditHolidayType onSubmitForm={editHT} />
        </MDBox>
      </Modal>
      <Modal
        open={deleteHolidayTypeModal}
        sx={{ width: "50%", margin: "auto" }}
      >
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setDeleteHolidayTypeModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <DeleteHolidayType onDelete={DeleteHT} holidayTypes={holidayTypes} />
        </MDBox>
      </Modal>
    </>
  );
};

export default TMSHolidayTypeConfig;
