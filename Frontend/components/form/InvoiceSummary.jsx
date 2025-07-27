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

const InvoiceSummary = ({ tax, discount, grandTotal, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TextField
        label="Tax"
        type="number"
        size="small"
        value={tax}
        onChange={(e) => onChange("tax", Number(e.target.value))}
        sx={textFieldStyle}
      />
      <TextField
        label="Discount"
        type="number"
        size="small"
        value={discount}
        onChange={(e) => onChange("discount", Number(e.target.value))}
        sx={textFieldStyle}
      />
      <TextField
        label="Grand Total"
        type="number"
        size="small"
        value={grandTotal}
        
        sx={textFieldStyle}
      />
    </div>
  );
};

export default InvoiceSummary;
