import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { dayjs } from '@lib/utility/dayjs';
import { useMemo } from 'react';

// import somelocale from 'dayjs/locale/en';

// const otherlocale = {
//   ...somelocale,
//   name: 'otherlocale',
//   relativeTime: {
//     future: 'in %s',
//     past: '%s ago',
//     s: 'now',
//     m: 'a minute',
//     mm: '%d minutes',
//     h: 'an hour',
//     hh: '%d hours',
//     d: 'a day',
//     dd: '%d days',
//     M: 'a month',
//     MM: '%d months',
//     y: 'a year',
//     yy: '%d years',
//   },
// };

// dayjs().locale(otherlocale);

interface CommentProps {
  username: string;
  avatar?: string | null;
  time: string;
  comment?: string;
}

const Comment: React.FC<CommentProps> = ({
  username,
  avatar,
  time,
  comment,
}) => {
  const timeInString = useMemo(() => {
    return dayjs(+time, { locale: 'otherlocale' }).fromNow(true);
  }, [time]);
  return (
    <Flex marginBottom={{ md: '1.4rem', last: '0' }}>
      <Box>
        <Avatar src={avatar || '/default.jpg'} />
      </Box>
      <Flex ml={3} flexDirection='column'>
        <Text as='span'>
          <Text textTransform='lowercase' mr={1} fontWeight='semibold'>
            {username}
          </Text>
          {comment}
        </Text>
        <Text mt='1rem' size='xs' as='span' color='gray'>
          {timeInString}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
