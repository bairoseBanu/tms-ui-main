import { Typography } from "@mui/material";
import MDBox from "./MDBox";
import MDInput from "./MDInput";
import MDButton from "./MDButton";
import { FC, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
interface Props {
  onUpload: (file: File) => void;
  title: string;
}

const TMSUpload: FC<Props> = ({ onUpload, title }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileChange = async (event: any) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!imageFile) return;
    onUpload(imageFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-profilepic-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {title}
        </Typography>
        <MDInput
          type="file"
          id="modal-profilepic-description"
          sx={{ mt: 2 }}
          onChange={handleFileChange}
        />
        <MDBox display={"flex"} justifyContent={"flex-end"} mt={2}>
          <MDButton
            variant="contained"
            color="success"
            type="submit"
            endIcon={<SendIcon />}
          >
            Upload
          </MDButton>
        </MDBox>
      </MDBox>
    </form>
  );
};

export default TMSUpload;
