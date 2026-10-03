import localFont from 'next/font/local';

export const openSans = localFont({
  src: './fonts/open-sans-latin.woff2',
  weight: '400 600',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

export const geologica = localFont({
  src: './fonts/geologica-latin.woff2',
  weight: '400 600',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});
