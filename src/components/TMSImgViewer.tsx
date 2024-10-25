import { useState } from "react";
import ImgsViewer from "react-images-viewer";
import MDBox from "./MDBox";
/**
 *
 * @param imagesList []{src: string}
 * @param openImgsViewer function
 * @returns Component
 */

type imgItem = {
  src: string;
};

interface TMSImgViewerProp {
  images: imgItem[];
}

const TMSImgViewer = ({ images }: TMSImgViewerProp) => {
  const [imgsViewer, setImgsViewer] = useState(false);
  const [imgsViewerCurrent, setImgsViewerCurrent] = useState(0);
  const closeImgsViewer = () => setImgsViewer(false);
  const openImgsViewer = ({ currentTarget }: any) => {
    images.forEach((image, index) => {
      if (image?.src == currentTarget.src) {
        return setImgsViewerCurrent(index);
      }
    });
    setImgsViewer(true);
  };
  const imgsViewerNext = () => setImgsViewerCurrent(imgsViewerCurrent + 1);
  const imgsViewerPrev = () => setImgsViewerCurrent(imgsViewerCurrent - 1);
  return (
    <>
      <MDBox
        component="img"
        src={images.length > 0 ? images[0].src : null}
        alt="Product Image"
        // shadow="lg"
        borderRadius="lg"
        width="100%"
        onClick={openImgsViewer}
        sx={{
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.1)",
            transition: "0.3s",
            p: 0.5,
            bgcolor: "gradients.light.state",
          },
        }}
      ></MDBox>
      <ImgsViewer
        imgs={images}
        isOpen={imgsViewer}
        onClose={closeImgsViewer}
        currImg={imgsViewerCurrent}
        onClickPrev={imgsViewerPrev}
        onClickNext={imgsViewerNext}
        backdropCloseable
      />
    </>
  );
};

export default TMSImgViewer;
