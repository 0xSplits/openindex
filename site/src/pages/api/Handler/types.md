---
showOutline: 1
---

# Handler Types

## `Handler.AbiEventHandler`

Log event handler for a given contract ABI. Create it with [`Handler.fromAbi`](/api/Handler/fromAbi).

**Source:** [src/core/Handler.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Handler.ts#L155)

## `Handler.Handler`

Generalized handler type.

**Source:** [src/core/Handler.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Handler.ts#L21)

## `Handler.NativeHandler`

Handler that receives the native transfers in each indexed block. Create it with [`Handler.native`](/api/Handler/native).

**Source:** [src/core/Handler.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Handler.ts#L155)

## `Handler.NativeTransfer`

A single native value (ETH) transfer extracted from a block's execution traces. Covers both top-level transfers and internal transfers made by contracts. Delivered to handlers created with [`Handler.native`](/api/Handler/native).

**Source:** [src/core/Handler.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Handler.ts#L155)