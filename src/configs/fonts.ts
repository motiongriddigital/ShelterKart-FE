import localFont from 'next/font/local';

// next/font renames families, so the brand font tokens point at these CSS variables (see styles/globals.scss).
export const fraunces = localFont({
  src: '../../public/fonts/fraunces-latin-600-normal.woff2',
  weight: '600',
  variable: '--font-fraunces',
  display: 'swap',
});

export const instrument = localFont({
  src: [
    { path: '../../public/fonts/InstrumentSans-Regular.ttf', weight: '400' },
    { path: '../../public/fonts/InstrumentSans-Bold.ttf', weight: '700' },
  ],
  variable: '--font-instrument',
  display: 'swap',
});

export const fontVariables = `${fraunces.variable} ${instrument.variable}`;
