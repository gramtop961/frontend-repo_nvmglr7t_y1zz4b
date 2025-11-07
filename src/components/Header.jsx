import { Rocket, Search, Database, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-md">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">BlockScope</div>
              <div className="text-xs text-neutral-500">A fast, elegant blockchain explorer</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
            <a href="#search" className="hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-2"><Search className="h-4 w-4"/>Search</a>
            <a href="#stats" className="hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-2"><Activity className="h-4 w-4"/>Network</a>
            <a href="#activity" className="hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-2"><Database className="h-4 w-4"/>Activity</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
