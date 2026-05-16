import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { api } from '../lib/api';
import { inr } from '../lib/format';
import { useToast } from '../contexts/ToastContext';
import type { Gem } from '../types';

const TYPES = [
  { key: 'Ring', hi: 'अंगूठी', icon: 'ring' as const },
  { key: 'Pendant', hi: 'लटकन', icon: 'pendant' as const },
  { key: 'Earrings', hi: 'बालियाँ', icon: 'earring' as const },
  { key: 'Bracelet', hi: 'कंगन', icon: 'bracelet' as const },
  { key: 'Necklace', hi: 'हार', icon: 'necklace' as const },
];

const METALS = [
  { key: '22K Gold', cls: 'swatch-yg' },
  { key: '18K Gold', cls: 'swatch-yg' },
  { key: '18K White Gold', cls: 'swatch-wg' },
  { key: '18K Rose Gold', cls: 'swatch-rg' },
  { key: 'Platinum', cls: 'swatch-pt' },
];

const SIZES = ['10', '12', '14', '16', '18', '20', 'Standard'];
const BUDGETS = [25000, 50000, 100000, 200000, 500000];

export default function CustomDesign() {
  const [step, setStep] = useState(1);
  const [gems, setGems] = useState<Gem[]>([]);
  const [state, setState] = useState({
    type: 'Ring', metal: '22K Gold', stone: 'Ruby', stoneHi: 'माणिक',
    size: '14', budget: 100000, name: '', phone: '', notes: '', referenceUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ whatsappUrl: string; id: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    api.gems().then(r => setGems(r.gems)).catch(() => {});
  }, []);

  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) => setState(s => ({ ...s, [k]: v }));
  const canNext = () => {
    if (step === 1) return !!state.type;
    if (step === 2) return !!state.metal;
    if (step === 3) return !!state.stone;
    if (step === 4) return !!state.size;
    if (step === 5) return !!state.budget;
    if (step === 6) return !!state.name && state.phone.replace(/\D/g, '').length >= 7;
    return true;
  };

  const submit = async () => {
    if (!canNext()) return toast('Please add your name and phone so we can reach you.', 'error');
    setSubmitting(true);
    try {
      const r = await api.custom({
        name: state.name, phone: state.phone, type: state.type, stone: state.stone, stoneHi: state.stoneHi,
        metal: state.metal, size: state.size, budget: state.budget, notes: state.notes || undefined,
        referenceUrl: state.referenceUrl || undefined,
      });
      setDone({ whatsappUrl: r.whatsappUrl, id: r.id });
      toast('Request sent — we\'ll write back within 48 hours.');
    } catch {
      toast('Could not send — please try WhatsApp directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const activeMetalFill =
    state.metal.includes('White') ? '#E0E0E4' :
    state.metal.includes('Rose') ? '#D9A38A' :
    state.metal.includes('Platinum') ? '#C7C7CC' :
    '#D5A04C';
  const activeStoneColor = gems.find(g => g.en === state.stone)?.color ?? '#7A1E1E';

  const typeIcon = TYPES.find(t => t.key === state.type)?.icon ?? 'ring';

  return (
    <section className="py-12">
      <div className="container-x">
        <header className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-[0.28em] muted">Custom design · 6 steps</div>
          <h1 className="font-display text-3xl sm:text-4xl mt-1">Design your own piece <span className="font-deva text-xl sm:text-2xl muted block sm:inline mt-1 sm:mt-0">अपना आभूषण</span></h1>
          <p className="muted mt-3 max-w-xl mx-auto">A guided flow — from the kind of piece you want, down to a first quote from our studio. Takes about 90 seconds.</p>
        </header>

        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="flex items-center gap-1 sm:gap-2">
              <span className={`step-dot ${n === step ? 'active' : n < step ? 'done' : ''}`}>{n < step ? <Icon name="check" size={14} /> : n}</span>
              {n < 6 && <span className={`w-4 sm:w-8 h-px ${n < step ? 'bg-gold-deep' : 'bg-ink/15'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="card p-5 md:p-8">
              {step === 1 && (
                <>
                  <h3 className="font-display text-2xl">1 · Choose a type</h3>
                  <p className="muted text-sm mt-1">What are we making?</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
                    {TYPES.map(t => (
                      <button key={t.key} onClick={() => set('type', t.key)}
                        className={`p-4 rounded-2xl text-left transition ${state.type === t.key ? 'bg-ink text-ivory' : 'bg-white border hairline hover:border-gold-deep'}`}>
                        <Icon name={t.icon} size={26} />
                        <div className="font-display text-lg mt-2">{t.key}</div>
                        <div className="font-deva text-xs opacity-70">{t.hi}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="font-display text-2xl">2 · Pick a metal</h3>
                  <p className="muted text-sm mt-1">Gold, platinum, or silver — your call.</p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-5">
                    {METALS.map(m => (
                      <button key={m.key} onClick={() => set('metal', m.key)}
                        className={`p-4 rounded-2xl text-left transition flex items-center gap-3 ${state.metal === m.key ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                        <span className={`w-10 h-10 rounded-full ${m.cls} ring-2 ring-white`} />
                        <span className="font-medium">{m.key}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="font-display text-2xl">3 · Choose a stone</h3>
                  <p className="muted text-sm mt-1">Each stone has its own character.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                    {gems.map(g => (
                      <button key={g.id} onClick={() => { set('stone', g.en); set('stoneHi', g.hi); }}
                        className={`p-3 rounded-2xl text-left transition flex items-center gap-3 ${state.stone === g.en ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                        <span className="w-9 h-9 rounded-full ring-2 ring-white" style={{ background: g.color }} />
                        <span>
                          <div className="text-sm font-medium">{g.en}</div>
                          <div className="font-deva text-xs opacity-70">{g.hi}</div>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="font-display text-2xl">4 · Size</h3>
                  <p className="muted text-sm mt-1">Not sure? Pick a guess — we'll confirm before making.</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {SIZES.map(s => (
                      <button key={s} onClick={() => set('size', s)}
                        className={`px-4 py-2 rounded-full text-sm transition ${state.size === s ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <h3 className="font-display text-2xl">5 · Budget</h3>
                  <p className="muted text-sm mt-1">A rough range helps us propose the right stone and setting.</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {BUDGETS.map(b => (
                      <button key={b} onClick={() => set('budget', b)}
                        className={`px-4 py-2 rounded-full text-sm transition ${state.budget === b ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                        Up to {inr(b)}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5">
                    <label className="label">Or enter a custom budget</label>
                    <input type="number" value={state.budget} onChange={e => set('budget', Number(e.target.value) || 0)} className="input mt-1.5 max-w-[220px]" />
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <h3 className="font-display text-2xl">6 · You</h3>
                  <p className="muted text-sm mt-1">We'll reach out on WhatsApp within 48 hours.</p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-5">
                    <div>
                      <label className="label">Your name</label>
                      <input value={state.name} onChange={e => set('name', e.target.value)} className="input mt-1.5" placeholder="Full name" />
                    </div>
                    <div>
                      <label className="label">Phone / WhatsApp</label>
                      <input value={state.phone} onChange={e => set('phone', e.target.value)} className="input mt-1.5" placeholder="+91 9…" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Reference link (optional)</label>
                      <input value={state.referenceUrl} onChange={e => set('referenceUrl', e.target.value)} className="input mt-1.5" placeholder="Pinterest, Instagram, or any image URL" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Notes to our designer</label>
                      <textarea value={state.notes} onChange={e => set('notes', e.target.value)} rows={4} className="input mt-1.5" placeholder="Any story, occasion, or sketch in words." />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between mt-8">
                <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="btn btn-ghost disabled:opacity-40">
                  <Icon name="arrow-right" size={14} className="rotate-180" /> Back
                </button>
                {step < 6 ? (
                  <button onClick={() => setStep(s => Math.min(6, s + 1))} disabled={!canNext()} className="btn btn-primary disabled:opacity-40">
                    Next <Icon name="arrow-right" size={14} />
                  </button>
                ) : (
                  <button onClick={submit} disabled={submitting || !canNext()} className="btn btn-gold disabled:opacity-40">
                    <Icon name="whatsapp" size={16} /> {submitting ? 'Sending…' : 'Send to studio'}
                  </button>
                )}
              </div>

              {done && (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-brand text-ivory">
                  <div className="flex items-center gap-2 font-display text-lg"><Icon name="check" /> Sent · Ref {done.id}</div>
                  <p className="text-sm text-ivory/80 mt-1">A sketch and quote will reach you within 48 hours. You can also open the pre-filled WhatsApp message below.</p>
                  <a href={done.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-gold mt-3"><Icon name="whatsapp" size={16} /> Open WhatsApp</a>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="card p-6 sticky top-24">
              <div className="text-[10px] uppercase tracking-[0.22em] muted">Live preview</div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-warm to-stone/40 mt-3 flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-[80%] h-[80%]">
                  <defs>
                    <radialGradient id="m2" cx="50%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fff" stopOpacity=".7" />
                      <stop offset="100%" stopColor={activeMetalFill} />
                    </radialGradient>
                    <radialGradient id="s2" cx="50%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fff" stopOpacity=".55" />
                      <stop offset="100%" stopColor={activeStoneColor} />
                    </radialGradient>
                  </defs>
                  {typeIcon === 'ring' && (<><ellipse cx="150" cy="200" rx="78" ry="22" fill="none" stroke="url(#m2)" strokeWidth="14" /><circle cx="150" cy="135" r="38" fill="url(#s2)" stroke={activeMetalFill} strokeWidth="3" /></>)}
                  {typeIcon === 'pendant' && (<><line x1="40" y1="60" x2="260" y2="60" stroke={activeMetalFill} strokeWidth="3" /><path d="M150 70 L120 130 L150 220 L180 130 Z" fill="url(#s2)" stroke={activeMetalFill} strokeWidth="3" /></>)}
                  {typeIcon === 'earring' && (<><circle cx="100" cy="170" r="40" fill="url(#s2)" stroke={activeMetalFill} strokeWidth="3" /><circle cx="200" cy="170" r="40" fill="url(#s2)" stroke={activeMetalFill} strokeWidth="3" /></>)}
                  {typeIcon === 'bracelet' && (<ellipse cx="150" cy="150" rx="120" ry="50" fill="none" stroke={activeMetalFill} strokeWidth="14" />)}
                  {typeIcon === 'necklace' && (<><path d="M40 60 C 90 160, 210 160, 260 60" fill="none" stroke={activeMetalFill} strokeWidth="5" /><circle cx="150" cy="170" r="22" fill="url(#s2)" stroke={activeMetalFill} strokeWidth="3" /></>)}
                </svg>
              </div>

              <dl className="mt-5 text-sm space-y-2">
                <div className="flex justify-between"><dt className="muted">Type</dt><dd className="font-medium">{state.type}</dd></div>
                <div className="flex justify-between"><dt className="muted">Metal</dt><dd className="font-medium">{state.metal}</dd></div>
                <div className="flex justify-between"><dt className="muted">Stone</dt><dd className="font-medium">{state.stone} <span className="font-deva muted">{state.stoneHi}</span></dd></div>
                <div className="flex justify-between"><dt className="muted">Size</dt><dd className="font-medium">{state.size}</dd></div>
                <div className="flex justify-between"><dt className="muted">Budget</dt><dd className="font-medium gold-text">{inr(state.budget)}</dd></div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
