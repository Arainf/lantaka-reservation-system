"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RealTimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1920);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1920);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <Card className="w-full h-full flex flex-col text-white border-none max-w-md bg-transparent justify-center items-center align-middle">
      <CardContent className="flex flex-col items-center">
        <div className="flex items-center justify-center align-middle ">
          <span
            className="font-bold"
            style={{
              fontSize: isLargeScreen ? "4rem" : "2.5rem", // Change font size based on screen width
            }}
          >
            {formatTime(currentTime)}
          </span>
        </div>
        <div className="flex items-center m-0">
          <span
            style={{
              fontSize: isLargeScreen ? "1.5rem" : "1rem", // Change font size based on screen width
            }}
          >
            {formatDate(currentTime)}
          </span>
        </div>
    </CardContent>
  </Card>
  )
}
