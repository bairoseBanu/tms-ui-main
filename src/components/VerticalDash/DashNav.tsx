import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Box, Icon, Typography } from "@mui/material";
/**
 * @param data=[{title:string,icon:string (optional)}]
 * @param activeIndex=number
 * @param setActiveIndex= function
 * @param header= string
 * @param color,
 * @param bgColor,
 * @param activeBgColor
 */
type Item = {
  icon: ReactNode;
  title: string;
};
interface DashNavprops {
  data: Item[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  header: string;
  color: string;
  bgColor: string;
  activeBgColor: string;
}

interface RenderNavprops {
  data: Item[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  color: string;
  bgColor: string;
  activeBgColor: string;
  header?: string;
}
const RenderNavItems: React.FC<RenderNavprops> = ({
  data,
  activeIndex,
  setActiveIndex,
  bgColor,
  activeBgColor,
}) => {
  const navItems = data.map((item, key) => {
    const itemKey = `item-${key}`;
    return (
      <Box
        onClick={() => setActiveIndex(key)}
        key={itemKey}
        component="li"
        my={1}
        sx={{
          display: "flex",
          color: activeIndex === key ? bgColor : activeBgColor,
          backgroundColor: activeIndex === key ? activeBgColor : bgColor,
          p: 1,
          flexDirection: "row",
          justifyContent: "start",
          borderRadius: 2,
          transition: "background-color 200ms",
          "&:hover": {
            backgroundColor: activeBgColor,
            cursor: "pointer",
            color: "dark.main"
          },
        }}
      >
        {item.icon && (
          <Icon  sx={{ fontSize: 14 }}>
            {item.icon}
          </Icon>
        )}
        <Typography
          sx={{ fontSize: 14, wordWrap: "break-word", px: 1 }}
        >
          {item.title}
        </Typography>
      </Box>
    );
  });
  return <>{navItems}</>;
};

function DashNav({
  data,
  activeIndex = 0,
  setActiveIndex,
  header,
  color = "white",
  bgColor = "dark.main",
  activeBgColor = "light.main",
}: DashNavprops) {
  return (
    <Box
      component="ul"
      px={2}
      py={2}
      sx={{
        backgroundColor: bgColor,
        borderRadius: "10px",
        height: "80vh",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h4" style={{ color }} sx={{ my: 2 }}>
        {header}
      </Typography>
      <hr style={{ borderTop: `1px solid ${color}` }} />
      <RenderNavItems
        data={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        color={color}
        bgColor={bgColor}
        activeBgColor={activeBgColor}
      />
      {/* {renderNavItems({
        data,
        activeIndex,
        setActiveIndex,
        color,
        bgColor,
        activeBgColor,
      })} */}
    </Box>
  );
}

export default DashNav;
