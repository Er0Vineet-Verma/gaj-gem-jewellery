import React, { createContext, useCallback, useContext, useState } from 'react';

interface Toast { id: number; kind: 'success' | 'error' | 'info'; message: string; }
interface ToastCtx { toast: (message: string, kind?: Toast['kind']) => void; }

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const toast = useCallback((message: string, kind: Toast['kind'] = 'success') => {
    const id = Date.now() + Math.random();
    setItems(arr => [...arr, { id, kind, message }]);
    setTimeout(() => setItems(arr => arr.filter(t => t.id !== id)), 3200);
  }, []);
  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2">
        {items.map(t => (
          <div key={t.id}
            className={`px-4 py-3 rounded-xl shadow-soft text-sm font-medium min-w-[220px] border
              ${t.kind === 'success' ? 'bg-white text-ink border-stone' : ''}
              ${t.kind === 'error' ? 'bg-ruby-brand text-ivory border-ruby-brand' : ''}
              ${t.kind === 'info' ? 'bg-ink text-ivory border-ink' : ''}`}>
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast outside ToastProvider');
  return ctx;
}
