'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { updatePulsePrices } from '@/lib/features/tokenSlice';
import { PulseCard } from '@/components/ui/PulseCard';
import { PulseCardSkeleton } from '@/components/ui/PulseCardSkeleton';
import { PulseHeader } from '@/components/ui/PulseHeader';
import { PulseFooter } from '@/components/ui/PulseFooter';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/FilterModal'; // Import Modal
import { Zap, Pause, SlidersHorizontal, Settings } from 'lucide-react';

// Helper: Parse currency strings (e.g., "$4.5K") into numbers for sorting
const parseValue = (val: string) => {
  if (!val) return 0;
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  if (val.includes('K')) return num * 1000;
  if (val.includes('M')) return num * 1000000;
  return num;
};

export default function PulsePage() {
  const dispatch = useDispatch();
  const { newPairs, finalStretch, migrated } = useSelector((state: RootState) => state.tokens);
  
  const [activeTab, setActiveTab] = useState<'new' | 'final' | 'migrated'>('new');
  const [isLoading, setIsLoading] = useState(true);

  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: 'time', dir: 'asc' });

// Sorting Function
  const sortTokens = (tokens: any[]) => {
    return [...tokens].sort((a, b) => {
      let valA, valB;
      
      if (sortConfig.key === 'time') {
         // Parse time: "29s" -> 29, "1m" -> 60
         const parseTime = (t: string) => {
             if (!t) return 0;
             const num = parseFloat(t);
             if (t.includes('m')) return num * 60;
             if (t.includes('h')) return num * 3600;
             if (t.includes('d')) return num * 86400;
             return num;
         };
         valA = parseTime(a.time);
         valB = parseTime(b.time);
      } 
      // FIXED: Added 'volume' to this check so it gets parsed correctly
      else if (sortConfig.key === 'marketCap' || sortConfig.key === 'volume') {
         // Use the helper to convert "$1.2K" -> 1200
         // accessing property dynamically
         valA = parseValue(a[sortConfig.key]);
         valB = parseValue(b[sortConfig.key]);
      } 
      else {
         // Fallback for simple numbers (like holders)
         valA = a[sortConfig.key] || 0;
         valB = b[sortConfig.key] || 0;
      }

      // Direction logic
      return sortConfig.dir === 'asc' ? valA - valB : valB - valA;
    });
  };
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 2000);
    const interval = setInterval(() => dispatch(updatePulsePrices()), 1000);
    return () => { clearTimeout(loadTimer); clearInterval(interval); };
  }, [dispatch]);

  // Apply Sort
  const sortedNew = sortTokens(newPairs);
  const sortedFinal = sortTokens(finalStretch);
  const sortedMigrated = sortTokens(migrated);

  return (
    <div className="flex flex-col h-full w-full max-h-[100dvh] bg-[#0a0b0d] text-gray-300 font-sans overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="shrink-0 px-4 pt-2 z-10">
         <PulseHeader />
      </div>

      {/* 2. MOBILE TABS */}
      <div className="lg:hidden shrink-0 flex border-b border-[#1f2229] px-4 mb-2 gap-4">
         <TabButton active={activeTab === 'new'} onClick={() => setActiveTab('new')} label="New Pairs" />
         <TabButton active={activeTab === 'final'} onClick={() => setActiveTab('final')} label="Final Stretch" />
         <TabButton active={activeTab === 'migrated'} onClick={() => setActiveTab('migrated')} label="Migrated" />
      </div>

      {/* 3. MAIN GRID */}
      <div className="flex-1 min-h-0 px-4 pb-2 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full w-full">
          
          <ColumnWrapper active={activeTab === 'new'}>
            <Column 
              title="New Pairs" 
              tokens={sortedNew} 
              isLoading={isLoading}
              icon={<ZapIcon />} 
              controls={<div className="flex gap-2"><ControlBadge text="0" icon="lightning" /><ControlBadge text="P1 P2 P3" /></div>}
              // Pass Sorting Props to Column
              sortConfig={sortConfig}
              onSort={(k: any, d: any) => setSortConfig({ key: k, dir: d })}
            />
          </ColumnWrapper>

          <ColumnWrapper active={activeTab === 'final'}>
            <Column 
              title="Final Stretch" 
              tokens={sortedFinal} 
              isLoading={isLoading}
              controls={<div className="flex gap-2 items-center"><Pause size={12} className="text-blue-500" /><ControlBadge text="0" /><ControlBadge text="P1 P2 P3" /></div>}
              sortConfig={sortConfig}
              onSort={(k: any, d: any) => setSortConfig({ key: k, dir: d })}
            />
          </ColumnWrapper>

          <ColumnWrapper active={activeTab === 'migrated'}>
            <Column 
              title="Migrated" 
              tokens={sortedMigrated} 
              isLoading={isLoading}
              controls={<div className="flex gap-2 items-center"><Pause size={12} className="text-blue-500" /><ControlBadge text="0" /><ControlBadge text="P1 P2 P3" /></div>}
              sortConfig={sortConfig}
              onSort={(k: any, d: any) => setSortConfig({ key: k, dir: d })}
            />
          </ColumnWrapper>

        </div>
      </div>

      {/* 4. FOOTER */}
      <div className="shrink-0 z-50">
         <PulseFooter />
      </div>

    </div>
  );
}

