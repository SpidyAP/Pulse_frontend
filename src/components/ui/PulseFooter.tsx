'use client';

import React from 'react';
import { 
  Settings, Wallet, Twitter, Compass, Activity, BarChart3, 
  Fuel, Disc, Globe, Bell, Palette, FileText, 
  Layers, Folder, ChevronDown, Sliders
} from 'lucide-react';

export const PulseFooter = () => {
  return (
    <div className="h-[36px] bg-[#0a0b0d] border-t border-[#1f2229] flex items-center justify-between px-2 text-[10px] font-medium text-gray-400 select-none overflow-x-auto no-scrollbar whitespace-nowrap z-50">
      
      {/* LEFT ZONE: Navigation & App Status */}
      <div className="flex items-center gap-3">
        
        {/* Preset Button */}
        <button className="flex items-center gap-1.5 bg-[#1e2330] text-[#5a80f0] px-2 py-0.5 rounded border border-[#2a3040] hover:bg-[#252a3a] transition-colors">
           <Sliders size={10} />
           <span>PRESET 1</span>
        </button>

        {/* Window/Stack Counter */}
        <div className="flex items-center gap-2 bg-[#0E1114] border border-[#1f2229] rounded px-2 py-0.5 cursor-pointer hover:border-gray-600">
           <Folder size={10} className="text-gray-500" />
           <span className="text-gray-300">1</span>
           <Layers size={10} className="text-[#a855f7]" />
           <span className="text-gray-300">0</span>
           <ChevronDown size={8} className="text-gray-600" />
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-4 bg-[#1f2229]"></div>

        {/* Navigation Icons with "Notification Dots" */}
        <div className="flex items-center gap-4">
           <Settings size={12} className="hover:text-white cursor-pointer" />
           
           <NavItem icon={<Wallet size={12} />} label="Wallet" hasDot />
           <NavItem icon={<Twitter size={12} />} label="Twitter" hasDot />
           <NavItem icon={<Compass size={12} />} label="Discover" hasDot />
           <NavItem icon={<Activity size={12} />} label="Pulse" hasDot active />
           <NavItem icon={<BarChart3 size={12} />} label="PnL" />
        </div>

        <div className="w-px h-4 bg-[#1f2229]"></div>

        {/* Stats (Gas, Connection) */}
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-500">
               <Fuel size={10} /> <span>$51.1K</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
               <Disc size={10} /> <span>0.003</span>
            </div>
            
            {/* Connection Badge */}
            <div className="flex items-center gap-1.5 bg-[#0b1a10] border border-[#12301a] px-2 py-0.5 rounded text-[#22c55e]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></div>
                <span>Connection is stable</span>
            </div>
        </div>
      </div>

      {/* RIGHT ZONE: Global Tools & Prices */}
      <div className="flex items-center gap-4 ml-4">
         
         <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            GLOBAL <ChevronDown size={10} />
         </div>

         <div className="flex items-center gap-3 border-r border-[#1f2229] pr-3">
            <LayoutIcon />
            <Bell size={12} className="hover:text-white cursor-pointer" />
            <Palette size={12} className="hover:text-white cursor-pointer" />
            <div className="flex gap-2 text-gray-500">
               <Disc size={12} /> {/* Discord mock */}
               <Twitter size={12} />
               <FileText size={12} />
            </div>
         </div>

         {/* Crypto Ticker */}
         <div className="flex items-center gap-3 font-mono">
            <div className="flex items-center gap-1 text-[#f7931a]">
               <span className="font-bold">₿</span> $88.1K
            </div>
            <div className="flex items-center gap-1 text-[#627eea]">
               <span className="font-bold">Ξ</span> $2969
            </div>
            <div className="flex items-center gap-1 text-[#14f195]">
               <span className="font-bold">◎</span> $124.34
            </div>
         </div>

      </div>
    </div>
  );
};

// --- Sub-components for cleaner code ---

const NavItem = ({ icon, label, hasDot, active }: any) => (
  <div className={`flex items-center gap-1.5 cursor-pointer transition-colors ${active ? 'text-white font-bold' : 'hover:text-gray-200'}`}>
      {icon}
      <span>{label}</span>
      {hasDot && <div className="w-1 h-1 rounded-full bg-[#ec4899]"></div>}
  </div>
);

const LayoutIcon = () => (
   <div className="w-3 h-3 border border-gray-500 rounded-sm flex flex-col gap-0.5 p-[1px]">
      <div className="h-[3px] bg-gray-500"></div>
      <div className="flex-1 bg-gray-500"></div>
   </div>
);