import { Checkbox, FormControlLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import MDTypography from "./MDTypography";

function TimeSheetForm({ onSubmitForm }: any) {
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [fromTimeTwo, setFromTimeTwo] = useState(null);
  const [toTimeTwo, setToTimeTwo] = useState(null);

  const [workDay, setWorkDay] = useState("dd-mm-yyyy");

  const [reason, setReason] = useState("......");
  const [isTimeSplit, setIsTimeSplit] = useState(false);
  const handleSubmit = (e: any) => {
    console.log({ e });
    onSubmitForm({ fromTime, toTime, workDay, reason, isTimeSplit });
  };

  const handleFromTime = (event: any) => setFromTime(event.target.value);
  const handleToTime = (event: any) => setToTime(event.target.value);

  const handleFromTimeTwo = (event: any) => setFromTimeTwo(event.target.value);
  const handleToTimeTwo = (event: any) => setToTimeTwo(event.target.value);
  const handleWorkDay = (event: any) => setWorkDay(event.target.value);

  const handleReason = (event: any) => setReason(event.target.value);
  const handleIsTimeSplit = (event: any) => {
    setIsTimeSplit(event.target.checked);
  };

  return (
    <MDBox>
      <MDBox mb={3} mt={-1.5}>
        <h3>
          <center>Time Sheet Form</center>
        </h3>
      </MDBox>

      <MDBox mb={3} display="flex" justifyContent="space-between">
        <MDInput
          type="time"
          label="From"
          value={fromTime}
          onChange={handleFromTime}
          required
          variant="standard"
          sx={{ width: "45%" }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <MDInput
          type="time"
          label="To"
          value={toTime}
          onChange={handleToTime}
          required
          variant="standard"
          sx={{ width: "45%" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </MDBox>

      {isTimeSplit && (
        <MDBox mb={3} display="flex" justifyContent="space-between">
          <MDInput
            type="time"
            label="From"
            value={fromTimeTwo}
            onChange={handleFromTimeTwo}
            required
            variant="standard"
            sx={{ width: "45%" }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <MDInput
            type="time"
            label="To"
            value={toTimeTwo}
            onChange={handleToTimeTwo}
            required
            variant="standard"
            sx={{ width: "45%" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </MDBox>
      )}

      <MDBox mt={3} mb={3}>
        <FormControl fullWidth>
          <MDInput
            label="Date"
            type="date"
            required
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleWorkDay}
          />
        </FormControl>
      </MDBox>

      <MDBox mb={3}>
        <FormControl fullWidth>
          <MDInput
            label="Reason"
            // placeholder="Reason"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleReason}
          />
        </FormControl>
      </MDBox>
      <MDBox
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <MDBox>
          <FormControlLabel
            sx={{ ml: 0 }}
            control={
              <Checkbox
                checked={isTimeSplit}
                onChange={handleIsTimeSplit}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              <MDTypography
                variant="subtitle"
                fontWeight="regular"
                color="secondary"
              >
                Split Time
              </MDTypography>
            }
          />
        </MDBox>

        <MDButton
          mt={3}
          variant="gradient"
          color="info"
          size="medium"
          onClick={handleSubmit}
        >
          Submit
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default TimeSheetForm;
