import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	GetRevenuesResponse,
	GetExpensesResponse,
	GetExpensesByTypeResponse,
	GetOrdersResponse,
	GetProductsResponse,
	DeleteOrderResponse,
	GetCampaignSuccessPercentageResponse,
	GetTargetResponse,
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
		"DELETE",
		"Campaigns",
	],
	endpoints: (build) => ({
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
		deleteOrder: build.mutation<DeleteOrderResponse, number>({
			query: (id) => ({
				url: `order/orders/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Orders"],
		}),
		getCampaignSuccessPercentage: build.query<
			GetCampaignSuccessPercentageResponse,
			void
		>({
			query: () => `campaign/success/`,
			providesTags: ["Campaigns"],
		}),
		getTarget: build.query<GetTargetResponse, void>({
			query: () => `campaign/target/`,
			providesTags: ["Campaigns"],
		}),
	}),
});

export const {
	useGetRevenuesQuery,
	useGetExpensesQuery,
	useGetExpensesByTypeQuery,
	useGetOrdersQuery,
	useGetProductsQuery,
	useDeleteOrderMutation,
	useGetCampaignSuccessPercentageQuery,
	useGetTargetQuery,
} = api;
