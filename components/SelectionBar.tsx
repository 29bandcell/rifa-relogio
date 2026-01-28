
import React from 'react';

interface SelectionBarProps {
  selectedCount: number;
  totalPrice: number;
  onConfirm: () => void;
}

const SelectionBar: React.FC<SelectionBarProps> = ({ selectedCount, totalPrice, onConfirm }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-8">
      <div className="max-w-4xl mx-auto glass-effect border border-white/30 rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom duration-500">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-3 overflow-hidden">
            <div className="inline-block h-12 w-12 rounded-full ring-4 ring-white bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
              {selectedCount}
            </div>
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-xl">
              {selectedCount === 1 ? '1 número selecionado' : `${selectedCount} números selecionados`}
            </h3>
            <p className="text-slate-500 font-medium">
              Total: <span className="text-blue-600 text-lg font-bold">R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </p>
          </div>
        </div>
        
        <button 
          onClick={onConfirm}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
        >
          <i className="fas fa-shopping-cart"></i>
          Reservar Agora
        </button>
      </div>
    </div>
  );
};

export default SelectionBar;
