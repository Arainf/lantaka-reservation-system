import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import LantakaBg from "../../assets/images/DJI_0198.webp";

const LoadingOverlay = ({ isLoading }) => {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = LantakaBg;
    img.onload = () => setBgLoaded(true);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Blue overlay */}
      <div className="absolute z-10 inset-0 bg-white bg-opacity-20 backdrop-blur-md"></div>
      
      {/* Background image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${LantakaBg})` }}
      ></div>
      
      <div className="relative z-20 ">
        <Spinner  /> {/* Assuming Spinner accepts a size prop */}
      </div>
    </div>
  );
};

export default LoadingOverlay;

