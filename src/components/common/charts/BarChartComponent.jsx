
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "data",
    color: "hsl(var(--chart-1))",
  },
};

export function Component({ chartData, barColor }) {
  return (
      <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="occupancy" fill={barColor} radius={2} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
      </ChartContainer>
  );
}
