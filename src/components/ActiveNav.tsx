'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const items = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects']] as const;

// Highlights the section in view. Links work without JS; this only adds the active state.
export function ActiveNav() {
  const [active, setActive] = useState('about');
  const onHome = usePathname() === '/';
  useEffect(() => {
    if (!onHome) return;
    const media = matchMedia('(min-width: 640px)');
    let io: IntersectionObserver;
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root: media.matches ? document.getElementById('content') : null, rootMargin: '-10% 0px -60% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    };
    observe();
    media.addEventListener('change', observe);
    return () => { io.disconnect(); media.removeEventListener('change', observe); };
  }, [onHome]);

  return (
    <nav aria-label="Sections" className="mt-6 lg:mt-16">
      <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:block">
        {items.map(([id, label]) => (
          <li key={id}>
            <a href={`/#${id}`} aria-current={onHome && active === id ? 'location' : undefined} className={`group flex min-h-11 items-center py-3 ${onHome && active === id ? 'text-head' : 'text-fg'}`}>
              <span className={`mr-4 hidden h-px transition-all group-hover:w-16 group-hover:bg-head lg:block ${onHome && active === id ? 'w-16 bg-head' : 'w-8 bg-fg'}`} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest group-hover:text-head">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
