"use client"

import { Bar, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  bookingFrequency: {
    label: "Booking Frequency",
    color: "hsl(var(--chart-2))",
  },
  avgStayDuration: {
    label: "Average Stay Duration (days)",
    color: "hsl(216, 72%, 50%)",
  },
}

export function Component({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card className="w-full h-[400px]">
        <Skeleton className="w-full h-[400px]" />
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
                label={{ value: "Booking Frequency (%)", angle: -90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent hide>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">{payload[0].payload.roomType}</div>
                          <div className="text-muted-foreground">Booking Rate</div>
                          <div className="text-right text-muted-foreground">{payload[0].value}%</div>
                          <div className="text-muted-foreground">Avg. Stay</div>
                          <div className="text-right text-muted-foreground">{payload[1].value} days</div>
                        </div>
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="avgStayDuration" yAxisId="left" fill="var(--color-avgStayDuration)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              <Line type="monotone" dataKey="bookingFrequency" yAxisId="right" stroke="var(--color-bookingFrequency)" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}