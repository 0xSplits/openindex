---
showAskAi: false
---

# Imports & Bundle Size

## Imports

There are two approaches to import OpenIndex modules:

- [Named Imports](#named-imports): Importing modules via the root `openindex` namespace.
- [Entrypoint Imports](#entrypoint-imports): Importing modules via an `openindex/{Module}` namespace.

### Named Imports

Modules can be imported via their respective module export in the root `openindex` namespace:

```ts twoslash
import { Indexer } from 'openindex'
```

This approach does not compromise on [tree-shakability](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), as most modern bundlers support Deep Scope Analysis. As a result, this will not impact the bundle size of your application.

Bundlers known to support Deep Scope Analysis include: [Vite](https://vitejs.dev/), [Rollup](https://rollupjs.org/), [Webpack 5+](https://webpack.js.org/), [esbuild](https://esbuild.github.io/), [swc](https://swc.rs/), and more.

### Entrypoint Imports

If your bundler does not support Deep Scope Analysis, you can also import modules via their respective entrypoint:

```ts twoslash
// @noErrors
import * as Indexer from 'openindex/Indexer'
```

## Tree Shakability & Bundle Size

Each module in OpenIndex exports a number of functions (e.g. `EventHandler` exports `from`). It is important to note that these modules **are not stateful instances with methods** — you cannot instantiate an `EventHandler` class — they are collections of pure stateless functions. This is because function exports are [tree-shakable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), whereas instance methods are not.

When modules are imported from OpenIndex, only the functions you actually use will be included in the final bundle of your application. Unused functions are automatically removed.

Methods that are attached to instances cannot be tree-shaken by bundlers, which leads to all methods of a given instance being included in the bundle regardless of whether they are used or not.
