
import { TextField } from "@mui/material";

const textFieldStyle = {
  input: { color: "white" },
  label: { color: "gray" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#444" },
    "&:hover fieldset": { borderColor: "#888" },
    "&.Mui-focused fieldset": { borderColor: "#999" },
  },
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "#1e1e1e",
  },
};

const InvoiceNotes = ({ value, onChange }) => (
  <div>
    <label className="text-white block mb-1">Additional Notes</label>
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={textFieldStyle} className="w-full " />
  </div>
);

export default InvoiceNotes;
