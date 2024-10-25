import { Box, Button, CircularProgress, Typography } from "@mui/material";
import usePayment from "hooks/usePayment";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Links from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

const Cancel = () => {
  const paymentId = window.location.search.split("?paymentId=")[1];
  if (!paymentId) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = usePayment(
    `stripe/cancel?paymentId=${paymentId}`
  );
  return (
    <>
      {isLoading && <CircularProgress />}
      {data && (
        <Box textAlign="center" sx={{ p: 1 }}>
          <Stack alignItems="center">
            <svg data-testid="closeIcon" color="error"></svg>
            <CloseIcon color="error" sx={{ fontSize: 60 }}></CloseIcon>
          </Stack>
          <Typography variant="h4" component="h2" sx={{ color: red[300] }}>
            {" "}
            Payment is not Successful{" "}
          </Typography>
          <Typography variant="h5" component="h2" sx={{ color: "grey" }}>
            {" "}
            Please try again! Your payment is not complete
          </Typography>
          <Box sx={{ p: 10 }}>
            <Button variant="contained" color="error">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Links underline="none" color="white">
                  {" "}
                  Go to Home
                </Links>
              </Link>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cancel;
