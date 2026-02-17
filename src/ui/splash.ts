/**
 * Aeon Foundation CLI - Splash Screen & Display Utilities
 *
 * The gateway to the Pleroma.
 */

import {
  ANSI,
  BRAND,
  BRAND_RGB,
  interpolateColor,
  center,
  getTerminalWidth,
  colorize,
  bold,
  dim,
} from './colors.js';

const VERSION = '0.2.0';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ────────────────────────────────────────────────────────────────
// Logo
// ────────────────────────────────────────────────────────────────

const LOGO_COMPACT = `> aeon foundation`;

const LOGO = `
    ╭─────────────────────────────────────────────╮
    │                                             │
    │        A E O N   F O U N D A T I O N        │
    │                                             │
    │     The complete stack. One import away.     │
    │                                             │
    ╰─────────────────────────────────────────────╯
`;

const LOGO_WIDE = `
       ╭──────────────────────────────────────────────────────╮
       │                                                      │
       │    ┌─┐ ┌─┐ ┌─┐ ┌┐┌                                  │
       │    ├─┤ ├┤  │ │ │││                                   │
       │    ┴ ┴ └─┘ └─┘ ┘└┘                                  │
       │                                                      │
       │    ┌─┐ ┌─┐ ┬ ┬ ┌┐┌ ┌┬┐ ┌─┐ ┌┬┐ ┬ ┌─┐ ┌┐┌          │
       │    ├┤  │ │ │ │ │││  │││ ├─┤  │  │ │ │ │││           │
       │    ┴   └─┘ └─┘ ┘└┘ ─┴┘ ┴ ┴  ┴  ┴ └─┘ ┘└┘          │
       │                                                      │
       │    The complete stack. One import away.               │
       │                                                      │
       ╰──────────────────────────────────────────────────────╯
`;

function getLogo(): string {
  const width = getTerminalWidth();
  if (width < 50) return LOGO_COMPACT;
  if (width < 70) return LOGO;
  return LOGO_WIDE;
}

// ────────────────────────────────────────────────────────────────
// Splash
// ────────────────────────────────────────────────────────────────

export async function showSplash(options?: {
  animate?: boolean;
  minimal?: boolean;
}): Promise<void> {
  const { animate = true, minimal = false } = options || {};
  const width = getTerminalWidth();

  console.log('');

  if (minimal) {
    const line = `${BRAND.aeon}>${ANSI.reset} ${bold('aeon-foundation')} ${dim(
      `v${VERSION}`
    )}`;
    process.stdout.write(`  ${line}`);
    console.log('');
    return;
  }

  const logo = getLogo();
  const lines = logo.trim().split('\n');

  for (let i = 0; i < lines.length; i++) {
    const t = i / (lines.length - 1);
    const color = interpolateColor(BRAND_RGB.aeon, BRAND_RGB.electric, t);
    console.log(color + center(lines[i], width) + ANSI.reset);
  }

  console.log('');

  if (animate) {
    const tagline = 'Aeon · Pages · Dash · Relay · Edgework · Aegis · Neural';
    process.stdout.write('  ');
    for (const char of tagline) {
      const color = interpolateColor(
        BRAND_RGB.aeon,
        BRAND_RGB.gold,
        Math.random() * 0.3
      );
      process.stdout.write(color + char + ANSI.reset);
      await sleep(8);
    }
    console.log('');
  } else {
    console.log(
      dim(
        center('Aeon · Pages · Dash · Relay · Edgework · Aegis · Neural', width)
      )
    );
  }

  console.log(dim(center(`v${VERSION}`, width)));
  console.log(dim(center('affectively.ai', width)));
  console.log('');
}

// ────────────────────────────────────────────────────────────────
// Stack Visualization
// ────────────────────────────────────────────────────────────────

interface StackLayer {
  name: string;
  pkg: string;
  description: string;
  color: string;
  icon: string;
}

