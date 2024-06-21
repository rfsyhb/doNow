import React, { useState } from 'react';
import Stopwatch from './components/Stopwatch';
import Settings from './components/Setup';
import History from './components/History';

function App() {
  const [page, setPage] = useState('main');

  return (
    <div>
      <nav>
        <button type="button" onClick={() => setPage('main')}>
          Main
        </button>
        <button type="button" onClick={() => setPage('settings')}>
          Settings
        </button>
        <button type="button" onClick={() => setPage('history')}>
          History
        </button>
      </nav>
      <div>
        {page === 'main' && <Stopwatch />}
        {page === 'settings' && <Settings />}
        {page === 'history' && <History />}
      </div>
    </div>
  );
}

export default App;
