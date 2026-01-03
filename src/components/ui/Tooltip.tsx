'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';

// 1. Setup the Provider (needs to wrap the app or section)
export const TooltipProvider = TooltipPrimitive.Provider;

// 2. The Main Component
export const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className="z-50 overflow-hidden rounded-md border border-[#1f2229] bg-[#0E1114] px-3 py-1.5 text-xs text-gray-200 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={5}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[#1f2229]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};