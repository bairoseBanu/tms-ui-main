import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

type ProofStatus = "approved" | "rejected" | "pending";

interface EmployeeProofStatusProps{
    content: ProofStatus;
    isContentVisible?: boolean;
}

type StatusIcon = {
    icon: string;
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" ;
}

const renderStatusIcon = ( status: ProofStatus ): StatusIcon=>{
    switch (status){
        case "approved":
            return {
                icon:"check_circle",
                color:"success"
            };
        case "pending":
            return {
                icon: "hourglass_top_rounded",
                color: "warning"
            }
        case "rejected":
            return {
                icon: "cancel_rounded",
                color: "error"
            }
    }
}

function EmployeeProofStatus({ content, isContentVisible=false }:EmployeeProofStatusProps) {
    const {icon, color} = renderStatusIcon(content);
  return (
    <MDBox
      lineHeight={0}
      alignItems="center"
      display="inline-flex"
      mx={1}
    >
      <Icon sx={{mr:0.5}} color={color}>
        {icon}
        </Icon>
      <MDTypography fontSize="15px" color="text" textTransform="capitalize">
        {isContentVisible && content}
      </MDTypography>
    </MDBox>
  );
}

export default EmployeeProofStatus;
