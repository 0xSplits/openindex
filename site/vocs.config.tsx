// biome-ignore lint/correctness/noUnusedImports: _
import React from 'react'
import { defineConfig } from 'vocs'
import pkg from '../src/package.json'
import { sidebar, topNav } from './config-generated'

export default defineConfig({
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? 'https://google.com' // UPDATE ME
      : process.env.VERCEL_URL,
  title: 'OpenIndex',
  titleTemplate: '%s · OpenIndex',
  description: 'A typescript npm package template.',
  head() {
    return (
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site="ZMZAZRME"
        defer
      />
    )
  },
  ogImageUrl: {
    '/': '/og-image.png', // UPDATE ME - The OG image file itself
    '/api': 'https://og.oxlib.sh?title=%title&description=%description', // UPDATE ME
    '/guides': 'https://og.oxlib.sh?title=%title&description=%description', // UPDATE ME
  },
  iconUrl: { light: '/logo-light.png', dark: '/logo-dark.png' },
  logoUrl: { light: '/logo-light.png', dark: '/logo-dark.png' },
  markdown: {
    code: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
  },
  rootDir: '.',
  sidebar: {
    '/': [
      { text: 'Introduction', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Imports & Bundle Size', link: '/imports' },
      { text: 'Error Handling', link: '/error-handling' },
      {
        text: 'Guides',
        items: [{ text: 'Example Guide', link: '/guides/example' }],
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
      link: 'https://github.com/gregfromstl/openindex', // UPDATE ME
    },
    {
      icon: 'discord',
      link: 'https://discord.gg/', // UPDATE ME
    },
    {
      icon: 'x',
      link: 'https://x.com/gregfromstl', // UPDATE ME
    },
  ],
  sponsors: [
    {
      name: 'Gold Sponsors',
      height: 120,
      items: [
        [
          // UPDATE ME
          {
            name: 'Example Sponsor',
            link: 'https://google.com',
            image: '',
          },
        ],
      ],
    },
  ],
  theme: {
    accentColor: {
      light: '#4b7b2b',
      dark: '#bd976a',
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
