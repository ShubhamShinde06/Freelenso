import mongoose from "mongoose";
import Client from "../models/userClient.model.js";
import ErrorHandler from "../utils/error.utils.js";

export const userClientPost = async (req, res) => {
  const { clientData } = req.body;
  const {
    user,
    firstName,
    lastName,
    email,
    mobileNo,
    company,
    address,
    country,
    pincode,
  } = clientData;

  if (!user || !firstName || !lastName || !email || !mobileNo) {
    return ErrorHandler(res, "Missing client info", 400);
  }

  try {
    const client = new Client({
      user,
      firstName,
      lastName,
      email,
      mobileNo,
      company,
      address,
      country,
      pincode,
    });

    await client.save();

    global._io.emit("client:created");

    return res.status(200).json({
      success: true,
      message: "New Client Created",
    });
  } catch (error) {
    return ErrorHandler(res, "Client Post Server Down", error.message, 500);
  }
};

export const userClientGet = async (req, res) => {
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
        { firstname: searchRegex },
        { lastname: searchRegex },
        { email: searchRegex },
        { companyName: searchRegex },
      ];
    }

    const totalClients = await Client.countDocuments(query);
    const clients = await Client.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.json({
      success: true,
      data: clients,
      total: totalClients,
      page,
      limit,
    });
  } catch (error) {
    return ErrorHandler(res, "Client Get Server Down", error.message, 500);
  }
};

export const userClientByIdToGet = async (req, res) => {
  const { id } = req.params;

  // Validate ID existence
  if (!id) {
    return ErrorHandler(res, "ID not provided", 400);
  }

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID format", 400);
  }

  try {
    // Find the client by ID
    const client = await Client.findById({ _id: id });

    // Check if client exists
    if (!client) {
      return ErrorHandler(res, "Client not found", 404);
    }

    return res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    return ErrorHandler(res, "Failed to fetch client", error.message, 500);
  }
};

export const userClientPut = async (req, res) => {
  const { id } = req.params;
  const clientData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID", 400);
  }

  try {
    const updatedClient = await Client.findByIdAndUpdate(id, clientData, {
      new: true,
    });

    if (!updatedClient) {
      return ErrorHandler(res, "Client not found", 404);
    }

    global._io.emit("client:updated");

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    return ErrorHandler(res, "Update failed", error.message, 500);
  }
};
