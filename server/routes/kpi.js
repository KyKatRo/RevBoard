import express from "express";
import pool from "../db.js";
import { kpis } from "../data/data.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
	try {
		const data = kpis;
		res.status(200).json(data);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
