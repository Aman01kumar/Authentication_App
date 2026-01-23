require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./db/index");


// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const fileRoutes = require("./routes/file.routes");
const accountRoutes = require("./routes/account.routes");
const { globalLimiter } = require("./middleware/rateLimit.middleware");

// Middleware
const { errorHandler } = require("./middleware/error.middleware");


const app = express();


// Connect Database
connectDB();

// Global Middleware
app.use(express.json());
app.use(globalLimiter);
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  })
);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/account", accountRoutes);

// Error Handler (ALWAYS LAST)
app.use(errorHandler);




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
