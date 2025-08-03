import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Adjust based on your actual user model name
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
    projects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", 
    },
    invoicesAmt: {
      type: String,
      default: "0"
    },
    status:{
      type: Boolean,
      default: 1
    }
  },
  { timestamps: true }
);

clientSchema.pre("save", function (next) {
  this.firstName = this.firstName?.replace(/\s+/g, " ").trim();
  this.lastName = this.lastName?.replace(/\s+/g, " ").trim();
  this.email = this.email?.trim().toLowerCase();
  this.mobileNo = this.mobileNo?.replace(/\s+/g, "").trim();
  this.company = this.company?.replace(/\s+/g, " ").trim();
  this.address = this.address?.replace(/\s+/g, " ").trim();
  this.country = this.country?.replace(/\s+/g, " ").trim();
  this.pincode = this.pincode?.replace(/\s+/g, "").trim();
  next();
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
