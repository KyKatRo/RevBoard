import express from "express";
import pool from "../db.js";

const router = express.Router();

const expensesQuery = `SELECT
                                    EXTRACT(YEAR FROM "expense_date") AS Year,
                                    EXTRACT(MONTH FROM "expense_date") AS Month,
                                    SUM(amount) AS Amount
                                FROM expenses
                                GROUP BY
                                    EXTRACT(YEAR FROM "expense_date"),
                                    EXTRACT(MONTH FROM "expense_date")
                                ORDER BY
                                    EXTRACT(YEAR FROM "expense_date"),
                                    EXTRACT(MONTH FROM "expense_date")`;

const expensesByTypeQuery = `SELECT
                                        EXTRACT(YEAR FROM "expense_date") AS Year,
                                        EXTRACT(MONTH FROM "expense_date") AS Month,
                                        SUM(CASE WHEN "operationaltype" = 'operational' THEN "amount" END) AS OperationalExpense,
                                        SUM(CASE WHEN "operationaltype" = 'non-operational' THEN "amount" END) AS NonOperationalExpense
                                    FROM expenses
                                    GROUP BY
                                        EXTRACT(YEAR FROM "expense_date"),
                                        EXTRACT(MONTH FROM "expense_date")
                                    ORDER BY
                                        EXTRACT(YEAR FROM "expense_date"),
                                        EXTRACT(MONTH FROM "expense_date")`;

router.get("/expenses", async (req, res) => {
	try {
		const data = await pool.query(expensesQuery);
		res.status(200).json(data.rows);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.get("/expenses-by-type", async (req, res) => {
	try {
		const data = await pool.query(expensesByTypeQuery);
		res.status(200).json(data.rows);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
