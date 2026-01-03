'use client';

import React from 'react';
import { 
  HelpCircle, Bookmark, Keyboard, Volume2, Crosshair, 
  ChevronDown, List, Monitor, Box, Menu, CheckSquare, Square
} from 'lucide-react';
import { Tooltip, TooltipProvider } from '@/components/ui/Tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

export const PulseHeader = () => {
  return (
    <TooltipProvider>
      <div className="w-full flex items-center justify-between py-4 px-1 select-none">
        
        {/* LEFT SECTION: Title & View Toggles */}
        <div className="flex items-center gap-4">
          <h1 className="text-white text-xl font-bold tracking-tight">Pulse</h1>
          
          <div className="flex items-center gap-1">
            {/* List View Toggle */}
            <Tooltip content="List View">
               <button className="w-8 h-8 flex items-center justify-center rounded bg-[#1f2229] text-[#3b82f6] hover:bg-[#2a2d36] transition-colors">
                 <Menu size={18} strokeWidth={2.5} />
               </button>
            </Tooltip>
            
            {/* Grid View Toggle */}
            <Tooltip content="Grid View">
               <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:text-gray-300 transition-colors">
                 <Box size={18} strokeWidth={2.5} />
               </button>
            </Tooltip>
          </div>
        </div>

        {/* RIGHT SECTION: Toolbar Icons & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Help Icon */}
          <Tooltip content="Help & Support">
             <button className="text-gray-500 hover:text-gray-300">
                <HelpCircle size={16} />
             </button>
          </Tooltip>

          {/* DISPLAY DROPDOWN (POPOVER) */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 bg-[#131518] border border-[#1f2229] hover:border-gray-600 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-md transition-all data-[state=open]:border-blue-500 outline-none">
                <List size={14} />
                Display
                <ChevronDown size={14} className="text-gray-500" />
              </button>
            </PopoverTrigger>
            
            {/* Dropdown Content */}
            <PopoverContent align="end" className="w-64 p-0 bg-[#0E1114] border-[#1f2229]">
               <div className="p-3 border-b border-[#1f2229]">
                  <h4 className="text-xs font-bold text-gray-100">Display Settings</h4>
               </div>
               <div className="p-2 space-y-1">
                  <DisplayOption label="Show Market Cap" active />
                  <DisplayOption label="Show Volume" active />
                  <DisplayOption label="Show Holders" active />
                  <DisplayOption label="Show Socials" />
                  <div className="h-px bg-[#1f2229] my-2"></div>
                  <DisplayOption label="Condensed Mode" />
                  <DisplayOption label="Hide Low Liquidity" />
               </div>
            </PopoverContent>
          </Popover>

          {/* Toolbar Icons Group */}
          <div className="flex items-center gap-3 px-2">
             <Tooltip content="Bookmarks">
                <button className="text-gray-500 hover:text-white transition-colors">
                   <Bookmark size={18} strokeWidth={2} />
                </button>
             </Tooltip>
             
             <Tooltip content="Keybinds">
                <button className="text-gray-500 hover:text-white transition-colors">
                   <Keyboard size={18} strokeWidth={2} />
                </button>
             </Tooltip>
             
             <Tooltip content="Audio Settings">
                <button className="text-gray-500 hover:text-white transition-colors">
                   <Volume2 size={18} strokeWidth={2} />
                </button>
             </Tooltip>
             
             <Tooltip content="Focus Mode">
                <button className="text-gray-500 hover:text-white transition-colors">
                   <Crosshair size={18} strokeWidth={2} />
                </button>
             </Tooltip>
          </div>

          {/* Layout/Preset Toggle (The "1 = 0" Button) */}
          <Tooltip content="Window Layouts">
             <div className="flex items-center gap-2 bg-[#0E1114] border border-[#1f2229] rounded-md px-2 py-1.5 ml-1 cursor-pointer hover:border-gray-600 transition-colors">
                <Monitor size={14} className="text-gray-400" />
                <span className="text-gray-200 text-xs font-bold">1</span>
                <span className="text-gray-600 text-xs">=</span>
                <span className="text-gray-200 text-xs font-bold">0</span>
                <ChevronDown size={12} className="text-gray-500 ml-1" />
             </div>
          </Tooltip>

        </div>
      </div>
    </TooltipProvider>
  );
};

// Sub-component for Popover Menu Items
const DisplayOption = ({ label, active }: { label: string, active?: boolean }) => (
  <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#1f2229] cursor-pointer group transition-colors">
      <span className="text-xs text-gray-400 group-hover:text-gray-200">{label}</span>
      {active ? (
        <CheckSquare size={14} className="text-blue-500" />
      ) : (
        <Square size={14} className="text-gray-600 group-hover:text-gray-500" />
      )}
  </div>
);