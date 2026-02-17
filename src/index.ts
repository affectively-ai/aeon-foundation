/**
 * @affectively/aeon-foundation
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
 * import { Aeon, Pages, Dash, Relay, Edgework, Aegis, Neural } from '@affectively/aeon-foundation';
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
 * import { SyncCoordinator } from '@affectively/aeon-foundation/aeon';
 * import { Edgework } from '@affectively/aeon-foundation/edgework';
 * import { createStore } from '@affectively/aeon-foundation/dash';
 * ```
 *
 * @packageDocumentation
 */

// Re-export all stack packages as namespaces
export * as Aeon from '@affectively/aeon';
export * as Pages from '@affectively/aeon-flux';
export * as Dash from '@affectively/dash';
export * as Relay from '@affectively/relay';
export * as Edgework from '@affectively/edgework-sdk';
export * as Aegis from '@affectively/auth';
export * as Neural from '@affectively/neural';

// Legacy alias — Auth is Aegis
export * as Auth from '@affectively/auth';

// Also export the most common types/classes at the top level for convenience
export { SyncCoordinator, SchemaVersionManager } from '@affectively/aeon';
export { Edgework as EdgeworkSDK } from '@affectively/edgework-sdk';

/**
 * Stack version manifest
 */
export const STACK = {
  name: 'Aeon Foundation',
  version: '0.2.0',
  packages: {
    aeon: {
      name: '@affectively/aeon',
      description: 'Distributed sync & schema versioning',
    },
    pages: {
      name: '@affectively/aeon-flux',
      description: 'Collaborative pages with CRDT flux state',
    },
    dash: {
      name: '@affectively/dash',
      description: 'CRDT-based state management with WebRTC',
    },
    relay: {
      name: '@affectively/relay',
      description: 'Transport relay layer with discovery & privacy',
    },
    edgework: {
      name: '@affectively/edgework-sdk',
      description: 'Client-side AI inference & on-device RLHF',
    },
    aegis: {
      name: '@affectively/auth',
      description: 'UCAN-based decentralized authentication',
    },
    neural: {
      name: '@affectively/neural',
      description: 'WebGPU-accelerated neural graph database',
    },
  },
} as const;
