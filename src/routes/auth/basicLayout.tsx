import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import PageLayout from "layouts/PageLayout";
import { ReactNode, JSX } from "react";

interface Props {
  image: string;
  children: ReactNode;
}

export function BasicLayout({ image, children }: Props): JSX.Element {
  return (
    <PageLayout>
      {/* <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route:
            "https://creative-tim.com/product/material-dashboard-2-pro-react-ts",
          label: "buy now",
          color: "info",
        }}
        transparent
        light
      /> */}
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }: any) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer light /> */}
    </PageLayout>
  );
}

export default BasicLayout;
