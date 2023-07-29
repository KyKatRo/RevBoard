import express from "express";
import pool from "../db.js";
import { transactions } from "../data/data.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
	try {
		const data = transactions;
		// await pool.query("SELECT * FROM transaction");
		// res.json(transaction.rows);
		res.status(200).json(data);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
