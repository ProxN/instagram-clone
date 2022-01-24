import { GetUserConversationQuery, InboxResult } from '@lib/graphql';
import { InfiniteData } from 'react-query';

export const groupMessageByHour = (
  messages?: Pick<GetUserConversationQuery, 'getUserConversation'>
) => {
  if (!(messages && messages.getUserConversation)) return [];
  const newData = messages?.getUserConversation.messages.reduce((acc, curr) => {
    if (curr.time) {
      const time = +curr.time;
      if (!acc[time]) {
        acc[time] = [];
      }

      acc[time].push(curr as InboxResult);
      return acc;
    }
    return acc;
  }, {} as { [key: number]: InboxResult[] });
  return newData;
};

export const groupMessages = (
  data?: InfiniteData<GetUserConversationQuery>
) => {
  if (!data) return null;

  const newPages = data.pages.map((page) => ({
    ...page,
    getUserConversation: groupMessageByHour(page),
  }));
  return {
    ...data,
    pages: newPages,
  };
};
