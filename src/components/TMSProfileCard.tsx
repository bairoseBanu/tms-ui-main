import { Box, Grid, Icon, Tooltip } from "@mui/material";
import * as Yup from "yup";
import Header from "./Header";
import MDBox from "./MDBox";
import TMSHoursChart from "./TMSHoursChart";
import TMSHolidaychart from "./TMSHolidayChart";
import {
  Department,
  Employee,
  RtwDoc,
  TimeHolidayAnalytic,
} from "types/api-response";
import { FC, useEffect, useState } from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import { formatBasicInfo } from "lib/format-profile-card-info";
import { ProfileInfoField } from "types/profile-info-field";
import useApiCall from "hooks/useApiCall";
import { formatChartData } from "data/homeScreen.data";
import TMSLoader from "./TMSLoader";
import { useAppData } from "hooks/useAppData";
import MDButton from "./MDButton";
import { Values } from "./ProfileInfoCard/render-edit-Items";

interface TMSProfileCardProps {
  employeeId: string;
  departments: Department[];
  isCurrentUser?: boolean;
  onViewEmpProof?: (employeeId: string) => void;
}
export interface InfoAndValidation {
  profileInfoFields: ProfileInfoField[];
  validationSchema: Yup.Schema<object>;
}

const TMSProfileCard: FC<TMSProfileCardProps> = ({
  employeeId,
  departments,
  isCurrentUser = true,
  onViewEmpProof,
}) => {
  const { data: employee, isLoading: isEmployeeLoading } = useApiCall<Employee>(
    `employee/${employeeId}`
  );
  const [user, setUser] = useState<Employee>();
  const { data, isLoading } = useApiCall<TimeHolidayAnalytic>(
    `timeholiday?employeeId=${employeeId}`
  );
  const { data: rtw, isLoading: isRtwLoading } = useApiCall<RtwDoc>(
    `rtw?employeeId=${employeeId}`
  );
  const { employees, paygrades, designationsDocs } = useAppData().appData;

  useEffect(() => {
    if (employee) {
      setUser(employee);
    }
  }, [employee]);

  if (isLoading || isEmployeeLoading || isRtwLoading) {
    return <TMSLoader />;
  }
  const manager = employees?.find(
    (emp) => emp.id === employee.manager
  )?.firstName;
  const hr = employees?.find((emp) => emp.id === employee.hr)?.firstName;
  const deptName = departments.find((dep) => dep.id === employee.deptId)?.name;
  const paygradeName = paygrades.find((pg) => pg.id === employee.grade)?.name;
  const designationName = designationsDocs.find(
    (desi) => desi.id === employee.designation
  )?.name;
  const infoOne = formatBasicInfo({
    employee,
    deptName,
    manager,
    hr,
    profileType: 1,
  });
  const infoTwo = formatBasicInfo({
    employee,
    deptName,
    manager,
    hr,
    paygradeName,
    designationName,
    profileType: 2,
  });
  const infoThree = formatBasicInfo({ rtw, profileType: 3 });
  const { timeAnalytics, holidayAnalytics, totalTime, totalHolidays } = data;

  const openProofDetails = () => {
    onViewEmpProof(employeeId);
  };

  const handleProfileTwoEdit = (values: Values) => {
    if (values.designation) {
      const clonedUser = { ...user };
      clonedUser.designation = values.designation;
      setUser(clonedUser);
    }
  };
  return (
    <MDBox width={"100%"} maxHeight={"70%"}>
      {user && (
        <Header user={user} isCurrentUser={isCurrentUser}>
          <MDBox>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <ProfileInfoCard
                  isEditable={true}
                  info={infoOne?.profileInfoFields}
                  social={[]}
                  title=""
                  description=""
                  action={{
                    route: "/settings/employee",
                    tooltip: "Edit Profile",
                  }}
                  shadow={false}
                  employeeId={employee.id}
                  validationSchema={infoOne?.validationSchema}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProfileInfoCard
                  isEditable={true}
                  info={infoTwo?.profileInfoFields}
                  social={[]}
                  title=""
                  description=""
                  action={{
                    route: "/settings/employee",
                    tooltip: "Edit Profile",
                  }}
                  shadow={false}
                  employeeId={employee.id}
                  validationSchema={infoTwo?.validationSchema}
                  onProfileEdit={handleProfileTwoEdit}
                />
              </Grid>
              {rtw && (
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <ProfileInfoCard
                      isEditable={false}
                      info={infoThree?.profileInfoFields}
                      social={[]}
                      title=""
                      description=""
                      action={{
                        route: "/settings/employee",
                        tooltip: "Edit Profile",
                      }}
                      shadow={false}
                      employeeId={employee.id}
                      validationSchema={infoThree?.validationSchema}
                    />
                    <Tooltip title="View Proof Details">
                      <MDButton
                        onClick={openProofDetails}
                        variant="gradient"
                        color="info"
                        endIcon={<Icon>visibility</Icon>}
                      >
                        view
                      </MDButton>
                    </Tooltip>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={5}>
                <TMSHoursChart
                  chart={formatChartData(timeAnalytics)}
                  icon={{ color: "primary", component: "hourglass_bottom" }}
                  title="Hours Worked"
                  description={`Total Hours: ${totalTime}`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <TMSHolidaychart
                  chart={formatChartData(holidayAnalytics)}
                  icon={{ color: "primary", component: "holiday_village" }}
                  title="Holidays"
                  description={`Total Holidays: ${totalHolidays}`}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Header>
      )}
    </MDBox>
  );
};

export default TMSProfileCard;
