
import React, { useState, useEffect, useCallback } from 'react';
import { RaffleNumber, RaffleState } from './types';
import { TOTAL_NUMBERS, PRICE_PER_NUMBER, PIX_KEY, APP_MESSAGES } from './constants';
import RaffleGrid from './components/RaffleGrid';
import SelectionBar from './components/SelectionBar';
import PixModal from './components/PixModal';
import AdminReport from './components/AdminReport';
import PasswordModal from './components/PasswordModal';
import Header from './components/Header';
import Stats from './components/Stats';

const App: React.FC = () => {
  const [raffle, setRaffle] = useState<RaffleState>({
    numbers: [],
    selectedIds: [],
    pricePerNumber: PRICE_PER_NUMBER,
    pixKey: PIX_KEY
  });
  
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize numbers from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem('rifa_smartwash_numbers');
    if (saved) {
      setRaffle(prev => ({ ...prev, numbers: JSON.parse(saved) }));
    } else {
      const initial: RaffleNumber[] = Array.from({ length: TOTAL_NUMBERS }, (_, i) => ({
        id: i + 1,
        status: 'available'
      }));
      setRaffle(prev => ({ ...prev, numbers: initial }));
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever numbers update (simulating DB for this demo)
  useEffect(() => {
    if (raffle.numbers.length > 0) {
      localStorage.setItem('rifa_smartwash_numbers', JSON.stringify(raffle.numbers));
    }
  }, [raffle.numbers]);

  const handleToggleNumber = useCallback((id: number) => {
    setRaffle(prev => {
      const num = prev.numbers.find(n => n.id === id);
      if (!num || num.status === 'sold') return prev;

      const isSelected = prev.selectedIds.includes(id);
      const newSelectedIds = isSelected 
        ? prev.selectedIds.filter(sid => sid !== id)
        : [...prev.selectedIds, id];

      const newNumbers = prev.numbers.map(n => {
        if (n.id === id) {
          return { ...n, status: isSelected ? 'available' as const : 'selected' as const };
        }
        return n;
      });

      return {
        ...prev,
        numbers: newNumbers,
        selectedIds: newSelectedIds
      };
    });
  }, []);

  const handleConfirmSelection = () => {
    if (raffle.selectedIds.length === 0) return;
    setShowModal(true);
  };

  const handlePaymentConfirmed = (name: string, phone: string) => {
    // Simulate confirming payment - mark selected as sold with buyer info
    setRaffle(prev => ({
      ...prev,
      numbers: prev.numbers.map(n => 
        prev.selectedIds.includes(n.id) ? { 
          ...n, 
          status: 'sold' as const,
          ownerName: name,
          ownerPhone: phone
        } : n
      ),
      selectedIds: []
    }));
    setShowModal(false);
    alert(`Obrigado ${name}! Seu pagamento foi simulado e seus números foram reservados.`);
  };

  const handleResetRaffle = () => {
    localStorage.removeItem('rifa_smartwash_numbers');
    const initial: RaffleNumber[] = Array.from({ length: TOTAL_NUMBERS }, (_, i) => ({
      id: i + 1,
      status: 'available'
    }));
    setRaffle(prev => ({
      ...prev,
      numbers: initial,
      selectedIds: []
    }));
    setShowAdmin(false);
    alert("Sistema reiniciado com sucesso!");
  };

  const handleAdminAccess = () => {
    setShowPassword(false);
    setShowAdmin(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const soldCount = raffle.numbers.filter(n => n.status === 'sold').length;
  const availableCount = raffle.numbers.filter(n => n.status === 'available').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-32 flex flex-col">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow">
        <Stats sold={soldCount} total={TOTAL_NUMBERS} available={availableCount} />
        
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8 border border-slate-100">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Escolha seus Números</h2>
              <p className="text-slate-500">{APP_MESSAGES.DESCRIPTION}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300"></div>
                <span className="text-sm font-medium text-slate-600">Livre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-600"></div>
                <span className="text-sm font-medium text-slate-600">Sua Reserva</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-rose-500 opacity-50"></div>
                <span className="text-sm font-medium text-slate-600">Vendido</span>
              </div>
            </div>
          </div>

          <RaffleGrid 
            numbers={raffle.numbers} 
            onToggle={handleToggleNumber} 
          />
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-blue-800 flex items-start gap-4 mb-8">
          <div className="bg-blue-600 text-white rounded-full p-2 flex-shrink-0">
            <i className="fas fa-info-circle text-lg"></i>
          </div>
          <div>
            <h4 className="font-bold text-lg">Como funciona?</h4>
            <p className="opacity-90 leading-relaxed">
              Selecione um ou mais números acima. Clique em "Reservar Agora" para gerar sua chave Pix. 
              Após o pagamento, envie o comprovante para o organizador. Quando todos os 100 números forem vendidos, o sorteio será realizado ao vivo!
            </p>
          </div>
        </div>

        <div className="text-center pb-8">
          <button 
            onClick={() => setShowPassword(true)}
            className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fas fa-lock"></i>
            Área Administrativa
          </button>
        </div>
      </main>

      {raffle.selectedIds.length > 0 && (
        <SelectionBar 
          selectedCount={raffle.selectedIds.length} 
          totalPrice={raffle.selectedIds.length * PRICE_PER_NUMBER}
          onConfirm={handleConfirmSelection}
        />
      )}

      {showModal && (
        <PixModal 
          selectedNumbers={raffle.selectedIds}
          totalPrice={raffle.selectedIds.length * PRICE_PER_NUMBER}
          pixKey={raffle.pixKey}
          onClose={() => setShowModal(false)}
          onConfirm={handlePaymentConfirmed}
        />
      )}

      {showPassword && (
        <PasswordModal 
          onClose={() => setShowPassword(false)}
          onSuccess={handleAdminAccess}
        />
      )}

      {showAdmin && (
        <AdminReport 
          numbers={raffle.numbers}
          onClose={() => setShowAdmin(false)}
          onReset={handleResetRaffle}
        />
      )}
    </div>
  );
};

export default App;
