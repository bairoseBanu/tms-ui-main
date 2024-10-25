import Branch from "components/Branch";
import MDBox from "components/MDBox";
import { useAppData } from "hooks/useAppData";

const BranchScreen = () => {
  const data = useAppData();
  console.log("datat received", data);

  return (
    <MDBox maxWidth={"65vw"} width={"100%"}>
      <Branch />
    </MDBox>
  );
};

export default BranchScreen;
