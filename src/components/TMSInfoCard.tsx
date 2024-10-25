import { FC, ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box, BoxProps } from "@mui/material";

// Declaring props types for TMSInfoCard
interface Props extends BoxProps {
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark";
  icon: ReactNode;
  title: string;
  description?: string;
  options?: string | number | ReactNode;
}

const TMSInfoCard: FC<Props> = ({
  color = "primary",
  icon,
  title,
  description,
  options,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Card>
        <MDBox p={2} mx={3} display="flex" justifyContent="center">
          <MDBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={color}
            color="white"
            width="4rem"
            height="4rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
          >
            {icon}
          </MDBox>
        </MDBox>
        <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
          {description && (
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          )}
          {description && !options ? null : <Divider />}
          {options && (
            <MDTypography variant="h5" fontWeight="medium">
              {options}
            </MDTypography>
          )}
        </MDBox>
      </Card>
    </Box>
  );
};

export default TMSInfoCard;
