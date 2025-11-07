import { useEffect, useState } from 'react';
import { Activity, Blocks, Gauge, Users } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

const StatCard = ({ icon: Icon, label, value, sub }) => (
  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-4 shadow-sm flex items-start gap-3">
    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white flex items-center justify-center">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300">{label}</div>
      <div className="text-xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="text-xs text-neutral-500 mt-1">{sub}</div>}
    </div>
  </div>
);

export default function StatsGrid() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/solana/stats`);
        if (!res.ok) throw new Error('Failed to load stats');
        const data = await res.json();
        if (active) setStats({
          tps: data.tps ?? null,
          slots: data.slot ?? null,
          validators: data.validators ?? null,
          latestBlocks: data.recentBlocks ?? null,
        });
      } catch (e) {
        // Silently ignore; keep placeholders
      }
    }
    load();
    const id = setInterval(load, 15_000);
    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <section id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Gauge} label="Current TPS" value={stats && stats.tps != null ? stats.tps.toLocaleString() : '—'} sub="Network throughput" />
        <StatCard icon={Blocks} label="Current Slot" value={stats && stats.slots != null ? stats.slots.toLocaleString() : '—'} sub="Latest processed slot" />
        <StatCard icon={Users} label="Validators" value={stats && stats.validators != null ? stats.validators.toLocaleString() : '—'} sub="Active validators" />
        <StatCard icon={Activity} label="Recent Blocks" value={stats && stats.latestBlocks != null ? stats.latestBlocks : '—'} sub="Short interval delta" />
      </div>
    </section>
  );
}
