import express from "express";
import router from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api", router);

// Error handler (must be last)
app.use(errorHandler);

export default app;
