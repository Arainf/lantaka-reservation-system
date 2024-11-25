"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import { Toaster } from "@/components/ui/toaster"
import DiscountTable from "@/components/common/tables/discount-table"
import AdditionalFeeTable from "@/components/common/tables/additional-fee-table"
import RoomTypeTable from "@/components/common/tables/room-type-table"
import { useRegistrationContext } from "@/context/utilContext"

export default function AdminUtilities({
  sidebarOpen = false,
  toggleSidebar = () => {},
}) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const { renders, setRenderers } = useRegistrationContext()

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <h1 className="text-2xl font-bold">Hotel Management</h1>

          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1">
            <Card className="w-full">
              <CardContent className="p-4">
                <DiscountTable searchTerm={searchTerm} />
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardContent className="p-4">
                <AdditionalFeeTable searchTerm={searchTerm} />
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardContent className="p-4">
                <RoomTypeTable searchTerm={searchTerm} render={renders} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

