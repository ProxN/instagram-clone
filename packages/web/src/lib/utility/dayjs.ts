import relativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import enlocale from 'dayjs/locale/en';
import dayjs from 'dayjs';
dayjs.extend(LocalizedFormat);

dayjs.extend(relativeTime);

const relativetimelocale = {
  ...enlocale,
  name: 'otherlocale',
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'now',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 y',
    yy: '%d y',
  },
};

dayjs().locale(relativetimelocale);

export { dayjs };
