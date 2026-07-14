import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low"
        },
        dueDate: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model("Task", taskSchema);