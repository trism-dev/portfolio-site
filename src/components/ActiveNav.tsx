'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const items = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills']] as const;

// Highlights the section in view. Links work without JS; this only adds the active state.
export function ActiveNav() {
  const [active, setActive] = useState('about');
  const onHome = usePathname() === '/';
  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <nav aria-label="Sections" className="mt-16 hidden lg:block">
      <ul>
        {items.map(([id, label]) => (
          <li key={id}>
            <a href={`/#${id}`} className={`group flex items-center py-3 ${onHome && active === id ? 'text-head' : 'text-fg'}`}>
              <span className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-head ${onHome && active === id ? 'w-16 bg-head' : 'w-8 bg-fg'}`} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest group-hover:text-head">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
