const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '이도현',
  tagline: 'Dinosaurs are cool',
  url: 'https://ksmfou98.github.io',
  baseUrl: '/today-i-learn/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ksmfou98', // Usually your GitHub org/user name.
  projectName: 'today-i-learn', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '도현위키',
      logo: {
        alt: '도현위키 Logo',
        src: 'img/logo.svg',
      },
      items: [
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/ksmfou98',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          routeBasePath: '/', // 문서 전용 으로 설정
          editUrl: 'https://github.com/ksmfou98/today-i-learn/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
