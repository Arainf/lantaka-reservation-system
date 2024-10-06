import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateShade } from '@/utils/colorsUtils';
import { Component as LineChartComponent} from "@/components/common/charts/LineChartComponent"

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
  baseColor = "",
  graphData,
}) => {

  const shades = useMemo(() => {
    const numberOfShades = 5;
    const step = 40; // Control brightness
    const generatedShades = [];

    for (let i = -numberOfShades; i <= numberOfShades; i++) {
      const shade = calculateShade(baseColor, i * step);  // Use imported function
      generatedShades.push(shade);
    }

    return generatedShades;
  }, [baseColor]);

  const backgroundColor = shades[9];  // Lighter shade
  const textColor = shades[6];  // Darker shade
  const borderColor = shades[5];  // Even lighter

  return (
    <Card style={{ backgroundColor, border: "solid 2px", borderColor, borderRadius: "5px" }} className="w-full drop-shadow-md ">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Icon style={{ color: textColor }} className="h-4 w-4 text-muted-foreground" />
        <CardTitle style={{ color: '#121212' }} className="text-md ml-2 font-[Oswald] font
         font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="justify-between">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-[100px] bg-sky-200" />
            <Skeleton className="mt-2 h-4 w-[120px] bg-sky-200" />
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex-shrink">
              <div style={{ color: textColor }} className="text-5xl font-bold">
                {valuePrefix}{value.toLocaleString()}{valueSuffix}
              </div>
              <p className="text-xs mt-1 font-[Montserrat] italic text-muted-foreground absolute">
                {percentagePrefix}{percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(1)}% {percentageSuffix}
              </p>
            </div>
            <div>
              <LineChartComponent chartData={graphData} barColor={textColor}/>
            </div>
          </div>
        )} 
      </CardContent>
    </Card>
  );
};

export default memo(ReservationCard);  // Memoizing to avoid unnecessary re-renders
