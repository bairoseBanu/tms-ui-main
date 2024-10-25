import { FC, useEffect, useState } from "react";
import MDBox from "./MDBox";
import useApiCall from "hooks/useApiCall";
import { ThemeDoc } from "types/api-response";
import TMSLoader from "./TMSLoader";
import { extractPayload } from "lib/auth";
import MDButton from "./MDButton";
import { ThemeType } from "types/theme-type";
import { newOrUpdateTheme } from "apis/theme.api";
import { useAppData } from "hooks/useAppData";

const themeColors = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
  "dark",
  "grey",
];

interface Props {
  color: ThemeType;
  isSelectedColor: boolean;
  onChange: (themeColor: ThemeType) => void;
}
const Circle: FC<Props> = ({ color, isSelectedColor, onChange }) => {
  return (
    <MDBox
      p={1}
      boxShadow={12}
      sx={{ borderBottom: isSelectedColor ? "2px solid" : "none" }}
    >
      <MDBox
        bgColor={color}
        sx={{
          width: isSelectedColor ? "1.7rem" : "1.3rem",
          height: isSelectedColor ? "1.7rem" : "1.3rem",
          borderRadius: "50%",
          //   scale: isSelectedColor ? 1.3 : 1,
          "&:hover": {
            scale: "1.3",
            transition: "scale 0.2s ease-in-out",
          },
        }}
        type="button"
        onClick={() => onChange(color)}
      ></MDBox>
    </MDBox>
  );
};

export const TMSThemeConfig = () => {
  const { data: theme, isLoading: isThemeLoading } =
    useApiCall<ThemeDoc>("theme");
  const [selectedTheme, setSelectedTheme] = useState<ThemeDoc>();
  const [updatedTheme, setUpdatedTheme] = useState<ThemeDoc | null>();
  const [isLoading, setIsLoading] = useState(false);
  const { onThemeChange, appData, onAppDataChange } = useAppData();

  const sendUpdatedTheme = async () => {
    setIsLoading(true);
    try {
      const response = await newOrUpdateTheme(updatedTheme);
      if (response.status === 201) {
        const newThemeDoc = response.data as ThemeDoc;
        setSelectedTheme(newThemeDoc);
        setUpdatedTheme(null);
        const newAppData = { ...appData };
        newAppData.theme = newThemeDoc;
        onAppDataChange(newAppData);
        onThemeChange(newThemeDoc.type);
      } else {
        console.log("Error");
      }
    } catch (error: unknown) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  const cancelUpdatedTheme = () => {
    if (theme) {
      setUpdatedTheme(null);
      setSelectedTheme(theme);
      onThemeChange(theme.type);
    } else {
      console.log({ a: "u need to select a themes" });
    }
  };

  useEffect(() => {
    if (theme) {
      setSelectedTheme(theme);
      setUpdatedTheme(null);
    } else {
      const defaultTheme: ThemeDoc = {
        id: "0",
        type: "primary",
        branchId: extractPayload().branchId,
        version: 0,
      };
      setSelectedTheme(defaultTheme);
      setUpdatedTheme(defaultTheme);
    }
  }, [theme]);

  const handleChangeTheme = (themeColor: ThemeType) => {
    setSelectedTheme({ ...selectedTheme, type: themeColor });
    setUpdatedTheme({
      ...updatedTheme,
      type: themeColor,
      branchId: extractPayload().branchId,
    });
    onThemeChange(themeColor);
  };
  if (isLoading || isThemeLoading) {
    return <TMSLoader />;
  }

  return (
    <>
      <MDBox display={"flex"}>
        {themeColors.map((color) => (
          <Circle
            isSelectedColor={selectedTheme.type === color}
            color={color as ThemeType}
            onChange={handleChangeTheme}
          />
        ))}
      </MDBox>
      {updatedTheme && (
        <MDBox display={"flex"} justifyContent={"flex-end"} py={2}>
          <MDButton sx={{ mx: 1 }} color="primary" onClick={sendUpdatedTheme}>
            Save Changes
          </MDButton>
          <MDButton sx={{ mx: 1 }} color="primary" onClick={cancelUpdatedTheme}>
            Cancel
          </MDButton>
        </MDBox>
      )}
    </>
  );
};
