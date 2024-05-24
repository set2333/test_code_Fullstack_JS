import { useCallback } from 'react';
import { HTTP_SERVER } from '../consts.js';

export const useAddMessageQuery = (ref) => useCallback(() => {
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
