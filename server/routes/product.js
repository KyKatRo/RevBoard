import express from "express";
import pool from "../db.js";

const router = express.Router();

const query =
	"SELECT p.product_id, p.product_price, e.expense_amount FROM products p, expenses e, manufacturing_cost mc WHERE p.product_id = mc.product_id and mc.expense_id = e.expense_id; ";

router.get("/products", async (req, res) => {
	try {
		const data = await pool.query(query);
		res.status(200).json(data.rows);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
