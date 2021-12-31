import { Toaster as ReactToaster } from 'react-hot-toast';
import { useTheme } from '@xstyled/styled-components';
import { mode } from '@lib/utility/component';

const Toaster = () => {
  const { colors, colorMode } = useTheme();

  return (
    <ReactToaster
      toastOptions={{
        error: {
          style: {
            background: mode(colors.red[6], colors.red[2])(colorMode),
            color: mode(colors.whiteAlpha[9], colors.gray[8])(colorMode),
          },
        },
      }}
    />
  );
};

export default Toaster;
