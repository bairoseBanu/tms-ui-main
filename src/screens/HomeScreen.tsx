import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Grid } from "@mui/material";
import { formatChartData } from "data/homeScreen.data";
import TMSHolidaychart from "components/TMSHolidayChart";
import TMSHoursChart from "components/TMSHoursChart";
import { useAppData } from "hooks/useAppData";
import Header from "components/Header";
import ProfileInfoCard from "components/ProfileInfoCard";
import { formatBasicInfo } from "lib/format-profile-card-info";
import { ProfileInfoField } from "types/profile-info-field";
import TMSLoader from "components/TMSLoader";
import { RtwDoc, TimeHolidayAnalytic } from "types/api-response";
import useApiCall from "hooks/useApiCall";

const HomeScreen = () => {
  const { appData, isAppDataLoading } = useAppData();

  const { data, isLoading } = useApiCall<TimeHolidayAnalytic>(`timeholiday`);
  const { data: rtw, isLoading: isRtwLoading } = useApiCall<RtwDoc>(`rtw?`);

  const [infoOne, setInfoOne] = useState<ProfileInfoField[]>();
  const [infoTwo, setInfoTwo] = useState<ProfileInfoField[]>();
  const [infoThree, setInfoThree] = useState<ProfileInfoField[]>();
  const [deptName, setDeptName] = useState("");

  useEffect(() => {
    if (appData) {
      const { user, departments, employees, paygrades } = appData;

      const name = departments?.find((dept) => {
        return dept.id === user?.deptId;
      })?.name;

      const manager =
        employees?.find((emp) => user?.manager === emp.id)?.firstName || "";
      const hr = employees?.find((emp) => user.hr === emp.id)?.firstName || "";
      const paygradeName = paygrades?.find((pg) => pg.id === user.grade)?.name;

      const profileOne = formatBasicInfo({
        employee: user,
        deptName,
        manager,
        hr,
        profileType: 1,
      }).profileInfoFields;
      const profileTwo = formatBasicInfo({
        employee: user,
        deptName,
        manager,
        hr,
        paygradeName,
        profileType: 2,
      }).profileInfoFields;
      const profileThree = formatBasicInfo({
        rtw,
        profileType: 3,
      }).profileInfoFields;
      setInfoOne(profileOne);
      setInfoTwo(profileTwo);
      setInfoThree(profileThree);
      setDeptName(name);
    }
  }, [appData, deptName, rtw]);

  if (isLoading || isRtwLoading || isAppDataLoading) {
    return <TMSLoader />;
  }

  const { timeAnalytics, holidayAnalytics, totalTime, totalHolidays } = data;

  return (
    <MDBox width={"100%"}>
      <Header user={appData.user}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item>
              {infoOne && (
                <ProfileInfoCard
                  info={infoOne as unknown as ProfileInfoField[]}
                  social={[
                    {
                      link: "https://www.facebook.com/CreativeTim/",
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: "https://twitter.com/creativetim",
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: "https://www.instagram.com/creativetimofficial/",
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                  ]}
                  title=""
                  description=""
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {infoTwo && (
                <ProfileInfoCard
                  info={infoTwo as unknown as ProfileInfoField[]}
                  title=""
                  description=""
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {infoThree && (
                <ProfileInfoCard
                  info={infoThree as unknown as ProfileInfoField[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                  title=""
                  description=""
                />
              )}
            </Grid>
            <Grid item xs={15} sm={5} lg={5}>
              {timeAnalytics && (
                <TMSHoursChart
                  chart={formatChartData(timeAnalytics)}
                  icon={{ color: "primary", component: "hourglass_bottom" }}
                  title="Hours Worked this week"
                  description={`Total Hours: ${totalTime}`}
                />
              )}
            </Grid>

            <Grid item xs={15} sm={5} lg={5}>
              {holidayAnalytics && (
                <TMSHolidaychart
                  chart={formatChartData(holidayAnalytics)}
                  icon={{ color: "primary", component: "holiday_village" }}
                  title="Holidays"
                  description={`Total Holidays: ${totalHolidays}`}
                />
              )}
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </MDBox>
  );
};

export default HomeScreen;
