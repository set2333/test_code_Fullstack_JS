import { useCallback } from 'react';
import { HTTP_SERVER } from '../consts.js';

export const useAddMessageQuery = (ref) => useCallback(async () => {
  try {
    const response = await fetch(
      `${HTTP_SERVER.PROTOCOL}://${HTTP_SERVER.HOST}:${HTTP_SERVER.PORT}/addMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ message: ref.current.value }),
      },
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    ref.current.focus();
    ref.current.value = '';
  } catch (error) {
    console.error(error);
  }
}, [ref]);
