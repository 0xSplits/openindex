import { defineConfig } from 'vocs/config'
import pkg from '../src/package.json'
import { sidebar } from './config-generated'

export default defineConfig({
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? 'https://openindex.dev'
      : process.env.VERCEL_URL,
  title: 'OpenIndex',
  titleTemplate: '%s · OpenIndex',
  // Twoslash hover popups surface viem's JSDoc, which links to viem.sh-relative
  // paths (e.g. /docs/actions/public/introduction) that don't exist on this site.
  checkDeadlinks: 'warn',
  description: 'Type-safe Ethereum indexer built on viem.',
  ogImageUrl: '/og-image.png',
  iconUrl: { light: '/logo-light.png', dark: '/logo-dark.png' },
  logoUrl: { light: '/logo-light.png', dark: '/logo-dark.png' },
  accentColor: 'light-dark(#303030, #F7F7F7)',
  codeHighlight: {
    themes: {
      light: 'github-light',
      dark: 'github-dark-dimmed',
    },
  },
  sidebar: {
    '/': [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Imports & Bundle Size', link: '/imports' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'Event Handlers', link: '/guides/event-handlers' },
          { text: 'Native Transfers', link: '/guides/native-transfers' },
          { text: 'Error Handling', link: '/guides/error-handling' },
        ],
      },
      {
        text: 'API Reference',
        collapsed: true,
        items: sidebar['/api'].items,
      },
    ],
  },
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/0xSplits/openindex',
    },
    {
      icon: 'x',
      link: 'https://x.com/0xsplits',
    },
  ],
  topNav: [
    {
      text: pkg.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/0xSplits/openindex/blob/main/src/CHANGELOG.md',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/0xSplits/openindex/blob/main/.github/CONTRIBUTING.md',
        },
      ],
    },
  ],
})
