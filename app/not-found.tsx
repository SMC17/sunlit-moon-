import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-page px-5 py-24 md:px-8">
      <p className="label text-sea">404</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight">This page is off the docket.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        The square is still there. The URL is not.
      </p>
      <Link href="/evanston" className="label mt-8 inline-block text-sea hover:text-ink">
        Return to the edition
      </Link>
    </div>
  );
}
