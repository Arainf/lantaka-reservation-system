import React, { useState } from "react";
import NavigationTop from "@/components/common/navigatin-side-top/clientNavigationTop";
import FirstFloor from "@/components/common/cards/FirstFloor";
import Image from "@/assets/images/LantakaBg.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { Button } from "@/components/ui/button";

const JoshTest = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      // Detect right-click
      setIsGrabbing(true);
    }
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  return (
    <div className="flex flex-col relative w-screen overflow-hidden h-screen bg-[#f8f6f2]">
      <NavigationTop />
      <main className="flex-1 p-4 sm:p-6 flex flex-col h-full space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {/* Main content area (1) */}

        <div
          className={`w-[110%] h-[84.5vh] overflow-hidden bg-black border border-gray-200 rounded-lg ${
            isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
        >
          {/* Content here svgmap */}
          <FirstFloor />
        </div>

        {/* Right-side section */}

        <div className="w-full md:w-1/3 flex flex-col space-y-4">
          {/* Top right area (2) */}

          <div className="h-1/4 bg-slate-800 border border-gray-200 rounded-lg">
            {/* Content here */}
          </div>

          {/* Bottom right area (3) */}
          <div className="flex-1 relative bg-white border overflow-hidden border-gray-200 rounded-[20px] ">
            {/* Content here */}

            <div
              className="h-[60%]  relative top-0 bg-slate-600 w-full bg-cover"
              style={{ backgroundImage: `url(${Image})` }}
            >
              <div className="font-[Oswald] p-2 absolute bottom-14 font-bold text-white text-xl">
                Double Room &#40; Sea View &#41;
              </div>
            </div>

            <div className="h-[54%] flex flex-col absolute bottom-0 bg-white w-full rounded-tr-[40px]">
              <div className="flex flex-col w-[80%] h-[65%] mt-4 mx-5 ">
                <div className="flex flex-row">
                  <Card className="w-20 ml-1 my-1 mr-2 flex flex-col items-center">
                    <CardContent className="p-0">
                      <h1>2</h1>
                    </CardContent>
                    <CardFooter className="p-0">
                      <p className="font-[Oswald] text-lg font-semibold">
                        Guest
                      </p>
                    </CardFooter>
                  </Card>

                  <div className="flex flex-col">
                    <Card className="ml-3 my-1  flex-1">
                      <CardContent className="p-2 flex flex-row items-center justify-center  ">
                        <FaCalendarCheck className="mr-1" />
                        Check-in: 05-30-24
                      </CardContent>
                    </Card>
                    <Card className="m-1 flex-1">
                      <CardContent className="p-2 flex flex-row items-center justify-center  ">
                        <FaCalendarTimes className="mr-1" />
                        Check-out: 05-30-24
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex flex-row">
                    <Card className="m-1 flex-1">
                    <CardContent className="p-2  flex flex-row items-center justify-center  ">
                        <MdOutlinePayment className="mr-1" />
                        ₱ 1000.00
                    </CardContent>
                    </Card>
                    <Card className="m-1 ">
                    <CardContent className="p-2 flex flex-row items-center justify-center  ">
                        Confirmed
                    </CardContent>
                    </Card>
                </div>
              </div>

              <Button className="mx-5 mt-2" variant="default">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoshTest;
