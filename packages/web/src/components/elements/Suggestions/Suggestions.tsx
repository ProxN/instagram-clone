import { MaxWidthProps } from '@xstyled/styled-components';
import { Follow } from '@components/elements/Follow';
import { FollowLoader } from '@components/elements/FollowLoader';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { client } from '@lib/utility/graphqlClient';
import { useInfiniteFollowerSuggestionQuery } from '@lib/graphql';

interface SuggestionsProps extends MaxWidthProps {
  limit?: number;
  maxW?: string;
  hideSeeAll?: boolean;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  limit = 5,
  hideSeeAll = false,
  maxW = '29.4rem',
  ...rest
}) => {
  const { data, isLoading } = useInfiniteFollowerSuggestionQuery(
    'cursor',
    client,
    { limit }
  );

  return (
    <Box w='100%' maxW={maxW} {...rest}>
      <Flex mb='1rem' justifyContent='space-between'>
        <Text color='gray' fontWeight='bold'>
          Suggestions for you
        </Text>
        {!hideSeeAll && <Text fontWeight='semibold'>See all</Text>}
      </Flex>
      <Box>
        {isLoading
          ? Array.from({ length: 5 }, (v, i) => <FollowLoader key={i} />)
          : data?.pages[0].followerSuggestion.users.map((el) => (
              <Follow
                key={el.id}
                username={el.username}
                avatar={el.avatar}
                id={el.id}
                name={el.name}
                buttonText='follow'
              />
            ))}
      </Box>
    </Box>
  );
};

export default Suggestions;
