import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface WishlistCtx {
  ids: Set<string>;
  count: number;
  items: any[];
  toggle: (productId: string, productName?: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);
  const { toast } = useToast();

  const refresh = useCallback(async () => {
    try {
      const r = await api.wishlist.get();
      setItems(r.items);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const ids = new Set(items.map(i => i.id));

  const toggle = useCallback(async (productId: string, productName?: string) => {
    try {
      if (ids.has(productId)) {
        await api.wishlist.remove(productId);
        toast(`Removed from wishlist`, 'info');
      } else {
        await api.wishlist.add(productId);
        toast(`Saved ${productName ?? 'piece'} to wishlist`);
      }
      await refresh();
    } catch (e: any) {
      toast('Could not update wishlist', 'error');
    }
  }, [ids, refresh, toast]);

  return <Ctx.Provider value={{ ids, count: items.length, items, toggle, refresh }}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWishlist outside WishlistProvider');
  return ctx;
}
