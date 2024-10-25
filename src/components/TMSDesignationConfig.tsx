import { Card, IconButton, Modal, Tooltip } from "@mui/material";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import TMSCheckBox from "./TMSCheckbox";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import useApiCall from "hooks/useApiCall";
import { DesignationDoc } from "types/api-response";
import TMSLoader from "./TMSLoader";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteDesignation,
  editDesignation,
  newDesignation,
  updateDesignations,
} from "apis/designation.api";
import { DesignationValues } from "types/designation-values";
import AddDesignation from "./AddDesignation";
import EditDesignation from "./EditDesignation";
import DeleteDesignation from "./DeleteDesignation";
import { Message } from "types/message";

interface Props {
  onMessage: (message: Message, source: string) => void;
}

const TMSDesignationConfig: FC<Props> = ({ onMessage }) => {
  const { data, isLoading: isDesignationLoading } =
    useApiCall<DesignationDoc[]>("designation");
  const [isLoading, setIsLoading] = useState(false);
  const [addDesignationModal, setAddDesignationModal] = useState(false);
  const [editDesignationModal, setEditDesignationModal] = useState(false);
  const [deleteDesignationModal, setDeleteDesignationModal] = useState(false);
  const [designations, setDesignations] = useState<DesignationDoc[]>([]);
  const [updatedDesignations, setUpdatedDesignations] = useState<
    DesignationDoc[]
  >([]);

  useEffect(() => {
    if (data) {
      setDesignations(data);
    }
  }, [data]);

  const sendUpdatedDesignations = async () => {
    setIsLoading(true);
    try {
      const response = await updateDesignations(updatedDesignations);
      if (response.status === 201) {
        setUpdatedDesignations([]);
        onMessage(
          {
            message: "Designations updated successfully!",
            severity: "success",
          },
          "designation"
        );
      } else {
        console.log("Error in Updating designations");
        onMessage(
          {
            message: "Error in updating designations",
            severity: "error",
          },
          "designation"
        );
      }
    } catch (error: unknown) {
      console.log("Error in updating Designations", error);
      onMessage(
        {
          message: "Error in updating designations",
          severity: "error",
        },
        "designation"
      );
    }
    setIsLoading(false);
  };

  const cancelUpdatedDesignations = () => {
    const clonedDesignations = [...designations];
    updatedDesignations.forEach((updatedDesignation) => {
      clonedDesignations.forEach((designation) => {
        if (designation.id === updatedDesignation.id) {
          designation.isActive = !updatedDesignation.isActive;
        }
      });
    });
    setDesignations(clonedDesignations);
    setUpdatedDesignations([]);
  };

  const handleChange = (designationId: string, isChecked: boolean) => {
    const newDesignations = [...designations];
    newDesignations.forEach((desi) => {
      if (desi.id === designationId) {
        desi.isActive = isChecked;
        setUpdatedDesignations((prev) => [...prev, desi]);
      }
    });
    setDesignations(newDesignations);
  };

  const createDesignation = async (values: DesignationValues) => {
    try {
      setIsLoading(true);
      const response = await newDesignation(values);
      if (response.status === 201) {
        const clonedDesignations = [...designations];
        const newdesignation = response.data as DesignationDoc;
        clonedDesignations.push(newdesignation);
        setDesignations(clonedDesignations);
        setAddDesignationModal(false);
        onMessage(
          {
            message: "designation created successfully!",
            severity: "success",
          },
          "designation"
        );
      } else {
        onMessage(
          {
            message: "Error in Creating a Designation",
            severity: "error",
          },
          "designation"
        );
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error in Creating a Designation", error);
      onMessage(
        {
          message: "Error in Creating a Designation",
          severity: "error",
        },
        "designation"
      );
      setIsLoading(false);
    }
  };
  const editDesi = async (values: DesignationValues) => {
    try {
      setIsLoading(true);
      const response = await editDesignation(values);
      if (response.status === 201) {
        const clonedDesignations = [...designations].filter(
          (desi) => desi.id !== values.designationId
        );

        const newDesignation = response.data as DesignationDoc;
        clonedDesignations.push(newDesignation);
        setDesignations(clonedDesignations);
        setEditDesignationModal(false);
        onMessage(
          {
            message: "Designation Edited successfully!",
            severity: "success",
          },
          "designation"
        );
      } else {
        console.log("Error in Editing the designation");
        onMessage(
          {
            message: "Error in Editing a designation",
            severity: "error",
          },
          "designation"
        );
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error in Editing the designation", error);
      onMessage(
        {
          message: "Error in Editing a designation",
          severity: "error",
        },
        "designation"
      );
      setIsLoading(false);
    }
  };

  const DeleteDesi = async (designationId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteDesignation(designationId);
      if (response.status === 200) {
        console.log("designation deleted successfully");
        const clonedDesignations = [...designations].filter(
          (des) => des.id !== designationId
        );
        setDesignations(clonedDesignations);
        setDeleteDesignationModal(false);
        onMessage(
          {
            message: "designation deleted successfully!",
            severity: "success",
          },
          "designation"
        );
      } else {
        onMessage(
          {
            message: "Error in deleting a designation",
            severity: "error",
          },
          "designation"
        );
      }
    } catch (error: unknown) {
      console.log("Error in deleting the Designation", error);
      onMessage(
        {
          message: "Error in deleting a designation",
          severity: "error",
        },
        "designation"
      );
    }
    setIsLoading(false);
  };
  if (isLoading || isDesignationLoading) {
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
          <MDTypography>Designation</MDTypography>
          <MDBox>
            <MDButton
              startIcon={<EditIcon />}
              color="info"
              onClick={() => setEditDesignationModal(true)}
              sx={{ m: 1 }}
            >
              Edit Existing Designation
            </MDButton>
            <MDButton
              startIcon={<AddIcon />}
              color="info"
              onClick={() => setAddDesignationModal(true)}
              sx={{ mx: 1 }}
            >
              Add Designation
            </MDButton>
            <MDButton
              startIcon={<DeleteIcon />}
              color="error"
              variant="outlined"
              onClick={() => setDeleteDesignationModal(true)}
              sx={{ mx: 1 }}
            >
              Delete Designation
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox py={2} display={"flex"} flexWrap={"wrap"}>
          {designations.map((desi) => (
            <TMSCheckBox
              checked={desi.isActive}
              onChange={handleChange}
              id={desi.id}
              sx={{ px: 2 }}
              label={desi.name.toUpperCase()}
            />
          ))}
        </MDBox>
        {updatedDesignations.length > 0 && (
          <MDBox display={"flex"} justifyContent={"flex-end"}>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={sendUpdatedDesignations}
            >
              Save Changes
            </MDButton>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={cancelUpdatedDesignations}
            >
              Cancel
            </MDButton>
          </MDBox>
        )}
      </Card>
      <Modal open={addDesignationModal} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setAddDesignationModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <AddDesignation onSubmitForm={createDesignation} />
        </MDBox>
      </Modal>
      <Modal open={editDesignationModal} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setEditDesignationModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <EditDesignation onSubmitForm={editDesi} />
        </MDBox>
      </Modal>
      <Modal
        open={deleteDesignationModal}
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
                onClick={() => setDeleteDesignationModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <DeleteDesignation
            onDelete={DeleteDesi}
            designations={designations}
          />
        </MDBox>
      </Modal>
    </>
  );
};

export default TMSDesignationConfig;
