// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages } from 'waku/router'

// prettier-ignore
type Page =
  | { path: '/api/Block'; render: 'static' }
  | { path: '/api/Block/types'; render: 'static' }
  | { path: '/api/Client'; render: 'static' }
  | { path: '/api/Client/types'; render: 'static' }
  | { path: '/api/EventHandler/from'; render: 'static' }
  | { path: '/api/EventHandler'; render: 'static' }
  | { path: '/api/EventHandler/types'; render: 'static' }
  | { path: '/api/Indexer/errors'; render: 'static' }
  | { path: '/api/Indexer'; render: 'static' }
  | { path: '/api/Indexer/start'; render: 'static' }
  | { path: '/api'; render: 'static' }
  | { path: '/guides/error-handling'; render: 'static' }
  | { path: '/guides/event-handlers'; render: 'static' }
  | { path: '/guides/example'; render: 'static' }
  | { path: '/guides/getting-started'; render: 'static' }
  | { path: '/imports'; render: 'static' }
  | { path: '/'; render: 'static' }
  | { path: '/installation'; render: 'static' }

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>
  }
  interface CreatePagesConfig {
    pages: Page
  }
}
