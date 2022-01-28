import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import Image from 'next/image';
import { Icon } from '@components/elements/Icon';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { useGetSavedPostsQuery } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

import { PostContainer, PostOverlay } from './SavedPosts.styles';
import { IconButton } from '@components/elements/IconButton';
import { PostModal } from '@components/elements/PostModal';

const SavedPosts = () => {
  const router = useRouter();
  const { data, isLoading } = useGetSavedPostsQuery(client);

  if (data?.getSavedPosts.length === 0 && !isLoading) {
    return (
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        p={{ xs: '2rem 1.5rem', sm: '2rem 0' }}
      >
        <Box
          mb={4}
          fontSize='2.6rem'
          border='1px solid '
          borderColor='blackAlpha.9'
          p='1rem'
          borderRadius='50%'
        >
          <Icon name='bookmark' />
        </Box>
        <Text size='2xl' mb={4}>
          Save
        </Text>
        <Text maxW='35rem'>
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you&apos;ve saved.
        </Text>
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
        {data?.getSavedPosts.map((el) => (
          <NextLink
            key={el.id}
            href={{
              pathname: router.pathname,
              query: { ...router.query, postId: el.id },
            }}
            as={`/home/p/${el.id}`}
          >
            <PostContainer key={el.id}>
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
      </Box>
      {!!router.query.postId && <PostModal />}
    </>
  );
};

export default SavedPosts;
