'use client';

// The default is dark teal; an explicit saved preference overrides it.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : getComputedStyle(root).colorScheme === 'dark';
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      className="min-h-11 font-mono cursor-pointer rounded border border-line px-2.5 py-1 text-xs text-fg hover:border-accent hover:text-accent"
    >
      theme
    </button>
  );
}
