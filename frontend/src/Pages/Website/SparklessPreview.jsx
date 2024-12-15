"use client";
import { SparklesCore } from "../../Components/ui/sparkles";

export function SparklessPreview() {
  return (
    (<div
      className="h-[400px] relative  w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF" />
      </div>
      <h1 className="text-white">Section Of Location</h1>
      <div className="h-[80px] flex gap-10 items-center justify-between cursor-pointer text-white mt-[3px]">
        <button className="ml-5 md:ml-20 text-xl ">BVM</button>
        <button className="mr-5 md:mr-20 border border-white w-[110px] h-[35px] rounded-3xl text-[13px] font-bold">Know More</button>
      </div>

      <h1
        className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1>
    </div>)
  );
}


