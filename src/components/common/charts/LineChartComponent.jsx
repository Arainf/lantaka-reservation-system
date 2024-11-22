import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Tooltip content formatter
const ChartTooltipContent = ({ payload }) => {
  if (!payload || payload.length === 0) return null;
  const { date, revenue } = payload[0].payload;
  return (
    <div className="bg-white shadow-md p-2 rounded-md text-gray-700">
      <p className="font-semibold">{date}</p>
      <p>Revenue: ₱{revenue.toLocaleString()}</p>
    </div>
  );
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(216, 72%, 50%)",
  },
};

export function LineChartComponent({ data, isLoading }) {
  // Handle loading state
  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <Skeleton className="w-full h-full" />
      </Card>
    );
  }

  // Handle no data state
  if (!data || data.length === 0) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <p className="text-sm text-muted-foreground">
          Revenue from {data[0].date} to {data[data.length - 1].date}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 25, left: 25, bottom: 20 }}
            >
              {/* Gradient for the chart fill */}
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(216, 72%, 50%)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(216, 72%, 50%)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              {/* X-axis */}
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return new Date(year, month - 1).toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  });
                }}
              />

              {/* Y-axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `₱${value.toLocaleString()}`}
              />

              {/* Tooltip */}
              <Tooltip
                content={<ChartTooltipContent />}
                wrapperStyle={{ outline: "none" }}
              />

              {/* Area chart */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(216, 72%, 50%)"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />

              {/* Optional grid */}
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
