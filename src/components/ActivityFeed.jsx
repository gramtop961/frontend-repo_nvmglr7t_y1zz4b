import { useEffect, useState } from 'react';
import { ChevronRight, Copy } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

function shorten(str, head = 6, tail = 6) {
  if (!str) return '';
  if (str.length <= head + tail) return str;
  return `${str.slice(0, head)}…${str.slice(-tail)}`;
}

const Row = ({ item }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 p-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition">
      <div className="sm:col-span-3 font-mono text-xs text-neutral-700 dark:text-neutral-200 flex items-center gap-2">
        <span className="truncate" title={item.sig}>{shorten(item.sig)}</span>
        <button
          onClick={() => navigator.clipboard.writeText(item.sig)}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Copy signature"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="sm:col-span-3 text-sm">{item.type}</div>
      <div className="sm:col-span-3 text-sm">{item.slot?.toLocaleString?.() ?? item.slot}</div>
      <div className="sm:col-span-2 text-sm font-mono">{item.fee} SOL</div>
      <div className="sm:col-span-1 flex justify-end">
        <button className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700">View<ChevronRight className="h-4 w-4"/></button>
      </div>
    </div>
  );
};

export default function ActivityFeed() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/solana/recent-transactions?limit=10`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (active) setItems(data.items || []);
      } catch (e) {
        // ignore
      }
    }

    load();
    const id = setInterval(load, 5000);
    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <section id="activity" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
          <div className="text-xs text-neutral-500">Auto-refreshing</div>
        </div>
        <div className="p-2 divide-y divide-black/5 dark:divide-white/5">
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-3 py-2 text-xs text-neutral-500">
            <div className="sm:col-span-3">Signature</div>
            <div className="sm:col-span-3">Type</div>
            <div className="sm:col-span-3">Slot</div>
            <div className="sm:col-span-2">Fee</div>
            <div className="sm:col-span-1" />
          </div>
          {items ? items.map((item, idx) => <Row key={idx} item={item} />) : (
            <div className="p-6 text-center text-sm text-neutral-500">Loading recent transactions…</div>
          )}
        </div>
      </div>
    </section>
  );
}
