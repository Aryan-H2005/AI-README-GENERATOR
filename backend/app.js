import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import readmeRoutes from "./routes/readmeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/readme", readmeRoutes);

export default app;
