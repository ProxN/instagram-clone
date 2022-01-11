import { useRouter } from 'next/router';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useLogoutMutation } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useLogoutMutation(client, {
    onSuccess: async (data) => {
      if (data.logout) {
        await queryClient.invalidateQueries('Me');
        toast.success('Successfully logged out!');
        router.push('/');
      }
    },
  });

  const handleLogout = useCallback(() => {
    mutate({});
  }, [mutate]);
  return { handleLogout };
};
