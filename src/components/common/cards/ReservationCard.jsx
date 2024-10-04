import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';

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
  // Helper to calculate a lighter or darker color shade
  const calculateShade = (baseColor, amount) => {
    let usePound = false;
    let color = baseColor;
  
    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }
  
    let num = parseInt(color, 16);
  
    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
  
    let g = ((num >> 8) & 0x00FF) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
  
    let b = (num & 0x0000FF) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
  
    return (usePound ? "#" : "") + (r.toString(16).padStart(2, '0')) + (g.toString(16).padStart(2, '0')) + (b.toString(16).padStart(2, '0'));
  };
  
  // Function to generate a color scale
  const generateColorScale = (baseColor, numberOfShades) => {
    const shades = [];
    const step = 40; // Adjust this value to control the brightness change between shades
  
    // Create lighter to darker shades
    for (let i = -numberOfShades; i <= numberOfShades; i++) {
      const shade = calculateShade(baseColor, i * step);
      shades.push(shade);
    }
  
    return shades;
  };
  
  const shades = generateColorScale(baseColor, 5); // Generate 5 lighter and 5 darker shades
  
  // Variants
  const backgroundColor = shades[9];  // Lighter shade
  const textColor = shades[6];  // Darker shade
  const borderColor = shades[5];  // Even lighter
  
  
  return (
    <Card style={{ backgroundColor: backgroundColor, border: "solid 2px" , borderColor: borderColor }} className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle style={{ color: '#121212' }} className="text-md font-medium">{title}</CardTitle>
        <Icon style={{ color: textColor }} className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="justify-between">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-[100px] bg-sky-200" />
            <Skeleton className="mt-2 h-4 w-[120px] bg-sky-200" />
          </>
        ) : (
          <>
            <div className="flex items-center">
              <div className='flex-shrink'>
                <div style={{ color: textColor }} className="text-4xl font-bold">
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
              </div>
              <div className="h-[100px] w-[100%] min-w-0 flex-shrink">
                <BarChartComponent chartData={graphData} barColor={textColor} />  {/* Pass the baseColor as barColor */}
              </div>   
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ReservationCard
