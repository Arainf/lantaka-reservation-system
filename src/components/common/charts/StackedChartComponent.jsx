import React from "react"
import { Bar, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  bookingFrequency: {
    label: "Booking Frequency",
    color: "#5AACFF",
  },
  avgStayDuration: {
    label: "Average Stay Duration (days)",
    color: "#246DDB",
  },
}

export function Component({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card className="w-full h-[400px]">
        <Skeleton className="w-full h-full" />
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    )
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Room Type Performance</CardTitle>
        <CardDescription>Booking frequency and average stay duration by room type</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 25, left: 25, bottom: 20 }}>
              <XAxis
                dataKey="roomType"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{ value: "Avg. Stay (days)", angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{ value: "Booking Frequency", angle: -90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p className="font-semibold">{payload[0].payload.roomType}</p>
                        <p>Bookings: {payload[1].value}</p>
                        <p>Avg. Stay: {payload[0].value.toFixed(1)} days</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="avgStayDuration" 
                yAxisId="left" 
                fill={chartConfig.avgStayDuration.color}
                radius={[4, 4, 0, 0]} 
                maxBarSize={60} 
              />
              <Line 
                type="monotone" 
                dataKey="bookingFrequency" 
                yAxisId="right" 
                stroke={chartConfig.bookingFrequency.color}
                strokeWidth={2} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}