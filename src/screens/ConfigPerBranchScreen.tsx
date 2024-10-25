import MDBox from "components/MDBox";
import ConfigurationScreen from "./ConfigurationScreen";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { configBranch, editBranch } from "apis/branch.api";
import { ConfigOptions } from "types/config-options";
import { DefaultConfigResponse } from "types/api-response";
import { refreshToken } from "apis/auth.api";
import { useLocation, useNavigate } from "react-router-dom";
import { extractPayload } from "lib/auth";
import { Message } from "types/message";
import TMSSnackbar from "components/TMSSnackbar";
import { useAppData } from "hooks/useAppData";

type ConfigsStatus = {
  isDepartmentCompleted: boolean;
  isPaygradeCompleted: boolean;
  isDesignationCompleted: boolean;
  isHolidayTypeCompleted: boolean;
  isHolidayDurationCompleted: boolean;
  isThemeCompleted: boolean;
};

export const ConfigPerBranchScreen = () => {
  const { state }: { state: { isFirstBranch?: boolean } } = useLocation();
  const { isAppDataLoading, revalidate } = useAppData();
  const [configsStatus, setConfigsStatus] = useState<ConfigsStatus>({
    isDepartmentCompleted: false,
    isDesignationCompleted: false,
    isPaygradeCompleted: false,
    isHolidayTypeCompleted: false,
    isThemeCompleted: false,
    isHolidayDurationCompleted: false,
  });
  const {
    isDepartmentCompleted,
    isDesignationCompleted,
    isPaygradeCompleted,
    isHolidayTypeCompleted,
    isThemeCompleted,
    isHolidayDurationCompleted,
  } = configsStatus;

  const isFinished =
    isDepartmentCompleted &&
    isDesignationCompleted &&
    isPaygradeCompleted &&
    isHolidayDurationCompleted &&
    isHolidayTypeCompleted &&
    isThemeCompleted;
  const isStart =
    !isDepartmentCompleted &&
    !isDesignationCompleted &&
    !isPaygradeCompleted &&
    !isHolidayDurationCompleted &&
    !isHolidayTypeCompleted &&
    !isThemeCompleted;

  const navigate = useNavigate();
  const middle = !isStart && !isFinished;
  const branchId = extractPayload().branchId;
  const handleConfigChange = (configName: string, status: string) => {
    if (configName === "department" && status === "success") {
      setConfigsStatus({ ...configsStatus, isDepartmentCompleted: true });
    }
    if (configName === "designation" && status === "success") {
      setConfigsStatus({ ...configsStatus, isDesignationCompleted: true });
    }
    if (configName === "paygrade" && status === "success") {
      setConfigsStatus({ ...configsStatus, isPaygradeCompleted: true });
    }
    if (configName === "holidayType" && status === "success") {
      setConfigsStatus({ ...configsStatus, isHolidayTypeCompleted: true });
    }
    if (configName === "hoidayDuration" && status === "success") {
      setConfigsStatus({ ...configsStatus, isHolidayDurationCompleted: true });
    }
    if (configName === "theme" && status === "success") {
      setConfigsStatus({ ...configsStatus, isThemeCompleted: true });
    }
  };

  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });

  useEffect(() => {
    revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitDefaultConfig = async () => {
    const configOptions: ConfigOptions = {
      branchId,
      isDepartment: !isDepartmentCompleted,
      isDesignation: !isDesignationCompleted,
      isFirstBranch: state?.isFirstBranch,
      isHolidayDuration: !isHolidayDurationCompleted,
      isHolidayType: !isHolidayTypeCompleted,
      isPaygrade: !isPaygradeCompleted,
    };
    try {
      const response = await configBranch(configOptions);
      if (response.status !== 201) {
        setMessage({
          message: "Error in submitting default config",
          severity: "error",
        });
        console.log("Error in submitting default config");
        return;
      }
      if (response.status === 201) {
        const data = response.data as DefaultConfigResponse;
        if (data.refreshToken) {
          await refreshToken();
        }
        console.log("Successfully Added Config");
        setMessage({
          message: "Successfully Added Config",
          severity: "success",
        });
        navigate("/");
      }
    } catch (error: unknown) {
      console.log("Error in submitting default config");
      setMessage({
        message: "Error in submitting default config",
        severity: "error",
      });
    }
  };
  const finishBranchSetUp = async () => {
    try {
      const response = await editBranch({ configStatus: "uptodate" });
      if (response.status !== 201) {
        console.log("Error in finishing the config for branch");
        setMessage({
          message: "Error in finishing the config for branch",
          severity: "error",
        });
        return;
      }
      if (response.status === 201) {
        await refreshToken();
        console.log("FInished config set up!!!");
        setMessage({
          message: "Finished config set up!!!",
          severity: "success",
        });
        navigate("/");
      }
    } catch (error: unknown) {
      console.log("Error in finishing the config for branch");
      setMessage({
        message: "Error in finishing the config for branch",
        severity: "error",
      });
    }
  };

  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };

  if (isAppDataLoading) {
    return <>Loading..</>;
  }

  return (
    <MDBox display={"flex"} flexDirection={"column"}>
      <ConfigurationScreen onConfigChange={handleConfigChange} />
      <MDBox display={"flex"} justifyContent={"right"} gap="3">
        {isStart && (
          <MDButton
            onClick={submitDefaultConfig}
            sx={{ marginRight: "1rem" }}
            color="primary"
          >
            Skip with default config
          </MDButton>
        )}
        {middle && (
          <MDButton
            onClick={submitDefaultConfig}
            sx={{ marginRight: "1rem" }}
            color="primary"
          >
            Skip
          </MDButton>
        )}
        {isFinished && (
          <MDButton
            onClick={finishBranchSetUp}
            sx={{ marginRight: "1rem" }}
            color="primary"
          >
            Finish
          </MDButton>
        )}
      </MDBox>
      {message?.message && (
        <TMSSnackbar
          message={message.message}
          severity={message.severity}
          open={!!message.message}
          handleClose={handleMsgClose}
        />
      )}
    </MDBox>
  );
};
