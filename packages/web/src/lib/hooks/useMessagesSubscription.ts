import { useEffect } from 'react';
import { InfiniteData, useQueryClient } from 'react-query';
import {
  MessagesDocument,
  GetUserConversationQuery,
  useGetUserInboxQuery,
} from '@lib/graphql';

const url = 'ws://localhost:5000/graphql';

export const useMessagesSubscription = (receiver_id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(url, 'graphql-ws');

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'connection_init', payload: {} }));

      ws.send(
        JSON.stringify({
          id: '1',
          type: 'start',
          payload: {
            extensions: {},
            operationName: 'Messages',
            query: MessagesDocument,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === 'data') {
        const data = eventData.payload.data;

        if (data && data.messages) {
          queryClient.invalidateQueries(useGetUserInboxQuery.getKey());

          queryClient.setQueryData<InfiniteData<GetUserConversationQuery>>(
            ['GetUserConversation.infinite', { receiver_id, limit: 50 }],
            (old) => {
              const newMessages = old?.pages[0].getUserConversation.messages;
              if (newMessages?.length === 50) {
                newMessages?.pop();
              }
              newMessages?.unshift(data.messages);
              const newPage = {
                ...old?.pages[0],
                getUserConversation: {
                  ...old?.pages[0].getUserConversation,
                  messages: newMessages,
                },
              };
              return {
                ...old,
                pages: [newPage],
              } as InfiniteData<GetUserConversationQuery>;
            }
          );
        }
      }
    };

    return () => {
      ws.send(JSON.stringify({ id: '1', type: 'stop' }));
      ws.close();
    };
  }, [queryClient, receiver_id]);
};
