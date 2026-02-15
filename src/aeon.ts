/**
 * @affectively/aeon-foundation/aeon
 *
 * Distributed synchronization, schema versioning, and conflict resolution.
 *
 * @example
 * ```typescript
 * import { SyncCoordinator, SchemaVersionManager } from '@affectively/aeon-foundation/aeon';
 *
 * const coordinator = new SyncCoordinator();
 * coordinator.registerNode({
 *   id: 'node-1',
 *   address: 'localhost',
 *   port: 3000,
 *   status: 'online',
 *   lastHeartbeat: new Date().toISOString(),
 *   version: '1.0.0',
 *   capabilities: ['sync', 'replicate'],
 * });
 * ```
 */
export * from '@affectively/aeon';
