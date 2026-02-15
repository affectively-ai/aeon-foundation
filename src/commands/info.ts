/**
 * info command - Display stack information
 */

import { BRAND, bold, dim, colorize } from '../ui/colors.js';
import { showStackDiagram, spacer, keyValue, sectionHeader } from '../ui/splash.js';

export function showInfo(): void {
  showStackDiagram();

  sectionHeader('Quick Start');
  spacer();
  console.log(`  ${dim('Install:')}  ${colorize('npm install @affectively/aeon-foundation', BRAND.aeon)}`);
  console.log(`  ${dim('   or  ')}  ${colorize('bun add @affectively/aeon-foundation', BRAND.aeon)}`);
  spacer();

  sectionHeader('Imports');
  spacer();

  const imports = [
    { path: '@affectively/aeon-foundation', desc: 'Everything (Aeon, Pages, Dash, Edgework, Auth)' },
    { path: '@affectively/aeon-foundation/aeon', desc: 'Distributed sync & versioning' },
    { path: '@affectively/aeon-foundation/pages', desc: 'Collaborative pages + CRDT flux' },
    { path: '@affectively/aeon-foundation/dash', desc: 'CRDT state + WebRTC sync' },
    { path: '@affectively/aeon-foundation/edgework', desc: 'Edge AI + WebGPU inference' },
    { path: '@affectively/aeon-foundation/auth', desc: 'UCAN authentication' },
  ];

  for (const imp of imports) {
    console.log(`  ${colorize(imp.path, BRAND.electric)}`);
    console.log(`  ${dim(imp.desc)}`);
    console.log('');
  }

  sectionHeader('Links');
  spacer();
  keyValue('GitHub', 'https://github.com/affectively-ai/aeon-foundation');
  keyValue('npm', 'https://npmjs.com/package/@affectively/aeon-foundation');
  keyValue('Website', 'https://affectively.ai');
  spacer();
}
