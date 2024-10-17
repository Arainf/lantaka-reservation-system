import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Store, Facebook, Instagram } from 'lucide-react'

// Helper function to format numbers as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

// Helper function to format percentages
const formatPercentage = (value) => {
  return (value > 0 ? '+' : '') + value.toFixed(1) + '%';
}

export default function SalesHighlights() {
  // Sample data - in a real application, this would likely come from props or a data fetch
  const totalSales = 295700;
  const salesIncrease = 2.7;
  const salesBreakdown = [
    { name: 'Metronic', value: 70, color: 'bg-green-500' },
    { name: 'Bundle', value: 20, color: 'bg-orange-500' },
    { name: 'MetronicNest', value: 10, color: 'bg-purple-500' },
  ];
  const platformSales = [
    { name: 'Online Store', icon: Store, value: 172000, change: 3.9 },
    { name: 'Facebook', icon: Facebook, value: 85000, change: -0.7 },
    { name: 'Instagram', icon: Instagram, value: 36000, change: 8.2 },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Highlights</CardTitle>
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {/* Total sales section */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">All time sales</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold">{formatCurrency(totalSales)}</span>
            <span className="ml-2 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800">
              {formatPercentage(salesIncrease)}
            </span>
          </div>
        </div>

        {/* Sales breakdown bar chart */}
        <div className="mt-4 h-4 w-full rounded-full bg-gray-200">
          {salesBreakdown.map((item, index) => (
            <div
              key={item.name}
              className={`h-full rounded-full ${item.color}`}
              style={{
                width: `${item.value}%`,
                marginLeft: index !== 0 ? `${salesBreakdown.slice(0, index).reduce((acc, curr) => acc + curr.value, 0)}%` : '0',
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {salesBreakdown.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className={`mr-1 h-2 w-2 rounded-full ${item.color}`} />
              {item.name}
            </div>
          ))}
        </div>

        {/* Platform-wise sales breakdown */}
        <div className="mt-4 space-y-2">
          {platformSales.map((platform) => (
            <div key={platform.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <platform.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{formatCurrency(platform.value)}</span>
                <span className={`text-xs ${platform.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(platform.change)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}