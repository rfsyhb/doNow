import React, { useState } from 'react';
import Stopwatch from './components/Stopwatch';
import Settings from './components/Setup';
import History from './components/History';

function App() {
  const [page, setPage] = useState('main');

  return (
    <div className="flex flex-col justify-center h-[100vh] items-center">
      <nav className="flex flex-row gap-3 mb-[1rem]">
        <button
          className={`shadow-md p-1 px-4 border border-black rounded-xl font-semibold ${page === 'main' ? 'bg-black text-bgColor' : 'bg-none'}`}
          type="button"
          onClick={() => setPage('main')}
        >
          Main
        </button>
        <button
          className={`shadow-md p-1 px-4 border border-black rounded-xl font-semibold ${page === 'setting' ? 'bg-black text-bgColor' : 'bg-none'}`}
          type="button"
          onClick={() => setPage('setting')}
        >
          Setting
        </button>
        <button
          className={`shadow-md p-1 px-4 border border-black rounded-xl font-semibold ${page === 'history' ? 'bg-black text-bgColor' : 'bg-none'}`}
          type="button"
          onClick={() => setPage('history')}
        >
          History
        </button>
      </nav>
      {page === 'main' && <Stopwatch />}
      {page === 'setting' && <Settings />}
      {page === 'history' && <History />}
    </div>
  );
}

export default App;
