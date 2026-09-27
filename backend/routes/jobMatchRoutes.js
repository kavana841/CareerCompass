import express from "express";
import { matchJobDescription } from "../controllers/jobMatchController.js";

const router = express.Router();

router.post("/match", matchJobDescription);

export default router;