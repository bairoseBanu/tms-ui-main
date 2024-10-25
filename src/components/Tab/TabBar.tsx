import { AppBar, Tab, Tabs } from "@mui/material";

function a11yProps(index:any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const renderTitle = (data:any) => {
  return data.map((element:any, index:any) => {
    return <Tab label={element.title} {...a11yProps(index)} key={index} />;
  });
};

function TabBar({ value, handleChange, data }:any) {
  return (
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {renderTitle(data)}
      </Tabs>
    </AppBar>
  );
}

export default TabBar;
