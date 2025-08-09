import mongoose from "mongoose";
import Project from "../models/userProject.model.js";
import ErrorHandler from "../utils/error.utils.js";

export const userProjectPost = async (req, res) => {
  const { projectData } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(projectData.user) ||
    !mongoose.Types.ObjectId.isValid(projectData.client)
  ) {
    return ErrorHandler(res, "Invalid ID", 400);
  }

  try {
    const project = new Project(projectData);
    await project.save();

    global._io.emit("project:created");

    return res.status(200).json({
      success: true,
      message: "New Project Created",
    });
  } catch (error) {
    return ErrorHandler(res, "Post failed", error.message, 500);
  }
};

export const userProjectGet = async (req, res) => {
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
        { projectName: searchRegex },
        { client: searchRegex },
        { budget: searchRegex },
        { projectStatus: searchRegex },
      ];
    }

    const totalProjects = await Project.countDocuments(query);
    const Projects = await Project.find(query)
      .populate("client", "firstName lastName _id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.json({
      success: true,
      data: Projects,
      total: totalProjects,
      page,
      limit,
    });
  } catch (error) {
    return ErrorHandler(res, "Client Get Server Down", error.message, 500);
  }
};

export const userProjectByIdToGet = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return ErrorHandler(res, "ID not provided", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID format", 400);
  }

  try {
    const project = await Project.findById({ _id: id });

    if (!project) {
      return ErrorHandler(res, "Project not found", 404);
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return ErrorHandler(res, "Failed to fetch client", error.message, 500);
  }
};

export const userProjectPut = async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ErrorHandler(res, "Invalid ID", 400);
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
    });

    if (!updatedProject) {
      return ErrorHandler(res, "Project not found", 404);
    }

    global._io.emit("project:updated");

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    return ErrorHandler(res, "Update failed", error.message, 500);
  }
};

export const userProjects = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return ErrorHandler(res, "Client ID not provided", 404);
  }

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    return ErrorHandler(res, "Invalid User ID", 400);
  }

  try {
    const projects = await Project.find({ client: clientId })

    if (!projects || projects.length === 0) {
      return ErrorHandler(res, "No projects found", 404);
    }

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return ErrorHandler(res, "Get projects failed", error.message, 500);
  }
};
