import React from 'react';

type IconName =
  | 'search' | 'heart' | 'heart-fill' | 'bag' | 'menu' | 'close'
  | 'whatsapp' | 'phone' | 'mail' | 'arrow-right' | 'arrow-down' | 'plus' | 'minus'
  | 'instagram' | 'facebook' | 'pinterest'
  | 'ring' | 'pendant' | 'earring' | 'bracelet' | 'necklace'
  | 'diamond' | 'gem' | 'leaf' | 'drop' | 'moon' | 'sun' | 'sparkle' | 'shield' | 'scale'
  | 'pin' | 'chat' | 'star' | 'star-fill' | 'check' | 'play' | 'pencil';

interface Props { name: IconName; size?: number; className?: string; strokeWidth?: number; }

export default function Icon({ name, size = 20, className, strokeWidth = 1.6 }: Props) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className };

  switch (name) {
    case 'search':     return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'heart':      return <svg {...p}><path d="M20.8 7.6a5 5 0 0 0-8.8-3.2A5 5 0 0 0 3.2 7.6c0 5.9 8.8 11 8.8 11s8.8-5.1 8.8-11Z"/></svg>;
    case 'heart-fill': return <svg {...p} fill="currentColor" stroke="none"><path d="M20.8 7.6a5 5 0 0 0-8.8-3.2A5 5 0 0 0 3.2 7.6c0 5.9 8.8 11 8.8 11s8.8-5.1 8.8-11Z"/></svg>;
    case 'bag':        return <svg {...p}><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>;
    case 'menu':       return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close':      return <svg {...p}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case 'whatsapp':   return <svg {...p}><path d="M21 12c0 5-4 9-9 9-1.6 0-3.1-.4-4.4-1.2L3 21l1.2-4.6A8.9 8.9 0 0 1 3 12a9 9 0 0 1 18 0Z"/><path d="M9 9.5c0-.3.2-.5.5-.5h.5c.3 0 .5.1.6.5l.7 1.7c.1.2 0 .5-.2.6l-.4.4a5 5 0 0 0 2.6 2.6l.4-.4c.2-.2.4-.3.7-.2l1.7.7c.3.1.5.3.5.6V16c0 1.1-1 1.5-2 1-.8-.4-3.7-2.1-5-5-.5-1 0-2.2 1-2.5Z"/></svg>;
    case 'phone':      return <svg {...p}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case 'mail':       return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'arrow-right':return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-down': return <svg {...p}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case 'plus':       return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':      return <svg {...p}><path d="M5 12h14"/></svg>;
    case 'instagram':  return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
    case 'facebook':   return <svg {...p}><path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2Z"/></svg>;
    case 'pinterest':  return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M10.5 15.5 9 21M9.5 9.5a2.5 2.5 0 1 1 4.5 2c-1 1.5-3 1-3 3"/></svg>;
    case 'ring':       return <svg {...p}><circle cx="12" cy="15" r="5"/><path d="m9 8 3-4 3 4"/></svg>;
    case 'pendant':    return <svg {...p}><path d="M4 5h16"/><path d="M8 5l4 8 4-8"/><circle cx="12" cy="17" r="3"/></svg>;
    case 'earring':    return <svg {...p}><path d="M9 4a3 3 0 1 1 6 0"/><path d="M12 7v2"/><circle cx="12" cy="14" r="5"/></svg>;
    case 'bracelet':   return <svg {...p}><ellipse cx="12" cy="12" rx="8" ry="4"/><circle cx="6" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1" fill="currentColor" stroke="none"/></svg>;
    case 'necklace':   return <svg {...p}><path d="M4 5c0 5 3.5 9 8 9s8-4 8-9"/><circle cx="12" cy="17" r="2"/></svg>;
    case 'diamond':    return <svg {...p}><path d="m3 9 3-5h12l3 5-9 12L3 9Z"/><path d="M3 9h18M8 4 12 9 16 4"/></svg>;
    case 'gem':        return <svg {...p}><path d="M6 4h12l3 6-9 10L3 10l3-6Z"/><path d="M3 10h18"/></svg>;
    case 'leaf':       return <svg {...p}><path d="M5 19s-.5-10 14-14c0 14-9.5 14-14 14ZM5 19l7-7"/></svg>;
    case 'drop':       return <svg {...p}><path d="M12 3s-6 6-6 11a6 6 0 0 0 12 0c0-5-6-11-6-11Z"/></svg>;
    case 'moon':       return <svg {...p}><path d="M20 14a8 8 0 1 1-10-10 6 6 0 0 0 10 10Z"/></svg>;
    case 'sun':        return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M17.7 6.3l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>;
    case 'sparkle':    return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case 'shield':     return <svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'scale':      return <svg {...p}><path d="M12 4v16M5 20h14"/><path d="m5 10 3-6 3 6M13 10l3-6 3 6"/><path d="M5 10a3 3 0 0 0 6 0M13 10a3 3 0 0 0 6 0"/></svg>;
    case 'pin':        return <svg {...p}><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'chat':       return <svg {...p}><path d="M4 5h16v11H9l-5 4V5Z"/></svg>;
    case 'star':       return <svg {...p}><path d="m12 3 2.8 6 6.2.6-4.7 4.3 1.4 6.1L12 17l-5.7 3 1.4-6.1L3 9.6l6.2-.6L12 3Z"/></svg>;
    case 'star-fill':  return <svg {...p} fill="currentColor" stroke="none"><path d="m12 3 2.8 6 6.2.6-4.7 4.3 1.4 6.1L12 17l-5.7 3 1.4-6.1L3 9.6l6.2-.6L12 3Z"/></svg>;
    case 'check':      return <svg {...p}><path d="m5 12 5 5 9-11"/></svg>;
    case 'play':       return <svg {...p}><path d="M8 5v14l11-7L8 5Z"/></svg>;
    case 'pencil':     return <svg {...p}><path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="m14 6 4 4"/></svg>;
    default:           return null;
  }
}
