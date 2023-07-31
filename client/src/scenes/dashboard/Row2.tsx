import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {useGetProductsQuery,
	useGetExpensesByTypeQuery,
	useGetRevenuesQuery,
	useGetExpensesQuery,
	useGetCampaignSuccessPercentageQuery,
	useGetTargetQuery} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
	Tooltip,
	CartesianGrid,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Line,
	PieChart,
	Pie,
	Cell,
	ScatterChart,
	Scatter,
	ZAxis,
} from "recharts";

// const pieData = [
// 	{ name: "Group A", value: 600 },
// 	{ name: "Group B", value: 400 },
// ];

const Row2 = () => {
	const { palette } = useTheme();
	const pieColors = [palette.primary[300], palette.primary[800]];
	const { data: productData } = useGetProductsQuery();
	const { data: expensesByTypeData } = useGetExpensesByTypeQuery();

	const { data: campaignsHitTargetPercentageObject, isLoading } = useGetCampaignSuccessPercentageQuery();

	let campaignsHitTargetPercentage = 0

	if (!isLoading && campaignsHitTargetPercentageObject) {
		campaignsHitTargetPercentage = campaignsHitTargetPercentageObject.successPercentage
	}

	const pieData = [
	 	{ name: 'Campaigns Hit Target', value: campaignsHitTargetPercentage },
	 	{ name: 'Campaigns Missed Target', value: 100 - campaignsHitTargetPercentage },
	 ];



	const { data: targetExact } = useGetTargetQuery();
	const target = Math.round(targetExact / 1000)


	const operationalExpenses = useMemo(() => {
		return (
			expensesByTypeData &&
			expensesByTypeData.map(
				({ month, operationalexpense, nonoperationalexpense }) => {
					return {
						name: month.substring(0, 3),
						"Operational Expenses": Number(operationalexpense),
						"Non Operational Expenses": Number(
							nonoperationalexpense
						),
					};
				}
			)
		);
	}, [expensesByTypeData]);

	const productExpenseData = useMemo(() => {
		return (
			productData &&
			productData.map(
				({ id, product_name, product_price, expense_amount }) => {
					return {
						id: id,
						name: product_name,
						price: Number(product_price),
						expense: Number(expense_amount),
					};
				}
			)
		);
	}, [productData]);

	const { data: revenueData } = useGetRevenuesQuery();
	const { data: expenseData } = useGetExpensesQuery();
	const percentIncreaseInRevenue = useMemo(() => {
		if (revenueData && revenueData.length >= 12) {
			const revenueMonth11 = Number(revenueData[10].totalrevenue);
			const revenueMonth12 = Number(revenueData[11].totalrevenue);
			const increase = revenueMonth12 - revenueMonth11;
			return (increase / revenueMonth11) * 100;
		}
		return 0;
	}, [revenueData]);

	const percentDecreaseInExpenses = useMemo(() => {
		if (expenseData && expenseData.length >= 12) {
			const expensesMonth11 = Number(expenseData[10].amount);
			const expensesMonth12 = Number(expenseData[11].amount);
			const decrease = expensesMonth11 - expensesMonth12;
			return (decrease / expensesMonth11) * 100;
		}
		return 0;
	}, [expenseData]);

	return (
		<>
			<DashboardBox gridArea='d'>
				<BoxHeader
					title='Operational vs Non-Operational Expenses'
					sideText=''
				/>
				<br />
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						data={operationalExpenses}
						margin={{
							top: 20,
							right: 25,
							left: -10,
							bottom: 55,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke={palette.grey[800]}
						/>
						<XAxis
							dataKey='name'
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							style={{ fontSize: "10px" }}
							tickFormatter={(tick) => `$${tick / 1000}k`}
						/>
						<Tooltip
							formatter={(value) => `$${Number(value).toLocaleString()}`}
						/>
						<Line
							type='monotone'
							dataKey='Non Operational Expenses'
							stroke={palette.tertiary[500]}
						/>
						<Line
							type='monotone'
							dataKey='Operational Expenses'
							stroke={palette.primary.main}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea='e'>
				<BoxHeader title='Campaign Success and Targets' sideText='' />
				<FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
					<PieChart
						width={110}
						height={100}
						margin={{
							top: 0,
							right: -10,
							left: 10,
							bottom: 0,
						}}
					>

						<Pie
							stroke='none'
							data={pieData}
							innerRadius={18}
							outerRadius={38}
							paddingAngle={2}
							dataKey='value'
						>
							{pieData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={pieColors[index]}
								/>
							))}
						</Pie>
					</PieChart>
					<Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
						<Typography variant='h5'>Target Sales</Typography>
						<Typography
							m='0.3rem 0'
							variant='h3'
							color={palette.primary[300]}
						>
							${target}k {/* Display the actual target value */}
						</Typography>
						<Typography variant='h6'>
							Goal of this campaign
						</Typography>
					</Box>
					<Box flexBasis='40%'>
						<Typography variant='h5'>Losses in Revenue</Typography>
						<Typography variant='h6'>
							Losses are down {percentDecreaseInExpenses.toFixed(2)}%.
						</Typography>
						<Typography mt='0.4rem' variant='h5'>
							Profit Margins
						</Typography>
						<Typography variant='h6'>
							Margins are up by {percentIncreaseInRevenue.toFixed(2)}% from last month.
						</Typography>
					</Box>
				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea='f'>
				<BoxHeader title='Product Prices vs Expenses' sideText='' />
				<ResponsiveContainer width='100%' height='100%'>
					<ScatterChart
						margin={{
							top: 20,
							right: 25,
							bottom: 40,
							left: -10,
						}}
					>
						<CartesianGrid stroke={palette.grey[800]} />
						<XAxis
							type='number'
							dataKey='price'
							name='price'
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
							tickFormatter={(v) => `$${v}`}
						/>
						<YAxis
							type='number'
							dataKey='expense'
							name='expense'
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
							tickFormatter={(tick) => `$${tick / 1000}k`}
						/>
						<ZAxis type='number' range={[20]} />
						<Tooltip
							formatter={(value) => `$${Number(value).toLocaleString()}`}
						/>
						<Scatter
							name='Product Expense Ratio'
							data={productExpenseData}
							fill={palette.tertiary[500]}
						/>
					</ScatterChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row2;
