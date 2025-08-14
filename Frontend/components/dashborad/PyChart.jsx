"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AppPyChart = ({ data }) => {
  // Prepare project status data
  const projectStatusData = [
    {
      name: "Pending",
      value: data?.filter((p) => p.projectStatus === "Pending").length,
      fill: "#4285F4",
    },
    {
      name: "In Progress",
      value: data?.filter((p) => p.projectStatus === "In Progress").length,
      fill: "#FF9500",
    },
    {
      name: "Completed",
      value: data?.filter((p) => p.projectStatus === "Completed").length,
      fill: "#FF7139",
    },
    {
      name: "Cancelled",
      value: data?.filter((p) => p.projectStatus === "Cancelled").length,
      fill: "#0078D7",
    },
  ];

  console.log(data)

  // Calculate total
  const totalProjects = React.useMemo(() => {
    return projectStatusData.reduce((acc, curr) => acc + curr.value, 0);
  }, [projectStatusData]);

  // Chart config (for your ChartContainer component)
  const chartConfig = {
    Pending: { color: "#4285F4" },
    "In Progress": { color: "#FF9500" },
    Completed: { color: "#FF7139" },
    Cancelled: { color: "#0078D7" },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Status Overview</CardTitle>
        <CardDescription>Based on all projects</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={projectStatusData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProjects}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Projects
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing all project statuses
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppPyChart;
