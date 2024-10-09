import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FloorPlanImg from "@/assets/images/Floorplan.svg";

const FloorPlan = () => {
  return (
    <Card className="col-span-2 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Hotel Floor Plan</CardTitle>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floor1">Floor One</SelectItem>
            <SelectItem value="floor2">Floor Two</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-200 h-[calc(100%-2rem)] p-10 flex items-center justify-center">
          <img src={FloorPlanImg} alt="Hotel Floor Plan" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPlan;
