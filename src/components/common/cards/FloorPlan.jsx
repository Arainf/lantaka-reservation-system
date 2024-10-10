import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SecondFloor from "./secondfloor";
import './style.css';

const FloorPlan = () => {

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floor1">Floor One</SelectItem>
            <SelectItem value="floor2">Floor Two</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 space-y-4">
            {/* Floor Plan */}
            <div>
              <div className=" h-[500px] p-0 m-0 flex justify-center rounded-md overflow-hidden">
                <SecondFloor className="scale-200" />
              </div>
            </div>

            {/* Additional content area */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-2">Additional Content</h3>
              <div className="bg-muted p-4 rounded-md">
                <p>This area can be used for additional information or components.</p>
              </div>
            </div> */}
          </div>

          {/* Sidebar */}
          {/* <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Sidebar</h3>
            <div className="bg-muted p-4 rounded-md h-[calc(100%-2rem)]">
              <p>This is the sidebar area for additional navigation or information.</p>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPlan;
