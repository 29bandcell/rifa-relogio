
import React from 'react';
import { PRICE_PER_NUMBER } from '../constants';

interface StatsProps {
  sold: number;
  total: number;
  available: number;
}

const Stats: React.FC<StatsProps> = ({ sold, total, available }) => {
  const percentage = (sold / total) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 font-medium">Números Vendidos</span>
          <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{sold} de {total}</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-slate-800">{sold}</span>
          <span className="text-slate-400 mb-1">/ {total}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-rose-500 h-full transition-all duration-1000 ease-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 font-medium">Disponíveis</span>
          <i className="fas fa-check-circle text-emerald-500"></i>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-slate-800">{available}</span>
          <span className="text-slate-400 mb-1">Livres</span>
        </div>
        <p className="text-xs text-slate-400 mt-4">Corra para garantir o seu!</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 font-medium">Arrecadação</span>
          <i className="fas fa-wallet text-blue-500"></i>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-slate-800">R$ {(sold * PRICE_PER_NUMBER).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <p className="text-xs text-slate-400 mt-4">Baseado em números pagos</p>
      </div>
    </div>
  );
};

export default Stats;
