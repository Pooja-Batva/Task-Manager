import express from "express";
import taskRoutes from "./routes/task.route.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: true, // allow all origins (adjust in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;