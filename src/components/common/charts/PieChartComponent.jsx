"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { calculateShade } from '@/utils/colorsUtils';
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A donut chart with text";

const baseColor = "#001f3f";

const generateShades = () => {
  const numberOfShades = 5;
  const step = 40;
  const generatedShades = [];

  for (let i = -numberOfShades; i <= numberOfShades; i++) {
    const shade = calculateShade(baseColor, i * step);
    generatedShades.push(shade);
  }

  return generatedShades;
};

// Generate the shades once and store them in a constant
const shades = generateShades();

// Access specific shades from the generated array
const firstShade = shades[6];  // Accessing the appropriate index
const secondShade = shades[7];
const thirdShade = shades[8];

const chartData = [
  { name: "Venue", visitors: 275, fill: firstShade },
  { name: "Room", visitors: 200, fill: secondShade },
  { name: "Other", visitors: 287, fill: thirdShade },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Venue: {
    label: "Venue",
    color: "hsl(var(--chart-1))",
  },
  Room: {
    label: "Room",
    color: "hsl(var(--chart-2))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-3))",
  },
};

export function Component({ isLoading }) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <Skeleton className="h-[400px] w-full" />
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Visitors</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
              data={chartData}
              dataKey="visitors"
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
