import React from "react";
import { SpinnerRoundFilled } from 'spinners-react';

const Spinner= () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <SpinnerRoundFilled color="#213547" size={60}/>
      </div>
      <p className="mt-4 text-sm text-black">Loading...</p>
    </div>
  );
};

export default Spinner;

