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
      <div className="flex flex-col gap-2">
        <input
          type="number"
          name="budget"
          className="  py-2 px-2 border rounded-md"
          placeholder="Tax"
          value={tax}
          onChange={(e) => onChange("tax", Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="number"
          name="budget"
          className="  py-2 px-2 border rounded-md"
          placeholder="Discount"
          value={discount}
          onChange={(e) => onChange("discount", Number(e.target.value))}
        />
      </div>


      <div className="flex flex-col gap-2">
        <input
          type="number"
          name="budget"
          className="  py-2 px-2 border rounded-md"
          placeholder="Discount"
          value={grandTotal}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default InvoiceSummary;
