import { useState } from 'react';
import { Search } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch?.(trimmed);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/solana/search?q=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError('No results or invalid query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="search" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">Explore the blockchain</h1>
        <p className="text-center text-neutral-600 dark:text-neutral-300 mt-2">Look up blocks, transactions, or addresses — just like Solscan.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur rounded-xl border border-black/5 dark:border-white/5 p-2 shadow-sm">
          <Search className="h-5 w-5 text-neutral-500 ml-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by address, block, or signature"
            className="flex-1 bg-transparent outline-none px-2 py-2 text-sm"
            aria-label="Search blockchain"
          />
          <button type="submit" className="px-3 py-2 text-sm rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition">Search</button>
        </form>

        {loading && (
          <div className="mt-4 text-sm text-neutral-500">Searching…</div>
        )}
        {error && (
          <div className="mt-4 text-sm text-red-600">{error}</div>
        )}
        {result && (
          <div className="mt-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-4 text-sm">
            {result.kind === 'signature' && (
              <div>
                <div className="font-semibold">Transaction</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Slot: {result.slot?.toLocaleString?.() ?? result.slot}</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Fee: {result.fee} SOL</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Status: {result.ok ? 'Success' : 'Error'}</div>
              </div>
            )}
            {result.kind === 'address' && (
              <div>
                <div className="font-semibold">Address</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Balance: {result.balance} SOL</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Recent signatures:</div>
                <ul className="list-disc ml-5 mt-1 text-neutral-600 dark:text-neutral-300">
                  {result.signatures?.map((s) => (
                    <li key={s} className="font-mono text-xs break-all">{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.kind === 'slot' && (
              <div>
                <div className="font-semibold">Slot</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Slot: {result.slot.toLocaleString?.() ?? result.slot}</div>
                <div className="mt-1 text-neutral-600 dark:text-neutral-300">Transactions: {result.txCount}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
