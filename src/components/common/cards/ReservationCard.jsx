import React, { memo, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateShade } from '@/utils/colorsUtils';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

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
  baseColor = "#3498db",
}) => {
  const shades = useMemo(() => {
    const numberOfShades = 5;
    const step = 40;
    const generatedShades = [];

    for (let i = -numberOfShades; i <= numberOfShades; i++) {
      const shade = calculateShade(baseColor, i * step);
      generatedShades.push(shade);
    }

    return generatedShades;
  }, [baseColor]);

  const backgroundColor = 'white';
  const textColor = shades[6];

  return (
    <Card 
      className="w-full overflow-hidden"
      style={{ 
        backgroundColor: isLoading ? 'transparent' : backgroundColor,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: 'none',
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : (
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: "#001f3f" }}
              >
                {Icon && <Icon className="h-6 w-6 text-white" />}
              </div>
            )}
            <h3 className="ml-3 text-lg font-semibold text-gray-700">
              {isLoading ? <Skeleton className="h-6 w-24" /> : title}
            </h3>
          </div>
          {!isLoading && percentageChange !== undefined && (
            <div className={`flex items-center ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {percentageChange >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
              <span className="text-sm font-medium">{Math.abs(percentageChange).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div>
            {isLoading ? (
              <Skeleton className="h-12 w-[100px]" />
            ) : (
              <div className="text-3xl font-bold text-gray-900">
                {valuePrefix}{typeof value === 'number' ? value.toLocaleString() : value}{valueSuffix}
              </div>
            )}
            {!isLoading && (
              <p className="text-sm text-gray-500 mt-1">
                {percentageSuffix}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" style={{ zIndex: -1 }} />
      )}
    </Card>
  );
};

export default memo(ReservationCard);