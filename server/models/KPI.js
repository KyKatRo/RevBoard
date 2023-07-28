import { Pool } from "pg";

const pool = new Pool();

const createTables = async () => {
	await pool.query(`
    CREATE TABLE IF NOT EXISTS day (
      date TEXT,
      revenue NUMERIC,
      expenses NUMERIC
    );
    
    CREATE TABLE IF NOT EXISTS month (
      month TEXT,
      revenue NUMERIC,
      expenses NUMERIC,
      operationalExpenses NUMERIC,
      nonOperationalExpenses NUMERIC
    );

    CREATE TABLE IF NOT EXISTS KPI (
      totalProfit NUMERIC,
      totalRevenue NUMERIC,
      totalExpenses NUMERIC,
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

createTables();

const addDay = async (date, revenue, expenses) => {
	await pool.query(
		`
    INSERT INTO day(date, revenue, expenses)
    VALUES($1, $2, $3)
  `,
		[date, revenue, expenses]
	);
};

const addMonth = async (
	month,
	revenue,
	expenses,
	operationalExpenses,
	nonOperationalExpenses
) => {
	await pool.query(
		`
    INSERT INTO month(month, revenue, expenses, operationalExpenses, nonOperationalExpenses)
    VALUES($1, $2, $3, $4, $5)
  `,
		[month, revenue, expenses, operationalExpenses, nonOperationalExpenses]
	);
};

const addKPI = async (
	totalProfit,
	totalRevenue,
	totalExpenses,
	dayIds,
	monthIds
) => {
	await pool.query(
		`
    INSERT INTO KPI(totalProfit, totalRevenue, totalExpenses, dayIds, monthIds)
    VALUES($1, $2, $3, $4, $5)
  `,
		[totalProfit, totalRevenue, totalExpenses, dayIds, monthIds]
	);
};

const getKPI = async () => {
	const result = await pool.query(`
    SELECT * FROM KPI
  `);
	return result.rows;
};

export { addDay, addMonth, addKPI, getKPI };
