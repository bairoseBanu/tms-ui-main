import { FC, useState } from "react";
// import { ChangeEvent, FC, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import MDBox from "./MDBox";
import type { PDFDocumentProxy } from "pdfjs-dist";
// import pdf from "../assets/pdf/test.pdf";
// import pdf from "../assets/pdf/sample.pdf";
import PDFToolbar from "./TMSPdfToolBar";
import { AppBar, Modal } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

interface Props {
  width?: string;
  pdfUrl: string | File;
}

const TMSPdfView: FC<Props> = ({ pdfUrl }) => {
  //   const [file, setFile] = useState<File>();
  const [numPages, setNumPages] = useState<number>();
  //   const [containerWidth, setContainerWidth] = useState<number>();

  //   const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const { files } = event.target;

  //     if (files && files[0]) {
  //       setFile(files[0] || null);
  //     }
  //   };
  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  // const pdfViewerRef = useRef<Document | null>(null);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    console.log({ pageNumber });
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom - 0.1);
  };
  const handleZoomOut = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  // const handleZoomChange = (newZoom: number) => {
  //   setZoom(newZoom);
  //   pdfViewerRef.current?.currentScaleValue = newZoom; // Update zoom in PDF viewer
  // };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleDownload = async () => {
    if (typeof pdfUrl === "string") {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch PDF data");
      }
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "test.pdf";
      link.click();
    }
  };

  const handlePrint = async () => {
    if (typeof pdfUrl === "string") {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch PDF data");
      }
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      const printWindow = window.open(url, "_blank");
      printWindow.focus();
      printWindow.print();
      URL.revokeObjectURL(url);
    }
  };
  // useEffect(() => {
  //   // Set initial zoom value in PDF viewer
  //   if (pdfViewerRef.current) {
  //     pdfViewerRef.current.currentScaleValue = zoom;
  //   }
  // }, [zoom]);

  return (
    <MDBox
      sx={{
        maxHeight: "80vh",
        overflowY: "scroll",
        position: "relative",
        // backgroundColor: "blue",
        borderRadius: 2,
        boxShadow: 3,
        transition: "200ms",
        // transform: isFullScreen ? "scale(2)" : "scale(1)",
      }}
    >
      {isFullScreen && (
        <Modal open={true}>
          <MDBox
            sx={{
              maxWidth: "50vw",
              maxHeight: "100vh",
              overflowY: "scroll",
              position: "relative",
              margin: "auto",
              // backgroundColor: "blue",
              borderRadius: 2,
              boxShadow: 3,
              transition: "200ms",
            }}
          >
            <AppBar position="sticky">
              <PDFToolbar
                numPages={numPages}
                // currentPage={pageNumber}
                onPageChange={handlePageChange}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFullScreen={handleFullScreen}
                onDownload={handleDownload}
                onPrint={handlePrint}
              />
            </AppBar>
            <MDBox
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                overflowX: "auto",
                overflowY: "auto",
              }}
            >
              <MDBox
                sx={{
                  flexGrow: 1,
                }}
              >
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={options}
                >
                  {Array.from(new Array(numPages), (_el, index) => {
                    return (
                      <Page
                        scale={zoom}
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        pageIndex={2}
                      />
                    );
                  })}
                </Document>
              </MDBox>
            </MDBox>
          </MDBox>
        </Modal>
      )}
      {!isFullScreen && (
        <>
          <AppBar position="sticky">
            <PDFToolbar
              numPages={numPages}
              // currentPage={pageNumber}
              onPageChange={handlePageChange}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onFullScreen={handleFullScreen}
              onDownload={handleDownload}
              onPrint={handlePrint}
            />
          </AppBar>

          <MDBox
            sx={{
              display: "flex",
              width: "100%",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            <MDBox
              sx={{
                flexGrow: 1,
              }}
            >
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                {Array.from(new Array(numPages), (_el, index) => {
                  return (
                    <Page
                      scale={zoom}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      pageIndex={2}
                    />
                  );
                })}
              </Document>
            </MDBox>
          </MDBox>
        </>
      )}
    </MDBox>
  );
};

export default TMSPdfView;