const STACK_LAYERS: StackLayer[] = [
  {
    name: 'Neural',
    pkg: '@affectively/neural',
    description: 'WebGPU-accelerated neural graph database',
    color: BRAND.electric,
    icon: '◈',
  },
  {
    name: 'Edgework SDK',
    pkg: '@affectively/edgework-sdk',
    description: 'Client-side AI inference, WebGPU, on-device RLHF',
    color: BRAND.electric,
    icon: '>',
  },
  {
    name: 'Aeon Flux',
    pkg: '@affectively/aeon-flux',
    description: 'Collaborative pages with CRDT flux state, ESI, zero-CLS',
    color: BRAND.aeonBright,
    icon: '~',
  },
  {
    name: 'Dash',
    pkg: '@affectively/dash',
    description: 'Distributed CRDT state management with WebRTC sync',
    color: BRAND.emerald,
    icon: '*',
  },
  {
    name: 'Relay',
    pkg: '@affectively/relay',
    description: 'Transport relay with discovery, privacy & adaptive sync',
    color: BRAND.emerald,
    icon: '⇄',
  },
  {
    name: 'Aeon',
    pkg: '@affectively/aeon',
    description: 'Distributed sync, schema versioning, conflict resolution',
    color: BRAND.aeon,
    icon: '@',
  },
  {
    name: 'Aegis',
    pkg: '@affectively/auth',
    description: 'UCAN-based decentralized authentication & zero-trust',
    color: BRAND.goldDim,
    icon: '#',
  },
];

export function showStackDiagram(): void {
  console.log('');
  console.log(`  ${bold('The Aeon Stack')}`);
  console.log('');

  const maxName = Math.max(...STACK_LAYERS.map((l) => l.name.length));
  const maxPkg = Math.max(...STACK_LAYERS.map((l) => l.pkg.length));

  for (let i = 0; i < STACK_LAYERS.length; i++) {
    const layer = STACK_LAYERS[i];
    const isFirst = i === 0;
    const isLast = i === STACK_LAYERS.length - 1;

    // Top border for first item
    if (isFirst) {
      console.log(`  ${colorize('  ╭' + '─'.repeat(56) + '╮', layer.color)}`);
    }

    // Layer content
    const name = layer.name.padEnd(maxName);
    const pkg = dim(layer.pkg.padEnd(maxPkg));
    console.log(
      `  ${colorize('  │', layer.color)} ${colorize(
        layer.icon,
        layer.color
      )} ${bold(name)}  ${pkg}  ${colorize('│', layer.color)}`
    );
    console.log(
      `  ${colorize('  │', layer.color)}   ${dim(
        layer.description
      )}${' '.repeat(Math.max(0, 53 - layer.description.length - 1))}${colorize(
        '│',
        layer.color
      )}`
    );

    // Separator or bottom border
    if (isLast) {
      console.log(`  ${colorize('  ╰' + '─'.repeat(56) + '╯', layer.color)}`);
    } else {
      const nextColor = STACK_LAYERS[i + 1].color;
      console.log(
        `  ${colorize('  ├', layer.color)}${colorize(
          '─'.repeat(56),
          nextColor
        )}${colorize('┤', nextColor)}`
      );
    }
  }

  console.log('');
}

// ────────────────────────────────────────────────────────────────
// Display Helpers
// ────────────────────────────────────────────────────────────────

export function spacer(): void {
  console.log('');
}

export function groupHeader(title: string): void {
  console.log('');
  console.log(`  ${bold(title)}`);
}

export function commandExample(command: string, description: string): void {
  console.log(
    `  ${dim('$')} ${colorize(command, BRAND.aeon)}  ${dim(description)}`
  );
}

export function sectionHeader(title: string): void {
  console.log('');
  console.log(`  ${BRAND.aeon}│${ANSI.reset} ${bold(title)}`);
}

export function done(message: string, detail?: string): void {
  if (detail) {
    console.log(`  ${colorize('✓', BRAND.success)} ${message} ${dim(detail)}`);
  } else {
    console.log(`  ${colorize('✓', BRAND.success)} ${message}`);
  }
}

export function fail(message: string, detail?: string): void {
  if (detail) {
    console.log(`  ${colorize('✗', BRAND.error)} ${message} ${dim(detail)}`);
  } else {
    console.log(`  ${colorize('✗', BRAND.error)} ${message}`);
  }
}

export function note(message: string): void {
  console.log(`  ${dim(message)}`);
}

export function keyValue(
  key: string,
  value: string,
  keyWidth: number = 16
): void {
  const paddedKey = key.padEnd(keyWidth);
  console.log(`  ${colorize(paddedKey, BRAND.steel)} ${value}`);
}

export function stepLine(
  text: string,
  status: 'pending' | 'active' | 'done' | 'error' = 'pending'
): void {
  const icons = {
    pending: dim('○'),
    active: colorize('◐', BRAND.aeon),
    done: colorize('✓', BRAND.success),
    error: colorize('✗', BRAND.error),
  };
  console.log(`  ${icons[status]} ${text}`);
}
