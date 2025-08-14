"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { subMonths, format, isAfter } from "date-fns";

const chartConfig = {
  paid: {
    label: "Paid",
    color: "var(--chart-1)",
  },
  notPaid: {
    label: "Not Paid",
    color: "var(--chart-2)",
  },
};

const AppBarChart = ({ data }) => {
  // Step 1: Get last 6 months (including current)
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 5); // covers current + last 5 months

  // Step 2: Prepare months array
  const monthsArray = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(today, 5 - i);
    return {
      month: format(date, "MMMM"),
      paid: 0,
      notPaid: 0,
    };
  });

  // Step 3: Fill the months data
  data.forEach((invoice) => {
    const invoiceDate = new Date(invoice.createdAt);

    // Only count if in last 6 months
    if (isAfter(invoiceDate, sixMonthsAgo) || invoiceDate.toDateString() === sixMonthsAgo.toDateString()) {
      const monthName = format(invoiceDate, "MMMM");
      const monthEntry = monthsArray.find((m) => m.month === monthName);

      if (monthEntry) {
        if (invoice.status?.toLowerCase() === "paid") {
          monthEntry.paid += 1;
        } else {
          monthEntry.notPaid += 1;
        }
      }
    }
  });

  return (
    <div>
      <h1 className="text-lg font-medium">Invoices - Last 6 Months</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-3">
        <BarChart accessibilityLayer data={monthsArray}>
          <CartesianGrid vertical={false} horizontal={true} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
          <Bar dataKey="notPaid" fill="var(--color-notPaid)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
