"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dayjs from "dayjs";

const AppGrapChart = ({ data }) => {
  // Generate last 6 months dynamically
  const months = Array.from(
    { length: 6 },
    (_, i) =>
      dayjs()
        .subtract(5 - i, "month")
        .format("MMMM") // e.g. "March"
  );

  const chartData = months.map((monthName) => {
    // Filter invoices that belong to this month
    const total = data
      ?.filter((inv) => dayjs(inv.createdAt).format("MMMM") === monthName)
      ?.reduce((sum, inv) => sum + Number(inv.grandTotal || 0), 0);

    return {
      month: monthName,
      grandTotal: total || 0,
    };
  });

  // Chart config for grandTotal
  const chartConfig = {
    grandTotal: {
      label: "Grand Total",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time (Last 6 Months)</CardTitle>
        <CardDescription>Based on invoice creation dates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="grandTotal"
              type="natural"
              fill={chartConfig.grandTotal.color}
              fillOpacity={0.4}
              stroke={chartConfig.grandTotal.color}
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last 6 months data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppGrapChart;
