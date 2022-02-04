// /* eslint-disable */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
const path = require('path');

module.exports = (phase) => {
  const IS_DEV = phase === PHASE_DEVELOPMENT_SERVER;
  const IS_PROD =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const API_URL = process.env.API_URL;
  const WEBSOCKET_API = process.env.WEBSOCKET_API;
  const env = {
    API_URL,
    IS_DEV,
    IS_PROD,
    WEBSOCKET_API,
  };
  const redirects = async () => {
    return [
      {
        source: '/:profile/followers/',
        destination: '/:profile',
        permanent: false,
      },
      {
        source: '/:profile/following/',
        destination: '/:profile',
        permanent: false,
      },
      {
        source: '/inbox/:userId/',
        destination: '/inbox',
        permanent: false,
      },
    ];
  };

  return {
    env,
    trailingSlash: true,
    images: {
      domains: [
        'avatars.githubusercontent.com',
        'instagram.fcmn2-2.fna.fbcdn.net',
        'res.cloudinary.com',
      ],
    },
    redirects,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      config.resolve.alias = {
        ...config.resolve.alias,
        '@xstyled/util': '@xstyled/util/dist/index.js',
        '@xstyled/core': '@xstyled/core/dist/index.js',
        '@xstyled/system': '@xstyled/system/dist/index.js',
        '@xstyled/styled-components':
          '@xstyled/styled-components/dist/index.js',
      };

      config.resolve.modules.push(path.resolve('/'));

      return config;
    },
  };
};
