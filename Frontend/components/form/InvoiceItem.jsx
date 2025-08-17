import { TextField, IconButton, Button } from "@mui/material";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const InvoiceItem = ({ items, onChange, projects }) => {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleItemChange = (index, field, value) => {
    const updated = [...localItems];
    updated[index][field] = value;
    // Ensure both are numbers
    const hours = Number(updated[index].hours) || 0;
    const rate = Number(updated[index].rate) || 0;
    updated[index].total = hours * rate;
    setLocalItems(updated);
    onChange(
      updated,
      updated.reduce((acc, curr) => acc + Number(curr.total || 0), 0)
    );
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
    onChange(
      updated,
      updated.reduce((acc, curr) => acc + curr.total, 0)
    );
  };

  return (
    <div className="space-y-2">
      {localItems?.map((item, index) => (
        <div className="grid grid-cols-9 gap-2 items-center" key={index}>
          <div className="flex flex-col gap-2 col-span-2">
            <select
              name="project"
              value={item.project}
              onChange={(e) =>
                handleItemChange(index, "project", e.target.value)
              }
              className="py-2 px-3 rounded-md border   bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white  transition-all"
            >
              <option value="" disabled className="text-gray-400">
                Select Project
              </option>

              {projects?.data.map((p) => (
                <option
                  key={p._id}
                  value={p._id}
                  className="bg-white text-black dark:bg-[#1e1e1e] dark:text-white"
                >
                  {p.projectName}
                </option>
              ))}

              <option disabled>
                ──────────────────────────────────────────────────────────────────────
              </option>

              <option
                value=""
                className="bg-white text-blue-600 dark:bg-[#1e1e1e] dark:text-blue-400 font-semibold"
              >
                + Add New Project
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <input
              type="number"
              name="budget"
              className="  py-2 px-2 border rounded-md"
              placeholder="Hours"
              value={item.hours}
              onChange={(e) =>
                handleItemChange(index, "hours", Number(e.target.value))
              }
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <input
              type="number"
              name="budget"
              className="  py-2 px-2 border rounded-md"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) =>
                handleItemChange(index, "rate", Number(e.target.value))
              }
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <input
              type="number"
              name="budget"
              className=" py-2 px-2 border rounded-md"
              placeholder="Total"
              value={item.total}
              readOnly={true}
            />
          </div>
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
