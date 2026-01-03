import { createSlice } from '@reduxjs/toolkit';

export interface PulseToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  contract: string;
  time: string;
  marketCap: string;
  volume: string;
  txCount: number;
  holders: number;
  bondingCurve: number;
  badges: {
    audit: number;
    clogs: number;
    fresh: boolean;
  };
}

interface PulseState {
  newPairs: PulseToken[];
  finalStretch: PulseToken[];
  migrated: PulseToken[];
}

// Helper to Create Data
// We allow passing distinct values now
const createToken = (
  id: string, 
  symbol: string, 
  color: string, 
  time: string, 
  mc: string, 
  vol: string,
  holders: number
): PulseToken => ({
  id, 
  symbol, 
  name: `${symbol} Token`, 
  image: color, 
  contract: `0x${id}9f...pump`, 
  time, 
  marketCap: mc, 
  volume: vol,
  txCount: Math.floor(Math.random() * 500) + 10, 
  holders, 
  bondingCurve: Math.floor(Math.random() * 100),
  badges: { 
    audit: Math.floor(Math.random() * 100), 
    clogs: 0, 
    fresh: true 
  }
});

const initialState: PulseState = {
  // COLUMN 1: NEW PAIRS (Varied Time & MC)
  newPairs: [
    createToken('1', 'FUND', 'bg-blue-600', '12s', '$4.46K', '$1.2K', 45),
    createToken('2', 'MTGA', 'bg-red-500', '45s', '$8.10K', '$5.5K', 120),
    createToken('3', 'PEPE', 'bg-green-600', '1m', '$105K', '$25K', 1200),
    createToken('4', 'DOGE', 'bg-yellow-500', '2m', '$3.2K', '$400', 30),
    createToken('5', 'SHIB', 'bg-orange-500', '5s', '$1.1K', '$100', 10),
  ],

  // COLUMN 2: FINAL STRETCH (High Market Caps)
  finalStretch: [
    createToken('6', 'SOL', 'bg-purple-600', '5d', '$450K', '$120K', 5000),
    createToken('7', 'ETH', 'bg-gray-600', '10m', '$120K', '$80K', 3200),
    createToken('8', 'BTC', 'bg-orange-600', '30m', '$900K', '$500K', 8000),
    createToken('9', 'XRP', 'bg-blue-400', '1h', '$60K', '$12K', 900),
  ],

  // COLUMN 3: MIGRATED (Mixed Data)
  migrated: [
    createToken('10', 'AI', 'bg-teal-500', '2s', '$2.5M', '$1.1M', 15000),
    createToken('11', 'GPT', 'bg-green-400', '15s', '$500K', '$200K', 4500),
    createToken('12', 'GROK', 'bg-pink-500', '4m', '$12K', '$3K', 150),
    createToken('13', 'BARD', 'bg-indigo-500', '8m', '$85K', '$45K', 2100),
  ],
};

const tokenSlice = createSlice({
  name: 'pulse',
  initialState,
  reducers: {
    updatePulsePrices: (state) => {
      // Simulate live updates: 
      // Only change one token randomly so the list doesn't jump around crazily
      const randomCol = Math.random() > 0.6 ? 'newPairs' : 'finalStretch';
      const list = state[randomCol as keyof PulseState];
      const randomToken = list[Math.floor(Math.random() * list.length)];
      
      // Parse MC, add random value, save back
      // (This is just a visual effect for the flashing border)
      const currentVal = parseFloat(randomToken.marketCap.replace(/[^0-9.]/g, ''));
      const newVal = (currentVal + (Math.random() - 0.5)).toFixed(2);
      
      // Keep the "K" or "M" suffix logic simple for the demo
      const suffix = randomToken.marketCap.includes('M') ? 'M' : 'K';
      randomToken.marketCap = `$${newVal}${suffix}`;
    }
  },
});

export const { updatePulsePrices } = tokenSlice.actions;
export default tokenSlice.reducer;