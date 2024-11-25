import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart, Cell, Legend, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Color mapping for the chart
const COLORS = {
  "Room Guests": "#7BA7E9",
  "Venue Visitors": "#246DDB",
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function Component({ data, isLoading, trending }) {
  // Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    return data ? data.reduce((acc, curr) => acc + curr.visitors, 0) : 0;
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <div className="h-[400px] w-full animate-pulse bg-gray-200" />
      </Card>
    );
  }

  // No data available state
  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col h-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Room vs Venue</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="w-full h-[300px] flex items-center justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="visitors"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={COLORS[entry.name]}
                  stroke={COLORS[entry.name]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
          </PieChart>
        </div>
        <div className="text-center mt-4">
          <p className="text-3xl font-bold">{totalVisitors}</p>
          <p className="text-sm text-muted-foreground">Total Visitors</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trending > 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(trending)}% this month{" "}
          {trending > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for rooms and venues
        </div>
      </CardFooter>
    </Card>
  );
}