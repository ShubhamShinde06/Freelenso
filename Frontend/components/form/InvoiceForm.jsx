"use client";

import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { ReceiptText, Send } from "lucide-react";
import InvoiceItem from "./InvoiceItem";
import InvoiceSummary from "./InvoiceSummary";
import InvoiceNotes from "./InvoiceNotes";
import { useSelector } from "react-redux";
import {
  useClientsGetQuery,
  useInvoiceCreateMutation,
  useInvoiceGetSingleQuery,
  useInvoicePutMutation,
  useProjectsGetQuery,
} from "@/store/api/apiSlice";
import { showErrorToast, showSuccessToast } from "../AppToast";
import { useRouter } from "next/navigation";

const InvoiceForm = ({ id, setShowForm }) => {
  const today = new Date().toISOString().split("T")[0];
  const User = useSelector((state) => state?.globalState?.User);
  const userId = User?._id;
  const router = useRouter();

  const [form, setForm] = useState({
    client: "",
    dueDate: today,
    items: [
      {
        project: "",
        hours: "",
        rate: "",
        total: 0,
      },
    ],
    subtotal: "",
    tax: "",
    discount: "",
    grandTotal: 0,
    notes: "Thank you for choosing us!",
    status: "",
  });
  const resetForm = () => {
    setForm({
      client: "",
      dueDate: today,
      items: [
        {
          project: "",
          hours: "",
          rate: "",
          total: 0,
        },
      ],
      subtotal: "",
      tax: "",
      discount: "",
      grandTotal: 0,
      notes: "",
      status: "",
    });
  };

  const clientId = form.client;

  //APIs
  const { data: clients } = useClientsGetQuery(userId, { skip: !userId });
  const { data: projects } = useProjectsGetQuery(clientId, { skip: !clientId });
  const { data: singleData, refetch } = useInvoiceGetSingleQuery(id, {
    skip: !id,
  });
  const [invoicePost, { isLoading: isLoadingPost }] =
    useInvoiceCreateMutation();
  const [invoicePut, { isLoading: isLoadingPut }] = useInvoicePutMutation();

  useEffect(() => {
    if (!id || !singleData?.data) return;

    const {
      client = "",
      dueDate = "",
      items = [],
      subtotal = "",
      tax = "",
      discount = "",
      grandTotal = 0,
      notes = "",
      status = "",
    } = singleData.data;

    const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

    setForm({
      client,
      dueDate: formatDate(dueDate),
      items: Array.isArray(items)
        ? items.map((item) => ({
            project: item.project || "",
            hours: item.hours || "",
            rate: item.rate || "",
            total: item.total || 0,
          }))
        : [],
      subtotal,
      tax,
      discount,
      grandTotal,
      notes,
      status,
    });
  }, [id, singleData]);

  useEffect(() => {
    if (id) return; // skip this effect in edit mode

    if (clients?.length > 0) {
      setForm((prev) => ({
        ...prev,
        client: clients[0]._id,
      }));
    }

    if (projects?.length > 0) {
      setForm((prev) => ({
        ...prev,
        items: [
          {
            project: projects[0]._id,
            hours: "",
            rate: "",
            total: 0,
          },
        ],
      }));
    }
  }, [clients, projects, id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!form.client) {
      showErrorToast({
        heading: "Missing Field",
        message: `Client must be provided before saving.`,
      });
    }

    if (form.items.some((item) => !item.project)) {
      showErrorToast({
        heading: "Missing Field",
        message: `Each project item must have a project selected.`,
      });
    }

    // Clean up items: remove incomplete, convert to numbers
    const cleanedItems = form.items
      .filter((item) => item.project && item.hours && item.rate)
      .map((item) => ({
        ...item,
        hours: Number(item.hours),
        rate: Number(item.rate),
        total: Number(item.total),
      }));

    const invoiceData = {
      ...form,
      items: cleanedItems,
      user: userId,
    };

    try {
      if (id) {
        const res = await invoicePut({ invoiceData, id });
        await refetch();
        showSuccessToast({
          heading: "Invoice Updated" || res.data.message,
        });
        console.log(invoiceData);
      } else {
        const res = await invoicePost({ invoiceData });
        showSuccessToast({
          heading: "New Invoice Created" || res.data.message,
        });
        resetForm();
      }
    } catch (error) {
      console.warn("Invoice", error);
      showErrorToast({
        heading: error?.message || "Something went wrong",
      });
    }
  };

  const handleClose = () => {
    id ? window.history.back() : setShowForm(false);
  };

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
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-6">
          {/* Client Select */}
          <div className="flex flex-col gap-2">
            <select
              name="client"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
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

              <option disabled>
                ──────────────────────────────────────────────────────────────────────
              </option>

              <option
                value=""
                className="bg-white text-blue-600 dark:bg-[#1e1e1e] dark:text-blue-400 font-semibold"
              >
                + Add New Client
              </option>
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-2">
            <input
              type="date"
              name="startDate"
              className="py-2 px-2 border rounded-md"
              value={form.dueDate}
              placeholder="Start Date"
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
        </div>

        {/* Invoice Items */}
        <InvoiceItem
          items={form.items}
          projects={projects}
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

        <div>
          <select
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="py-2 px-3 rounded-md border   bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white  transition-all"
          >
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
        </div>

        <div>
          <textarea
            type="text"
            className="py-2 px-2 border rounded-md w-full"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
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

          {id && (
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
              onClick={() => router.push(`/invoice-print-send/${id}`)}
            >
              Print
            </Button>
          )}

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

export default InvoiceForm;
