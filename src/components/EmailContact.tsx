'use client';

import { useRef, useState } from 'react';
import { config } from '@/config';
import { Icon } from '@/components/Icon';

export function EmailContact() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const trigger = useRef<HTMLButtonElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(config.email);
      setMessage('Email address copied.');
    } catch {
      setMessage('Select the address above to copy it manually.');
    }
  }

  return <div className="relative" onKeyDown={(event) => {
    if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
  }}>
    <button ref={trigger} type="button" aria-label="Email contact options" title="Email" aria-expanded={open} aria-controls="email-contact" onClick={() => { setOpen(!open); setMessage(''); }} className="flex h-11 w-11 items-center justify-center text-fg hover:text-accent">
      <Icon name="email" />
    </button>
    {open && <div id="email-contact" className="absolute bottom-full -left-32 z-20 mb-3 w-64 rounded-lg border border-line bg-bg p-4 text-sm shadow-lg">
      <p className="font-semibold text-head">Email</p>
      <p className="mt-2 select-all break-all text-head">{config.email}</p>
      <div className="mt-3 flex flex-wrap gap-x-4">
        <button type="button" onClick={copyEmail} className="min-h-11 font-medium text-accent">Copy address</button>
        <a href={`mailto:${config.email}`} className="inline-flex min-h-11 items-center font-medium text-accent">Open email app</a>
      </div>
      <p role="status" className="mt-2 text-xs">{message || 'If the email app does not open, copy the address into a new message.'}</p>
      <button type="button" className="mt-2 min-h-11 text-fg hover:text-accent" onClick={() => { setOpen(false); trigger.current?.focus(); }}>Close</button>
    </div>}
  </div>;
}
