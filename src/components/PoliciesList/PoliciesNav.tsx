import React, { Dispatch, SetStateAction } from "react";
import { Box, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import { PolicyAttrs } from "types/api-response";
/**
 * @param data=[{title:string,icon:string (optional)}]
 * @param activeIndex=number
 * @param setActiveIndex= function
 * @param header= string
 * @param color,
 * @param bgColor,
 * @param activeBgColor
 */
interface PoliciesNavprops {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  header: string;
  color: string;
  bgColor: string;
  activeBgColor: string;
  policies: PolicyAttrs[];
  onPolicyDelete: (policyId: string) => void;
  onPolicyAdd: () => void;
}

interface RenderNavprops {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  // color: string;
  bgColor: string;
  activeBgColor: string;
  // header?: string;
  policies: PolicyAttrs[];
  onPolicyDelete: (policyid: string) => void;
}
const RenderNavItems: React.FC<RenderNavprops> = ({
  activeIndex,
  setActiveIndex,
  bgColor,
  activeBgColor,
  policies,
  onPolicyDelete,
}) => {
  const navItems = policies.map((policy, key) => {
    const deletePolicy = async (policyId: string) => {
      onPolicyDelete(policyId);
    };

    return (
      <Box
        onClick={() => setActiveIndex(key)}
        key={policy.policyId}
        component="li"
        my={1}
        sx={{
          display: "flex",
          color: activeIndex === key ? bgColor : activeBgColor,
          backgroundColor: activeIndex === key ? activeBgColor : bgColor,
          p: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          transition: "background-color 200ms",
          "&:hover": {
            backgroundColor: activeBgColor,
            cursor: "pointer",
            color: "dark.main",
          },
        }}
      >
        <Box display={"flex"}>
          <Icon sx={{ fontSize: 14 }}>policy</Icon>
          <Typography sx={{ fontSize: 14, wordWrap: "break-word", px: 1 }}>
            {policy.name}
          </Typography>
        </Box>
        <Tooltip title="Delete">
          <IconButton onClick={() => deletePolicy(policy.policyId)}>
            <Icon>delete</Icon>
          </IconButton>
        </Tooltip>
      </Box>
    );
  });
  return <>{navItems}</>;
};

function PoliciesNav({
  activeIndex = 0,
  setActiveIndex,
  header,
  color = "white",
  bgColor = "dark.main",
  activeBgColor = "light.main",
  policies,
  onPolicyDelete,
  onPolicyAdd,
}: PoliciesNavprops) {
  return (
    <Box
      component="ul"
      px={2}
      py={2}
      sx={{
        backgroundColor: bgColor,
        borderRadius: "10px",
        height: "80vh",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h4" style={{ color }} sx={{ my: 2 }}>
        {header}
      </Typography>
      <hr style={{ borderTop: `1px solid ${color}` }} />
      <RenderNavItems
        policies={policies}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        // color={color}
        bgColor={bgColor}
        onPolicyDelete={onPolicyDelete}
        activeBgColor={activeBgColor}
      />
      <Box
        style={{ backgroundColor: "white", borderRadius: "5%" }}
        onClick={() => onPolicyAdd()}
      >
        <Tooltip title="Add policy">
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            color="info"
          >
            <Icon>add</Icon>
            <Typography ml={1} component="span" fontSize={14}>
              Add Policy
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default PoliciesNav;
