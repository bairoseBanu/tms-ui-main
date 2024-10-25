import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import useApiCall from "hooks/useApiCall";
import { HolidayDurationDoc } from "types/api-response";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import TMSLoader from "./TMSLoader";
import MDBox from "./MDBox";
import MDButton from "./MDButton";
import { newOrUpdateHolidayDuration } from "apis/holidayduration.api";
import { extractPayload } from "lib/auth";
import { Message } from "types/message";

type Option = { id: string; label: string; value: string };
const options: Option[] = [
  { id: "1", label: "Calendar year", value: "calendaryear" },
  { id: "0", label: "Financial year", value: "financialyear" },
];
export interface ConfirmationDialogRawProps {
  keepMounted: boolean;
  value: Option;
  open: boolean;
  onValueChange: (value: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onValueChange, value: valueProp, open } = props;
  const radioGroupRef = useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onValueChange(newValue);
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <DialogTitle>Holiday Duration</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="Holiday Duration"
          name="Holiday Duration"
          value={valueProp}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              key={option.id}
              control={
                <Radio
                  checked={option.value === valueProp.value ? true : false}
                />
              }
              label={option.label}
            />
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  onMessage: (message: Message, source: string) => void;
}

const TMSHolidayDurationConfig: FC<Props> = ({ onMessage }) => {
  const { data, isLoading: isHolidayDurationLoading } =
    useApiCall<HolidayDurationDoc>(`holidayduration`);
  const [holidayDuration, setHolidayDuration] = useState<HolidayDurationDoc>();
  const [updatedHolidayDuration, setUpdatedHolidayDuration] =
    useState<HolidayDurationDoc | null>(null);
  const [value, setValue] = useState<Option>();
  const { branchId } = extractPayload();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (newValue?: string) => {
    const newLabel =
      newValue === "financialyear" ? "Financial Year" : "Calendar Year";

    setValue({ ...value, label: newLabel, value: newValue });
    const newHolidayDurationDoc = {
      ...holidayDuration,
      type: newValue,
    } as HolidayDurationDoc;
    setUpdatedHolidayDuration(newHolidayDurationDoc);
    setOpen(false);
  };

  const sendUpdatedHolidayDuration = async () => {
    setIsLoading(true);
    try {
      const response = await newOrUpdateHolidayDuration(updatedHolidayDuration);
      if (response.status === 201) {
        setUpdatedHolidayDuration(null);
        onMessage(
          {
            message: "Holidayduration updated successfully!",
            severity: "success",
          },
          "holidayDuration"
        );
      } else {
        onMessage(
          {
            message: "Error in updating Holidayduration",
            severity: "error",
          },
          "holidayDuration"
        );
      }
    } catch (error: unknown) {
      onMessage(
        {
          message: "Error in updating Holidayduration",
          severity: "error",
        },
        "holidayDuration"
      );
    }
    setIsLoading(false);
  };

  const cancelUpdatedHolidayDuration = () => {
    setUpdatedHolidayDuration(null);
    const newLabel =
      holidayDuration.type === "financialyear"
        ? "Financial Year"
        : "Calendar Year";
    setValue({ ...value, label: newLabel, value: holidayDuration.type });
  };

  useEffect(() => {
    if (data) {
      const label =
        data.type === "financialyear" ? "Financial Year" : "Calendar Year";
      setHolidayDuration(data);
      const val: Option = { id: data.id, label, value: data.type };
      setValue(val);
    } else {
      const createdHolidayDuration: HolidayDurationDoc = {
        id: "0",
        type: "calendaryear",
        branchId,
        version: 0,
      };
      setHolidayDuration(createdHolidayDuration);

      setValue(options[0]);
    }
  }, [branchId, data]);

  const openMenuItem = () => {
    setOpen(true);
  };

  if (isHolidayDurationLoading || isLoading) {
    return <TMSLoader />;
  }
  return (
    <>
      <Card sx={{}}>
        <List component="div" role="group">
          <ListItemButton
            divider
            aria-haspopup="true"
            aria-controls="holiday-duration-menu"
            aria-label="holiday duration"
            onClick={openMenuItem}
          >
            <ListItemText
              primary="Holiday Duration"
              primaryTypographyProps={{
                sx: {
                  backgroundColor: "#00000029",
                  px: 2,
                  py: 1,
                  borderRadius: "1rem",
                },
              }}
              secondary={
                <MDBox
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  {value.label} <ArrowDropDownOutlinedIcon fontSize="medium" />
                </MDBox>
              }
              secondaryTypographyProps={{
                sx: {
                  px: 2,
                  py: 1,
                },
              }}
            />
          </ListItemButton>
        </List>
        <ConfirmationDialogRaw
          keepMounted
          open={open}
          onValueChange={handleChange}
          value={value}
        />
        {updatedHolidayDuration && (
          <MDBox display={"flex"} justifyContent={"flex-end"} py={2}>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={sendUpdatedHolidayDuration}
            >
              Save Changes
            </MDButton>
            <MDButton
              sx={{ mx: 1 }}
              color="primary"
              onClick={cancelUpdatedHolidayDuration}
            >
              Cancel
            </MDButton>
          </MDBox>
        )}
      </Card>
    </>
  );
};

export default TMSHolidayDurationConfig;
