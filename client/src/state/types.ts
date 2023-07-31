export interface ExpensesByCategory {
	salaries: number;
	supplies: number;
	services: number;
}

export interface Month {
	id: string;
	month: string;
	revenue: number;
	expenses: number;
	operationalExpenses: number;
	nonOperationalExpenses: number;
}

export interface Day {
	id: string;
	date: string;
	revenue: number;
	expenses: number;
}

export interface GetKpisResponse {
	id: string;
	_id: string;
	__v: number;
	totalProfit: number;
	totalRevenue: number;
	totalExpenses: number;
	expensesByCategory: ExpensesByCategory;
	monthlyData: Array<Month>;
	dailyData: Array<Day>;
	createdAt: string;
	updatedAt: string;
}

export interface GetProductsResponse {
	id: string;
	_id: string;
	__v: number;
	price: number;
	expense: number;
	transactions: Array<string>;
	createdAt: string;
	updatedAt: string;
}

export interface GetTransactionsResponse {
	id: string;
	_id: string;
	__v: number;
	buyer: string;
	amount: number;
	productIds: Array<string>;
	createdAt: string;
	updatedAt: string;
}

export interface GetRevenuesResponse {
	year: number;
	month: string;
	totalrevenue: number;
}

export interface GetExpensesResponse {
	year: number;
	month: string;
	amount: number;
}

export interface GetExpensesByTypeResponse {
	year: number;
	month: string;
	operationalexpense: number;
	nonoperationalexpense: number;
}

export interface GetOrdersResponse {
	order_id: number;
	buyer_name: string;
	quantity: number;
	totalrevenue: number;
	order_date: number;

}

export interface GetProductsResponse {
	product_id: number;
	product_name: string;
	product_price: number;
	expense_amount: number;
}

export interface DeleteOrderResponse {
	message: string;
}

export interface GetCampaignSuccessPercentageResponse {
	success_percentage: number;
}

export interface GetTargetResponse {
	target: number;
}
