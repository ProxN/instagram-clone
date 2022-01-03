import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { Loader } from '@components/elements/Loader';
import { Center } from '@components/layout/Center';

const WithNoUser = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  redirect = ''
) => {
  return (props: P) => {
    const { data: user, isLoading } = useMeQuery(client, undefined, {
      staleTime: 1000 * 60 * 60 * 24,
    });
    const router = useRouter();

    useEffect(() => {
      if (isLoading || !user?.me) return;
      router.push(redirect || '/home');
    }, [isLoading, router, user]);

    if (isLoading || user?.me) {
      return (
        <Center minH='100vh'>
          <Loader />
        </Center>
      );
    }

    return <Component {...props} />;
  };
};

export { WithNoUser };
