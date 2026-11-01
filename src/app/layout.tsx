import { LanguageProvider } from '@/hooks/use-language';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Santatra | Développeur Full-Stack & Automatisation IA',
  description:
    'Portfolio de ANDRIANIRINA Féhizoro Santatra Fitiavana (Santatra), développeur full-stack et automatisation IA, basé à Antsirabe / Vakinankaratra, Madagascar.',
  keywords: [
    'Santatra',
    'Développeur Full-Stack',
    'Développeur Mobile',
    'Automatisation IA',
    'n8n',
    'NestJS',
    'Laravel',
    'Expo',
    'Docker',
    'PostgreSQL',
    'Redis',
    'React',
    'Next.js',
    'React Native',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'ANDRIANIRINA Féhizoro Santatra Fitiavana' }],
  openGraph: {
    title: 'Santatra | Développeur Full-Stack & Automatisation IA',
    description:
      'Portfolio de Santatra : projets full-stack, mobile et automatisation IA.',
    url: 'TODO',
    siteName: 'Santatra Portfolio',
    images: [
      {
        url: '/Santatra.jpeg',
        width: 800,
        height: 800,
        alt: 'ANDRIANIRINA Féhizoro Santatra Fitiavana - Développeur Full-Stack',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 grain`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
