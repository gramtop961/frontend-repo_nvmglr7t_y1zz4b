import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch?.(trimmed);
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
      </div>
    </section>
  );
}
