import { Card } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import { FC } from "react";

interface Props {
  title: string;
  total: number;
  totalInMonth: number;
  bgcolor?: string;
}

const TMSEmployeeStaticsCard: FC<Props> = ({
  total,
  title,
  totalInMonth,
  bgcolor = "#E6F4FF",
}) => {
  return (
    <Card sx={{ bgcolor }}>
      <MDBox p={0.5} pl={1}>
        <MDBox
          display={"flex"}
          justifyContent="space-between"
          fontSize={14}
          mt={1}
        >
          <MDTypography variant="body">{title}</MDTypography>
          <MDBox
            px={1}
            py={0.5}
            ml={2}
            mr={1}
            bgColor="info"
            color="white"
            borderRadius="10%"
            textAlign={"center"}
          >
            <PeopleAltOutlinedIcon />
          </MDBox>
        </MDBox>
        <MDBox fontSize={18} fontWeight={"bold"}>
          <MDTypography variant={"body"}>{total}</MDTypography>
        </MDBox>
        <MDBox fontSize={14}>
          <MDTypography variant={"body"}>
            Last Month : {totalInMonth}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default TMSEmployeeStaticsCard;
