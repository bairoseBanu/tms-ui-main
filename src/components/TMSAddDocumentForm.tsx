import {
  CardHeader,
  IconButton,
  CardActions,
  TextField,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Autocomplete from "@mui/material/Autocomplete";

export const TMSAddDocumentForm = () => {
  const name = ["adnan", "imran", "asim"];
  return (
    <div>
      <Box
        sx={{
          height: 330,
          width: 450,
          background: "white",
          margin: "auto",
          marginTop: 17,
          borderRadius: 3,
          padding: 1,
        }}
      >
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              sx={{ marginRight: -2.5, marginTop: -6 }}
            >
              <CancelOutlinedIcon fontSize="small" />
            </IconButton>
          }
          title="Add Documents"
          subheader=""
          sx={{ textAlign: "left", marginLeft: -2 }}
        />

        <TextField
          id="outlined-password-input"
          label="Document name"
          type="password"
          autoComplete="current-password"
          size="small"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={name}
          size="small"
          fullWidth
          sx={{ marginBottom: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Employe name" />
          )}
        />
        <TextField
          size="small"
          label="upload document"
          fullWidth
          sx={{ marginBottom: 1 }}
        ></TextField>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Employe can see"
          sx={{ marginBottom: 1 }}
        />
        <CardActions sx={{ marginLeft: -1, font: "white" }}>
          <Button variant="contained" size="small">
            Add document
          </Button>
        </CardActions>
      </Box>
    </div>
  );
};
