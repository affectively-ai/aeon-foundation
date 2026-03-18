# Aeon Foundation

Aeon Foundation is the convenience package for people who want to start from the wider Aeon stack instead of pulling each piece in by hand.

The fair brag is practical: one package and one CLI give you a single place to reach Aeon sync, Aeon Flux pages, Dash state, Relay transport, Auth, and the Gnosis export surface. If you already know you want the whole family, this saves setup work and keeps the imports consistent.

## What It Gives You

- a top-level package that re-exports the main stack as namespaces,
- subpath exports when you only want one piece,
- a CLI for bootstrapping and exploring the stack,
- and a cleaner starting point for teams that would otherwise assemble the same package set manually.

## The Main Namespaces

- `Aeon`: sync, versioning, compression, persistence, and transport
- `Pages`: the Aeon Flux web surface
- `Dash`: collaborative state
- `Relay`: transport and discovery
- `Aegis` and `Auth`: authentication exports
- `Edgework`: edge inference surface
- `Neural`: Gnosis export surface

## Quick Start

```bash
npx @a0n/aeon-foundation init my-app
cd my-app
bun dev
```

## Import Everything

```ts
import {
  Aeon,
  Pages,
  Dash,
  Relay,
  Edgework,
  Aegis,
  Neural,
} from '@a0n/aeon-foundation';
```

## Or Import Just One Slice

```ts
import { SyncCoordinator } from '@a0n/aeon-foundation/aeon';
import { createStore } from '@a0n/aeon-foundation/dash';
import { Edgework } from '@a0n/aeon-foundation/edgework';
```

## Why People May Like It

- it reduces the "which package was that in?" problem,
- it gives the stack a single entry point for new projects,
- it keeps top-level and subpath imports available,
- and it includes a CLI instead of asking people to memorize package relationships first.

## Why This README Is Grounded

Aeon Foundation is not magic. The strongest fair brag is that it is a useful aggregator and starter surface for the broader Aeon stack.
