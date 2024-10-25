import { Card } from "@mui/material";
import MDAvatar from "./MDAvatar";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import { FC } from "react";
import { lightenColor, stringAvatar } from "lib/stringAvatar";

interface Props {
  name: string;
  designation: string;
  imgUrl?: string;
}

const TMSEmployeeTreeCard: FC<Props> = ({ name, designation, imgUrl }) => {
  const { sx, children } = stringAvatar(name);
  const lightenBgColor = lightenColor();
  console.log({ lightenBgColor });

  return (
    <Card
      sx={{
        bgcolor: lightenBgColor,
        position: "relative",
        width: "12rem",
        marginTop: 2,
        padding: 0.3,
      }}
    >
      {!imgUrl && (
        <MDAvatar
          sx={{
            position: "absolute",
            bottom: 70,
            left: 15,
            bgcolor: sx.bgcolor,
            p: 4,
          }}
          children={children}
          size="sm"
        />
      )}
      {imgUrl && (
        <MDBox
          sx={{
            position: "absolute",
            bottom: 60,
            left: 15,
          }}
        >
          <img
            style={{
              display: "inline",
              margin: "0 auto",
              height: "70px",
              width: "70px",
              maxWidth: "100%",
              borderRadius: "50%",
            }}
            src={imgUrl}
          />
        </MDBox>
      )}
      <MDBox p={0.5} pl={1} pt={2}>
        <MDBox overflow={"hidden"}>
          <MDTypography noWrap variant="body">
            {name}
          </MDTypography>
        </MDBox>
        <MDBox>
          <MDTypography variant={"body"}>{designation}</MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default TMSEmployeeTreeCard;
