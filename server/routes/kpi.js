import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
	try {
		const kpis = await KPI.getKPI();
		res.status(200);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
