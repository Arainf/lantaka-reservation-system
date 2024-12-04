import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Color mapping for the chart with updated colors
const COLORS = {
  "Room": "#7BA7E9", 
  "Venue": "#246DDB", 
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center gap-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-gray-600">{`Visitors: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function Component({ data, isLoading, trending }) {
  const totalVisitors = React.useMemo(() => {
    return data ? data.reduce((acc, curr) => acc + curr.Reservations, 0) : 0;
  }, [data]);

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <div className="h-[400px] w-full animate-pulse bg-gray-200 rounded-lg" />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col h-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[420px] w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Reservations</CardTitle>
        <CardDescription>Room vs Venue</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="w-full h-full flex items-center justify-center mt-[-20px]">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="Reservations"
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
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold justify-between items-center mt-[-175px]">{totalVisitors.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total</p>
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
          Showing total reservations for rooms and venues
        </div>
      </CardFooter>
    </Card>
  );
}