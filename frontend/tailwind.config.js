/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        'ink-2': '#1A1A1D',
        ivory: '#F6F2EC',
        warm: '#FBF8F3',
        stone: '#E8DFC9',
        gold: { soft: '#C6A86B', deep: '#A88445' },
        emerald: { brand: '#1F3D36' },
        ruby: { brand: '#7A1E1E' },
        copper: '#B87554',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      maxWidth: { container: '1240px' },
      boxShadow: {
        soft: '0 1px 3px rgba(11,11,12,0.04), 0 12px 28px -16px rgba(11,11,12,0.10)',
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to:   { backgroundPosition: '350% 50%, 350% 50%' },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  const colors = theme('colors');
  const vars = {};
  flatten(colors, '', vars);
  addBase({ ':root': vars });
}

function flatten(obj, prefix, out) {
  for (const [key, val] of Object.entries(obj)) {
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object') {
      flatten(val, name, out);
    } else {
      out[`--${name}`] = val;
    }
  }
}
