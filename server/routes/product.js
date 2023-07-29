import express from "express";
import pool from "../db.js";
import { products } from "../data/data.js";

const router = express.Router();

router.get("/products", async (req, res) => {
	try {
		const data = products;
		// await pool.query("SELECT * FROM product");
		// res.json(products.rows);
		res.status(200).json(data);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
