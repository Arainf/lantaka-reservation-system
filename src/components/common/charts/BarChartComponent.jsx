"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "data",
    color: "hsl(var(--chart-1))",
  },
};

export function Component({ chartData, barColor }) {
  return (
    <CardContent clasName="flex">
      <ChartContainer config={chartConfig}>
        {/* <ResponsiveContainer width="100%" height={200}> */}
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} tickFormatter={() => ""} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill={barColor} radius={2} />
          </BarChart>
        {/* </ResponsiveContainer> */}
      </ChartContainer>
    </CardContent>
  );
}
