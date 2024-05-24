import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { HTTP_SERVER, WS_SERVER } from '../consts.js';

export const useMessagesQueries = (dispatch) => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const ws = new WebSocket(`${WS_SERVER.PROTOCOL}://${WS_SERVER.HOST}:${WS_SERVER.PORT}`);
    ws.onmessage = ({ data }) => queryClient.setQueriesData('action', JSON.parse(data));

    return () => ws.close();
  }, [queryClient]);

  const { data: action } = useQuery('action', () =>
    fetch(`${HTTP_SERVER.PROTOCOL}://${HTTP_SERVER.HOST}:${HTTP_SERVER.PORT}/getAllMessages`).then((res) => res.json())
  );

  useEffect(() => dispatch(action), [action, dispatch]);
};
