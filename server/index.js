import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import pool from "./db.js";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";

/* Config */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* routes */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);

// Test route
app.get("/test", (req, res) => {
	res.send("This works!");
});

/* node-postgres Setup */
const PORT = process.env.PORT || 9000;

// Test server connection
app.listen(PORT, () => {
	console.log(`Server has started on ${PORT}`);
});

// Test database connection
const time = await pool.query("SELECT NOW()");
console.log(time.rows);

await pool.end();
