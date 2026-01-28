
import React from 'react';
import { RaffleNumber } from '../types';

interface RaffleGridProps {
  numbers: RaffleNumber[];
  onToggle: (id: number) => void;
}

const RaffleGrid: React.FC<RaffleGridProps> = ({ numbers, onToggle }) => {
  return (
    <div className="raffle-grid">
      {numbers.map((n) => (
        <button
          key={n.id}
          onClick={() => onToggle(n.id)}
          disabled={n.status === 'sold'}
          className={`
            aspect-square flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-200 shadow-sm
            ${n.status === 'available' ? 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 hover:scale-105 border border-slate-200' : ''}
            ${n.status === 'selected' ? 'bg-blue-600 text-white scale-105 ring-4 ring-blue-100 border-2 border-blue-400' : ''}
            ${n.status === 'sold' ? 'bg-rose-100 text-rose-300 cursor-not-allowed border border-rose-50' : ''}
          `}
        >
          {String(n.id).padStart(2, '0')}
        </button>
      ))}
    </div>
  );
};

export default RaffleGrid;
