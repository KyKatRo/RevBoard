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
	order_date: string;
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
	successPercentage: number;
}

export interface GetTargetResponse {
	target: number;
}
