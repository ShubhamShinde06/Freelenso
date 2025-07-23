"use client";

import React from "react";
import { Button, TextField } from "@mui/material";
import { File, Send } from "lucide-react";

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

const CreateProjectForm = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full  flex items-center justify-center p-4 ">
      <div className="w-full md:w-[760px]  bg-[#1e1e1e] rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
        {/* Header */}
        {/* Header */}
        <div className="flex  items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <File className="text-gray-700 dark:text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Project
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create Project to your projects list.
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

        {/* Project Title */}
        <div className="grid grid-cols-1">
          <TextField
            label="Project Title"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
          />
        </div>

        {/* Description */}
        <div className="grid grid-cols-1">
          <TextField
            label="Project Description"
            variant="outlined"
            size="small"
            multiline
            minRows={3}
            sx={textFieldStyle}
            fullWidth
          />
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <TextField
            label="Select Client"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
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

        {/* Budget + Status */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <TextField
            label="Budget (₹)"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
          />
          <TextField
            label="Project Status"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            fullWidth
          />
        </div>

        {/* Buttons */}

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
      </div>
    </div>
  );
};

export default CreateProjectForm;
