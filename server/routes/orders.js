import express from "express";
import pool from "../db.js";

const router = express.Router();

const query = `SELECT o.order_id, b.buyer_name, o.quantity
                FROM orders o, buyers b, ordered_by ob
                WHERE o.order_id = ob.order_id
	            and ob.buyer_id = b.buyer_id; `;

router.get("/orders", async (req, res) => {
	try {
		const data = await pool.query(query);
		res.status(200).json(data.rows);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
