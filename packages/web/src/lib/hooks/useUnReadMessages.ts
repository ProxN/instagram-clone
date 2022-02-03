import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import {
  useGetUnreadMessagesCountQuery,
  UnReadMessagesDocument,
} from '@lib/graphql';

const endpoint = process.env.WEBSOCKET_API as string;

export const useUnreadMessages = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(endpoint, 'graphql-ws');

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'connection_init', payload: {} }));

      ws.send(
        JSON.stringify({
          id: '2',
          type: 'start',
          payload: {
            extensions: {},
            operationName: 'UnReadMessages',
            query: UnReadMessagesDocument,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === 'data') {
        const data = eventData.payload.data;

        if (data && data.unReadMessages) {
          queryClient.invalidateQueries(
            useGetUnreadMessagesCountQuery.getKey()
          );
        }
      }
    };

    return () => {
      ws.send(JSON.stringify({ id: '2', type: 'stop' }));
      ws.close();
    };
  }, [queryClient]);
};
