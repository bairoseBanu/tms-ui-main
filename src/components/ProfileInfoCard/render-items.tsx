import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { FC } from "react";
import { ProfileInfoField } from "types/profile-info-field";

interface Props {
  info: ProfileInfoField[];
}
const RenderItems: FC<Props> = ({ info }) => {
  const items = info?.map((element) => (
    <MDBox key={element.id} display="flex" py={1} pr={2}>
      {/* <MDInput value={values[key]} label={label} readOnly></MDInput> */}
      <MDBox>
        <MDTypography
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {element.label}: &nbsp;
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          &nbsp;{element.value}
        </MDTypography>
      </MDBox>
    </MDBox>
  ));
  return <MDBox>{items}</MDBox>;
};

export default RenderItems;
