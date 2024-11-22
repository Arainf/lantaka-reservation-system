import React from "react"
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Label, Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const COLORS = {
  Room: "#7BA7E9",
  Venue: "#246DDB"
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Room: {
    label: "Room",
    color: COLORS.Room,
  },
  Venue: {
    label: "Venue",
    color: COLORS.Venue,
  },
}

export function Component({ data, isLoading, trending }) {
  const totalVisitors = React.useMemo(() => {
    return data ? data.reduce((acc, curr) => acc + curr.visitors, 0) : 0
  }, [data])

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <Skeleton className="h-[400px] w-full" />
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col h-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Room vs Venue</CardDescription>
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
              data={data}
              dataKey="visitors"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
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
                    )
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
          {trending > 0 ? 'Trending up' : 'Trending down'} by {Math.abs(trending)}% this month{' '}
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
  )
}

