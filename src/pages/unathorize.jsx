import React from "react";
import Slogo from "@/assets/images/DJI_0205.webp";

function LostInMetaverse() {
  return (
    <main
      className="relative flex items-center justify-center w-screen h-screen font-medium text-white bg-cover bg-center bg-no-repeat shadow-[0px_15px_90px_rgba(0,0,0,0.25)]"
      style={{
        backgroundImage: `url(${Slogo})`,
      }}
    >
      {/* Overlay for blue background with opacity */}
      <div className="absolute inset-0 bg-blue-600 opacity-60 z-0"></div>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-10 py-0">
        <ErrorMessage />
        <ReturnButton />
      </section>
    </main>
  );
}

function BackgroundImage({ src, alt }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="w-[100%] h-[50%] max-w-md max-h-md m-auto translate-y-[100px] translate-x-[-5px] opacity-40" 
      />
      <div className="absolute inset-0 bg-blue-300 opacity-500" />
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="relative flex flex-col mb-6 max-w-full w-[300px]">
     <h1 className="text-7xl font-bold text-white sm:text-8xl md:text-9xl lg:text-10xl flex justify-center leading-tight">
    -404-
  </h1>
  <h2 className="mt-6 text-3xl sm:text-4xl font-semibold text-white text-center">
  This Page Isn't Available</h2>
<p className="mt-4 text-lg sm:text-xl font-light  text-center max-w-lg">
  The page you are looking for could not be found. Please check the URL or return to the login.
</p>
    </div>
  );
}

function ReturnButton() {
  return (
    <button
      onClick={() => window.location.href = '/auth/login'}
      className="px-16 py-4 mt-6 text-lg font-bold tracking-wide text-white bg-blue-800 rounded-3xl border-1 border-white hover:bg-blue-900"
    >
      RETURN
    </button>
  );
}

export default LostInMetaverse;
