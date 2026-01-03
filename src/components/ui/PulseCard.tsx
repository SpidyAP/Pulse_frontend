'use client';

import React, { useEffect, useState, useRef } from 'react';
import { PulseToken } from '@/lib/features/tokenSlice';
import { Tooltip, TooltipProvider } from '@/components/ui/Tooltip';
import { 
  Globe, MessageCircle, Search, Users, Eye, Trophy, 
  Zap, Skull 
} from 'lucide-react';

export const PulseCard = ({ token }: { token: PulseToken }) => {
  // State for the "Flash" effect (Green border on price update)
  const [flashClass, setFlashClass] = useState('');
  const prevPriceRef = useRef(token.marketCap);

  useEffect(() => {
    // Detect if price changed
    if (token.marketCap !== prevPriceRef.current) {
        // In a real app, you would parse the string "$4.16K" to numbers to decide red vs green.
        // For this demo, we flash green to signify "Live Update".
        setFlashClass('bg-green-500/10 border-green-500/50');
        
        const timer = setTimeout(() => {
            setFlashClass('');
        }, 300); // Remove flash after 300ms

        prevPriceRef.current = token.marketCap;
        return () => clearTimeout(timer);
    }
  }, [token.marketCap]);

  return (
    <TooltipProvider>
      <div className={`flex bg-[#0E1114] p-2 mb-2 rounded border border-[#1f2229] hover:border-gray-600 transition-all duration-300 cursor-pointer group relative overflow-hidden ${flashClass}`}>
        
        {/* 1. LEFT SECTION: Image & Contract */}
        <div className="flex flex-col items-center mr-3 gap-1 shrink-0">
           <div className={`w-12 h-12 ${token.image} rounded-md flex items-center justify-center font-bold text-black text-xs relative`}>
              {token.symbol[0]}
              {/* Optional: Tiny absolute icon like the "fire" in your screenshot */}
              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-[#1f2229]">
                 <Zap size={8} className="text-orange-500" fill="currentColor"/>
              </div>
           </div>
           <Tooltip content="Copy Contract Address">
              <span className="text-[9px] text-gray-500 font-mono hover:text-white transition-colors">{token.contract}</span>
           </Tooltip>
        </div>

        {/* 2. MIDDLE SECTION: Stats & Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          
          {/* Top Row: Name & Socials */}
          <div className="flex items-center gap-2">
             <span className="text-gray-100 font-bold text-xs truncate">{token.symbol}</span>
             
             <div className="flex gap-1.5 text-gray-500">
                <Tooltip content="Website">
                   <button><Globe size={10} className="hover:text-blue-400" /></button>
                </Tooltip>
                <Tooltip content="Telegram">
                   <button><MessageCircle size={10} className="hover:text-blue-400" /></button>
                </Tooltip>
                <Tooltip content="Analysis">
                   <button><Search size={10} className="hover:text-blue-400" /></button>
                </Tooltip>
             </div>
          </div>
          
          {/* Middle Row: Time & Holders */}
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
             <span className="text-green-400 font-mono">{token.time}</span>
             
             <Tooltip content="Holders">
                 <div className="flex items-center gap-1 cursor-help">
                    <Users size={10} /> <span>{token.holders}</span>
                 </div>
             </Tooltip>
             
             <Tooltip content="Views">
                 <div className="flex items-center gap-1 cursor-help">
                    <Eye size={10} /> <span>493</span>
                 </div>
             </Tooltip>

             <Tooltip content="Rank">
                 <div className="flex items-center gap-1 text-yellow-500 cursor-help">
                    <Trophy size={10} /> <span>Top 10</span>
                 </div>
             </Tooltip>
          </div>
          
          {/* Bottom Row: Badges */}
          <div className="flex items-center gap-1 mt-1">
             <Tooltip content={`Audit Score: ${token.badges.audit}%`}>
                <div className="flex items-center gap-0.5 bg-[#1a0f0f] border border-red-900/30 rounded px-1 py-0.5 text-[9px] text-red-500 cursor-help">
                   <Skull size={8} /> {token.badges.audit}%
                </div>
             </Tooltip>

             <Tooltip content="DeepSeek Verified">
                <div className="flex items-center gap-0.5 bg-[#0f121a] border border-blue-900/30 rounded px-1 py-0.5 text-[9px] text-blue-400 cursor-help">
                   DS
                </div>
             </Tooltip>

             {token.badges.fresh && (
                <div className="flex items-center gap-0.5 bg-[#0f1a12] border border-green-900/30 rounded px-1 py-0.5 text-[9px] text-green-500">
                   0%
                </div>
             )}
          </div>
        </div>

        {/* 3. RIGHT SECTION: Market Data & Action */}
        <div className="flex flex-col items-end justify-between pl-2 shrink-0 text-right">
           <div>
              <div className={`text-blue-400 font-bold text-xs transition-colors duration-300 ${flashClass ? 'text-green-400' : ''}`}>
                 MC {token.marketCap}
              </div>
              <div className="text-gray-300 font-bold text-[10px]">
                 V {token.volume}
              </div>
           </div>
           
           <div className="flex flex-col items-end gap-1">
              <div className="text-[9px] text-gray-500 flex items-center gap-1">
                 TX <span className="text-gray-300">{token.txCount}</span>
                 {/* Mini progress bar */}
                 <div className="w-8 h-1 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="w-1/2 bg-green-500 h-full"></div>
                    <div className="w-1/2 bg-red-500 h-full"></div>
                 </div>
              </div>
              
              <Tooltip content="Quick Buy (0 SOL)">
                 <button className="bg-[#3b82f6] hover:bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-transform active:scale-95 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                    <Zap size={8} fill="currentColor" /> 0 SOL
                 </button>
              </Tooltip>
           </div>
        </div>
      </div>
    </TooltipProvider>
  );
};