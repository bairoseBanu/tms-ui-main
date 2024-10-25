import {
  IconButton,
  TextFieldProps,
  TextFieldVariants,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import MDBox from "./MDBox";
import { ErrorMessage } from "formik";
import MDInput from "./MDInput";
import colors from "assets/theme/base/colors";
import ErrorMsg from "./ErrorMsg";
import MDButton from "./MDButton";
import CancelIcon from "@mui/icons-material/Cancel";
interface CustomInputProps extends Omit<TextFieldProps, "variant"> {
  name: string;
  variant: TextFieldVariants;
  helperText?: string;
  error?: boolean;
  width?: string;
  onUpload: (name: string, files: File[]) => void;
  onFileRemove: (name: string, file: File) => void;
}

const TMSFileUpload: FC<CustomInputProps> = ({
  name,
  variant = "outlined",
  width = "100%",
  onUpload,
  onFileRemove,
  ...rest
}) => {
  const { sx } = rest;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    onUpload(name, Array.from(event.target.files));
  };
  //   const handleUpload = () => {
  //     // Implement your upload logic here, using selectedFiles array
  //     console.log(selectedFiles); // Example: Log selected files to console
  //     onUpload(name, selectedFiles);
  //   };
  const removeSelectedFile = (file: File) => {
    const copySelectedFiles = [...selectedFiles].filter(
      (_file) => _file.name !== file.name
    );
    setSelectedFiles([...copySelectedFiles]);
    onFileRemove(name, file);
  };
  return (
    <MDBox mb={2} width={width}>
      <MDBox>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          hidden // Hide the default file input
          ref={inputRef}
        />

        <MDInput
          sx={{
            backgroundColor: colors.background.default,
            borderRadius: "5px",
            ...sx,
          }}
          variant={variant}
          // Trigger the hidden file input on click
          onClick={() => inputRef.current?.click()}
          InputProps={{
            readOnly: true, // Make TextField non-interactive
            endAdornment: <MDButton variant="gradient">Upload</MDButton>,
          }}
          {...rest}
          // {...field}
        />
        {selectedFiles.length > 0 && (
          <MDBox display="flex" gap={1}>
            {selectedFiles.map((file) => {
              const key = crypto.randomUUID();
              const isImage = file.type.startsWith("image/");
              return (
                <MDBox
                  key={key}
                  sx={{
                    "&:hover": {
                      transform: "scale(120%)",
                    },
                    transition: "transform 0.3s ease-in-out",
                    flexBasis: "50%",
                    position: "relative",
                    maxHeight: 150,
                    maxWidth: 150,
                  }}
                >
                  <MDBox
                    position="relative"
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                  >
                    <Tooltip
                      sx={{
                        top: isImage ? "0" : "0",
                        right: isImage ? "20px" : "25px",
                        position: "absolute",
                      }}
                      title={"Remove"}
                    >
                      <IconButton onClick={() => removeSelectedFile(file)}>
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                    {isImage && (
                      <img
                        src={URL.createObjectURL(file)}
                        style={{
                          objectFit: "contain",
                          width: "80%",
                          height: "80%",
                        }} // Adjust dimensions as needed
                      />
                    )}
                    {!isImage && (
                      <MDBox bgColor="info" p={2} height="50px">
                        <Typography fontSize={14}>{file.name}</Typography>
                      </MDBox>
                    )}
                  </MDBox>
                </MDBox>
              );
            })}
          </MDBox>
        )}
      </MDBox>

      <ErrorMessage name={name} component={ErrorMsg} />
    </MDBox>
  );
};

export default TMSFileUpload;
