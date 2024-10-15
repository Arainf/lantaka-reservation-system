import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SecondFloor from "./secondfloor";
import FirstFloor from "./FirstFloor";
import './style.css';
import { useEffect, useState } from 'react';

const FloorPlan = () => {

  // Random color generator for rooms (red and green)
  const getRandomColor = () => {
    const colors = ['#e74c3c', '#2ecc71']; // Red and Green colors
    const roomColors = {};

    for (let i = 201; i <= 236; i++) {
      const roomId = `room${i}`;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      roomColors[roomId] = randomColor;
    }
    return roomColors;
  };

  const [roomColors, setRoomColors] = useState({});

  useEffect(() => {
    const colors = getRandomColor();
    setRoomColors(colors);
  }, []);

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
              <div className="h-[250px] p-0 m-0 flex justify-center rounded-md overflow-hidden">
                <div className="relative">
                <FirstFloor />
                <SecondFloorr />

                  {/* <SecondFloor roomColors={roomColors} /> */}
                </div>
              </div>
            </div>

            {/* Additional content area */}
            {/* Add other content here */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPlan;
