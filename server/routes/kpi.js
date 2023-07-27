import express from 'express';

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}