'use client';
import React, { memo } from 'react';
import { PulseToken as Token } from '@/lib/features/tokenSlice'
import { formatCurrency, cn } from '@/lib/utils';
import { Copy, Globe, Twitter, Send, Search, ShieldCheck } from 'lucide-react';

// Simple Sparkline SVG
const Sparkline = ({ isPositive }: { isPositive: boolean }) => (
  <svg width="60" height="20" viewBox="0 0 60 20" className="opacity-80">
    <path
      d={isPositive ? "M0 15 Q10 15, 20 10 T40 5 T60 2" : "M0 5 Q10 5, 20 10 T40 15 T60 18"}
      fill="none"
      stroke={isPositive ? "#22c55e" : "#ef4444"}
      strokeWidth="2"
    />
  </svg>
);

const TokenRow = ({ token }: { token: Token }) => {
  const isPos = token.priceChange >= 0;

  return (
    <tr className="border-b border-axiom-border hover:bg-axiom-hover transition-colors group cursor-pointer text-sm">
      {/* Pair Info */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", token.icon)}>
             <span className="text-[10px] text-black font-bold">{token.name[0]}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-gray-100 font-bold tracking-wide">{token.name}</span>
              <span className="text-gray-500 text-xs">{token.ticker}</span>
              <Copy size={12} className="text-gray-600 hover:text-white" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span className="text-cyan-400">{token.timeAgo}</span>
              <div className="flex gap-1">
                <Globe size={12} /> <Twitter size={12} /> <Send size={12} />
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* Market Cap & Graph */}
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-gray-200 font-medium">{formatCurrency(token.marketCap)}</span>
          <span className={cn("text-xs", isPos ? "text-axiom-success" : "text-axiom-danger")}>
             {isPos ? "+" : ""}{token.priceChange.toFixed(2)}%
          </span>
          <div className="mt-1"><Sparkline isPositive={isPos} /></div>
        </div>
      </td>

      {/* Liquidity */}
      <td className="p-4"><span className="text-gray-200">{formatCurrency(token.liquidity)}</span></td>

      {/* Volume */}
      <td className="p-4"><span className="text-gray-200">{formatCurrency(token.volume)}</span></td>

      {/* TXNS */}
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-gray-200 font-bold">{token.txns}</span>
          <div className="flex gap-1 text-[11px] mt-1">
            <span className="text-axiom-success">{token.buys}</span>/
            <span className="text-axiom-danger">{token.sells}</span>
          </div>
        </div>
      </td>

      {/* Action */}
      <td className="p-4 text-right">
        <button className="bg-axiom-primary hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-4 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)] transition-all">
          Buy
        </button>
      </td>
    </tr>
  );
};

export default memo(TokenRow);
