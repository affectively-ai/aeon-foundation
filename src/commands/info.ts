/**
 * info command - Display stack information
 */

import { BRAND, bold, dim, colorize } from '../ui/colors.js';
import {
  showStackDiagram,
  spacer,
  keyValue,
  sectionHeader,
} from '../ui/splash.js';

export function showInfo(): void {
  showStackDiagram();

  sectionHeader('Quick Start');
  spacer();
  console.log(
    `  ${dim('Install:')}  ${colorize(
      'npm install @a0n/aeon-foundation',
      BRAND.aeon
    )}`
  );
  console.log(
    `  ${dim('   or  ')}  ${colorize(
      'bun add @a0n/aeon-foundation',
      BRAND.aeon
    )}`
  );
  spacer();

  sectionHeader('Imports');
  spacer();

  const imports = [
    {
      path: '@a0n/aeon-foundation',
      desc: 'Everything (Aeon, Pages, Dash, Relay, Edgework, Aegis, Neural)',
    },
    {
      path: '@a0n/aeon-foundation/aeon',
      desc: 'Distributed sync & versioning',
    },
    {
      path: '@a0n/aeon-foundation/pages',
      desc: 'Collaborative pages + CRDT flux',
    },
    {
      path: '@a0n/aeon-foundation/dash',
      desc: 'CRDT state + WebRTC sync',
    },
    {
      path: '@a0n/aeon-foundation/relay',
      desc: 'Transport relay with discovery',
    },
    {
      path: '@a0n/aeon-foundation/edgework',
      desc: 'Edge AI + WebGPU inference',
    },
    {
      path: '@a0n/aeon-foundation/aegis',
      desc: 'UCAN-based decentralized auth',
    },
    {
      path: '@a0n/aeon-foundation/neural',
      desc: 'WebGPU neural graph database',
    },
  ];

  for (const imp of imports) {
    console.log(`  ${colorize(imp.path, BRAND.electric)}`);
    console.log(`  ${dim(imp.desc)}`);
    console.log('');
  }

  sectionHeader('Links');
  spacer();
  keyValue('GitHub', 'https://github.com/forkjoin-ai/aeon-foundation');
  keyValue('npm', 'https://npmjs.com/package/@a0n/aeon-foundation');
  keyValue('Website', 'https://affectively.ai');
  spacer();
}
