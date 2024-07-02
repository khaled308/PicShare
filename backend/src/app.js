import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./utils/constants.js";
import imageRoutes from "./routes/image.routes.js";
import DBConnection from "./utils/db.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/image", imageRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  DBConnection();
});
