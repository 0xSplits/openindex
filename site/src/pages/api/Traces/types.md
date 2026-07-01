---
showOutline: 1
---

# Traces Types

## `Traces.BaseTrace`

A single flattened call frame from a block's execution trace, produced by [`Traces.get`](/api/Traces/get). Each entry corresponds to one call in a transaction's call tree.

**Source:** [src/core/Traces.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Traces.ts#L129)

## `Traces.CallFrame`

A raw call frame as returned by the `callTracer`. Represents one node in a transaction's call tree; nested sub-calls are listed in `calls`.

**Source:** [src/core/Traces.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Traces.ts#L129)