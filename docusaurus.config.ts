import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '企业多产品文档中心',
  tagline: '统一、集中化、易于维护和扩展的企业级产品文档中心',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        htmlLang: 'zh-Hans',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'eiam',
        path: 'docs/digital-identity/eiam',
        routeBasePath: 'docs/eiam',
        sidebarPath: './sidebars-eiam.ts',
        lastVersion: 'current',
        versions: {
          current: {
            label: '7.0',
          },
          '6.0': {
            label: '6.0',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ciam',
        path: 'docs/digital-identity/ciam',
        routeBasePath: 'docs/ciam',
        sidebarPath: './sidebars-ciam.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'idaas',
        path: 'docs/digital-identity/idaas',
        routeBasePath: 'docs/idaas',
        sidebarPath: './sidebars-idaas.ts',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: false, // Disabled the default docs plugin
        blog: false, // Disabled the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '产品中心',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'eiam',
          position: 'left',
          label: 'EIAM',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'eiam',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'ciam',
          position: 'left',
          label: 'CIAM',
        },
        {
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'idaas',
          position: 'left',
          label: 'IDaaS',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
