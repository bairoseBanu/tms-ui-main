import { Box } from "@mui/material";
import React, { ReactNode, FC } from "react";
import TabPanel from "./TabPanel";
import TabBar from "./TabBar";
// //**
//  *
//  * @param data= [{title: string, component: node}]
//  * @returns
//  *
//  *//
type Data = {
  title: string;
  component: ReactNode;
};
interface Props {
  data: Data[];
  width?: string;
  styleProps?: {
    [key: string]: any;
  };
}

const MDTab: FC<Props> = ({ data, width = "100%", styleProps = {} }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleChangeIndex = (index: any) => {
    setValue(index);
  };
  return (
    <Box sx={{ width, ...styleProps }}>
      <TabBar value={value} handleChange={handleChange} data={data} />
      <TabPanel
        value={value}
        data={data}
        handleChangeIndex={handleChangeIndex}
      />
    </Box>
  );
};

export default MDTab;
