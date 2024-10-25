import { Grid } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import DashNav from "./DashNav";
import DashContent from "./DashContent";
/**
 *
 * @param data =[{title: string, icon: string, content: string}]
 * @param header= string
 * @param bgColor
 * @param color
 * @param activeBgColor
 * @returns
 */

function VerticalDash({ data, header, color, bgColor, activeBgColor }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = useCallback((index: any) => {
    setActiveIndex(index);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <DashNav
            data={data}
            activeIndex={activeIndex}
            setActiveIndex={(index: any) => handleActiveIndex(index)}
            header={header}
            color={color}
            bgColor={bgColor}
            activeBgColor={activeBgColor}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <DashContent
            content={data[activeIndex]}
            color={color}
            bgColor={bgColor}
            activeBgColor={activeBgColor}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VerticalDash;
