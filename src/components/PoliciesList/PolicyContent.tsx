import { Box } from "@mui/material";
import TMSPdfView from "components/TMSPdfView";
import { PolicyAttrs } from "types/api-response";
interface Props {
  policy: PolicyAttrs;
}

function PolicyContent({ policy }: Props) {
  return (
    <Box mb={3}>
      {policy?.presignedUrl && <TMSPdfView pdfUrl={policy.presignedUrl} />}
    </Box>
  );
}

export default PolicyContent;
