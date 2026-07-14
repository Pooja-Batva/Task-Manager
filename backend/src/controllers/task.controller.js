import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createTask = asyncHandler(async(req, res) => {
    const { title, description, status, dueDate, priority } = req.body;

    if(title.trim() === ""){
        throw new ApiError(400, "Title is required");
    }

    const existingTask = await Task.findOne({ title });
    if(existingTask){
        throw new ApiError(400, "Task with this title already exists");
    }

    if(status && !["todo", "in-progress", "done"].includes(status)){
        throw new ApiError(400, "Invalid status value");
    }

    if(priority && !["low", "medium", "high"].includes(priority)){
        throw new ApiError(400, "Invalid priority value");
    }

    if(dueDate && isNaN(Date.parse(dueDate))) {
        throw new ApiError(400, "Invalid due date format");
    }

    if(dueDate && new Date(dueDate) < new Date()) {
        throw new ApiError(400, "Due date cannot be in the past");
    }
    
    const task = await Task.create({
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority
    });

    res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    );

});

export const getAllTasks = asyncHandler(async(req, res) => {
    const { status, priority, dueDate } = req.query;
    const filter = {};

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    if (dueDate) {
        filter.dueDate = { $eq: new Date(dueDate) };
    }

    const tasks = await Task.find(filter);
    res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

export const getTaskById = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    res.status(200).json(new ApiResponse(200, task, "Task fetched successfully"));
});

export const updateTask = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate, priority } = req.body;

    const task = await Task.findById(id);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (title && title.trim() === "") {
        throw new ApiError(400, "Title is required");
    }

    if (status && !["todo", "in-progress", "done"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
        throw new ApiError(400, "Invalid priority value");
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        throw new ApiError(400, "Invalid due date format");
    }

    if (dueDate && new Date(dueDate) < new Date()) {
        throw new ApiError(400, "Due date cannot be in the past");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
            title: title || task.title,
            description: description || task.description,
            status: status || task.status,
            dueDate: dueDate ? new Date(dueDate) : task.dueDate,
            priority: priority || task.priority
        },
        { new: true }
    );

    res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
});
