"use client"
 
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
 
import {  ChartContainer,  ChartLegend,  ChartLegendContent,  ChartTooltip,  ChartTooltipContent } from "@/components/ui/chart"
 
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: 'var(--chart-1)',
  },
  mobile: {
    label: "Mobile",
    color: 'var(--chart-2)',
  },
} 

const AppBarChart = () => {
  return (
    <div className="">
    <h1 className=" text-lg font-medium">Total Revenue</h1>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-3">
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} horizontal={true}/>
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <YAxis
      tickLine={false}
      tickMargin={10}
     axisLine={false}
    />
       <ChartTooltip content={<ChartTooltipContent />} />
       <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>
  );
};

export default AppBarChart;