import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import MDBox from "./MDBox";
import MDDropzone from "./MDDropzone";
import MDTypography from "./MDTypography";
import { EmployeeProof } from "types/employee-proof.type";
import EmployeeProofStatus from "./EmployeeProofStatus";
import Dropzone, { DropzoneFile } from "dropzone";
import axios from "axios";
import { uploadfiletoS3 } from "apis/s3.api";

interface UploadError {
  status: boolean;
  message: string;
}

function EmployeeUploadFile({ title, status, type }: EmployeeProof) {
  const [uploadError, setUploadError] = useState<UploadError>({
    status: false,
    message: "",
  });

  const makeAPi = useCallback(
    async (file: File) => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      try {
        const fullUrl = `${
          import.meta.env.VITE_TMS_EMPLOYEE_BACKEND
        }/rtwuploadurl`;
        const response = await axios.post(
          fullUrl,
          { docType: type },
          {
            withCredentials: true,
          }
        );
        const uploadUrl = response.data;
        const s3Response = await uploadfiletoS3(uploadUrl, file, file.type);
        return s3Response;
      } catch (error) {
        setUploadError({
          status: false,
          message: "Something went Wrong",
        });
      }
    },
    [type]
  );

  return (
    <Grid container rowSpacing={2}>
      <Grid item sm={12}>
        <MDBox
          display="flex"
          ml="auto"
          mb={10}
          mr="auto"
          flexDirection="column"
          width={400}
        >
          {
            <>
              <MDDropzone
                options={{
                  init(this: Dropzone) {
                    this.on("addedfile", async (file: DropzoneFile) => {
                      console.log("file added", file);
                      if (file.type.startsWith("image/")) {
                        setUploadError({ status: false, message: "" });
                        const response = await makeAPi(file);
                        console.log({
                          s3: response,
                        });
                      } else {
                        setUploadError({
                          status: true,
                          message: "File must be an image",
                        });
                      }
                    });
                  },
                }}
              />
              {uploadError.status && (
                <MDTypography
                  color="error"
                  component="body1"
                  sx={{ fontSize: ".8rem" }}
                >
                  {uploadError.message}
                </MDTypography>
              )}
            </>
          }
          <MDTypography
            component="label"
            variant="button"
            fontWeight="medium"
            fontSize="1.2em"
            color="text"
            mt={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {title}
            <EmployeeProofStatus content={status} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default EmployeeUploadFile;
