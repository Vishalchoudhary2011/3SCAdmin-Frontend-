import { clearSession, setSessionItem, getSessionItems } from '../utils/SessionHandler';
import { useState } from 'react';

function CacheTest() {
  const [kys, setKey] = useState('');
  const [vlu, setValue] = useState('');

  const handleKey = (e) => {
    setKey(e.target.value);
  }
  const handleValue = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">

        <h2>Cache Test Case</h2>
        
      </header>
    </div>
  );
}

export default CacheTest;
