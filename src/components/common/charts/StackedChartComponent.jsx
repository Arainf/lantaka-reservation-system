import { Bar, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const data = [
  { roomType: "Standard", bookingFrequency: 85, avgStayDuration: 2.3 }, // Average stay duration is the average length of stay (in days) for each room type
  { roomType: "Double Bed", bookingFrequency: 75, avgStayDuration: 3.1 }, // table that it covers comes from Room_Reservation(Check-In and Check-Out)
  { roomType: "Triple Bed", bookingFrequency: 45, avgStayDuration: 4.2 },  //To calculate the average stay duration, you would find the difference between the Check_Out and Check_In dates for each reservation, 
  // which gives the stay duration for that booking. Then, by averaging this value across all bookings for each room type, you can get the average stay duration per room type.
  { roomType: "Matrimonial", bookingFrequency: 35, avgStayDuration: 3.8 }
]

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

export function Component({ isLoading = false }) {
  if (isLoading) {
    return (
      <Card className="w-full h-[400px]">
        <Skeleton className="w-full h-full" />
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
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}
