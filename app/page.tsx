import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <section className="max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xl leading-none font-bold tracking-[0.02em] text-emerald-700 md:text-3xl">
          Ecoyaan
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">Create A Healthier Future</h1>
        <Link
          href="/checkout"
          className="mt-6 inline-block rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Open Checkout
        </Link>
      </section>
    </main>
  );
}
