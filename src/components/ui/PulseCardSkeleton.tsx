'use client';

import React from 'react';

export const PulseCardSkeleton = () => {
  return (
    <div className="flex bg-[#0E1114] p-2 mb-2 rounded border border-[#1f2229] h-[70px] relative overflow-hidden">
      
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      {/* Left: Image Placeholder */}
      <div className="w-12 h-12 bg-[#1f2229] rounded-md mr-3 shrink-0"></div>

      {/* Middle: Text Lines */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="h-3 w-20 bg-[#1f2229] rounded"></div>
        <div className="h-2 w-32 bg-[#1f2229] rounded mt-2"></div>
        <div className="flex gap-1 mt-2">
            <div className="h-3 w-8 bg-[#1f2229] rounded"></div>
            <div className="h-3 w-8 bg-[#1f2229] rounded"></div>
        </div>
      </div>

      {/* Right: Price Lines */}
      <div className="flex flex-col items-end justify-between pl-2 shrink-0 gap-1">
         <div className="h-3 w-12 bg-[#1f2229] rounded"></div>
         <div className="h-2 w-10 bg-[#1f2229] rounded"></div>
         <div className="h-4 w-14 bg-[#1f2229] rounded-full mt-1"></div>
      </div>
    </div>
  );
};