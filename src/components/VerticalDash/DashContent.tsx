import { Box, Link, Typography } from "@mui/material";
import MDButton from "components/MDButton";
import PrintContent from "components/PrintContent";
// import TestPdfView from "components/TestPdfView";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
type Content = {
  title: string;
  content: string;
};
interface Props {
  content: Content;
  includePrint?: boolean;
  color: string;
  bgColor: string;
  activeBgColor: string;
}

function DashContent({
  content,
  includePrint = true,
  color = "black",
  bgColor = "white.main",
}: Props) {
  //   const componentRef = useRef();
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Box
      sx={{
        maxHeight: "80vh",
        overflowY: "scroll",
        position: "relative",
        backgroundColor: bgColor,
        borderRadius: 2,
        boxShadow: 3,
        transition: "200ms",
      }}
      mb={3}
    >
      {includePrint && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: bgColor,
          }}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mt={2}
          mr={4}
          p={2}
          justifyContent="flex-end"
        >
          <MDButton
            variant="contained"
            component={Link}
            href="DataProtectionPolicy.pdf"
            download="DataProtectionPolicy.pdf"
            color="dark"
            sx={{
              mr: 2,
            }}
          >
            Download
          </MDButton>

          <MDButton variant="contained" color="dark" onClick={handlePrint}>
            Print
          </MDButton>
        </Box>
      )}
      <PrintContent ref={componentRef}>
        <Box
          sx={{
            maxHeight: "100%",
          }}
          p={5}
          // mt={1}
        >
          <Typography variant="h2" style={{ color }}>
            {content.title}
          </Typography>
          <hr
            style={{
              height: "2px",
              borderWidth: 0,

              backgroundColor: color,
              margin: "0.5rem",
            }}
          />
          <Typography
            variant="body1"
            fontWeight="regular"
            textAlign="justify"
            fontSize="medium"
            style={{ color }}
          >
            {content.content}
          </Typography>
          {/* <TestPdfView /> */}
        </Box>
      </PrintContent>
    </Box>
  );
}

export default DashContent;
