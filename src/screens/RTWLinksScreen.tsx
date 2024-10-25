import Link from "@mui/material/Link";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { rtwLinks } from "data/rtw-links.data";
import DefaultItem from "examples/Items/DefaultItem";
import { RTWLink } from "types/rtw-links";

const RTWLinks = () => {
  return (
    <MDBox width={"100%"} bgColor="white" px={2}>
        <MDTypography align="center" variant="h4" my={4}> Right To Work Checks </MDTypography>
      {rtwLinks.map((link: RTWLink) => {
        return (
             <MDBox sx={{"&:hover":{bgcolor:"gradients.light.state"}}} bgColor="light" p={2} key={link.id} m={3}>
            <Link  href={link.href} target="_blank">
            <DefaultItem
            sx={{"&:hover":{color:"white !important"}}}
              icon={link.icon}
              title={link.title}
              description={link.description}
            /></Link>
          </MDBox>
        );
      })}
    </MDBox>
  );
};
export default RTWLinks;
