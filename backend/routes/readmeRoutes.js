import express from "express";

import {
  generateReadme,
  getHistory,
  deleteReadme,
} from "../controllers/readmeController.js";

import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/generate", validateRequest, generateReadme);

router.get("/history", getHistory);

router.delete("/:id", deleteReadme);

export default router;
