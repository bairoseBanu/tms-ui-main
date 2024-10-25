import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import * as Yup from "yup";
// import Tooltip from "@mui/material/Tooltip";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ProfileInfoField } from "types/profile-info-field";
import TMSEditIcon from "components/TMSEditIcon";
import RenderItems from "./render-items";
import { RenderEditItems, Values } from "./render-edit-Items";
import { useAppData } from "hooks/useAppData";

// Declaring props types for ProfileInfoCard
interface Props {
  isEditable?: boolean;
  title: string;
  description: string;
  info: ProfileInfoField[];
  social?: {
    [key: string]: any;
  }[];
  action: {
    route: string;
    tooltip: string;
  };
  shadow?: boolean;
  employeeId?: string;
  validationSchema?: Yup.Schema<object>;
  onProfileEdit?: (values: Values) => void;
  [key: string]: any;
}

function ProfileInfoCard({
  title,
  description,
  info,
  shadow,
  isEditable = false,
  employeeId,
  validationSchema,
  onProfileEdit,
}: Props): JSX.Element {
  const [editMode, setEditMode] = useState(false);
  const [currentInfo, updateCurrentInfo] = useState<ProfileInfoField[]>();
  const { departments, paygrades, designationsDocs } = useAppData().appData;

  useEffect(() => {
    updateCurrentInfo(info);
  }, [info]);
  const setCurrentInfo = (values: Values) => {
    const valuesKeys = Object.keys(values);
    const valuesValues = Object.values(values) as string[];
    const copyCurrentInfo = [...currentInfo];
    copyCurrentInfo.forEach((ci) => {
      valuesKeys.forEach((vk, index) => {
        if (ci.key === vk) ci.value = valuesValues[index];
      });
    });
    updateCurrentInfo(copyCurrentInfo);
  };

  const handleEditedItems = (values: Values) => {
    if (values.deptId) {
      const dep = departments.find((dep) => dep.id === values.deptId);
      values.deptId = dep.name;
    }
    if (values.grade) {
      const grade = paygrades.find((pg) => pg.id === values.grade);
      values.grade = grade.name;
    }
    if (values.designation) {
      const designation = designationsDocs.find(
        (desi) => desi.id === values.designation
      );
      values.designation = designation.name;
    }
    setCurrentInfo(values);
    setEditMode(false);
    onProfileEdit && onProfileEdit(values);
  };
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: !shadow && "none",
        display: "flex",
        flexDirection: "column",
        padding: "1em",
      }}
    >
      <MDBox display="flex" justifyContent="flex-end">
        {isEditable && (
          <TMSEditIcon
            color="secondary"
            onClick={() => {
              setEditMode(true);
            }}
          />
        )}
      </MDBox>
      <MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          {title && (
            <MDTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox>
          {description && (
            <MDBox mb={2} lineHeight={1}>
              <MDTypography variant="button" color="text" fontWeight="light">
                {description}
              </MDTypography>
            </MDBox>
          )}
          <MDBox opacity={0.3}>
            <Divider />
          </MDBox>
          <MDBox>
            {!editMode && <RenderItems info={currentInfo} />}
            {editMode && (
              <RenderEditItems
                info={currentInfo}
                setEditMode={(value: boolean) => setEditMode(value)}
                employeeId={employeeId}
                onEdit={handleEditedItems}
                validationSchema={validationSchema}
              />
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

export default ProfileInfoCard;
