import Icon from '../components/Icon';

const ITEMS = [
  { icon: 'shield',  text: 'BIS 916 Hallmarked' },
  { icon: 'gem',     text: 'GIA & GRS Certified Stones' },
  { icon: 'sparkle', text: 'Lifetime Polish & Resize' },
  { icon: 'leaf',    text: 'Mine-to-Atelier Traceability' },
  { icon: 'pencil',  text: 'Hand-Sketched · Hand-Set' },
  { icon: 'chat',    text: 'Designer Consultation' },
] as const;

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[0, 1].map((pass) => (
          <span key={pass} style={{ display: 'inline-flex', gap: 64 }}>
            {ITEMS.map(({ icon, text }, i) => (
              <span key={`${pass}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                <Icon name={icon as any} size={14} />
                {text}
                {i < ITEMS.length - 1 && <span className="sep">⟡</span>}
              </span>
            ))}
            <span className="sep" style={{ marginLeft: -50 }}>⟡</span>
          </span>
        ))}
      </div>
    </div>
  );
}
