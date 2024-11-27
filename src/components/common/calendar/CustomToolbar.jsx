import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CustomToolbar(toolbar) {
  const goToToday = () => toolbar.onNavigate('TODAY')
  const goBack = () => toolbar.onNavigate('PREV')
  const goNext = () => toolbar.onNavigate('NEXT')

  return (
    <div className="flex justify-between items-center mb-3 p-4">
      <div className="flex space-x-2">
        <Button onClick={goToToday} variant="outline">Today</Button>
        <Button onClick={goBack} variant="outline">Back</Button>
        <Button onClick={goNext} variant="outline">Next</Button>
      </div>
      <h2 className="text-2xl font-bold">{toolbar.label}</h2>
      <div className="flex space-x-2">
        <Select value={toolbar.view} onValueChange={toolbar.onView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}