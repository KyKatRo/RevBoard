import express from "express";
import pool from "../db.js";

const router = express.Router();

const success_query = `SELECT 
									(COUNT(campaign_id) * 100.0) / (SELECT COUNT(*) FROM Campaigns) AS PercentageCampaignsHitTarget
								FROM (
									SELECT c.campaign_id
									FROM Campaigns c
									JOIN generated_by gb ON c.campaign_id = gb.campaign_id
									JOIN Orders o ON gb.order_id = o.order_id
									JOIN earned_by eb ON o.order_id = eb.order_id
									JOIN Revenue r ON eb.revenue_id = r.revenue_id
									GROUP BY c.campaign_id
									HAVING SUM(r.totalRevenue) >= MIN(c.target)
								) AS subquery_campaigns;`;

const target_query = `SELECT campaign_name, target 
								FROM Campaigns 
								ORDER BY campaignEndDate DESC 
								LIMIT 1;
								`;

router.get("/success", async (req, res) => {
	try {
		const data = await pool.query(success_query);
		const successPercentage = Number(data.rows[0].percentagecampaignshittarget);
		res.status(200).json({ successPercentage });
	} catch (err) {
		console.log("Error executing the query:", err);
		res.status(500).json({ message: err.message });
	}
});


router.get("/target", async (req, res) => {
	try {
		const data = await pool.query(target_query);
		const target = Number(data.rows[0].target);
		res.status(200).json(target);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
