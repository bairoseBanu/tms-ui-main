import { Card, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import MDInput from "./MDInput";
import MDBox from "./MDBox";
import LocalPrintshopSharpIcon from "@mui/icons-material/LocalPrintshopSharp";
import DownloadIcon from "@mui/icons-material/Download";
import IndeterminateCheckBoxSharpIcon from "@mui/icons-material/IndeterminateCheckBoxSharp";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface PDFToolbarProps {
  numPages: number | null;
  onPageChange: (page: number) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFullScreen?: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
}

const PDFToolbar: React.FC<PDFToolbarProps> = ({
  numPages,
  onPageChange,
  onZoomIn,
  onZoomOut,
  onFullScreen,
  onDownload,
  onPrint,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  //   const [zoom, setZoom] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (newPage !== 0 && newPage <= numPages) {
      onPageChange(newPage);
    }
  };

  const handleZoomIn = () => {
    // setZoom((currentZoom) => currentZoom * 1.25);
    onZoomIn();
  };

  const handleZoomOut = () => {
    // setZoom((currentZoom) => currentZoom / 1.25);
    onZoomOut();
  };

  return (
    <Card raised={true} sx={{ border: "1px solid" }}>
      <MDBox display="flex" justifyContent="center" p={0.05}>
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDInput
            type="number"
            value={currentPage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlePageChange(Number(e.target.value))
            }
          />
          of {numPages}
        </MDBox>
        <Tooltip title="Zoom In">
          <IconButton onClick={handleZoomOut}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton onClick={handleZoomIn}>
            <IndeterminateCheckBoxSharpIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Full Screen">
          <IconButton onClick={onFullScreen}>
            <ZoomOutMapIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download...">
          <IconButton onClick={onDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton onClick={onPrint}>
            <LocalPrintshopSharpIcon />
          </IconButton>
        </Tooltip>
      </MDBox>
    </Card>
  );
};

export default PDFToolbar;
