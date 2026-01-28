
import React, { useState } from 'react';
import { PIX_BANK, PIX_BENEFICIARY, SUPPORT_PHONE } from '../constants';

interface PixModalProps {
  selectedNumbers: number[];
  totalPrice: number;
  pixKey: string;
  onClose: () => void;
  onConfirm: (name: string, phone: string) => void;
}

const PixModal: React.FC<PixModalProps> = ({ selectedNumbers, totalPrice, pixKey, onClose, onConfirm }) => {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Clean mask implementation for 10 or 11 digits
    let clean = value;
    let formatted = clean;
    if (clean.length > 0) {
      if (clean.length <= 2) {
        formatted = `(${clean}`;
      } else if (clean.length <= 6) {
        formatted = `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
      } else if (clean.length <= 10) {
        formatted = `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
      } else {
        formatted = `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
      }
    }

    setPhone(formatted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 2 && phone.length >= 14) {
      setStep('payment');
    }
  };

  const messageTemplate = `Olá! Sou ${name}. Acabei de reservar os números: ${selectedNumbers.join(', ')} para a Rifa do Smart Wash. 
Total: R$ ${totalPrice.toFixed(2)}. 
Estou enviando o comprovante em anexo.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          
          {step === 'details' ? (
            <>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <i className="fas fa-user-edit text-2xl"></i>
              </div>
              <h2 className="text-3xl font-extrabold mb-2">Seus Dados</h2>
              <p className="text-blue-100">Precisamos do seu contato para o sorteio</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <i className="fas fa-qrcode text-3xl"></i>
              </div>
              <h2 className="text-3xl font-extrabold mb-2">Pagamento Pix</h2>
              <p className="text-blue-100">Falta pouco para garantir seus números!</p>
            </>
          )}
        </div>
        
        <div className="p-8">
          {step === 'details' ? (
            <form onSubmit={handleSubmitDetails} className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6">
                <p className="text-sm text-blue-800 font-medium text-center">
                  Você selecionou {selectedNumbers.length} números: <br/>
                  <span className="font-bold text-lg">{selectedNumbers.join(', ')}</span>
                </p>
                <p className="text-center font-bold text-2xl text-blue-600 mt-2">
                  Total: R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2 ml-1" htmlFor="name">Nome Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-user text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    placeholder="Digite seu nome"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2 ml-1" htmlFor="phone">WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fab fa-whatsapp text-slate-400 text-lg"></i>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={name.length < 3 || phone.length < 14}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 mt-4"
              >
                Continuar para Pagamento
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          ) : (
            <div className="animate-in slide-in-from-right duration-300">
              <div className="mb-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 font-medium">Cliente:</span>
                  <span className="font-bold text-slate-800">{name}</span>
                </div>
                <div className="flex justify-between items-center text-lg border-t border-slate-200 pt-4">
                  <span className="text-slate-800 font-bold">Total a pagar:</span>
                  <span className="text-blue-600 font-black text-2xl">R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                   <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dados do Recebedor</h5>
                   <div className="flex justify-between mb-1">
                      <span className="text-slate-500 text-sm">Banco:</span>
                      <span className="font-bold text-slate-800 text-sm">{PIX_BANK}</span>
                   </div>
                   <div className="flex justify-between items-start">
                      <span className="text-slate-500 text-sm whitespace-nowrap mr-4">Nome:</span>
                      <span className="font-bold text-slate-800 text-sm text-right break-words">{PIX_BENEFICIARY}</span>
                   </div>
                </div>

                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                  <i className="fas fa-key text-blue-500"></i>
                  Chave Pix
                </h4>
                
                <div className="relative">
                  <textarea 
                    readOnly
                    className="w-full bg-slate-100 p-4 pr-12 rounded-2xl text-slate-600 text-lg font-bold font-mono border border-slate-200 h-20 resize-none focus:outline-none flex items-center"
                    value={pixKey}
                    style={{ paddingTop: '1.5rem' }}
                  />
                  <button 
                    onClick={copyToClipboard}
                    className={`absolute top-2 right-2 p-3 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'}`}
                  >
                    <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
                </div>
                {copied && <p className="text-emerald-600 text-xs font-bold text-center animate-bounce">Chave copiada!</p>}
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => onConfirm(name, phone)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fas fa-check-circle"></i>
                  Já realizei o pagamento
                </button>
                
                <a 
                  href={`https://wa.me/55${SUPPORT_PHONE}?text=${encodeURIComponent(messageTemplate)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  Enviar Comprovante
                </a>
                
                <button 
                  onClick={() => setStep('details')}
                  className="w-full text-slate-400 py-2 font-medium hover:text-slate-600 transition-colors text-sm"
                >
                  Voltar e corrigir dados
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixModal;
