'use client';

import { useEffect, useRef } from 'react';

export function CursorLight() {
  const light = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        light.current?.style.setProperty('--light-x', `${x}px`);
        light.current?.style.setProperty('--light-y', `${y}px`);
        light.current?.style.setProperty('opacity', '1');
        frame = 0;
      });
    };
    const hide = () => light.current?.style.setProperty('opacity', '0');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    media.addEventListener('change', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      media.removeEventListener('change', hide);
    };
  }, []);
  return <div ref={light} className="cursor-light" aria-hidden="true" />;
}
