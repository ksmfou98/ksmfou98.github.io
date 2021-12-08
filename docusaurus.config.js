const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const logNavItems = [
  {
    label: '2021 Log',
    to: 'log/2021',
  },
];

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '이도현',
  tagline: 'Dinosaurs are cool',
  url: 'https://ksmfou98.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'ksmfou98', // Usually your GitHub org/user name.
  projectName: 'ksmfou98.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '도현위키',
      logo: {
        alt: '도현위키 Logo',
        src: '/img/logo.svg',
      },
      items: [
        {
          to: '/',
          exact: true,
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left',
        },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/ksmfou98',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    prism: {
      // theme: lightCodeTheme,
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
    },
    metadatas: [
      {
        name: 'google-site-verification',
        content: 'awHB70BrXtna5akJyDss2-cHM9l9XMjzLV1z23DiMR0',
      },
    ],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // 문서 전용 으로 설정
          editUrl:
            'https://github.com/ksmfou98/ksmfou98.github.io/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // routeBasePath: '/blog',
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          trailingSlash: false,
        },
      },
    ],
  ],

  // plugins: [
  //   [
  //     '@docusaurus/plugin-content-blog',
  //     {
  //       id: 'wiki',
  //       path: './wiki',
  //       routeBasePath: '/',
  //       editUrl: 'https://github.com/ksmfou98',
  //     },
  //   ],
  // ],
};
