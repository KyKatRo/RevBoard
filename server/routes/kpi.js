import express from "express";
import pool from "../db.js";
import { kpis } from "../data/data.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
	try {
		const data = kpis;
		// await pool.query("SELECT * FROM kpi");
		// res.json(kpis.rows);
		res.status(200).json(data);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
