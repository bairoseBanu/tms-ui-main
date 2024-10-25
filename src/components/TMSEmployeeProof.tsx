import { FC, useState } from "react";
import {
  EmployeeProof,
  ProofType,
  VerificationStatus,
} from "types/employee-proof.type";
import MDBox from "./MDBox";
import TMSImgViewer from "./TMSImgViewer";
import EmployeeProofStatus from "./EmployeeProofStatus";
import MDTypography from "./MDTypography";
import TMSDeleteIcon from "./TMSDeleteIcon";
import { deleteEmployeeProofDoc } from "apis/rtw.api";
import {
  Button,
  Card,
  IconButton,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import RedoIcon from "@mui/icons-material/Redo";
import { RTWList } from "types/api-response";
import { green, red } from "@mui/material/colors";
interface Props {
  proof: EmployeeProof;
  rtws: RTWList[];
  sx?: SxProps;
  isUserOnly?: boolean;
  onVerify?: (
    employeeId: string,
    docType: ProofType,
    updatedStatus: VerificationStatus
  ) => void;
}
type ProofStatus = "approved" | "rejected" | "pending";
type ProofColors = "green" | "red" | "orange";

interface ErrorMessage {
  isError: boolean;
  value: string;
}

const setIconColor = (status: ProofStatus): ProofColors => {
  switch (status) {
    case "approved":
      return "green";
    case "rejected":
      return "red";
    case "pending":
      return "orange";
  }
};

const getImgsSrc = (data: EmployeeProof) => {
  if (data.src) {
    const value = data.src.map((sr) => {
      return { src: sr };
    });
    return value;
  }
};

const renderProofDetails = (rtw: RTWList) => {
  return rtw ? (
    <MDBox
      textAlign={"center"}
      p={2}
      display={"flex"}
      justifyContent="space-evenly"
    >
      {rtw.docExpiry && (
        <MDBox p={1} alignSelf={"center"}>
          <MDTypography>{rtw.docExpiry.split("T")[0]}</MDTypography>
          <MDTypography component="h6" fontWeight="bold">
            Expiry
          </MDTypography>
        </MDBox>
      )}
      {rtw.docExpiry && <hr />}
      {rtw.docNumber && (
        <MDBox p={1} alignSelf={"center"}>
          <MDTypography>{rtw.docNumber}</MDTypography>
          <MDTypography component="h6" fontWeight="bold">
            Number
          </MDTypography>
        </MDBox>
      )}
      {rtw.docType === "address" && <hr />}
      {rtw.docType === "address" && (
        <>
          <MDBox p={1} alignSelf={"center"}>
            <MDTypography>
              {rtw.addressLineOne}, {rtw.addressLineTwo}{" "}
            </MDTypography>
            <MDTypography component="h6" fontWeight="bold">
              address
            </MDTypography>
          </MDBox>
          <hr />
          <MDBox p={1} alignSelf={"center"}>
            <MDTypography>{rtw.postCode}</MDTypography>
            <MDTypography component="h6" fontWeight="bold">
              post code
            </MDTypography>
          </MDBox>
        </>
      )}
    </MDBox>
  ) : null;
};

const TMSEmployeeProof: FC<Props> = ({
  proof,
  rtws,
  sx = {},
  onVerify,
  isUserOnly = true,
}) => {
  const proofColor = setIconColor(proof.status);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<ErrorMessage>({
    isError: false,
    value: "",
  });
  const deleteProof = async () => {
    setIsloading(true);
    try {
      const response = await deleteEmployeeProofDoc(
        proof.type,
        proof.employeeId
      );
      setIsloading(false);
      if (response.data.errors || response.status !== 201) {
        setError({ isError: true, value: "Error in deleting the Proof" });
      } else {
        setIsDeleted(true);
      }
    } catch (error) {
      setError({ isError: true, value: "Something Went Wrong!" });
    }
  };

  const getRtwByProof = (proof: EmployeeProof) => {
    return rtws.find(
      (rtw) => rtw.employeeId === proof.employeeId && rtw.docType === proof.type
    );
  };

  const handleApprove = (employeeId: string, docType: ProofType) => {
    console.log({ employeeId, docType });
    onVerify(employeeId, docType, "approved");
  };
  const handleReject = (employeeId: string, docType: ProofType) => {
    console.log({ employeeId, docType });
    onVerify(employeeId, docType, "rejected");
  };

  if (isLoading) {
    return (
      <MDBox
        flexBasis={"50%"}
        display="flex"
        ml="auto"
        mb={10}
        mr="auto"
        p={2}
        flexDirection="column"
        width={400}
        textAlign="center"
        key={proof.id}
        border={`${proofColor} 2px solid`}
        borderRadius="15px"
        shadow="xl"
        sx={{ ...sx }}
      >
        loading...
      </MDBox>
    );
  } else {
    return (
      <MDBox
        flexBasis={"50%"}
        display="flex"
        ml="auto"
        mb={10}
        mr="auto"
        p={2}
        flexDirection="column"
        width={400}
        textAlign="center"
        key={proof.id}
        border={`${proofColor} 2px solid`}
        borderRadius="15px"
        shadow="xl"
        sx={{ ...sx }}
      >
        {!isDeleted && error.isError === true && (
          <Typography>{error.value}</Typography>
        )}
        {!isDeleted ? (
          <Card>
            <MDBox display="flex" justifyContent="flex-end">
              {/* <TMSEditIcon onClick={() => setEditMode(true)} /> */}
              <TMSDeleteIcon onClick={deleteProof} />
            </MDBox>
            <TMSImgViewer images={!isDeleted ? getImgsSrc(proof) : []} />
            <MDTypography
              component="label"
              variant="button"
              fontWeight="medium"
              fontSize="1.2em"
              color="text"
              mt={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {proof.title}
              <EmployeeProofStatus content={proof.status} />
            </MDTypography>
            {renderProofDetails(getRtwByProof(proof))}
            {!isUserOnly && proof.status === "pending" && (
              <MDBox display="flex" justifyContent="space-evenly">
                <Button
                  variant="text"
                  sx={{
                    color: green[400],
                    "&:hover": {
                      backgroundColor: green[400],
                      color: "whitesmoke",
                    },
                  }}
                  onClick={() => handleApprove(proof.employeeId, proof.type)}
                >
                  Approve
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: red[400],
                    "&:hover": {
                      backgroundColor: red[400],
                      color: "whitesmoke",
                    },
                  }}
                  onClick={() => handleReject(proof.employeeId, proof.type)}
                >
                  Reject
                </Button>
              </MDBox>
            )}
          </Card>
        ) : (
          <Card>
            <MDBox display="flex" justifyContent="flex-end">
              <Tooltip title={"Revert"}>
                <IconButton>
                  <RedoIcon />
                </IconButton>
              </Tooltip>
            </MDBox>
            <MDBox>
              <Typography>{proof.title} deleted successfully !!!</Typography>
            </MDBox>
          </Card>
        )}
      </MDBox>
    );
  }
};

export default TMSEmployeeProof;
