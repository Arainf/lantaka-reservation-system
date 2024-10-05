import React, { useState } from 'react';
import './test.css';

const Test = () => {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const handleMouseEnter = (roomId) => {
    setHoveredRoom(roomId);
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  return (
    <div className="floor-plan-container">
      <h1>Interactive Hotel Floor Plan</h1>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 917.3 227.46" className="floor-plan">
        <defs>
          <style>
            {`.cls-1{fill:none;stroke-width:4px;}
            .cls-1,.cls-17,.cls-5{stroke:#000;stroke-miterlimit:10;}
            .cls-2{font-size:21px;}
            .cls-18,.cls-2,.cls-6,.cls-7{font-family:CalSans-SemiBold, Cal Sans;font-weight:600;}
            .cls-17{opacity:0.46;}
            .hovered-room {fill: lightgreen;}`}
          </style>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="_2_STORY_ANNEX_1" data-name="2 STORY ANNEX 1">
              {/* Room polygons and elements */}
              <polygon
                className={hoveredRoom === "room1" ? "cls-1 hovered-room" : "cls-1"}
                points="2 46.47 291.03 46.47 291.03 2 386.56 2 386.56 43.18 915.3 43.18 915.3 225.46 2 225.46 2 46.47"
                onMouseEnter={() => handleMouseEnter("room1")}
                onMouseLeave={handleMouseLeave}
              />
              <polyline
                className={hoveredRoom === "room2" ? "cls-1 hovered-room" : "cls-1"}
                points="96.6 46.47 96.6 95.74 122.75 121.89 291.03 121.89 291.03 46.47"
                onMouseEnter={() => handleMouseEnter("room2")}
                onMouseLeave={handleMouseLeave}
              />
              <polyline
                className={hoveredRoom === "room3" ? "cls-1 hovered-room" : "cls-1"}
                points="146.22 225.46 146.22 144.34 291.03 144.34 291.03 225.46"
                onMouseEnter={() => handleMouseEnter("room3")}
                onMouseLeave={handleMouseLeave}
              />
              {/* More elements */}
              <polyline
                className={hoveredRoom === "room4" ? "cls-1 hovered-room" : "cls-1"}
                points="338.55 225.46 338.55 144.34 915.3 144.34"
                onMouseEnter={() => handleMouseEnter("room4")}
                onMouseLeave={handleMouseLeave}
              />
              {/* Additional elements (lines, text, etc.) */}
              <line className="cls-5" x1="291.03" y1="215.76" x2="338.55" y2="215.76" />
              {/* Add more elements similarly with hover effects */}
            </g>
          </g>
        </g>
      </svg>

      {/* Tooltip to display details about hovered room */}
      {hoveredRoom && (
        <div className="tooltip">
          <h3>{hoveredRoom}</h3>
          <p>Details about {hoveredRoom}.</p>
        </div>
      )}
    </div>
  );
};

export default Test;
