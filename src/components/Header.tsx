import { useState, useEffect, ReactNode, FC } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import breakpoints from "assets/theme/base/breakpoints";
import { IconButton, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

// Images
// import burceMars from "assets/images/bruce-mars.jpg";
import { stringAvatar } from "lib/stringAvatar";
import { Employee } from "types/api-response";
import { blue } from "@mui/material/colors";
import useImage from "hooks/useImage";
import TMSUpload from "./TMSUpload";
import { getSignedUrlToUploadProfile } from "apis/employee.api";
import { uploadfiletoS3 } from "apis/s3.api";
import TMSLoader from "./TMSLoader";
import TMSSnackbar from "./TMSSnackbar";
import { Message } from "types/message";
import { useAppData } from "hooks/useAppData";
import { getDesignationName } from "lib/getDesignationName";

// import backgroundImage from "assets/images/bg-profile.jpeg";

interface HeaderProps {
  children?: ReactNode;
  user: Employee;
  isCurrentUser?: boolean;
}

const Header: FC<HeaderProps> = ({ children, user }) => {
  const [tabsOrientation, setTabsOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  // const [tabValue, setTabValue] = useState(0);
  const { isAppDataLoading, appData } = useAppData();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });
  const [tempImgUrl, setTempImgUrl] = useState<string>();
  console.log({ tempImgUrl });

  useEffect(() => {
    // console.log({tabValue})
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  // getting src from Background

  const { imageUrl } = useImage(user?.profilePic);
  console.log({ imageUrl });

  const handleMessageClose = () => {
    setMessage({ message: "", severity: "success" });
  };

  const handleProfileUpload = async (file: File) => {
    setModalLoading(true);
    try {
      const { data: signedUrl } = await getSignedUrlToUploadProfile(user.id);
      const response = await uploadfiletoS3(signedUrl, file, "image/jpeg");
      if (response.ok) {
        setTempImgUrl(URL.createObjectURL(file));
        setModalOpen(false);
        setMessage({
          message: "Image uploaded !!!",
          severity: "success",
        });
      } else {
        setMessage({ message: "Failed to upload Image", severity: "error" });
      }
    } catch (error) {
      console.log({ error });
      setMessage({ message: "Something Went Wrong !!!", severity: "error" });
    }
    setModalLoading(false);
  };

  // const getUserDesignation = (designationId: string) => {
  //   return appData?.designationsDocs?.find((desi) => desi.id === designationId)
  //     ?.name;
  // };

  if (isAppDataLoading) {
    return <></>;
  }

  return (
    <MDBox position="relative" mb={2}>
      <Card
        sx={{
          position: "relative",
          // mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {user && (
              <MDBox position={"relative"} width="100%" height="100%" p={2}>
                {!imageUrl && (
                  <MDAvatar
                    // src={burceMars}
                    {...stringAvatar(
                      `${user.firstName.toLocaleUpperCase()} ${user.lastName.toLocaleUpperCase()}`
                    )}
                    alt="profile-image"
                    size="xl"
                    shadow="sm"
                  />
                )}
                {imageUrl && (
                  <MDBox
                    sx={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "100%",
                        width: "auto",
                      }}
                      src={tempImgUrl || imageUrl}
                    />
                  </MDBox>
                )}
                <Tooltip
                  title="Add Profile Pic"
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                >
                  <MDBox
                    bgColor={blue[600]}
                    borderRadius="50%"
                    border="3px white solid"
                  >
                    <IconButton
                      onClick={() => setModalOpen(true)}
                      color="default"
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </MDBox>
                </Tooltip>
              </MDBox>
            )}
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {user ? user.firstName.toLocaleUpperCase() : ""}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {user
                  ? getDesignationName(
                      user.designation,
                      appData?.designationsDocs
                    )
                  : ""}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-profilePic-title"
        aria-describedby="modal-ProfilePic-description"
      >
        <>
          {modalLoading && <TMSLoader />}
          {!modalLoading && (
            <TMSUpload
              onUpload={handleProfileUpload}
              title="Upload Your Profile Picture"
            />
          )}
        </>
      </Modal>
      {message.message && (
        <TMSSnackbar
          open={true}
          message={message.message}
          handleClose={handleMessageClose}
        />
      )}
    </MDBox>
  );
};

// Declaring default props for Header
Header.defaultProps = {
  children: "",
};

export default Header;
