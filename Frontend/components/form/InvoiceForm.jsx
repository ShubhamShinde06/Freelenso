"use client";

import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { ReceiptText, Send } from "lucide-react";
import InvoiceItem from "./InvoiceItem";
import InvoiceSummary from "./InvoiceSummary";
import InvoiceNotes from "./InvoiceNotes";

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

const today = new Date().toISOString().split("T")[0];

const InvoiceForm = () => {
  const [form, setForm] = useState({
    client: "",
    dueDate: today,
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

  const demoClients = [
    { id: 1, name: "Shubham Singh" },
    { id: 2, name: "Billy Butcher" },
    { id: 3, name: "Tony Stark" },
  ];

  return (
    <div className="w-full md:w-[720px] mx-auto bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <ReceiptText className="text-gray-700 dark:text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Invoice
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create Invoice For Your Client.
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
        <div className="grid grid-cols-1 gap-6">
          {/* Client Select */}
          <TextField
            select
            name="client"
            label="Select Client"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
          >
            {demoClients.map((client) => (
              <MenuItem key={client.id} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Due Date */}
          <TextField
            label="Due Date"
            type="date"
            size="small"
            sx={textFieldStyle}
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={form.endDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        {/* Invoice Items */}
        <InvoiceItem
          items={form.items}
          onChange={(updatedItems, subtotal) => {
            const grandTotal =
              subtotal + Number(form.tax) - Number(form.discount);
            setForm((prev) => ({
              ...prev,
              items: updatedItems,
              subtotal,
              grandTotal,
            }));
          }}
        />

        {/* Totals Section */}
        <InvoiceSummary
          tax={form.tax}
          discount={form.discount}
          grandTotal={form.grandTotal}
          onChange={(field, value) => {
            const updated = { ...form, [field]: value };
            const grandTotal =
              updated.subtotal + Number(updated.tax) - Number(updated.discount);
            setForm({ ...updated, grandTotal });
          }}
        />

        <InvoiceNotes
          value={form.notes}
          onChange={(val) => handleChange("notes", val)}
        />

        {/* Actions */}
        <div className="flex gap-4">
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
              width: "30%",
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
              width: "70%",
                height: '40px'
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
