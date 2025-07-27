import { TextField, IconButton, Button } from "@mui/material";
import { Plus, X } from "lucide-react";
import { useState } from "react";

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

const InvoiceItem = ({ items, onChange }) => {
  const [localItems, setLocalItems] = useState(items);

  const handleItemChange = (index, field, value) => {
    const updated = [...localItems];
    updated[index][field] = value;
    updated[index].total = updated[index].hours * updated[index].rate;
    setLocalItems(updated);
    onChange(updated, updated.reduce((acc, curr) => acc + curr.total, 0));
  };

  const addItem = () => {
    const newItem = { projectTitle: "", hours: 0, rate: 0, total: 0 };
    const updated = [...localItems, newItem];
    setLocalItems(updated);
    onChange(updated, 0);
  };

  const removeItem = (index) => {
    const updated = localItems.filter((_, i) => i !== index);
    setLocalItems(updated);
    onChange(updated, updated.reduce((acc, curr) => acc + curr.total, 0));
  };

  return (
    <div className="space-y-2">
      {localItems?.map((item, index) => (
        <div className="grid grid-cols-9 gap-2 items-center" key={index}>
          <TextField
            label="Project Title"
            size="small"
            value={item.projectTitle}
            onChange={(e) => handleItemChange(index, "projectTitle", e.target.value)}
            sx={textFieldStyle}
            className=" col-span-2"
            fullWidth
          />
          <TextField
            label="Hours"
            size="small"
            type="number"
            value={item.hours}
            onChange={(e) => handleItemChange(index, "hours", Number(e.target.value))}
            sx={textFieldStyle}
            className=" col-span-2"
          />
          <TextField
            label="Rate"
            size="small"
            type="number"
            value={item.rate}
            onChange={(e) => handleItemChange(index, "rate", Number(e.target.value))}
            sx={textFieldStyle}
            className=" col-span-2"
          />
          <TextField
            label="Total"
            size="small"
            value={item.total}
            sx={textFieldStyle}
            className=" col-span-2"
          />
          <IconButton onClick={() => removeItem(index)}>
            <X className="text-red-500 col-span-1" />
          </IconButton>
        </div>
      ))}
      <Button startIcon={<Plus />} onClick={addItem}>
        Add Item
      </Button>
    </div>
  );
};

export default InvoiceItem;
