import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface CartCtx {
  items: any[];
  subtotal: number;
  count: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (body: { productId: string; qty?: number; metal?: string; size?: string; name?: string }) => Promise<void>;
  update: (productId: string, qty: number) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [count, setCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast } = useToast();

  const refresh = useCallback(async () => {
    try {
      const r = await api.cart.get();
      setItems(r.items); setSubtotal(r.subtotal); setCount(r.count);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const add = useCallback(async ({ name, ...body }: { productId: string; qty?: number; metal?: string; size?: string; name?: string }) => {
    try {
      await api.cart.add(body);
      await refresh();
      toast(`Added ${name ?? 'piece'} to bag`);
      setDrawerOpen(true);
    } catch (e: any) {
      toast('Could not add to bag', 'error');
    }
  }, [refresh, toast]);

  const update = useCallback(async (productId: string, qty: number) => {
    await api.cart.update(productId, qty); await refresh();
  }, [refresh]);

  const remove = useCallback(async (productId: string) => {
    await api.cart.remove(productId); await refresh();
    toast('Removed from bag', 'info');
  }, [refresh, toast]);

  const clear = useCallback(async () => {
    await api.cart.clear(); await refresh();
  }, [refresh]);

  return (
    <Ctx.Provider value={{
      items, subtotal, count, drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add, update, remove, clear, refresh
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart outside CartProvider');
  return ctx;
}
