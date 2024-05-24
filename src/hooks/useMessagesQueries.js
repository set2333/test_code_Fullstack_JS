import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { HTTP_SERVER, WS_SERVER } from '../consts.js';

export const useMessagesQueries = (dispatch) => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    try {
      const ws = new WebSocket(`${WS_SERVER.PROTOCOL}://${WS_SERVER.HOST}:${WS_SERVER.PORT}`);

      ws.onmessage = ({ data }) => queryClient.setQueriesData('action', JSON.parse(data));
  
      return () => ws.readyState === 1 && ws.close();
    } catch (error) {
      console.error(error);
    }
  }, [queryClient]);

  const { data: action } = useQuery('action', async () => {
    try {
      const response = await fetch(`${HTTP_SERVER.PROTOCOL}://${HTTP_SERVER.HOST}:${HTTP_SERVER.PORT}/getAllMessages`);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => dispatch(action), [action, dispatch]);
};
