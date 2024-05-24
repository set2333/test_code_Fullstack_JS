import { useRef, useReducer, useCallback } from 'react';
import { reducer } from './reducer.js';
import { useMessagesQueries } from'./useMessagesQueries.js';
import { HTTP_SERVER } from './consts.js';

const App = () => {
  const ref = useRef(null);
  const [messages, dispatch] = useReducer(reducer);
  useMessagesQueries(dispatch);

  const handleSend = useCallback(() => {
    fetch(`${HTTP_SERVER.PROTOCOL}://${HTTP_SERVER.HOST}:${HTTP_SERVER.PORT}/addMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ message: ref.current.value }),
    });
    ref.current.focus();
    ref.current.value = '';
  }, [ref]);

  return (
    <div>
      <input
        ref={ref}
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
