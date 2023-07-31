import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox.tsx";
import FlexBetween from "@/components/FlexBetween";
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetOrdersQuery,
	useDeleteOrderMutation,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import {DataGrid, GridCellParams, GridRenderCellParams} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
	const { palette } = useTheme();
	const pieColors = [palette.primary[800], palette.primary[500]];

	const { data: kpiData } = useGetKpisQuery();
	const { data: rawProductData } = useGetProductsQuery();
	const productData = rawProductData?.map(product => ({
		...product,
		product_id: Number(product.product_id),
		expense_amount: Number(product.expense_amount),
		product_price: Number(product.product_price)
	}));

	const { data: rawOrderData } = useGetOrdersQuery();
	const orderData = rawOrderData?.map(order => ({
		...order,
		order_id: Number(order.order_id),
		quantity: Number(order.quantity),
		totalRevenue: Number(order.totalRevenue)
	}));

	const [deleteOrder] = useDeleteOrderMutation();

	const pieChartData = useMemo(() => {
		if (kpiData) {
			const totalExpenses = kpiData[0].totalExpenses;
			return Object.entries(kpiData[0].expensesByCategory).map(
				([key, value]) => {
					return [
						{
							name: key,
							value: Number(value.replace("$", "")),
						},
						{
							name: `${key} of Total`,
							value:
								Number(totalExpenses.replace("$", "")) -
								Number(value.replace("$", "")),
						},
					];
				}
			);
		}
	}, [kpiData]);

	const productColumns = [
		{
			field: "product_id",
			headerName: "id",
			flex: 0.3,
			type: 'number',
			hide: true,
		},
		{
			field: "product_name",
			headerName: "Name",
			flex: 0.7,
			renderCell: (params: GridCellParams) => `${params.value}`,
		},
		{
			field: "expense_amount",
			headerName: "Manufacturing Cost",
			flex: 0.7,
			renderCell: (params: GridCellParams) => `${Number(params.value)}`,
			type: 'number',
		},
		{
			field: "product_price",
			headerName: "Price",
			flex: 0.4,
			renderCell: (params: GridCellParams) => `${Number(params.value)}`,
			type: 'number',
		},
	];

	const orderColumns = [
		{
			field: "order_id",
			headerName: "id",
			flex: 0.3,
			type: 'number',
			hide: true,
		},
		{
			field: "buyer_name",
			headerName: "Buyer",
			flex: 0.4,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			flex: 0.2,
			renderCell: (params: GridCellParams) => `${Number(params.value)}`,
			type: 'number',
		},
		{
			field: "totalrevenue",
			headerName: "Price",
			flex: 0.3,
			renderCell: (params: GridCellParams) => `${Number(params.value)}`,
			type: 'number',
		},
		{
			field: "order_date",
			headerName: "Date",
			flex: 0.4,
			renderCell: (params: GridCellParams) => {
				let date = new Date(params.value);

				let day = ("0" + date.getDate()).slice(-2); // gets the day and ensures it is two digits
				let month = ("0" + (date.getMonth() + 1)).slice(-2); // gets the month and ensures it is two digits
				let year = date.getFullYear(); // gets the year

				return `${day}-${month}-${year}`;
			},
		},

		{
			field: 'delete',
			headerName: 'Delete',
			sortable: false,
			width: 100,
			renderCell: (params: GridRenderCellParams) => (
				<Button
					variant="contained"
					color="secondary"
					onClick={() => deleteOrder(params.row.order_id)}>
					Delete
				</Button>
			),
		},
	];


	return (
		<>
			<DashboardBox gridArea='g'>
				<BoxHeader
					title='List of Products'
					sideText={`${productData?.length} products`}
				/>
				<Box
					mt='0.5rem'
					p='0 0.5rem'
					height='75%'
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnSeparator": {
							visibility: "hidden",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}
						rows={productData || []}
						columns={productColumns}
						getRowId={(row) => row.product_id}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea='h'>
				<BoxHeader
					title='Recent Orders'
					sideText={`${orderData?.length} orders`}
				/>
				<Box
					mt='1rem'
					p='0 0.5rem'
					height='80%'
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnSeparator": {
							visibility: "hidden",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}
						rows={orderData || []}
						columns={orderColumns}
						getRowId={(row) => row.order_id}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea='j'>
				<BoxHeader
					title='Overall Summary and Explanation Data'
					sideText=''
				/>
				<Box
					height='15px'
					margin='1.25rem 1rem 0.4rem 1rem'
					bgcolor={palette.primary[800]}
					borderRadius='1rem'
				>
					<Box
						height='15px'
						bgcolor={palette.primary[600]}
						borderRadius='1rem'
						width='40%'
					></Box>
				</Box>
				<Typography margin='0 1rem' variant='h6'>
					Orci aliquam enim vel diam. Venenatis euismod id donec mus
					lorem etiam ullamcorper odio sed. Ipsum non sed gravida
					etiam urna egestas molestie volutpat et. Malesuada quis
					pretium aliquet lacinia ornare sed. In volutpat nullam at
					est id cum pulvinar nunc.
				</Typography>
			</DashboardBox>
		</>
	);
};

export default Row3;
