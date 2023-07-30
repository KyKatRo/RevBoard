import express from "express";
import pool from "../db.js";

const router = express.Router();

const query = `SELECT
                    EXTRACT(YEAR FROM "revenue_date") AS Year,
                    EXTRACT(MONTH FROM "revenue_date") AS Month,
                    SUM(totalrevenue) AS TotalRevenue
                FROM revenue
                GROUP BY
                    EXTRACT(YEAR FROM "revenue_date"),
                    EXTRACT(MONTH FROM "revenue_date")
                ORDER BY
                    EXTRACT(YEAR FROM "revenue_date"),
                    EXTRACT(MONTH FROM "revenue_date")`;

router.get("/revenues", async (req, res) => {
	try {
		const data = await pool.query(query);
		res.status(200).json(data.rows);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
