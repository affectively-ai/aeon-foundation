/**
 * @a0n/aeon-foundation/edgework
 *
 * Client-side AI inference with D1/Dash storage,
 * WebGPU inference, and on-device RLHF.
 *
 * @example
 * ```typescript
 * import { Edgework } from '@a0n/aeon-foundation/edgework';
 *
 * const ai = await Edgework.init({
 *   model: 'cyrano-360m',
 *   onProgress: (p) => console.log(`${p.percent}% downloaded`),
 * });
 *
 * const response = await ai.generate('How are you feeling today?');
 * ```
 */
export * from '@a0n/edgework-sdk';
