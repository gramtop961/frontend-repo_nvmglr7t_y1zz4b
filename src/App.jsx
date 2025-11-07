import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StatsGrid from './components/StatsGrid';
import ActivityFeed from './components/ActivityFeed';

function App() {
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = (q) => {
    setLastQuery(q);
    // In a full version, this would navigate to a details view using backend data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/40 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white">
      <Header />
      <main>
        <SearchBar onSearch={handleSearch} />
        {lastQuery && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
            <div className="text-xs text-neutral-600 dark:text-neutral-300">
              Showing sample results for: <span className="font-mono font-medium">{lastQuery}</span>
            </div>
          </div>
        )}
        <StatsGrid />
        <ActivityFeed />
      </main>
      <footer className="py-8 text-center text-xs text-neutral-500">Built as a minimal Solscan-inspired explorer UI</footer>
    </div>
  );
}

export default App;
