import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import { config } from '@/config';
import { ActiveNav } from '@/components/ActiveNav';
import { Icon, type IconName } from '@/components/Icon';
import { ThemeToggle } from '@/components/ThemeToggle';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: `${config.name} | Software engineer`, template: `%s | ${config.name}` },
  description: config.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: config.name },
  twitter: { card: 'summary_large_image' },
};

const links: { name: IconName; label: string; href: string }[] = [
  { name: 'resume', label: 'Resume (PDF)', href: '/resume.pdf' },
  { name: 'github', label: 'GitHub', href: config.github },
  { name: 'linkedin', label: 'LinkedIn', href: config.linkedin },
  { name: 'email', label: 'Email', href: `mailto:${config.email}` },
];

// Applies the saved theme before first paint to avoid a flash.
const themeScript = "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#content" className="absolute left-4 -top-16 z-10 bg-accent px-4 py-2 text-accent-fg focus:top-4">
          Skip to content
        </a>
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16 lg:flex lg:justify-between lg:gap-4 lg:py-0">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-head sm:text-5xl">
                <Link href="/">{config.name}</Link>
              </h1>
              <p className="mt-3 text-lg font-medium text-head sm:text-xl">{config.tagline}</p>
              <ActiveNav />
            </div>
            <div className="mt-8 flex items-center gap-5 lg:mt-0">
              <ul className="flex items-center gap-1">
                {links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      aria-label={l.label}
                      title={l.label}
                      className="flex h-11 w-11 items-center justify-center text-fg hover:text-accent"
                    >
                      <Icon name={l.name} />
                    </a>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
          </header>
          <main id="content" className="pt-16 lg:w-[54%] lg:py-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
