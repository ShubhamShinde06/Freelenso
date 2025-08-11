import mongoose from "mongoose";
import Invoice from "../models/userInvoice.model.js";
import ErrorHandler from "../utils/error.utils.js";

const generateInvoiceNumber = () => {
  const date = new Date();
  const datePart = `${date.getFullYear().toString().slice(-2)}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`; // e.g. 250806
  const randomPart = Math.floor(1000 + Math.random() * 9000); // e.g. 1956
  return `INV-${datePart}-${randomPart}`;
};

export const userInvoicePost = async (req, res) => {
  const { invoiceData } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(invoiceData.user) ||
    !mongoose.Types.ObjectId.isValid(invoiceData.client)
  ) {
    return ErrorHandler(res, "Invalid ID", 400);
  }

  try {
    // Generate invoice number before saving
    const invoiceNumber = generateInvoiceNumber();
    invoiceData.INV = invoiceNumber;

    const invoice = new Invoice(invoiceData);
    await invoice.save();

    global._io.emit("invoice:created");

    return res.status(200).json({
      success: true,
      message: "New Invoice Created",
      invoiceNumber,
    });
  } catch (error) {
    return ErrorHandler(res, "Post failed", error.message, 500);
  }
};

export const userInvoiceGet = async (req, res) => {
  const { searchTerm = "", page = 1, limit = 20, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return ErrorHandler(res, "Invalid user ID", 400);
  }

  try {
    const skip = (page - 1) * limit;

    const query = { user: userId };

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      query.$or = [
        { grandTotal: searchRegex },
        { client: searchRegex },
        { dueDate: searchRegex },
        { INV: searchRegex },
      ];
    }

    const totalInvoice = await Invoice.countDocuments(query);
    const Invoices = await Invoice.find(query)
      .populate("client", "firstName lastName _id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.json({
      success: true,
      data: Invoices,
      total: totalInvoice,
      page,
      limit,
    });
  } catch (error) {
    return ErrorHandler(res, "Client Get Server Down", error.message, 500);
  }
};

export const userInvoiceByIdToGet = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return ErrorHandler(res, "ID not provided", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID format", 400);
  }

  try {
    const invoice = await Invoice.findById({ _id: id });

    if (!invoice) {
      return ErrorHandler(res, "invoice not found", 404);
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return ErrorHandler(res, "Failed to fetch invoice", error.message, 500);
  }
};

export const userInvoicePut = async (req, res) => {
  const { id } = req.params;
  const { invoiceData } = req.body;
  console.log(invoiceData);

  if (!id) {
    return ErrorHandler(res, { error: "ID not provided" }, 401);
  }
  if (!invoiceData || typeof invoiceData !== "object") {
    console.log("invoiceData missing or not object:", invoiceData);
    return ErrorHandler(res, { error: "Invalid invoice data" }, 402);
  }
  if (
    !mongoose.Types.ObjectId.isValid(invoiceData.user) ||
    !mongoose.Types.ObjectId.isValid(invoiceData.client)
  ) {
    console.log(
      "Invalid user/client ID:",
      invoiceData.user,
      invoiceData.client
    );
    return ErrorHandler(res, { error: "Invalid user or client ID" }, 403);
  }
  if (!Array.isArray(invoiceData.items) || invoiceData.items.length === 0) {
    console.log("Items missing or not array:", invoiceData.items);
    return ErrorHandler(
      res,
      { error: "Invoice must have at least one item" },
      406
    );
  }

  if (!invoiceData.INV) {
    invoiceData.INV = generateInvoiceNumber(); // Generate invoice number if not provided
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID", 404);
  }

  try {
    const invoice = await Invoice.findByIdAndUpdate(id, invoiceData, {
      new: true,
    });
    if (!invoice) {
      return ErrorHandler(res, "Invoice not found", 405);
    }

    global._io.emit("invoice:updated");

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
    });
  } catch (error) {
    return ErrorHandler(res, "Update failed", error.message, 500);
  }
};

export const userFullInvoiceByIdToGet = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return ErrorHandler(res, "ID not provided", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID format", 400);
  }

  try {
    const invoice = await Invoice.findById({ _id: id }).select("-__v")
      .populate("user")
      .populate("client");

    if (!invoice) {
      return ErrorHandler(res, "invoice not found", 404);
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return ErrorHandler(res, "Failed to fetch full invoice", error.message, 500);
  }
};