// --- SUB COMPONENTS ---

const TabButton = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`pb-2 text-sm font-bold border-b-2 transition-colors ${active ? 'text-white border-white' : 'text-gray-500 border-transparent'}`}>{label}</button>
);

const ColumnWrapper = ({ children, active }: any) => (
   <div className={`${active ? 'block' : 'hidden'} lg:block h-full min-h-0`}>{children}</div>
);

const ZapIcon = () => (<div className="w-4 h-4 rounded-full border border-green-900 bg-green-900/20 flex items-center justify-center text-green-500 text-[10px]">⚡</div>);

const ControlBadge = ({ text, icon }: any) => (
  <div className="flex items-center gap-1 bg-[#0E1114] border border-[#1f2229] rounded px-1.5 py-0.5 text-[10px] text-gray-400 cursor-pointer hover:border-gray-500 transition-colors">
     {icon === 'lightning' && <span className="text-yellow-500">⚡</span>}
     {text}
     <SlidersHorizontal size={8} className="ml-1 opacity-50" />
  </div>
);

// --- THE COLUMN COMPONENT WITH MODAL ---
const Column = ({ title, tokens, controls, icon, isLoading, sortConfig, onSort }: any) => (
  <div className="flex flex-col bg-[#050607] rounded-lg border border-[#1f2229] h-full overflow-hidden shadow-lg">
      
      {/* Column Header */}
      <div className="px-3 py-2 border-b border-[#1f2229] flex justify-between items-center bg-[#0E1114] shrink-0 h-[42px]">
         <div className="flex items-center gap-2">
            {icon}
            <span className="font-bold text-sm text-gray-100">{title}</span>
         </div>
         
         <div className="flex items-center gap-3">
             {controls}
             
             {/* THE FILTER MODAL TRIGGER */}
             <Dialog>
                 <DialogTrigger asChild>
                    <Settings size={14} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
                 </DialogTrigger>
                 <DialogContent 
                    title={title} 
                    currentSort={sortConfig} 
                    onSort={onSort} 
                 />
             </Dialog>
         </div>
      </div>
      
      {/* Content */}
      <div className="p-2 flex-1 overflow-y-auto custom-scrollbar space-y-2 relative">
         {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <PulseCardSkeleton key={i} />)
         ) : (
            // x20 Duplicate for scroll demo
            Array.from({ length: 20 }).flatMap(() => tokens).map((t: any, i) => (
               <PulseCard key={`${t.id}-${i}-${Math.random()}`} token={t} />
            ))
         )}
      </div>
  </div>
);