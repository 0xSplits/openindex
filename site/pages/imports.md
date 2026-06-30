# Imports & Bundle Size

## Imports

There are two approaches to import Modules:

- [Named Imports](#named-imports): Importing modules via the root `ox` namespace.
- [Entrypoint Imports](#entrypoint-imports): Importing modules via an `ox/{Module}` namespace.

### Named Imports

Modules can be imported via their respective module export in the root `ox` namespace:

```ts twoslash
import { Foo } from 'openindex'

const foo = Foo.from('FOO')
```

This approach does not compromise on [tree-shakability](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), as most modern bundlers support Deep Scope Analysis. As a result, this will not impact the bundle size of your application.

Bundlers known to support Deep Scope Analysis include: [Vite](https://vitejs.dev/), [Rollup](https://rollupjs.org/), [Webpack 5+](https://webpack.js.org/), [esbuild](https://esbuild.github.io/), [swc](https://swc.rs/), and more.

### Entrypoint Imports

If your bundler does not support Deep Scope Analysis, you are also able to import modules via their respective entrypoint:

```ts twoslash
// @noErrors
import * as Foo from 'openindex/Foo'

const foo = Foo.from("oof")
```

## Tree Shakability & Bundle Size

Each Module you create can export a number of functions (e.g. `Foo` exports `from` and `assert`). It is important to note that these Modules **are not stateful instances with methods** (ie. you cannot instantiate a `Foo` class/object), they are merely a collection of pure stateless functions. This is because function exports are [tree-shakable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), whereas instance methods are not.

When Modules are imported from your package, only the functions from that Module will be included in the final bundle of the application. Unused functions are automatically removed, resulting in a lower bundle size.

Whereas, methods that are attached to instances cannot be tree-shaken by bundlers, which will lead to all methods of a given instance being included in the bundle, regardless of whether they are used or not.
