import {
  createContext,
  ReactNode,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import { getUserDetails } from "apis/utility.api";
import {
  Branch,
  Department,
  Designation,
  Employee,
  Grade,
  Organization,
  Analytic,
  PaygradeDoc,
  DesignationDoc,
  HolidayTypeDoc,
  HolidayDurationDoc,
  ThemeDoc,
} from "types/api-response";
import { ThemeType } from "types/theme-type";
import { extractPayload } from "lib/auth";
export interface AppDataType {
  branches?: Branch[];
  currentBranch?: Branch | null;
  departments?: Department[];
  designations?: Designation; // TODO: need to remove
  employees?: Employee[];
  user?: Employee;
  grades?: Grade;
  organization?: Organization;
  timeAnalytics?: Analytic[];
  paygrades?: PaygradeDoc[];
  designationsDocs?: DesignationDoc[]; // This is in replace of the above designations
  holidayTypes?: HolidayTypeDoc[];
  holidayDuration?: HolidayDurationDoc;
  theme: ThemeDoc;
}
export type SetAppDataType = Dispatch<SetStateAction<AppDataType>>;
export const AppDataContext = createContext<{
  appData: AppDataType;
  // setAppData: SetAppDataType;
  isAppDataLoading: boolean;
  themeColor: ThemeType;
  onThemeChange: (themeColor: ThemeType) => void;
  onAppDataChange: (newAppData: AppDataType) => void;
  revalidate: () => void;
}>(null);
type AppDataProviderprops = {
  children: ReactNode;
};

export const AppDataProvider: FC<AppDataProviderprops> = ({ children }) => {
  const [appData, setAppData] = useState<AppDataType>();
  const [themeColor, setThemeColor] = useState<ThemeType>("dark");
  const [isAppDataLoading, setIsAppDataLoading] = useState(true);
  const fetUserDetails = useCallback(async () => {
    const { branchId } = extractPayload();
    if (branchId) {
      const data = await getUserDetails();
      if (data) {
        setIsAppDataLoading(false);
        setAppData({
          ...appData,
          branches: data?.branches || [],
          departments: data.departments,
          designations: data.designations,
          employees: data.employees,
          currentBranch: data.currentBranch,
          user: data.user,
          grades: data.grades,
          organization: data.organization,
          paygrades: data.paygrades,
          designationsDocs: data.designationsDocs,
          holidayTypes: data.holidayTypes,
          holidayDuration: data.holidayDuration,
          theme: data?.theme,
        });
        console.log("appData Loaded");
        if (data?.theme) {
          setThemeColor(data.theme.type);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetUserDetails();
  }, [fetUserDetails]);

  const changeThemeColor = useCallback((color: ThemeType) => {
    setThemeColor(color);
  }, []);

  const changeAppData = useCallback((newAppData: AppDataType) => {
    setAppData(newAppData);
  }, []);

  const revalidate = () => {
    fetUserDetails();
  };
  return (
    <AppDataContext.Provider
      value={{
        appData,
        onAppDataChange: changeAppData,
        isAppDataLoading,
        themeColor,
        onThemeChange: changeThemeColor,
        revalidate: revalidate,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
