import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ReservationCard = ({
  isLoading = false,
  title,
  icon: Icon,
  value,
  percentageChange,
  valuePrefix = "",
  valueSuffix = "",
  percentagePrefix = "",
  percentageSuffix = "from last month",
}) => {
  return (
    <Card className="w-full sm:w-[300px] md:w-[350px] lg:w-[370px] bg-sky-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-[100px] bg-sky-200" />
            <Skeleton className="mt-2 h-4 w-[120px] bg-sky-200" />
          </>
        ) : (
          <>
            <div className="text-4xl font-bold">
              {valuePrefix}
              {value.toLocaleString()}
              {valueSuffix}
            </div>
            <p className="text-xs text-muted-foreground">
              {percentagePrefix}
              {percentageChange > 0 ? "+" : ""}
              {percentageChange.toFixed(1)}%
              {percentageSuffix && ` ${percentageSuffix}`}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ReservationCard