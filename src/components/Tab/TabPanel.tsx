import { useTheme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import TabData from "./TabData";
import { ReactNode } from "react";

const renderTabData = (data: any, value: any) => {
  return data.map((element: any, index: any) => {
    const Component = element.component as ReactNode;
    console.log({ props: element.props });

    return (
      <TabData value={value} index={index} key={index}>
        {Component}
      </TabData>
    );
  });
};

function TabPanel(props: any) {
  const { value, data, handleChangeIndex, ...other } = props;
  const theme = useTheme();
  return (
    <>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        {...other}
      >
        {renderTabData(data, value)}
      </SwipeableViews>
    </>
  );
}

export default TabPanel;
