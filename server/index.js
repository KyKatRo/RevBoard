import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import pg from "pg";

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
app.use("kpi", kpiRoutes);


/* node-postgres Setup */
const PORT = process.env.PORT || 9000;

console.log(`Port: ${PORT}`)
console.log(`Port: ${process.env.POSTGRES_URL}`)

const { Client } = pg
const client = new Client({connectionString: process.env.POSTGRES_URL})

await client.connect()
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()



