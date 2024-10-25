import { PlanProps } from "types/plan-details";
import { FC, useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MDTypography from "./MDTypography";
import MDBox from "./MDBox";
import { useFormikContext } from "formik";
import { OrgFormikValues } from "types/org-values";

const styles = {
  cardContent: {
    fontWeight: "bold",
    fontSize: "9px",
    color: "blue",
    bottom: "-15px",
    height: "75px",
    borderBottom: "1px solid lightblue",
  },
};
interface ListProps {
  content: string;
}
const CULists: FC<ListProps> = ({ content }) => {
  return (
    <MDBox display="flex" m={1} width={"100%"}>
      <CheckIcon width={"33%"} fontSize="small" />
      <MDTypography
        variant="body2"
        fontSize="small"
        align="left"
        sx={{ width: "66%", marginLeft: "5px" }}
      >
        {content}
      </MDTypography>
    </MDBox>
  );
};

const Plan: FC<PlanProps> = ({ name, items }) => {
  const [selected, setSelected] = useState<string>("");
  const { setFieldValue, initialValues } = useFormikContext<OrgFormikValues>();

  useEffect(()=>{
    setSelected(initialValues.plan);
  },[])

  const selectBtn: (value: string) => void = (value) => {
    setSelected(value);
    setFieldValue(name, value);
  };
  return (
    <>
      {items.map((item) => {
        return (
          <Card
            onClick={() => selectBtn(item.planName)}
            key={item.id}
            sx={{
              backgroundColor: "white",
              textAlign: "center",
              // marginLeft: 16,
              border: `${
                selected === item.planName
                  ? "purple solid 3px"
                  : "lightblue solid 1px"
              }`,
              padding: "12px",
              width: "100%",
              margin: "10px",
              transform: `${
                selected === item.planName ? "scale(1.2)" : "scale(1)"
              }`,
            }}
          >
            <CardContent style={styles.cardContent}>
              <MDTypography variant="h6">{item.planName}</MDTypography>
              <MDTypography variant="subtitle1" fontSize={14}>
                $ {item.price}/month
              </MDTypography>
            </CardContent>
            <MDBox p={2}>
              {item?.features?.map((feature) => {
                return <CULists content={feature.content} key={feature.id} />;
              })}
            </MDBox>
          </Card>
        );
      })}
    </>
  );
};

export default Plan;
