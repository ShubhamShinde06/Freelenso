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
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";

const countryList = [
  "Afghanistan", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium",
  "Brazil", "Canada", "China", "Denmark", "Egypt", "Finland", "France",
  "Germany", "Greece", "Hong Kong", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Nepal",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines",
  "Poland", "Portugal", "Russia", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand",
  "Turkey", "UAE", "UK", "USA", "Vietnam", "Zimbabwe",
];

const ClientForm = ({ setShowForm, id }) => {
  const User = useSelector((state) => state?.globalState?.User);

  // API hooks
  const [clientPost, { isLoading: isLoadingPost }] = useClientCreateMutation();
  const [clientPut, { isLoading: isLoadingPut }] = useClientPutMutation();
  const { data: singleClient, isLoading, isError, refetch } =
    useClientGetSingleQuery(id, { skip: !id });

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

  // Prefill form when editing
  useEffect(() => {
    if (!id || !singleClient?.data) return;

    const data = singleClient.data;

    setForm({
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      mobileNo: data.mobileNo
        ? data.mobileNo.startsWith("+")
          ? data.mobileNo
          : `+91${data.mobileNo}`
        : "",
      company: data.company ?? "",
      address: data.address ?? "",
      country: data.country ?? "",
      pincode: data.pincode ?? "",
    });
  }, [id, singleClient]);
  console.log(singleClient?.data, "singleClient")
  console.log(form)

  // Live update on socket events
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
    id ? window.history.back() : setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "email", label: "Email" },
      { key: "mobileNo", label: "Phone No" },
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

    const clientData = {
      ...form,
      user: User._id,
    };

    try {
      if (id) {
        const res = await clientPut({ clientData, id });
        showSuccessToast({
          heading: res?.data?.message || "Client Updated",
        });
      } else {
        const res = await clientPost({ clientData });
        showSuccessToast({
          heading: res?.data?.message || "New Client Created",
        });
        resetForm();
      }
    } catch (error) {
      showErrorToast({
        heading: error?.data?.message || "Something went wrong",
      });
    }
  };

  if (id && isLoading) return <div>Loading...</div>;
  if (id && isError) return <div>Error fetching client</div>;

  return (
    <div className="w-full md:w-[720px] bg-white dark:bg-[#1e1e1e] p-4 lg:p-6 rounded-2xl shadow-xl">
      {/* Header */}
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
                ? "Update your client information"
                : "Add a new client to your list."}
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-red-600 text-2xl cursor-pointer"
        >
          &times;
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          className="py-2 px-2 border rounded-md w-full"
          value={form.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          className="py-2 px-2 border rounded-md w-full"
          value={form.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className="py-2 px-2 border rounded-md w-full"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <PhoneInput
          defaultCountry="in"
          value={form.mobileNo}
          onChange={(phone) => setForm({ ...form, mobileNo: phone })}
          inputClassName="!w-full !py-2 !px-3 !border  dark:!border-[#343535] !rounded-none !bg-transparent !text-gray-900 dark:!text-white !text-sm"
          className="w-full"
          placeholder="Phone No."
        />

        <input
          type="text"
          name="company"
          className="py-2 px-2 border rounded-md w-full"
          value={form.company}
          placeholder="Company Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          className="py-2 px-2 border rounded-md w-full"
          value={form.address}
          placeholder="Address"
          onChange={handleChange}
        />

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="py-2 px-2 border rounded-md w-full"
        >
          <option value="">Select Country</option>
          {countryList.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="pincode"
          className="py-2 px-2 border rounded-md w-full"
          value={form.pincode}
          placeholder="Pincode"
          onChange={handleChange}
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
