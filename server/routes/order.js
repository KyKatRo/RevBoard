import express from "express";
import pool from "../db.js";

const router = express.Router();

const query = `SELECT o.order_id, b.buyer_name, o.quantity, r.totalRevenue, o.order_date
                FROM orders o, buyers b, ordered_by ob, revenue r, earned_by eb
                WHERE o.order_id = ob.order_id
	            and ob.buyer_id = b.buyer_id
                and o.order_id = eb.order_ID
                and r.revenue_id = eb.revenue_ID; `;

router.get("/orders", async (req, res) => {
	try {
		const data = await pool.query(query);
		res.status(200).json(data.rows);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.delete("/orders/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const generated_query = "DELETE FROM generated_by WHERE order_id = $1";
		await pool.query(generated_query, [id]);

		const bought_query = "DELETE FROM bought WHERE order_id = $1";
		await pool.query(bought_query, [id]);

		const revenue_query =
			"SELECT revenue_id FROM earned_by WHERE order_id = $1";
		await pool.query(revenue_query, [id]);

		// Delete the corresponding row from the "earned_by" table
		const earned_query = "DELETE FROM earned_by WHERE order_id = $1";
		await pool.query(earned_query, [id]);

		const order_query = "DELETE FROM ordered_by WHERE order_id = $1";
		await pool.query(order_query, [id]);

		const orders_query = "DELETE FROM orders WHERE order_id = $1";
		await pool.query(orders_query, [id]);

		res.status(200).json({ message: "Order deleted successfully" });
	} catch (err) {
		console.log(err);
		res.status(404).json({ message: err.message });
	}
});

export default router;
