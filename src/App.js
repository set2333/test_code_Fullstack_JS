import { useRef, useReducer } from 'react';
import { reducer } from './reducer.js';
import { useAddMessageQuery } from'./hooks/useAddMessageQuery.js';
import { useMessagesQueries } from'./hooks/useMessagesQueries.js';

const App = () => {
  const ref = useRef(null);
  const [messages, dispatch] = useReducer(reducer);
  const addMessage = useAddMessageQuery(ref);
  useMessagesQueries(dispatch);

  return (
    <div>
      <input
        ref={ref}
        onKeyUp={({ key }) => key === 'Enter' && addMessage()}
      />
      <button onClick={addMessage}>Send</button>
      <ul>
        {messages?.map(({ id, message }) => <li key={id}>{message}</li>)}
      </ul>
    </div>
  );
}

export default App;
