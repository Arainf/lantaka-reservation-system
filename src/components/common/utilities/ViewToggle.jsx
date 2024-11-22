import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays } from 'lucide-react';

const ViewToggle = ({ viewMode, onToggle }) => {
  return (
    <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
      <Button
        variant={viewMode === 'daily' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onToggle('daily')}
        className="flex items-center space-x-2"
      >
        <CalendarDays className="h-4 w-4" />
        <span>Daily</span>
      </Button>
      <Button
        variant={viewMode === 'monthly' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onToggle('monthly')}
        className="flex items-center space-x-2"
      >
        <Calendar className="h-4 w-4" />
        <span>Monthly</span>
      </Button>
    </div>
  );
};

export default ViewToggle;