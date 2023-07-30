import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	GetKpisResponse,
	GetTransactionsResponse,
	GetRevenuesResponse,
	GetExpensesResponse,
	GetExpensesByTypeResponse,
	GetOrdersResponse,
	GetProductsResponse,
} from "./types";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	reducerPath: "main",
	tagTypes: [
		"Kpis",
		"Products",
		"Transactions",
		"Revenues",
		"Expenses",
		"Orders",
		"ExpensesByType",
		"Products",
	],
	endpoints: (build) => ({
		getKpis: build.query<Array<GetKpisResponse>, void>({
			query: () => `kpi/kpis/`,
			providesTags: ["Kpis"],
		}),
		getTransactions: build.query<Array<GetTransactionsResponse>, void>({
			query: () => `transaction/transactions/`,
			providesTags: ["Transactions"],
		}),
		getRevenues: build.query<Array<GetRevenuesResponse>, void>({
			query: () => `revenue/revenues/`,
			providesTags: ["Revenues"],
		}),
		getExpenses: build.query<Array<GetExpensesResponse>, void>({
			query: () => `expense/expenses/`,
			providesTags: ["Expenses"],
		}),
		getExpensesByType: build.query<Array<GetExpensesByTypeResponse>, void>({
			query: () => `expense/expenses-by-type/`,
			providesTags: ["ExpensesByType"],
		}),
		getOrders: build.query<Array<GetOrdersResponse>, void>({
			query: () => `order/orders/`,
			providesTags: ["Orders"],
		}),
		getProducts: build.query<Array<GetProductsResponse>, void>({
			query: () => `product/products/`,
			providesTags: ["Products"],
		}),
	}),
});

export const {
	useGetKpisQuery,
	useGetTransactionsQuery,
	useGetRevenuesQuery,
	useGetExpensesQuery,
	useGetExpensesByTypeQuery,
	useGetOrdersQuery,
	useGetProductsQuery,
} = api;
