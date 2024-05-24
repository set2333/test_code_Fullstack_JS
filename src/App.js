import { useState, useRef, useReducer, useCallback } from 'react';
import { reducer } from './reducer.js';
import { useMessagesQueries } from'./useMessagesQueries.js';
import { HTTP_SERVER } from './consts.js';

const App = () => {
  const [message, setMessage] = useState('');
  const ref = useRef(null);
  const [messages, dispatch] = useReducer(reducer);
  useMessagesQueries(dispatch);

  const handleSend = useCallback(() => {
    fetch(`${HTTP_SERVER.PROTOCOL}://${HTTP_SERVER.HOST}:${HTTP_SERVER.PORT}/addMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ message }),
    });
    setMessage('');
    ref.current.focus();
  }, [ref, setMessage, message]);  

  return (
    <div>
      <input
        ref={ref}
        value={message}
        onChange={({ target: { value }}) => setMessage(value)}
        onKeyUp={({ key }) => key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
      <ul>
        {messages?.map(({ id, message }) => <li key={id}>{message}</li>)}
      </ul>
    </div>
  );
}

export default App;
