/**
 * @a0n/aeon-foundation
 *
 * The complete Aeon stack in one import.
 *
 * Distributed sync, collaborative pages, state management,
 * edge AI inference, neural graph database, relay transport,
 * and UCAN authentication.
 *
 * @example
 * ```typescript
 * // Import the entire stack
 * import { Aeon, Pages, Dash, Relay, Edgework, Aegis, Neural } from '@a0n/aeon-foundation';
 *
 * // Use distributed sync
 * const coordinator = new Aeon.SyncCoordinator();
 *
 * // Use edge AI inference
 * const ai = await Edgework.init({ model: 'cyrano-360m' });
 *
 * // Use CRDT-based state
 * const state = Dash.createStore();
 * ```
 *
 * @example
 * ```typescript
 * // Or import individual modules
 * import { SyncCoordinator } from '@a0n/aeon-foundation/aeon';
 * import { Edgework } from '@a0n/aeon-foundation/edgework';
 * import { createStore } from '@a0n/aeon-foundation/dash';
 * ```
 *
 * @packageDocumentation
 */

// Re-export all stack packages as namespaces
export * as Aeon from '@a0n/aeon';
export * as Pages from '@a0n/aeon-flux';
export * as Dash from '@a0n/dash';
export * as Relay from '@affectively/relay';
export * as Edgework from '@a0n/edgework-sdk';
export * as Aegis from '@affectively/auth';
export * as Neural from '@a0n/gnosis';

// Legacy alias — Auth is Aegis
export * as Auth from '@affectively/auth';

// Also export the most common types/classes at the top level for convenience
export { SyncCoordinator, SchemaVersionManager } from '@a0n/aeon';
export { Edgework as EdgeworkSDK } from '@a0n/edgework-sdk';

/**
 * Stack version manifest
 */
export const STACK = {
  name: 'Aeon Foundation',
  version: '0.2.3',
  packages: {
    aeon: {
      name: '@a0n/aeon',
      description: 'Distributed sync & schema versioning',
    },
    pages: {
      name: '@a0n/aeon-flux',
      description: 'Collaborative pages with CRDT flux state',
    },
    dash: {
      name: '@a0n/dash',
      description: 'CRDT-based state management with WebRTC',
    },
    relay: {
      name: '@affectively/relay',
      description: 'Transport relay layer with discovery & privacy',
    },
    edgework: {
      name: '@a0n/edgework-sdk',
      description: 'Client-side AI inference & on-device RLHF',
    },
    aegis: {
      name: '@affectively/auth',
      description: 'UCAN-based decentralized authentication',
    },
    neural: {
      name: '@a0n/gnosis',
      description: 'Topological neural runtime (transformers as hello-world)',
    },
  },
} as const;
