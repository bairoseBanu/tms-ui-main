import { Box } from "@mui/material";

function TabData({ value, index, children, ...other }:any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3, width:"100%" }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

export default TabData;
