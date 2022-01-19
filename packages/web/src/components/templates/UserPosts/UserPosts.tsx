import { useRef, Fragment } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { useInfiniteGetUserPostsQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';
import { PostContainer, PostOverlay } from './UserPosts.styles';
import { IconButton } from '@components/elements/IconButton';
import { Icon } from '@components/elements/Icon';
import { useInterSectionObserver } from '@lib/hooks/useInterSectionObserver';
import { PostModal } from '../../elements/PostModal';
import { useRouter } from 'next/router';

const UserPosts: React.FC<{ user_id: string }> = ({ user_id }) => {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage } = useInfiniteGetUserPostsQuery(
    'cursor',
    client,
    {
      user_id,
      limit: 30,
      cursor: undefined,
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.getPosts.hasMore) return undefined;
        const postsLength = lastPage.getPosts.posts.length;
        return { cursor: lastPage.getPosts.posts[postsLength - 1].createdAt };
      },
    }
  );

  const lastElement = useRef<HTMLDivElement | null>(null);

  useInterSectionObserver({
    target: lastElement,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (data?.pages[0].getPosts.posts.length === 0) {
    return (
      <Flex
        backgroundColor='#fff'
        flexDirection={{ xs: 'column', md: 'row-reverse' }}
        alignItems={{ md: 'center' }}
      >
        <Flex padding='4rem 0' justifyContent='center' w='100%'>
          <Text fontWeight='semibold'>
            Start capturing and sharing your moments.
          </Text>
        </Flex>
        <Box flex={{ md: '70%' }}>
          <Image
            alt='default picture'
            src='/pic.jpg'
            layout='responsive'
            width='100%'
            height='100%'
            priority
          />
        </Box>
      </Flex>
    );
  }

  return (
    <>
      <Box
        display='grid'
        gridTemplateColumns='repeat(3,1fr)'
        gap={{ xs: '1rem', md: '2.4rem' }}
      >
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.getPosts.posts.map((el, elementIndex) => (
              <NextLink
                key={el.id}
                href={{
                  pathname: router.pathname,
                  query: { ...router.query, postId: el.id },
                }}
                as={`/home/p/${el.id}`}
              >
                <PostContainer
                  key={el.id}
                  ref={
                    data.pages.length === i + 1 &&
                    page.getPosts.posts.length === elementIndex + 1
                      ? lastElement
                      : null
                  }
                >
                  {/*Overlay */}
                  <PostOverlay>
                    {el.likes > 0 && (
                      <Flex alignItems='center'>
                        <IconButton
                          ariaLabel='Post Likes'
                          color='#fff'
                          variant='link'
                          icon={<Icon name='heart-sharp' />}
                        />
                        <Text ml={1} fontWeight='semibold' as='span'>
                          {el.likes}
                        </Text>
                      </Flex>
                    )}

                    <Flex ml={5} alignItems='center'>
                      <IconButton
                        ariaLabel='Post Comments'
                        color='#fff'
                        variant='link'
                        icon={<Icon name='chat-sharp' />}
                      />
                      <Text ml={1} fontWeight='semibold' as='span'>
                        {el.comments}
                      </Text>
                    </Flex>
                  </PostOverlay>
                  <Image
                    alt={'post image'}
                    src={el.post_url}
                    layout='responsive'
                    objectFit='cover'
                    height='100%'
                    width='100%'
                    priority
                  />
                </PostContainer>
              </NextLink>
            ))}
          </Fragment>
        ))}
      </Box>
      {!!router.query.postId && <PostModal />}
    </>
  );
};

export default UserPosts;
