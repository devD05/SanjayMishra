import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary':                  '#8f4e00',
        'primary-container':        '#ff9933',
        'on-primary':               '#ffffff',
        'secondary':                '#735c00',
        'secondary-container':      '#fed65b',
        'secondary-fixed-dim':      '#e9c349',
        'background':               '#faf9f5',
        'surface':                  '#faf9f5',
        'surface-bright':           '#faf9f5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low':    '#f4f4f0',
        'surface-container':        '#efeeea',
        'surface-container-high':   '#e9e8e4',
        'surface-container-highest':'#e3e2df',
        'surface-dim':              '#dbdad6',
        'on-surface':               '#1b1c1a',
        'on-surface-variant':       '#554336',
        'on-secondary':             '#ffffff',
        'on-secondary-container':   '#745c00',
        'outline':                  '#887364',
        'outline-variant':          '#dbc2b0',
        'inverse-surface':          '#2f312e',
        'inverse-primary':          '#ffb77a',
        'surface-tint':             '#8f4e00',
        'primary-fixed':            '#ffdcc2',
        'primary-fixed-dim':        '#ffb77a',
        'surface-variant':          '#e3e2df',
      },
      fontFamily: {
        'headline': ['var(--font-literata)', 'Georgia', 'serif'],
        'body':     ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg':        ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg-mobile': ['40px', { lineHeight: '48px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg':       ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-md':       ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'body-lg':           ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md':           ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md':          ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        '2xl':   '1rem',
        '3xl':   '1.5rem',
        '4xl':   '2rem',
        full:    '9999px',
      },
      spacing: {
        'gutter':            '24px',
        'margin-mobile':     '20px',
        'section-padding':   '120px',
        'container-max':     '1200px',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}

export default config
