CREATE TABLE day (
    date TEXT,
    revenue NUMERIC,
    expenses NUMERIC
);
    
CREATE TABLE month (
    month TEXT,
    revenue NUMERIC,
    expenses NUMERIC,
    operationalExpenses NUMERIC,
    nonOperationalExpenses NUMERIC
);

CREATE TABLE kpi (
    totalProfit NUMERIC,
    totalRevenue NUMERIC,
    totalExpenses NUMERIC,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);