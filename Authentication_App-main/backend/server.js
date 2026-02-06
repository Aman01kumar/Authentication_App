require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/index");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const fileRoutes = require("./routes/file.routes");
const accountRoutes = require("./routes/account.routes");
const { globalLimiter } = require("./middleware/rateLimit.middleware");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


app.use(globalLimiter);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/account", accountRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
