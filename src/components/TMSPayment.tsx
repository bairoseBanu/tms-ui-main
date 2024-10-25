import { FC, useState } from "react";
import { Card, Divider } from "@mui/material";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import { makePayment } from "routes/auth/signup/signup.api";
import { PayValues } from "types/pay-values";
import MDTab from "./Tab/MDTab";
import { useLocation } from "react-router-dom";
interface Props {
  plan?: string;
}

interface DCProps {
  planName: string;
  price: string;
  isAnnual: boolean;
}

const DataComponent: FC<DCProps> = ({ planName, price, isAnnual }) => {
  const [payDisabled, setPayDisabled] = useState(false);
  const handlePay = async () => {
    const payValues: PayValues = {
      plan: planName,
      isAnnual,
    };
    setPayDisabled(true);
    try {
      const response = await makePayment(payValues);
      const { redirectUrl } = response.data;
      window.location.href = redirectUrl;
    } catch {
      setPayDisabled(false);
    }
  };
  return (
    <>
      <MDTypography pt={1} component="h4" textAlign="center" fontWeight="bold">
        Plan Name: {planName}
      </MDTypography>
      <Divider color="primary"></Divider>
      <MDTypography pb={2} component="h6" textAlign="center" fontWeight="bold">
        Price: {price}
      </MDTypography>
      <MDTypography px={2} pb={3} lineHeight="1.5" textAlign="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </MDTypography>
      <MDButton
        disabled={payDisabled}
        onClick={handlePay}
        fullWidth
        color="primary"
      >
        {isAnnual ? "Pay" : "Subscribe"}
      </MDButton>
    </>
  );
};
// should be placed somewhere else
const priceListsPerMonth = {
  silver: 10,
  gold: 20,
  platinum: 30,
};
const TMSPayment: FC<Props> = ({ plan }) => {
  const location = useLocation();
  const state = location.state as { plan: "Silver" | "Gold" | "Platinum" };
  const existingPlan = state?.plan;

  let price: number;
  if (plan) {
    if (plan === "Silver") price = priceListsPerMonth.silver;
    if (plan === "Gold") price = priceListsPerMonth.gold;
    if (plan === "Platinum") price = priceListsPerMonth.platinum;
  } else {
    if (existingPlan === "Silver") price = priceListsPerMonth.silver;
    if (existingPlan === "Gold") price = priceListsPerMonth.gold;
    if (existingPlan === "Platinum") price = priceListsPerMonth.platinum;
  }

  const data = [
    {
      title: "Annual",
      component: (
        <DataComponent
          planName={plan ? plan : existingPlan}
          price={`${price * 12}`}
          isAnnual={true}
        />
      ),
      props: { planName: plan ? plan : existingPlan },
    },
    {
      title: "Monthly",
      component: (
        <DataComponent
          planName={plan ? plan : existingPlan}
          price={`${price}`}
          isAnnual={false}
        />
      ),
      props: { planName: plan ? plan : existingPlan },
    },
  ];

  return (
    <Card
      sx={
        {
          // width: { xs: "100%", sm: "100%", md: "100%", lg: "200%" },
          // marginY: "3em",
          // marginLeft: { sm: "0em", md: "0em", lg: "-9em" },
        }
      }
    >
      <MDBox
        p={2}
        sx={{
          margin: "auto",
        }}
      >
        {existingPlan && (
          <MDTypography color="error" textAlign="center">
            You have not yet paid to continue the service !!!
          </MDTypography>
        )}
        <Card>
          <MDBox p={4}>
            <MDTab data={data} />
          </MDBox>
        </Card>
      </MDBox>
    </Card>
  );
};

export default TMSPayment;
