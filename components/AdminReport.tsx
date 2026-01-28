
import React from 'react';
import { RaffleNumber } from '../types';
import { PRICE_PER_NUMBER } from '../constants';

interface AdminReportProps {
  numbers: RaffleNumber[];
  onClose: () => void;
  onReset: () => void;
}

const AdminReport: React.FC<AdminReportProps> = ({ numbers, onClose, onReset }) => {
  const soldNumbers = numbers.filter(n => n.status === 'sold');
  const totalRevenue = soldNumbers.length * PRICE_PER_NUMBER;

  const handleExport = () => {
    // CSV Header
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Numero,Nome do Cliente,WhatsApp,Status,Valor\n";

    // CSV Rows
    soldNumbers.forEach(n => {
      const row = [
        n.id,
        n.ownerName || 'N/A',
        n.ownerPhone || 'N/A',
        'Vendido',
        `R$ ${PRICE_PER_NUMBER.toFixed(2)}`
      ].join(",");
      csvContent += row + "\r\n";
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_rifa_smartwash.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmReset = () => {
    if (window.confirm("ATENÇÃO: Isso apagará TODOS os dados de vendas e reiniciará a rifa. Tem certeza?")) {
      onReset();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-800 p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <i className="fas fa-chart-line text-blue-400"></i>
              Relatório de Vendas
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Gerencie as vendas e dados dos clientes
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0 bg-slate-50 border-b border-slate-200">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Total Vendido</p>
            <p className="text-2xl font-bold text-slate-800">{soldNumbers.length} <span className="text-sm font-normal text-slate-400">números</span></p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Receita Total</p>
            <p className="text-2xl font-bold text-emerald-600">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex flex-col items-center justify-center gap-1"
            >
              <i className="fas fa-file-csv text-xl"></i>
              <span>Baixar Excel/CSV</span>
            </button>
            <button 
              onClick={confirmReset}
              className="px-4 bg-rose-100 hover:bg-rose-200 text-rose-600 border border-rose-200 rounded-xl font-medium transition-colors flex flex-col items-center justify-center gap-1"
              title="Apagar tudo e reiniciar"
            >
              <i className="fas fa-trash-alt"></i>
              <span className="text-xs">Resetar</span>
            </button>
          </div>
        </div>
        
        {/* Table Content */}
        <div className="flex-1 overflow-auto p-6">
          {soldNumbers.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
              <i className="fas fa-inbox text-6xl mb-4"></i>
              <p className="text-lg font-medium">Nenhuma venda registrada ainda.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="py-3 px-4 font-bold text-slate-600 text-sm uppercase">Número</th>
                  <th className="py-3 px-4 font-bold text-slate-600 text-sm uppercase">Cliente</th>
                  <th className="py-3 px-4 font-bold text-slate-600 text-sm uppercase">WhatsApp</th>
                  <th className="py-3 px-4 font-bold text-slate-600 text-sm uppercase text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {soldNumbers.map((n) => (
                  <tr key={n.id} className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded text-sm">
                        #{String(n.id).padStart(2, '0')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">
                      {n.ownerName}
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={`https://wa.me/55${n.ownerPhone?.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
                      >
                        <i className="fab fa-whatsapp"></i>
                        {n.ownerPhone}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-600">
                      R$ {PRICE_PER_NUMBER.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
