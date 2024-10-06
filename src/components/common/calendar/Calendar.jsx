"use client"

import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

export function Component() {
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())

  const handleNavigate = (newDate, view, action) => {
    setDate(newDate)
  }

  const handleViewChange = (newView) => {
    setView(newView)
  }

  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate('TODAY')
    }

    const goBack = () => {
      toolbar.onNavigate('PREV')
    }

    const goNext = () => {
      toolbar.onNavigate('NEXT')
    }

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button onClick={goToToday} variant="outline">Today</Button>
          <Button onClick={goBack} variant="outline">Back</Button>
          <Button onClick={goNext} variant="outline">Next</Button>
        </div>
        <h2 className="text-2xl font-bold">
          {toolbar.label}
        </h2>
        <div className="flex space-x-2">
          <Select value={view} onValueChange={handleViewChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen p-4">
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        components={{
          toolbar: CustomToolbar,
        }}
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}