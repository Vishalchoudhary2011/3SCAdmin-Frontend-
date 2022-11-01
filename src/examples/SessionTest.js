import { clearSession, setSessionItem, getSessionItems } from '../utils/SessionHandler';
import { useState } from 'react';

function SessionTest() {
  const [kys, setKey] = useState('');
  const [vlu, setValue] = useState('');
  const [arr, setArr] =useState([]);

  const handleKey = (e) => {
    setKey(e.target.value);
  }
  const handleValue = (e) => {
    setValue(e.target.value);
  }

  const saveToSession = () => {
    let result = setSessionItem(kys,vlu);
    console.log(result);
    setArr(getSessionItems())
  }

  const deleteSession = () => {
    let result = clearSession();
    setArr([])
    console.log(result)
  }


  return (
    <div className="App">
      <header className="App-header">

          <h2>Session Test Case</h2>
      <input onChange={(e) => handleKey(e)} placeholder="Key"/>
        <input onChange={(e) => handleValue(e)} placeholder="Value"/>
        <br />
        <button onClick={()=>saveToSession()}>Save To Session</button>
        <button onClick={()=>deleteSession()}>Clear Session</button>
    <ul>
      
      {
        arr.map(item=>(
          <li>{item.id} : {item.value}</li>
        ))
      }
    </ul>

        </header>
    </div>
  );
}

export default SessionTest;
