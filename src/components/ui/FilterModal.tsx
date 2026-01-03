'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ArrowDownWideNarrow, ArrowUpWideNarrow, Clock, Users, Activity } from 'lucide-react';
import React from 'react';

// Reusable styled Dialog components
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

// FIXED: Removed 'children' from the props definition since it wasn't being used
export const DialogContent = ({ 
  title, onSort, currentSort 
}: { 
  title: string;
  onSort: (key: string, dir: 'asc' | 'desc') => void;
  currentSort: { key: string, dir: 'asc' | 'desc' };
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#1f2229] bg-[#0E1114] p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        
        {/* Modal Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight text-white">
            {title} Settings
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-sm text-gray-500">
            Configure sorting and filters for this column.
          </DialogPrimitive.Description>
        </div>

        {/* Sorting Options */}
        <div className="grid gap-2 py-4">
            <label className="text-xs font-bold text-gray-400 uppercase">Sort By</label>
            <div className="grid grid-cols-2 gap-2">
                <SortButton 
                   label="Age (Newest)" 
                   icon={<Clock size={14} />} 
                   active={currentSort.key === 'time'} 
                   onClick={() => onSort('time', 'asc')} 
                />
                <SortButton 
                   label="Market Cap" 
                   icon={<Activity size={14} />} 
                   active={currentSort.key === 'marketCap'} 
                   onClick={() => onSort('marketCap', 'desc')} 
                />
                <SortButton 
                   label="Holders" 
                   icon={<Users size={14} />} 
                   active={currentSort.key === 'holders'} 
                   onClick={() => onSort('holders', 'desc')} 
                />
                <SortButton 
                   label="Volume" 
                   icon={<ArrowUpWideNarrow size={14} />} 
                   active={currentSort.key === 'volume'} 
                   onClick={() => onSort('volume', 'desc')} 
                />
            </div>
        </div>

        {/* Filters (Mock Visuals) */}
        <div className="grid gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Filters</label>
            <div className="flex items-center space-x-2">
                <input type="checkbox" id="audit" className="rounded border-gray-600 bg-[#1f2229] text-blue-600" />
                <label htmlFor="audit" className="text-sm text-gray-300">Audited Only</label>
            </div>
            <div className="flex items-center space-x-2">
                <input type="checkbox" id="socials" className="rounded border-gray-600 bg-[#1f2229] text-blue-600" />
                <label htmlFor="socials" className="text-sm text-gray-300">Has Socials</label>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 mt-4">
             <DialogPrimitive.Close className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white bg-[#1f2229] rounded hover:bg-[#2a2d36] transition-colors">
                 Close
             </DialogPrimitive.Close>
             <DialogPrimitive.Close className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                 Save Changes
             </DialogPrimitive.Close>
        </div>

        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-gray-500 hover:text-white">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

// Helper Button for Sort Options
const SortButton = ({ label, icon, active, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-medium border transition-all ${
        active 
          ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
          : 'bg-[#1f2229] border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2a2d36]'
      }`}
    >
        {icon}
        {label}
    </button>
);