"use client";

import { Button, TextField } from "@mui/material";
import { ReceiptText, Send } from "lucide-react";
import React, { useState } from "react";

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

const handleClose = () => {
  window.history.back();
};

const InvoiceForm = () => {
  const [form, setForm] = useState({
    client: "",
    startDate: "",
    endDate: "",
    dueDate: "",
    items: [
      {
        projectTitle: "",
        hours: 0,
        rate: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    tax: 0,
    discount: 0,
    grandTotal: 0,
    notes: "",
  });

  return (
    <div className="w-full md:w-[720px] mx-auto bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex  items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <ReceiptText className="text-gray-700 dark:text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Invoice
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create Invoice For Your Clinet.
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-red-600 text-xl"
        >
          &times;
        </button>
      </div>

      {/* Form */}
      <form className="space-y-8">
        <div className="grid grid-cols-1  gap-6">
          <TextField
            select
            name="client"
            label="client"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.country}
            // onChange={handleChange}
          >
            {/* {countryList.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))} */}
          </TextField>

          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />

          <TextField
            label="Start Date"
            type="date"
            size="small"
            sx={{
              ...textFieldStyle,
              "& label": { color: "gray" },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            type="date"
            size="small"
            sx={{
              ...textFieldStyle,
              "& label": { color: "gray" },
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            // value={form.firstName}
            // onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex  gap-4">
          <Button
            variant="outlined"
            sx={{
              borderColor: "#444",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": {
                borderColor: "#888",
                backgroundColor: "#2a2a2a",
              },
              width: "50%",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3b82f6",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
              width: "50%",
            }}
            endIcon={<Send />}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
