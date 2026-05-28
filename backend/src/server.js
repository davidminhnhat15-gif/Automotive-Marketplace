import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import carsRoutes from "./routes/carsRoutes.js";
import savedCarsRoutes from "./routes/savedCarsRoutes.js";
import savedSearchesRoutes from "./routes/savedSearchesRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Veloce API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/saved-cars", savedCarsRoutes);
app.use("/api/saved-searches", savedSearchesRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
