import React from "react";
import logoImage from "@/assets/images/logo.png"; // Import the local image

function LostInMetaverse() {
  return (
    <main className="flex items-center justify-center w-screen h-screen font-medium text-white bg-blue-800 shadow-[0px_15px_90px_rgba(0,0,0,0.25)] relative">
      {/* Centered background image */}
      <BackgroundImage 
        src={logoImage} 
        alt="Logo" 
      />
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
      <div className="absolute inset-0 bg-blue-600 opacity-50" />
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="relative flex flex-col mb-6 max-w-full w-[300px]">
      <h1 className="text-[180px] font-semibold text-white max-md:text-4xl">
        404
      </h1>
      <h2 className="mt-5 text-3xl font-semibold">
        Lost in Metaverse
      </h2>
      <p className="mt-4 text-xl font-light">
        Oops, it seems you are a <span id="text-red-700">minor</span>
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
