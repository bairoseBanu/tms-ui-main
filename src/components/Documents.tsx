import { Box,Typography} from '@mui/material';
import MDButton from "./MDButton";
import logo from "./../assets/images/no_file.png"
import MDBox from 'components/MDBox';


function Documents() {

  return (


    <MDBox p={20} textAlign={"center"} bgColor="white">
      <img src={logo} width ={200}></img>
      <Typography variant="h4" component="h6" color="Black">
        No Documents Here
      </Typography>
      <Box m={1}>
        <Typography   fontSize="0.8rem" color="Graytext">
          Too Add New Documents,Tap on Add Document button
        </Typography>
      </Box>
      <Box m={3}>
        <MDButton variant="contained" color="info">
          + ADD DOCUMENT
        </MDButton>
      </Box>
    </MDBox>
  )
}

export default Documents;