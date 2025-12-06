
import React, { useState } from 'react';
import { Lock, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { ADMIN_PASSWORD, GOOGLE_SHEET_EDIT_URL } from '../constants';

export const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const openSheet = () => {
    window.open(GOOGLE_SHEET_EDIT_URL, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button in Footer */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-2 bg-slate-800 text-slate-500 rounded-full hover:bg-slate-700 hover:text-white transition-all opacity-50 hover:opacity-100"
        title="Admin Access"
      >
        <Lock className="w-4 h-4" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Admin Access</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isAuthenticated ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <p className="text-sm text-gray-500">Enter password to manage bookings.</p>
                  <div>
                    <input
                      type="password"
                      autoFocus
                      placeholder="Password"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs mt-1">Incorrect password</p>}
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
                    Unlock
                  </button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Access Granted</h3>
                  <p className="text-sm text-gray-500">
                    You can now open the CRM database to manage bookings, payments, and cancellations.
                  </p>
                  <button 
                    onClick={openSheet}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
                  >
                    Open CRM (Google Sheets)
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
