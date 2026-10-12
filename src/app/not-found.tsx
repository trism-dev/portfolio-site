import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight text-head">Page not found</h2>
      <p className="mt-3">
        That page doesn&apos;t exist. Go <Link href="/" className="font-medium text-head hover:text-accent">home</Link> or see the{' '}
        <Link href="/#projects" className="font-medium text-head hover:text-accent">projects</Link>.
      </p>
    </section>
  );
}
