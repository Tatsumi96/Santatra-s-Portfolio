import { LanguageProvider } from '@/hooks/use-language';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Santatra | Développeur Web & Mobile Full-Stack',
  description:
    'Portfolio de Santatra, développeur Web et Mobile spécialisé en React, Next.js et React Native. Découvrez mes projets et compétences.',
  keywords: [
    'Santatra',
    'Développeur Web',
    'Développeur Mobile',
    'React',
    'Next.js',
    'React Native',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Santatra' }],
  openGraph: {
    title: 'Santatra | Développeur Web & Mobile Full-Stack',
    description:
      'Portfolio moderne mettant en avant des projets innovants en Web et Mobile.',
    url: 'https://votre-portfolio.com', // À mettre à jour avec l'URL réelle
    siteName: 'Santatra Portfolio',
    images: [
      {
        url: '/Santatra.jpeg',
        width: 800,
        height: 800,
        alt: 'Santatra - Développeur',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
