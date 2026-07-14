import express from "express";
import taskRoutes from "./routes/task.route.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;