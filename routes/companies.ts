import express from "express";
import { companies } from "../controllers/companies";

const router = express.Router();

router.get("/", companies);

export default router;
