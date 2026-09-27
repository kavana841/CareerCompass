import express from "express";
import { improveText } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/improve", improveText);

export default router;