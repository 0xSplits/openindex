// biome-ignore lint/correctness/noUnusedImports: _
import React from 'react'
import { defineConfig } from 'vocs'
import pkg from '../src/package.json'
import { sidebar, topNav } from './config-generated'

export default defineConfig({
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? 'https://openindex.dev'
      : process.env.VERCEL_URL,
  title: 'OpenIndex',
  titleTemplate: '%s · OpenIndex',
  description: 'Type-safe Ethereum indexer built on viem.',
  aiCta: {
    query: ({ location }) =>
      `Read the OpenIndex docs at ${location} and help me with the following:`,
  },
  head() {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="ZMZAZRME"
          defer
        />
      </>
    )
  },
  ogImageUrl: '/og-image.png',
  iconUrl: { light: '/logo-light.png', dark: '/logo-dark.png' },
  logoUrl: { light: '/logo-light.png', dark: '/logo-dark.png' },
  markdown: {
    code: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
    },
  },
  rootDir: '.',
  sidebar: {
    '/': [
      { text: 'Introduction', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Imports & Bundle Size', link: '/imports' },
      {
        text: 'Guides',
        items: [
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'Event Handlers', link: '/guides/event-handlers' },
          { text: 'Error Handling', link: '/guides/error-handling' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Core',
            link: '/api',
          },
        ],
      },
    ],
    ...sidebar,
  },
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/gregfromstl/openindex',
    },
    {
      icon: 'x',
      link: 'https://x.com/gregfromstl',
    },
  ],
  theme: {
    accentColor: {
      light: '#303030',
      dark: '#F7F7F7',
    },
  },
  topNav: [
    ...topNav,
    {
      text: pkg.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/gregfromstl/openindex/blob/main/src/CHANGELOG.md',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/gregfromstl/openindex/blob/main/.github/CONTRIBUTING.md',
        },
      ],
    },
  ],
})
