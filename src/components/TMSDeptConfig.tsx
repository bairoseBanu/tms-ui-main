import { Card, IconButton, Modal, Tooltip } from "@mui/material";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import TMSCheckBox from "./TMSCheckbox";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import useApiCall from "hooks/useApiCall";
import { DepartmentDoc, DepartmentValues } from "types/api-response";
import TMSLoader from "./TMSLoader";
import {
  deleteDepartment,
  editDepartment,
  newDepartment,
  updateDepartments,
} from "apis/dept.api";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import DeleteDepartment from "./DeleteDepartment";
import { Message } from "types/message";

interface Props {
  onMessage: (message: Message, source: string) => void;
}

const TMSDeptConfig: FC<Props> = ({ onMessage }) => {
  const { data, isLoading: isDeptsLoading } =
    useApiCall<DepartmentDoc[]>("dept");
  const [isLoading, setIsLoading] = useState(false);
  const [addDeptModalOpen, setAddDeptModalOpen] = useState(false);
  const [editDeptModalOpen, setEditDeptModalOpen] = useState(false);
  const [deleteDeptModalOpen, setDeleteDeptModalOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentDoc[]>([]);
  const [updatedDepartments, setUpdatedDepartments] = useState<DepartmentDoc[]>(
    []
  );

  useEffect(() => {
    if (data) {
      setDepartments(data);
    }
  }, [data]);

  const sendUpdatedDepts = async () => {
    setIsLoading(true);
    try {
      const response = await updateDepartments(updatedDepartments);
      if (response.status === 201) {
        setUpdatedDepartments([]);
        onMessage(
          {
            message: "Departments updated successfully",
            severity: "success",
          },
          "department"
        );
      } else {
        onMessage(
          {
            message: "Error in Updating Department",
            severity: "error",
          },
          "department"
        );
      }
    } catch (error: unknown) {
      console.log({ error });
      onMessage(
        {
          message: "Error in Updating Department",
          severity: "error",
        },
        "department"
      );
    }

    setIsLoading(false);
  };

  const cancelUpdatedDepts = () => {
    const clonedDepartments = [...departments];
    updatedDepartments.forEach((updatedDept) => {
      clonedDepartments.forEach((dept) => {
        if (dept.id === updatedDept.id) {
          dept.isActive = !updatedDept.isActive;
        }
      });
    });
    setDepartments(clonedDepartments);
    setUpdatedDepartments([]);
  };

  const handleChange = (deptId: string, isChecked: boolean) => {
    const newDepartments = [...departments];
    newDepartments.forEach((dept) => {
      if (dept.id === deptId) {
        dept.isActive = isChecked;
        setUpdatedDepartments((prev) => [...prev, dept]);
      }
    });
    setDepartments(newDepartments);
  };

  const createDept = async (values: DepartmentValues) => {
    try {
      setIsLoading(true);
      const response = await newDepartment(values);
      if (response.status === 201) {
        const clonedDepts = [...departments];
        const newDept = response.data as DepartmentDoc;
        clonedDepts.push(newDept);
        setDepartments(clonedDepts);
        setAddDeptModalOpen(false);
        onMessage(
          {
            message: "department created successfully!",
            severity: "success",
          },
          "department"
        );
      } else {
        onMessage(
          {
            message: "Error in Creating a Department!",
            severity: "error",
          },
          "department"
        );
      }
      setIsLoading(false);
    } catch {
      onMessage(
        {
          message: "Error in Creating a Department!",
          severity: "error",
        },
        "department"
      );
      setIsLoading(false);
    }
  };
  const editDept = async (values: DepartmentValues) => {
    try {
      setIsLoading(true);
      const response = await editDepartment(values);
      if (response.status === 201) {
        const clonedDepts = [...departments].filter(
          (dep) => dep.id !== values.deptId
        );

        const newDept = response.data as DepartmentDoc;
        clonedDepts.push(newDept);
        setDepartments(clonedDepts);
        setEditDeptModalOpen(false);
        onMessage(
          {
            message: "Department edited successfully!",
            severity: "success",
          },
          "department"
        );
      } else {
        console.log("Error in Editing the Dept");
        onMessage(
          {
            message: "Error in Editing the Department!",
            severity: "error",
          },
          "department"
        );
      }
      setIsLoading(false);
    } catch {
      onMessage(
        {
          message: "Error in Editing the Department!",
          severity: "error",
        },
        "department"
      );
      setIsLoading(false);
    }
  };

  const DeleteDept = async (deptId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteDepartment(deptId);
      if (response.status === 200) {
        console.log("dept deleted successfully");
        const clonedDepts = [...departments].filter((dep) => dep.id !== deptId);
        setDepartments(clonedDepts);
        setDeleteDeptModalOpen(false);
        onMessage(
          {
            message: "Department deleted successfully!",
            severity: "success",
          },
          "department"
        );
      } else {
        onMessage(
          {
            message: "Error in deleting the Department!",
            severity: "error",
          },
          "department"
        );
      }
    } catch (error: unknown) {
      onMessage(
        {
          message: "Error in deleting the Department!",
          severity: "error",
        },
        "department"
      );
    }
    setIsLoading(false);
  };
  if (isLoading || isDeptsLoading) {
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
          <MDTypography>Department</MDTypography>
          <MDBox>
            <MDButton
              startIcon={<EditIcon />}
              color="info"
              onClick={() => setEditDeptModalOpen(true)}
              sx={{ m: 1 }}
            >
              Edit Existing Department
            </MDButton>
            <MDButton
              startIcon={<AddIcon />}
              color="info"
              onClick={() => setAddDeptModalOpen(true)}
              sx={{ mx: 1 }}
            >
              Add Department
            </MDButton>
            <MDButton
              startIcon={<DeleteIcon />}
              color="error"
              variant="outlined"
              onClick={() => setDeleteDeptModalOpen(true)}
              sx={{ mx: 1 }}
            >
              Delete Department
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox py={2} display={"flex"} flexWrap={"wrap"}>
          {departments.map((dep) => (
            <TMSCheckBox
              checked={dep.isActive}
              onChange={handleChange}
              id={dep.id}
              sx={{ px: 2 }}
              label={dep.name.toUpperCase()}
            />
          ))}
        </MDBox>
        {updatedDepartments.length > 0 && (
          <MDBox display={"flex"} justifyContent={"flex-end"}>
            <MDButton sx={{ mx: 1 }} color="primary" onClick={sendUpdatedDepts}>
              Save Changes
            </MDButton>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={cancelUpdatedDepts}
            >
              Cancel
            </MDButton>
          </MDBox>
        )}
      </Card>
      <Modal open={addDeptModalOpen} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setAddDeptModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <AddDepartment onSubmitForm={createDept} />
        </MDBox>
      </Modal>
      <Modal open={editDeptModalOpen} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setEditDeptModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <EditDepartment onSubmitForm={editDept} />
          {/* <MDBox>Tetetet</MDBox> */}
        </MDBox>
      </Modal>
      <Modal open={deleteDeptModalOpen} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setDeleteDeptModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <DeleteDepartment onDelete={DeleteDept} departments={departments} />
        </MDBox>
      </Modal>
    </>
  );
};

export default TMSDeptConfig;
