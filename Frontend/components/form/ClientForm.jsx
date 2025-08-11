// components/ClientForm.jsx
"use client";

import React, { useEffect, useState } from "react";
import { User2 } from "lucide-react";
import { Button } from "@mui/material";
import {
  useClientCreateMutation,
  useClientGetSingleQuery,
  useClientPutMutation,
} from "@/store/api/apiSlice";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../AppToast";
import { initSocket } from "@/lib/socket";

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

const ClientForm = ({ setShowForm, id }) => {
  const User = useSelector((state) => state?.globalState?.User);

  // APIs
  const [clientPost, { isLoading:isLoadingPost, isErrorPost }] =  useClientCreateMutation();
  const [clientPut, { isLoading: isLoadingPut, isErrorPut }] = useClientPutMutation();
  const {
    data: singleClient,
    isLoading,
    isError,
    refetch,
  } = useClientGetSingleQuery(id);

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
  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      company: "",
      address: "",
      country: "",
      pincode: "",
    });
  };

  useEffect(() => {
    if (!id || !singleClient?.data) return;

    const {
      address = "",
      company = "",
      country = "",
      email = "",
      firstName = "",
      invoicesAmt = "",
      lastName = "",
      mobileNo = "",
      pincode = "",
      status = "",
    } = singleClient.data;

    setForm({
      firstName,
      lastName,
      email,
      mobileNo,
      company,
      address,
      country,
      pincode,
    });
  }, [id, singleClient]);

  useEffect(() => {
    const socket = initSocket();

    socket.on("client:updated", () => {
      refetch();
    });

    return () => {
      socket.off("client:updated");
    };
  }, [refetch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    //setShowForm(false);
    id ? window.history.back() : setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      ...form,
      user: User._id,
    };

    try {
      if (id) {
        const res = await clientPut({ clientData, id });
        showSuccessToast({
          heading: "Client Update" || res.data.message,
        });
      } else {
        const res = await clientPost({ clientData });
        showSuccessToast({
          heading: "New Client Created" || res.data.message,
        });
        resetForm();
      }
    } catch (error) {
      console.warn("client post", error);
      showErrorToast({
        heading: error?.data.message || "Something went wrong",
      });
    }
  };

  if (id && isLoading) return <div>Loading...</div>;
  if (id && isError) return <div>Error fetching client</div>;

  return (
    <div className="w-full md:w-[720px] bg-white dark:bg-[#1e1e1e] p-4 lg:p-6 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <User2 className="text-gray-700 dark:text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {id ? "Update Client " : "Create New Client"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {id
                ? "Update in your client list"
                : "Add a new client to your list."}
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-red-600 text-2xl cursor-pointer "
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="firstName"
            className="py-2 px-2 border rounded-md"
            value={form.firstName}
            placeholder="First Name"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="lastName"
            className="py-2 px-2 border rounded-md"
            value={form.lastName}
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="email"
            className="py-2 px-2 border rounded-md"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="mobileNo"
            className="py-2 px-2 border rounded-md"
            value={form.mobileNo}
            placeholder="Phone No."
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="company"
            className="py-2 px-2 border rounded-md"
            value={form.company}
            placeholder="Company Name"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="address"
            className="py-2 px-2 border rounded-md"
            value={form.address}
            placeholder="Address"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="py-2 px-2 border rounded-md"
          >
            <option
              className="bg-white text-black dark:bg-black dark:text-white"
              value=""
            >
              Select Country
            </option>
            {countryList.map((country, index) => (
              <option
                className="bg-white text-black dark:bg-black dark:text-white"
                key={index}
                value={country}
              >
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="pincode"
            className="py-2 px-2 border rounded-md"
            value={form.pincode}
            placeholder="Pincode"
            onChange={handleChange}
          />
        </div>

       

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
  );
};

export default ClientForm;
