import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Smart Service Marketplace
      </h1>

      <p className="text-gray-600 max-w-xl mb-6">
        Book trusted local services like plumbing, cleaning, AC repair,
        and more — fast, reliable, and secure.
      </p>

      <div className="flex gap-4">
        <Link
          href="/services"
          className="px-6 py-3 bg-black text-white rounded"
        >
          Browse Services
        </Link>

        <Link
          href="/register"
          className="px-6 py-3 border rounded"
        >
          Become a Provider
        </Link>
      </div>
    </main>
  );
}
