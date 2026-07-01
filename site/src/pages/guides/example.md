---
showAskAi: false
---

# Example Guide

## Overview 

This is just an example guide to show you some of the things you can do in [Vocs](https://vocs.dev).

All markdown elements are supported, such as tables:

| Module                                        | Name                                                                            | Descritpion |
| --------------------------------------------- | ------------------------------------------------------------------------------- | ----------- |
| [`Foo`](/api/Foo)                             | Foo                                                                          | Create and manage Foos, sometimes of the Fighter variety. |

## API Reference

The API reference linked to [here](/api/Foo) is generated from the source code of the `Foo` module. You can colocate examples and instructions with your code to appear in the API reference pages.

## Examples

You can also create examples directly in Vocs. All examples are written using [twoslash](https://twoslash.netlify.app) comments. They support hovering for type information, displaying type errors, syntax highlighting, and more.

```ts twoslash
import { Foo } from 'openindex'

const foo = Foo.from('fighters', { fighters: true })
//    ^?













// @log:        ↑ contains `r`, `s`, `yParity` signature properties.
```

