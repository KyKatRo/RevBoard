import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetRevenuesQuery, useGetExpensesQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
	ResponsiveContainer,
	CartesianGrid,
	AreaChart,
	BarChart,
	Bar,
	LineChart,
	XAxis,
	YAxis,
	Legend,
	Line,
	Tooltip,
	Area,
} from "recharts";

const Row1 = () => {
	const { palette } = useTheme();
	const { data: revenueData } = useGetRevenuesQuery();
	const { data: expenseData } = useGetExpensesQuery();

	const revenue = useMemo(() => {
		return (
			revenueData &&
			revenueData.map(({ month, totalrevenue }) => {
				return {
					name: month,
					revenue: Number(totalrevenue),
				};
			})
		);
	}, [revenueData]);

	const revenueExpenses = useMemo(() => {
		return (
			revenueData &&
			expenseData &&
			revenueData.map(({ month, totalrevenue }, index) => {
				return {
					name: month,
					revenue: Number(totalrevenue),
					expenses: Number(expenseData[index].amount),
				};
			})
		);
	}, [revenueData, expenseData]);

	const revenueProfit = useMemo(() => {
		return (
			revenueData &&
			expenseData &&
			revenueData.map(({ month, totalrevenue }, index) => {
				return {
					name: month,
					revenue: Number(totalrevenue),
					profit: (
						Number(totalrevenue) - Number(expenseData[index].amount)
					).toFixed(2),
				};
			})
		);
	}, [revenueData, expenseData]);

	return (
		<>
			<DashboardBox gridArea='a'>
				<BoxHeader title='Revenue and Expenses' sideText='' />
				<br />
				<ResponsiveContainer width='100%' height='100%'>
					<AreaChart
						width={500}
						height={400}
						data={revenueExpenses}
						margin={{
							top: 15,
							right: 25,
							left: -10,
							bottom: 60,
						}}
					>
						<defs>
							<linearGradient
								id='colorRevenue'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor={palette.primary[300]}
									stopOpacity={0.5}
								/>
								<stop
									offset='95%'
									stopColor={palette.primary[300]}
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient
								id='colorExpenses'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor={palette.tertiary[500]}
									stopOpacity={0.5}
								/>
								<stop
									offset='95%'
									stopColor={palette.tertiary[500]}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey='name'
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							tickLine={false}
							axisLine={{ strokeWidth: "0" }}
							style={{ fontSize: "10px" }}
							tickFormatter={(tick) => `$${tick / 1000}k`}
						/>
						<Tooltip
							formatter={(value) => `$${Number(value).toLocaleString()}`}
						/>
						<Legend
							height={20}
							wrapperStyle={{
								margin: "0 0 10px 0",
							}}
						/>
						<Area
							type='monotone'
							dataKey='revenue'
							dot={true}
							stroke={palette.primary.main}
							fillOpacity={1}
							fill='url(#colorRevenue)'
						/>
						<Area
							type='monotone'
							dataKey='expenses'
							dot={true}
							stroke={palette.tertiary[500]}
							fillOpacity={1}
							fill='url(#colorExpenses)'
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea='b'>
				<BoxHeader title='Profit and Revenue' sideText='' />
				<br />
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						width={500}
						height={400}
						data={revenueProfit}
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

						<Legend
							height={20}
							wrapperStyle={{
								margin: "0 0 10px 0",
							}}
						/>
						<Line
							type='monotone'
							dataKey='revenue'
							stroke={palette.primary.main}
						/>
						<Line
							type='monotone'
							dataKey='profit'
							stroke={palette.tertiary[500]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea='c'>
				<BoxHeader title='Revenue Month by Month' sideText='' />
				<br />
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						width={500}
						height={300}
						data={revenue}
						margin={{
							top: 17,
							right: 25,
							left: -5,
							bottom: 58,
						}}
					>
						<defs>
							<linearGradient
								id='colorRevenue'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor={palette.primary[300]}
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor={palette.primary[300]}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							vertical={false}
							stroke={palette.grey[800]}
						/>
						<XAxis
							dataKey='name'
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
							tickFormatter={(tick) => `$${tick / 1000}k`}
						/>
						<Tooltip
							formatter={(value) => `$${Number(value).toLocaleString()}`}
						/>
						<Bar dataKey='revenue' fill='url(#colorRevenue)' />
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row1;
