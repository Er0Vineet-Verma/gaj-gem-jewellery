import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { api } from '../lib/api';
import type { Gem } from '../types';
import { Link } from 'react-router-dom';

const TYPES = [
  { key: 'ring', label: 'Ring', hi: 'अंगूठी', icon: 'ring' as const },
  { key: 'pendant', label: 'Pendant', hi: 'लटकन', icon: 'pendant' as const },
  { key: 'earring', label: 'Earrings', hi: 'बालियाँ', icon: 'earring' as const },
  { key: 'bracelet', label: 'Bracelet', hi: 'कंगन', icon: 'bracelet' as const },
];

const METALS = [
  { key: '22K Gold', label: '22K Yellow', cls: 'swatch-yg' },
  { key: '18K White Gold', label: '18K White', cls: 'swatch-wg' },
  { key: '18K Rose Gold', label: '18K Rose',  cls: 'swatch-rg' },
  { key: 'Platinum', label: 'Platinum',  cls: 'swatch-pt' },
];

export default function Builder() {
  const [gems, setGems] = useState<Gem[]>([]);
  const [type, setType] = useState(TYPES[0]);
  const [metal, setMetal] = useState(METALS[0]);
  const [stone, setStone] = useState<Gem | null>(null);

  useEffect(() => {
    api.gems().then(r => { setGems(r.gems); setStone(r.gems[0]); }).catch(() => {});
  }, []);

  const metalFill =
    metal.key.includes('White') ? '#D8D8DC' :
    metal.key.includes('Rose') ? '#D9A88A' :
    metal.key.includes('Platinum') ? '#C4C4C8' :
    '#D5A04C';

  const metalLight =
    metal.key.includes('White') ? '#F0F0F2' :
    metal.key.includes('Rose') ? '#F0C8B2' :
    metal.key.includes('Platinum') ? '#E0E0E2' :
    '#F4D482';

  const stoneColor = stone?.color ?? '#7A1E1E';

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-20"
    >
      <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-2">Visualiser</div>
          <h2 className="font-display text-3xl sm:text-4xl mt-1">Design it in your head. <span className="italic gold-text">See it here.</span></h2>
          <p className="muted mt-3">Pick a type, a metal and a stone — we'll redraw it in real time. Send the look to our studio and we'll make it for you.</p>

          <div className="mt-8 space-y-6">
            <div>
              <div className="label mb-2">Piece</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map(t => (
                  <button key={t.key} onClick={() => setType(t)}
                    className={`px-3 py-2 rounded-full inline-flex items-center gap-2 text-sm transition ${type.key === t.key ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                    <Icon name={t.icon} size={16} /> {t.label} <span className="font-deva muted text-xs">{t.hi}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="label mb-2">Metal</div>
              <div className="flex flex-wrap gap-2">
                {METALS.map(m => (
                  <button key={m.key} onClick={() => setMetal(m)}
                    className={`pl-1 pr-3 py-1 rounded-full inline-flex items-center gap-2 text-sm transition ${metal.key === m.key ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                    <span className={`w-6 h-6 rounded-full ${m.cls} ring-1 ring-white`} />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="label mb-2">Stone</div>
              <div className="flex flex-wrap gap-2">
                {gems.map(g => (
                  <button key={g.id} onClick={() => setStone(g)}
                    className={`pl-1 pr-3 py-1 rounded-full inline-flex items-center gap-2 text-sm transition ${stone?.id === g.id ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                    <span className="w-6 h-6 rounded-full ring-1 ring-white" style={{ background: g.color }} />
                    {g.en} <span className="font-deva text-xs muted">{g.hi}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link to="/custom" className="btn btn-primary"><Icon name="arrow-right" size={16} /> Continue in custom design</Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-warm to-stone/40 shadow-soft flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 300" className="w-[82%] h-[82%]">
              <defs>
                <radialGradient id="bg-metal" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={metalLight} />
                  <stop offset="100%" stopColor={metalFill} />
                </radialGradient>
                <radialGradient id="bg-stone" cx="38%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#fff" stopOpacity=".65" />
                  <stop offset="60%" stopColor={stoneColor} stopOpacity=".9" />
                  <stop offset="100%" stopColor={stoneColor} />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ring */}
              {type.key === 'ring' && (
                <>
                  {/* Shadow */}
                  <ellipse cx="150" cy="232" rx="72" ry="10" fill="rgba(0,0,0,.12)" />
                  {/* Band */}
                  <ellipse cx="150" cy="215" rx="74" ry="20" fill="none" stroke="url(#bg-metal)" strokeWidth="17" strokeLinecap="round" />
                  {/* Highlight on band */}
                  <ellipse cx="150" cy="208" rx="60" ry="12" fill="none" stroke={metalLight} strokeWidth="4" strokeLinecap="round" opacity={0.5} />
                  {/* Prong basket */}
                  <circle cx="150" cy="120" r="44" fill="url(#bg-stone)" />
                  <circle cx="150" cy="120" r="44" fill="none" stroke={metalFill} strokeWidth="3.5" />
                  {/* Prong tips */}
                  <circle cx="150" cy="76" r="5.5" fill={metalFill} />
                  <circle cx="150" cy="164" r="5.5" fill={metalFill} />
                  <circle cx="106" cy="120" r="5.5" fill={metalFill} />
                  <circle cx="194" cy="120" r="5.5" fill={metalFill} />
                  {/* Prong stems */}
                  <line x1="150" y1="81" x2="150" y2="97" stroke={metalFill} strokeWidth="3" strokeLinecap="round" />
                  <line x1="150" y1="159" x2="150" y2="143" stroke={metalFill} strokeWidth="3" strokeLinecap="round" />
                  <line x1="111" y1="120" x2="127" y2="120" stroke={metalFill} strokeWidth="3" strokeLinecap="round" />
                  <line x1="189" y1="120" x2="173" y2="120" stroke={metalFill} strokeWidth="3" strokeLinecap="round" />
                  {/* Stone facets */}
                  <circle cx="150" cy="120" r="28" fill="none" stroke="white" strokeWidth="1" opacity={0.22} />
                  <line x1="150" y1="78" x2="150" y2="162" stroke="white" strokeWidth="0.8" opacity={0.14} />
                  <line x1="108" y1="120" x2="192" y2="120" stroke="white" strokeWidth="0.8" opacity={0.14} />
                </>
              )}

              {/* Pendant */}
              {type.key === 'pendant' && (
                <>
                  {/* Chain */}
                  <path d="M50 52 Q150 28 250 52" fill="none" stroke={metalFill} strokeWidth="2.5" strokeLinecap="round" opacity={0.75} />
                  {/* Chain links hint */}
                  {[80, 110, 140, 160, 190, 220].map((x, i) => {
                    const y = 52 - Math.sin(((x - 150) / 200) * Math.PI) * 12;
                    return <circle key={i} cx={x} cy={y} r="2.5" fill={metalFill} opacity={0.6} />;
                  })}
                  {/* Bail */}
                  <path d="M140 52 Q138 68 150 76 Q162 68 160 52" fill="none" stroke={metalFill} strokeWidth="3.5" strokeLinecap="round" />
                  {/* Teardrop body */}
                  <path d="M150 80 C118 108 114 170 150 196 C186 170 182 108 150 80 Z" fill="url(#bg-stone)" />
                  <path d="M150 80 C118 108 114 170 150 196 C186 170 182 108 150 80 Z" fill="none" stroke={metalFill} strokeWidth="3" />
                  {/* Facets */}
                  <ellipse cx="150" cy="140" rx="22" ry="34" fill="none" stroke="white" strokeWidth="1" opacity={0.2} />
                  <line x1="150" y1="82" x2="150" y2="194" stroke="white" strokeWidth="0.8" opacity={0.13} />
                  {/* Cap ornament */}
                  <path d="M138 82 Q150 72 162 82" fill={metalFill} stroke={metalFill} strokeWidth="1" />
                </>
              )}

              {/* Earrings */}
              {type.key === 'earring' && (
                <>
                  {/* Left wire hook */}
                  <path d="M88 58 Q84 38 100 30 Q118 22 118 48 L115 82" fill="none" stroke={metalFill} strokeWidth="3.5" strokeLinecap="round" />
                  {/* Right wire hook */}
                  <path d="M212 58 Q216 38 200 30 Q182 22 182 48 L185 82" fill="none" stroke={metalFill} strokeWidth="3.5" strokeLinecap="round" />
                  {/* Left drop — teardrop */}
                  <path d="M115 82 C95 108 90 168 115 192 C140 168 136 108 115 82 Z" fill="url(#bg-stone)" />
                  <path d="M115 82 C95 108 90 168 115 192 C140 168 136 108 115 82 Z" fill="none" stroke={metalFill} strokeWidth="2.5" />
                  {/* Right drop */}
                  <path d="M185 82 C165 108 160 168 185 192 C210 168 206 108 185 82 Z" fill="url(#bg-stone)" />
                  <path d="M185 82 C165 108 160 168 185 192 C210 168 206 108 185 82 Z" fill="none" stroke={metalFill} strokeWidth="2.5" />
                  {/* Facets */}
                  <ellipse cx="115" cy="140" rx="14" ry="24" fill="none" stroke="white" strokeWidth="1" opacity={0.2} />
                  <ellipse cx="185" cy="140" rx="14" ry="24" fill="none" stroke="white" strokeWidth="1" opacity={0.2} />
                  {/* Cap ornaments */}
                  <path d="M106 84 Q115 76 124 84" fill={metalFill} />
                  <path d="M176 84 Q185 76 194 84" fill={metalFill} />
                </>
              )}

              {/* Bracelet */}
              {type.key === 'bracelet' && (
                <>
                  {/* Shadow */}
                  <ellipse cx="150" cy="178" rx="116" ry="14" fill="rgba(0,0,0,.10)" />
                  {/* Band */}
                  <ellipse cx="150" cy="160" rx="118" ry="42" fill="none" stroke="url(#bg-metal)" strokeWidth="15" />
                  {/* Band highlight */}
                  <ellipse cx="150" cy="148" rx="100" ry="28" fill="none" stroke={metalLight} strokeWidth="5" opacity={0.45} />
                  {/* Stones along top of band */}
                  {([[62, 136], [95, 122], [128, 118], [150, 116], [172, 118], [205, 122], [238, 136]] as [number, number][]).map(([cx, cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="12.5" fill="url(#bg-stone)" />
                      <circle cx={cx} cy={cy} r="12.5" fill="none" stroke={metalFill} strokeWidth="2.5" />
                      <circle cx={cx} cy={cy} r="7" fill="none" stroke="white" strokeWidth="0.8" opacity={0.2} />
                    </g>
                  ))}
                  {/* Clasp hint */}
                  <rect x="138" y="196" width="24" height="10" rx="3" fill={metalFill} opacity={0.7} />
                </>
              )}
            </svg>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 bg-white/85 dark:bg-[rgba(18,6,9,.88)] backdrop-blur rounded-2xl px-3 py-2.5">
              <div className="text-xs min-w-0">
                <div className="font-display text-sm md:text-base truncate">{type.label} · {metal.label} · {stone?.en}</div>
                <div className="font-deva muted truncate">{type.hi} · {stone?.hi}</div>
              </div>
              <span className="text-xs gold-text shrink-0">Live preview</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
