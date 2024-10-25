import { Card, IconButton, Modal, Tooltip } from "@mui/material";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import TMSCheckBox from "./TMSCheckbox";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import useApiCall from "hooks/useApiCall";
import { PaygradeDoc } from "types/api-response";
import TMSLoader from "./TMSLoader";
import {
  deletePaygrade,
  editPaygrade,
  newPaygrade,
  updatePaygrades,
} from "apis/paygrade.api";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { PaygradeValues } from "types/paygrade-values";
import AddPaygrade from "./AddPaygrade";
import EditPaygrade from "./EditPaygrade";
import DeleteIcon from "@mui/icons-material/Delete";
import DeletePaygrade from "./DeletePaygrade";
import { Message } from "types/message";

interface Props {
  onMessage: (message: Message, source: string) => void;
}

const TMSPaygradeConfig: FC<Props> = ({ onMessage }) => {
  const { data, isLoading: isPaygradeLoading } =
    useApiCall<PaygradeDoc[]>("paygrade");
  const [isLoading, setIsLoading] = useState(false);
  const [addPaygradeModal, setAddPaygradeModal] = useState(false);
  const [editPaygradeModal, setEditPaygradeModal] = useState(false);
  const [deletePaygradeModalOpen, setDeletePaygradesModalOpen] =
    useState(false);
  const [paygrades, setPaygrades] = useState<PaygradeDoc[]>([]);
  const [updatedPaygrades, setUpdatedPaygrades] = useState<PaygradeDoc[]>([]);

  useEffect(() => {
    if (data) {
      setPaygrades(data);
    }
  }, [data]);

  const sendUpdatedPaygrades = async () => {
    setIsLoading(true);
    try {
      const response = await updatePaygrades(updatedPaygrades);
      if (response.status === 201) {
        setUpdatedPaygrades([]);
        onMessage(
          {
            message: "Paygrades Updated Successfully!",
            severity: "success",
          },
          "paygrade"
        );
      } else {
        console.log("Error in Updating Paygrades");
        onMessage(
          {
            message: "Error in Updating Paygrades!",
            severity: "error",
          },
          "paygrade"
        );
      }
    } catch (error: unknown) {
      console.log({ Error });
      onMessage(
        {
          message: "Error in Updating Paygrades!",
          severity: "error",
        },
        "paygrade"
      );
    }

    setIsLoading(false);
  };

  const cancelUpdatedPaygrades = () => {
    const clonedPaygrades = [...paygrades];
    updatedPaygrades.forEach((updatedPaygrade) => {
      clonedPaygrades.forEach((paygrade) => {
        if (paygrade.id === updatedPaygrade.id) {
          paygrade.isActive = !updatedPaygrade.isActive;
        }
      });
    });
    setPaygrades(clonedPaygrades);
    setUpdatedPaygrades([]);
  };

  const handleChange = (paygradeId: string, isChecked: boolean) => {
    const newPaygrades = [...paygrades];
    newPaygrades.forEach((grade) => {
      if (grade.id === paygradeId) {
        grade.isActive = isChecked;
        console.log({ grade });

        setUpdatedPaygrades((prev) => [...prev, grade]);
      }
    });
    setPaygrades(newPaygrades);
  };

  const createPaygrade = async (values: PaygradeValues) => {
    try {
      setIsLoading(true);
      const response = await newPaygrade(values);
      if (response.status === 201) {
        const clonedPaygrades = [...paygrades];
        const newPaygrade = response.data as PaygradeDoc;
        clonedPaygrades.push(newPaygrade);
        setPaygrades(clonedPaygrades);
        setAddPaygradeModal(false);
        onMessage(
          {
            message: "Paygrade Created Successfully!",
            severity: "success",
          },
          "paygrade"
        );
      } else {
        onMessage(
          {
            message: "Error in Creating a Paygrade",
            severity: "error",
          },
          "paygrade"
        );
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error in Creating a Paygrade", error);
      onMessage(
        {
          message: "Error in Creating a Paygrade",
          severity: "error",
        },
        "paygrade"
      );
      setIsLoading(false);
    }
  };
  const editPaygr = async (values: PaygradeValues) => {
    try {
      setIsLoading(true);
      const response = await editPaygrade(values);
      if (response.status === 201) {
        const clonedPaygrades = [...paygrades].filter(
          (dep) => dep.id !== values.paygradeId
        );

        const newDept = response.data as PaygradeDoc;
        clonedPaygrades.push(newDept);
        setPaygrades(clonedPaygrades);
        setEditPaygradeModal(false);
        onMessage(
          {
            message: "Paygrade edited successfully! ",
            severity: "success",
          },
          "paygrade"
        );
      } else {
        onMessage(
          {
            message: "Error in Editing a Paygrade",
            severity: "error",
          },
          "paygrade"
        );
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error in Editing the paygrade", error);
      onMessage(
        {
          message: "Error in Editing a Paygrade",
          severity: "error",
        },
        "paygrade"
      );
      setIsLoading(false);
    }
  };

  const DeleteDept = async (paygradeId: string) => {
    setIsLoading(true);
    try {
      const response = await deletePaygrade(paygradeId);
      if (response.status === 200) {
        console.log("paygrade deleted successfully");
        const clonedPgs = [...paygrades].filter((pg) => pg.id !== paygradeId);
        setPaygrades(clonedPgs);
        setDeletePaygradesModalOpen(false);
        onMessage(
          {
            message: "Paygrade deleted Successfully!",
            severity: "success",
          },
          "paygrade"
        );
      } else {
        onMessage(
          {
            message: "Error in deleting a Paygrade",
            severity: "error",
          },
          "paygrade"
        );
      }
    } catch (error: unknown) {
      console.log("Error in deleting the Paygrade", error);
      onMessage(
        {
          message: "Error in deleting a Paygrade",
          severity: "error",
        },
        "paygrade"
      );
    }
    setIsLoading(false);
  };

  if (isLoading || isPaygradeLoading) {
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
          <MDTypography>Paygrade</MDTypography>
          <MDBox>
            <MDButton
              startIcon={<EditIcon />}
              color="info"
              onClick={() => setEditPaygradeModal(true)}
              sx={{ m: 1 }}
            >
              Edit Existing Paygrade
            </MDButton>
            <MDButton
              startIcon={<AddIcon />}
              color="info"
              onClick={() => setAddPaygradeModal(true)}
              sx={{ mx: 1 }}
            >
              Add Paygrade
            </MDButton>
            <MDButton
              startIcon={<DeleteIcon />}
              color="error"
              variant="outlined"
              onClick={() => setDeletePaygradesModalOpen(true)}
              sx={{ mx: 1 }}
            >
              Delete Paygrade
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox py={2} display={"flex"} flexWrap={"wrap"}>
          {paygrades.map((dep) => (
            <TMSCheckBox
              checked={dep.isActive}
              onChange={handleChange}
              id={dep.id}
              sx={{ px: 2 }}
              label={dep.name.toUpperCase()}
            />
          ))}
        </MDBox>
        {updatedPaygrades.length > 0 && (
          <MDBox display={"flex"} justifyContent={"flex-end"}>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={sendUpdatedPaygrades}
            >
              Save Changes
            </MDButton>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={cancelUpdatedPaygrades}
            >
              Cancel
            </MDButton>
          </MDBox>
        )}
      </Card>
      <Modal open={addPaygradeModal} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setAddPaygradeModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <AddPaygrade onSubmitForm={createPaygrade} />
        </MDBox>
      </Modal>
      <Modal open={editPaygradeModal} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <MDBox display="flex" justifyContent="flex-end">
            <Tooltip title="Close">
              <IconButton
                color="info"
                onClick={() => setEditPaygradeModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <EditPaygrade onSubmitForm={editPaygr} />
        </MDBox>
      </Modal>
      <Modal
        open={deletePaygradeModalOpen}
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
                onClick={() => setDeletePaygradesModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <DeletePaygrade onDelete={DeleteDept} paygrades={paygrades} />
        </MDBox>
      </Modal>
    </>
  );
};

export default TMSPaygradeConfig;
