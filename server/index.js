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

/* node-postgres Setup */
const PORT = process.env.PORT || 9000;

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

pool.connect()
    .then(async (client) => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME ONLY OR AS NEEDED */
        // await client.query('TRUNCATE table_name'); // Replace with your table name
        // await client.query('INSERT INTO kpis ...'); // Replace with your SQL commands
        // await client.query('INSERT INTO products ...');
        // await client.query('INSERT INTO transactions ...');
    })
    .catch((error) => console.log(`${error} did not connect`));


