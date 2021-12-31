import { createGlobalStyle, css } from '@xstyled/styled-components';
import { mode } from '@lib/utility/component';

const GlobalStyles = createGlobalStyle`
  *,
    *::before,
    *::after{
        margin:0;
        padding:0;
        box-sizing:inherit;
    }
    
    html{
        box-sizing:border-box;
        height:100%;
        width:100%;
        font-size:10px;
    }
    
    #__next,
    body{
        width:100%;
        height:100%;
    }

    body{
        font-weight:normal;
        line-height:1.35;
        ${({ theme }) => css`
          background: ${mode(
            theme.white,
            theme.colors.dark[9]
          )(theme.colorMode)};
          color: ${mode('gray.8', 'whiteAlpha.9')(theme.colorMode)};
          font-size: ${theme.fontSizes.sm};
          font-family: ${theme.fontFamily};
        `};
    }

    a{
        text-decoration:none;
    }

    ul {
        list-style:none;
    }

    h1,h2,h3,h4,h5,h6{
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        margin:0;
    }

`;

export default GlobalStyles;
