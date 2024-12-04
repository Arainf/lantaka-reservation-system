import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  occupancy: {
    label: "Occupancy",
    color: "hsl(216, 72%, 50%)",
  },
}

export function Component({ data, isLoading, viewMode }) {
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
        <CardTitle>Spaces Occupied</CardTitle>
        <p className="text-sm text-muted-foreground">
          Occupancy from {viewMode === 'monthly' ? 'monthly' : 'weekly'} data
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 25, left: 25, bottom: 20 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => {
                  if (viewMode === 'monthly') {
                    return new Date(value + '-01').toLocaleString('default', { month: 'short' });
                  }
                  return new Date(value).toLocaleDateString();
                }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="occupancy" fill="hsl(216, 72%, 50%)" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

