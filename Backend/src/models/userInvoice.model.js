import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    INV: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    items: {
      type: [invoiceItemSchema],
      required: true,
    },
    subtotal: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      default: "",
    },
    discount: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
    },
    grandTotal: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice