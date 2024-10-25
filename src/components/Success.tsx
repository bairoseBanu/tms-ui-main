import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Links from "@mui/material/Link";
import usePayment from "hooks/usePayment";

const Success = () => {
  const paymentId = window.location.search.split("?paymentId=")[1];
  if (!paymentId) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, error } = usePayment(
    `stripe/success?paymentId=${paymentId}`
  );

  return (
    <>
      {error && <div>Something Went Wrong!!!</div>}
      {isLoading && <CircularProgress />}
      {data && (
        <Box textAlign="center" sx={{ p: 1 }}>
          <Stack alignItems="center">
            <svg data-testid="checkIcon" color="success"></svg>
            <CheckIcon color="success" sx={{ fontSize: 60 }}></CheckIcon>
          </Stack>
          <Typography variant="h4" component="h2" sx={{ color: "green" }}>
            {" "}
            Payment Successful{" "}
          </Typography>
          <Typography variant="h5" component="h2" sx={{ color: "grey" }}>
            {" "}
            Thank You! Your payment is complete{" "}
          </Typography>
          <Box sx={{ p: 10 }}>
            <Button variant="contained" color="success">
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

export default Success;
