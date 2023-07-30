import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	GetKpisResponse,
	GetProductsResponse,
	GetTransactionsResponse,
	GetRevenuesResponse,
	GetExpensesResponse,
	GetOrdersResponse,
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
	],
	endpoints: (build) => ({
		getKpis: build.query<Array<GetKpisResponse>, void>({
			query: () => `kpi/kpis/`,
			providesTags: ["Kpis"],
		}),
		getProducts: build.query<Array<GetProductsResponse>, void>({
			query: () => `product/products/`,
			providesTags: ["Products"],
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
		getOrders: build.query<Array<GetOrdersResponse>, void>({
			query: () => `order/orders/`,
			providesTags: ["Orders"],
		}),
	}),
});

export const {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
	useGetRevenuesQuery,
	useGetExpensesQuery,
	useGetOrdersQuery,
} = api;
