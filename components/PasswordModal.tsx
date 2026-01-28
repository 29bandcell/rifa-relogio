
import React, { useState } from 'react';
import { ADMIN_PASSWORD } from '../constants';

interface PasswordModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-200">
        <div className="bg-slate-800 p-6 text-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-lock text-xl text-white"></i>
          </div>
          <h3 className="text-xl font-bold text-white">Área Restrita</h3>
          <p className="text-slate-400 text-sm">Digite a senha de administrador</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4 relative">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-slate-50 border ${error ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-500'} text-slate-800 rounded-xl px-4 py-3 outline-none transition-all text-center tracking-widest text-lg`}
              placeholder="••••••"
            />
            {error && (
              <p className="text-rose-500 text-xs font-bold text-center mt-2 animate-bounce">
                Senha incorreta!
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-500/30"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
