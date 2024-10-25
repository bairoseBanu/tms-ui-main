import {
  Card,
  Divider,
  Grid,
  Icon,
  IconButton,
  Modal,
  Tooltip,
} from "@mui/material";
import MDBox from "components/MDBox";
import burceMars from "assets/images/bruce-mars.jpg";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "components/MDTypography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MDButton from "components/MDButton";
import TMSOrgChartTree from "components/TMSOrgChartTree";
import useApiCall from "hooks/useApiCall";
import TMSLoader from "components/TMSLoader";
import { getLayoutedElements } from "lib/getLayoutedElements";
import TMSEmployeeStaticsCard from "components/TMSEmployeeStaticsCard";
import OrgDetailsForm from "components/OrgDetailsForm";
import { useState } from "react";
import { OrgDetailsValues } from "types/org-details-values";
import { newOrgDetails } from "apis/org.api";
import { Message } from "types/message";
import TMSSnackbar from "components/TMSSnackbar";
import { OrgScreen } from "types/api-response";
import { extractPayload } from "lib/auth";

const OrganizationScreen = () => {
  const { data, isLoading: isOrgDataLoading } = useApiCall<OrgScreen>("org");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });

  if (isOrgDataLoading || loading) {
    return <TMSLoader />;
  }

  const { role } = extractPayload();

  const onOrgDetailsSubmit = async (values: OrgDetailsValues) => {
    console.log({ values });
    setLoading(true);
    try {
      const response = await newOrgDetails(values);
      if (response.data.errors) {
        setLoading(false);
        setMessage({ message: "something went wrong!", severity: "error" });
      }
      if (response.status === 201) {
        setLoading(false);
        setMessage({
          message: "Org Details updated successfully!",
          severity: "success",
        });
        setModalOpen(false);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setMessage({ message: "something went wrong!", severity: "error" });
    }
  };

  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };
  const { nodes, edges } = getLayoutedElements(data.nodes, data.edges, "TB");

  return (
    <Grid container>
      <Grid item width="80vw">
        <MDBox display={"flex"} justifyContent="space-between" width="100%">
          <MDBox display={"flex"}>
            <MDBox sx={{ width: "100px", height: "100px" }}>
              <img
                style={{
                  display: "inline",
                  margin: "0 auto",
                  height: "100%",
                  width: "100%",
                }}
                src={burceMars}
                alt="profile-image"
              />
            </MDBox>
            <MDBox px={2}>
              <MDTypography variant="h6">{data.orgName}</MDTypography>
              <MDBox
                display={"flex"}
                justifyContent={"left"}
                alignItems={"center"}
                fontSize={14}
              >
                <Icon>phone</Icon>
                <MDTypography ml={0.5} variant="body">
                  {data.phone ? data.phone : "-"}
                </MDTypography>
              </MDBox>
              <MDBox
                display={"flex"}
                justifyContent={"left"}
                alignItems={"center"}
                fontSize={14}
              >
                <LanguageOutlinedIcon />
                <MDTypography ml={0.5} variant="body">
                  {data.website ? data.website : "-"}
                </MDTypography>
              </MDBox>
              <MDBox
                display={"flex"}
                justifyContent={"left"}
                alignItems={"center"}
                fontSize={14}
              >
                <LocationOnOutlinedIcon />
                <MDTypography ml={0.5} variant="body">
                  {data.location ? data.location : "-"}
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
          {(role === "Admin" || role === "RootAdmin") && (
            <MDBox>
              <MDButton
                variant="gradient"
                color="info"
                height="25%"
                size="small"
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={() => setModalOpen(true)}
              >
                Edit
              </MDButton>
            </MDBox>
          )}
        </MDBox>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid container item display={"flex"} my={2} gap={2}>
        <Grid item>
          <TMSEmployeeStaticsCard
            title="Total Employees"
            total={data.totalEmployees}
            totalInMonth={data.totalEmployees}
            bgcolor="#ECE6FF"
          />
        </Grid>
        <Grid item>
          <TMSEmployeeStaticsCard
            title="New Employees"
            total={data.totalEmployees}
            totalInMonth={data.totalEmployees}
            bgcolor="#E6F4FF"
          />
        </Grid>
        <Grid item>
          <TMSEmployeeStaticsCard
            title="Resigned Employees"
            total={data.totalEmployees}
            totalInMonth={data.totalEmployees}
            bgcolor="#FFE6E6"
          />
        </Grid>
        <Grid item>
          <TMSEmployeeStaticsCard
            title="Total Openings"
            total={data.totalEmployees}
            totalInMonth={data.totalEmployees}
            bgcolor="#E8FFE6"
          />
        </Grid>
        <Grid item>
          <TMSEmployeeStaticsCard
            title="Total Applications"
            total={data.totalEmployees}
            totalInMonth={data.totalEmployees}
            bgcolor="#FFF5E6"
          />
        </Grid>
      </Grid>
      <Grid item>
        <MDBox textAlign={"center"}>Organization Tree</MDBox>
        <MDBox>
          <TMSOrgChartTree initialNodes={nodes} initialEdges={edges} />
        </MDBox>
      </Grid>
      <Grid item>
        <div></div>
      </Grid>
      <Modal
        open={modalOpen}
        sx={{ width: "40vw", maxHeight: "60%", marginX: "auto" }}
      >
        <Card>
          <MDBox>
            <MDBox display="flex" justifyContent="flex-end">
              <Tooltip title="close">
                <IconButton onClick={() => setModalOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </MDBox>
            <OrgDetailsForm onSubmit={onOrgDetailsSubmit} />
          </MDBox>
        </Card>
      </Modal>
      {message.message && (
        <TMSSnackbar
          message={message.message}
          open={!!message.message}
          handleClose={handleMsgClose}
        />
      )}
    </Grid>
  );
};

export default OrganizationScreen;
