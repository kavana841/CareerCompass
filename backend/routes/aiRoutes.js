import express from "express";
import { generateObjective } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-objective", generateObjective);

export default router;