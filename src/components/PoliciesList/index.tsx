import { Grid } from "@mui/material";
import { FC, useState } from "react";
import { useCallback } from "react";
import PoliciesNav from "./PoliciesNav";
import PolicyContent from "./PolicyContent";
import { PolicyAttrs } from "types/api-response";
/**
 *
 * @param data =[{title: string, icon: string, content: string}]
 * @param header= string
 * @param bgColor
 * @param color
 * @param activeBgColor
 * @returns
 */
interface Props {
  header: any;
  color?: any;
  bgColor?: any;
  activeBgColor?: any;
  policies: PolicyAttrs[];
  onPolicyDelete: (policyId: string) => void;
  onPolicyAdd: () => void;
}

const PoliciesList: FC<Props> = ({
  header,
  color,
  bgColor,
  activeBgColor,
  policies,
  onPolicyDelete,
  onPolicyAdd,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = useCallback((index: any) => {
    setActiveIndex(index);
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <PoliciesNav
            policies={policies}
            activeIndex={activeIndex}
            setActiveIndex={(index: any) => handleActiveIndex(index)}
            header={header}
            color={color}
            bgColor={bgColor}
            activeBgColor={activeBgColor}
            onPolicyDelete={onPolicyDelete}
            onPolicyAdd={onPolicyAdd}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <PolicyContent policy={policies[activeIndex]} />
        </Grid>
      </Grid>
    </>
  );
};

export default PoliciesList;
