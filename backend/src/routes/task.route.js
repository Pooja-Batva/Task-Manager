import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.route("/").post(createTask).get(getAllTasks);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;