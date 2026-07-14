import express from "express";
import taskRoutes from "./routes/task.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);


export default app;