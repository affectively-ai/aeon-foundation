# Aeon Foundation

> Distributed. Collaborative. Alive.

[![npm version](https://badge.fury.io/js/@affectively%2Faeon-foundation.svg)](https://www.npmjs.com/package/@affectively/aeon-foundation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)

Surface. Sync. Transport. Auth. Intelligence. Everything you need. Nothing you don't own.

**Aeon Foundation** is the complete stack for building distributed, collaborative, AI-powered applications. One import. One `npx`. The entire infrastructure — wired together and ready.

```
  ╭──────────────────────────────────────────────────────╮
  │                                                      │
  │    A E O N   F O U N D A T I O N                     │
  │                                                      │
  │    The complete stack. One import away.               │
  │                                                      │
  ╰──────────────────────────────────────────────────────╯
```

## Escape in 30 seconds

```bash
npx @affectively/aeon-foundation init my-app
cd my-app
bun dev
```

That's it. Distributed sync, collaborative state, edge AI, decentralized auth — configured and ready.

## What if you owned your stack?

Cloud vendor lock-in. Framework churn. Data scattered across services you don't control. Users tracked and monetized by platforms you depend on.

Aeon Foundation is the way out.

| Pillar       | What it means                                                    |
| ------------ | ---------------------------------------------------------------- |
| **Speed**    | 7ms edge renders. Sub-10ms sync. 0ms speculative navigation.    |
| **Privacy**  | K-anonymity. Zero-knowledge proofs. Data never leaves the device.|
| **Low Cost** | Edge compute. Pay per request. No origin servers.                |
| **Ownership**| Open source. No vendor lock-in. Your code, your data. Forever.  |

## The Stack

```
  ╭────────────────────────────────────────────────────────╮
  │ >  Edgework SDK          @affectively/edgework-sdk     │
  │    Client-side AI · WebGPU inference · On-device RLHF  │
  ├────────────────────────────────────────────────────────┤
  │ ~  Aeon Pages             @affectively/aeon-pages       │
  │    Collaborative pages · CRDT flux state · Zero-CLS    │
  ├────────────────────────────────────────────────────────┤
  │ *  Dash                   @affectively/dash             │
  │    Distributed CRDT state · WebRTC sync · Signals      │
  ├────────────────────────────────────────────────────────┤
  │ @  Aeon                   @affectively/aeon             │
  │    Distributed sync · Schema versioning · Conflict res │
  ├────────────────────────────────────────────────────────┤
  │ #  Auth                   @affectively/auth             │
  │    UCAN-based · Decentralized · Zero-trust             │
  ╰────────────────────────────────────────────────────────╯
```

## Usage

### Import everything

```typescript
import { Aeon, Pages, Dash, Edgework, Auth } from '@affectively/aeon-foundation';
```

Five namespaces. The entire distributed stack.

```typescript
// Distributed sync — coordinate nodes across the network
const coordinator = new Aeon.SyncCoordinator();
coordinator.registerNode({
  id: 'node-1',
  address: 'localhost',
  port: 3000,
  status: 'online',
  lastHeartbeat: new Date().toISOString(),
  version: '1.0.0',
  capabilities: ['sync', 'replicate'],
});

// Edge AI — inference runs on the user's device, not yours
const ai = await Edgework.Edgework.init({
  model: 'cyrano-360m',
  onProgress: (p) => console.log(`${p.percent}% downloaded`),
});
const response = await ai.generate('How are you feeling today?');
```

### Import individual modules

Take only what you need. Tree-shaking friendly.

```typescript
import { SyncCoordinator, SchemaVersionManager } from '@affectively/aeon-foundation/aeon';
import { Edgework } from '@affectively/aeon-foundation/edgework';
import { AeonPageProvider } from '@affectively/aeon-foundation/pages';
import { createStore } from '@affectively/aeon-foundation/dash';
import { createUcanAuth } from '@affectively/aeon-foundation/auth';
```

## Modules

### Aeon — The Sync Standard

Distributed synchronization, schema versioning, and conflict resolution. The collaborative primitives the web deserves.

```typescript
import { SyncCoordinator, SchemaVersionManager } from '@affectively/aeon-foundation/aeon';
```

Submodules: `core` `offline` `compression` `optimization` `presence` `versioning` `distributed` `utils` `crypto` `persistence`

### Aeon Pages — Pages that Think

CRDT-based flux state, Edge Side Inference, zero-CLS rendering. Collaborative pages with built-in intelligence.

```typescript
import { AeonPageProvider, useAeonPage } from '@affectively/aeon-foundation/pages';
```

Submodules: `runtime` `react` `esi` `server` `directives`

### Dash — Living State

Distributed state management built on Yjs CRDTs with WebRTC sync. Real-time collaboration that works offline.

```typescript
import { createStore } from '@affectively/aeon-foundation/dash';
```

Submodules: `sync` `provider` `connection` `webtransport`

### Edgework SDK — Intelligence at the Edge

Client-side AI inference with WebGPU. On-device RLHF. Model sync. Zero server dependency. The model runs where the user is.

```typescript
import { Edgework } from '@affectively/aeon-foundation/edgework';

const ai = await Edgework.init({ model: 'cyrano-360m' });

// Generate
const response = await ai.generate('Hello from the edge!');

// Stream
for await (const token of ai.stream('Tell me a story')) {
  process.stdout.write(token);
}

// Chat with context
const reply = await ai.chat([
  { role: 'user', content: 'I had a rough day' },
]);

// Feedback for on-device RLHF
await ai.feedback(messageHash, 'positive');
```

Submodules: `storage` `inference` `sync` `rlhf` `react` `data` `compute` `compute/distributed` `auth` `gateway` `agent`

### Auth — No Authority

UCAN-based decentralized authentication. No central server decides who you are.

```typescript
import { createUcanAuth } from '@affectively/aeon-foundation/auth';
```

## CLI

A luxury CLI experience for the Aeon stack. Gradient rendering, animated splash, branded TUI.

```bash
# The gateway — interactive stack explorer
npx @affectively/aeon-foundation

# Scaffold a new project
npx @affectively/aeon-foundation init my-app

# Show the stack diagram and all available imports
npx @affectively/aeon-foundation info

# Help
npx @affectively/aeon-foundation --help
```

### Templates

| Template   | What you get                                      |
| ---------- | ------------------------------------------------- |
| `minimal`  | SyncCoordinator + TypeScript. Start from zero.    |
| `full`     | All five packages + React. Everything configured. |
| `edge-ai`  | Edgework SDK focused. AI at the edge.             |

```bash
npx @affectively/aeon-foundation init my-app --template full
```

### Package Manager Detection

Auto-detects bun, pnpm, yarn, or npm. Override with `--pm`:

```bash
npx @affectively/aeon-foundation init my-app --pm bun
```

## Three Paths

### 1. New project

Start fresh with everything configured.

```bash
npx @affectively/aeon-foundation init my-app --template full
```

### 2. Add to existing project

Keep your code, add the infrastructure.

```bash
bun add @affectively/aeon-foundation
```

### 3. Just the sync

Add Aeon to any project for distributed state.

```bash
bun add @affectively/aeon-foundation
```

```typescript
import { SyncCoordinator } from '@affectively/aeon-foundation/aeon';
```

## Philosophy

In Gnosticism, **Aeons** are divine emanations from the Pleroma — bridges between the pure source and the material world, existing in pairs to maintain balance.

In your application, Aeon Foundation is that bridge: the complete set of primitives for building collaborative, intelligent applications at the edge. User-first. Future-forward. No authority.

> Universal intelligence should be available universally.

## Requirements

- **Node.js** >= 18.0.0
- **TypeScript** >= 5.7 (recommended)
- **React** >= 18.0.0 (optional — for Pages, Dash, and Edgework React bindings)

## Links

- [GitHub](https://github.com/affectively-ai/aeon-foundation)
- [npm](https://www.npmjs.com/package/@affectively/aeon-foundation)
- [Aeon](https://github.com/affectively-ai/aeon) — Distributed sync
- [Aeon Pages](https://github.com/affectively-ai/aeon-flux) — Collaborative pages
- [Dash](https://github.com/affectively-ai/dash) — CRDT state
- [Edgework SDK](https://github.com/affectively-ai/edgework-sdk) — Edge AI
- [Affectively](https://affectively.ai)

## License

MIT
