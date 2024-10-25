import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changePwd, verifyResetLink } from "./verifyResetLink.api";
import MDBox from "components/MDBox";
import TMSLoader from "components/TMSLoader";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

type Screens =
  | { name: "verifying" }
  | { name: "passwordform" }
  | { name: "error" };

const VerifyResetLink = () => {
  const { id } = useParams();
  const [screen, setScreen] = useState<Screens>({ name: "verifying" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      verifyResetLink(id).then((response) => {
        console.log({ response });

        if (response.status === 200) {
          setScreen({ name: "passwordform" });
          setUserId(response.data);
        } else {
          console.log("I am herre");

          setScreen({ name: "error" });
        }
      });
    } catch (err) {
      console.log({ err });
      setScreen({ name: "error" });
    }
  }, [id]);
  const navigate = useNavigate();
  const handleNewPwdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPwdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handlePwdSubmit = async () => {
    setIsLoading(true);
    if (newPassword === confirmNewPassword) {
      try {
        const response = await changePwd(userId, newPassword);
        if (response.status === 201) {
          navigate("/auth");
        } else {
          setScreen({ name: "error" });
        }
      } catch (err) {
        setScreen({ name: "error" });
      }
    }
    setIsLoading(false);
  };

  console.log({ id });

  return (
    <Card>
      {screen.name === "verifying" && <TMSLoader />}
      {screen.name === "passwordform" && (
        <MDBox>
          {!isLoading && (
            <>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Change Password
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox mb={2}>
                  <MDInput
                    id="new-password"
                    label="New Password"
                    name="newPassword"
                    variant="outlined"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPwdChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    id="confirm new-password"
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    variant="outlined"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPwdChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handlePwdSubmit}
                  >
                    Create Password
                  </MDButton>
                </MDBox>
              </MDBox>
            </>
          )}
          {isLoading && <TMSLoader />}
        </MDBox>
      )}
      {screen.name === "error" && <MDBox>Errr...</MDBox>}
    </Card>
  );
};

export default VerifyResetLink;
