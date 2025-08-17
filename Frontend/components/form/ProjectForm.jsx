"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { File } from "lucide-react";
import {
  useClientsGetQuery,
  useProjectCreateMutation,
  useProjectGetSingleQuery,
  useProjectPutMutation,
} from "@/store/api/apiSlice";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../AppToast";
import { initSocket } from "@/lib/socket";

const CreateProjectForm = ({ setShowForm, id }) => {
  const User = useSelector((state) => state?.globalState?.User);
  const userId = User?._id;

  //APIs
  const { data: clients } = useClientsGetQuery(userId, { skip: !userId });
  const {
    data: singleProject,
    isLoading,
    isError,
    refetch,
  } = useProjectGetSingleQuery(id, { skip: !id });
  const [projectPost, { isLoadingPost }] = useProjectCreateMutation();
  const [projectPut, { isLoadingPut }] = useProjectPutMutation();

  const [form, setForm] = useState({
    projectName: "",
    projectDesc: "",
    client: "",
    startDate: "",
    endDate: "",
    budget: "",
    projectStatus: "",
  });
  const resetForm = () => {
    setForm({
      projectName: "",
      projectDesc: "",
      client: "",
      startDate: "",
      endDate: "",
      budget: "",
      projectStatus: "",
    });
  };

  useEffect(() => {
    if (!id || !singleProject?.data) return;

    const {
      projectName = "",
      projectDesc = "",
      client = "",
      startDate = "",
      endDate = "",
      budget = "",
      projectStatus = "",
    } = singleProject.data;

    const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

    setForm({
      projectName,
      projectDesc,
      client,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      budget,
      projectStatus,
    });
  }, [id, singleProject]);

  useEffect(() => {
    const socket = initSocket();

    socket.on("project:updated", () => {
      refetch();
    });

    return () => {
      socket.off("project:updated");
    };
  }, [refetch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    id ? window.history.back() : setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: "client", label: "client" },
      { key: "projectName", label: "Project" },
      { key: "budget", label: "Budget" },
    ];

    for (let field of requiredFields) {
      if (!form[field.key]) {
        showErrorToast({
          heading: "Missing Field",
          message: `${field.label} must be provided before saving.`,
        });
        return;
      }
    }

    const projectData = {
      ...form,
      user: userId,
    };

    try {
      if (id) {
        const res = await projectPut({ projectData, id });
        showSuccessToast({
          heading: "Project Updated" || res.data.message,
        });
      } else {
        const res = await projectPost({ projectData });

        showSuccessToast({
          heading: "New Project Created" || res.data.message,
        });
        resetForm();
      }
    } catch (error) {
      console.warn("Project", error);
      showErrorToast({
        heading: error?.message || "Something went wrong",
      });
    }
  };

  if (id && isLoading) return <div>Loading...</div>;
  if (id && isError) return <div>Error fetching project</div>;

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

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="projectName"
              className="py-2 px-2 border rounded-md"
              value={form.projectName}
              placeholder="Project Name"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="projectDesc"
              className="py-2 px-2 border rounded-md"
              value={form.projectDesc}
              placeholder="Project Description"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <select
              name="client"
              value={form.client}
              onChange={handleChange}
              className="py-2 px-3 rounded-md border   bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white  transition-all"
            >
              <option value="" disabled className="text-gray-400">
                Select Client
              </option>

              {clients?.data.map((c) => (
                <option
                  key={c._id}
                  value={c._id}
                  className="bg-white text-black dark:bg-[#1e1e1e] dark:text-white"
                >
                  {c.firstName + " " + c.lastName}
                </option>
              ))}

              <option disabled>──────────────</option>

              <option
                value=""
                className="bg-white text-blue-600 dark:bg-[#1e1e1e] dark:text-blue-400 font-semibold"
              >
                + Add New Client
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="date"
              name="startDate"
              className="py-2 px-2 border rounded-md"
              value={form.startDate}
              placeholder="Start Date"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="date"
              name="endDate"
              className="py-2 px-2 border rounded-md"
              value={form.endDate}
              placeholder="End Date"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="budget"
              className="py-2 px-2 border rounded-md"
              value={form.budget}
              placeholder="Budget"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <select
              name="projectStatus"
              value={form.projectStatus}
              onChange={handleChange}
              className="py-2 px-2 border rounded-md"
            >
              <option
                className="bg-white text-black dark:bg-black dark:text-white "
                value=""
              >
                Select Status
              </option>
              <option
                className="bg-white text-black dark:bg-black dark:text-white"
                value="Pending"
              >
                Pending
              </option>
              <option
                className="bg-white text-black dark:bg-black dark:text-white"
                value="In Progress"
              >
                In Progress
              </option>
              <option
                className="bg-white text-black dark:bg-black dark:text-white"
                value="Completed"
              >
                Completed
              </option>
              <option
                className="bg-white text-black dark:bg-black dark:text-white"
                value="Cancelled"
              >
                Cancelled
              </option>
            </select>
          </div>

          {/* Buttons */}
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
                height: "40px",
              }}
            >
              {isLoadingPost || isLoadingPut ? "Loading..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
