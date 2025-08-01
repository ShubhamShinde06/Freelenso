"use client";

import React, { useState } from "react";
import { User2, Send } from "lucide-react";
import { Button } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MenuItem, TextField } from "@mui/material";
import AppInputField from "../AppInputField";

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

const countryList = [
  "Afghanistan",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hong Kong",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "UAE",
  "UK",
  "USA",
  "Vietnam",
  "Zimbabwe",
];

const ClientForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    company: "",
    address: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Submitted data:", form);
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="w-full md:w-[720px] mx-auto bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex  items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <User2 className="text-gray-700 dark:text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Client
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create client to your clients list.
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
      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1  gap-6">
          <AppInputField
            id="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
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

export default ClientForm;
