/**
 * Aeon Foundation CLI
 *
 * The complete Aeon stack. One command away.
 *
 * Usage:
 *   npx @affectively/aeon-foundation          Interactive setup
 *   npx @affectively/aeon-foundation init     Scaffold a new project
 *   npx @affectively/aeon-foundation info     Show stack info
 *   npx @affectively/aeon-foundation --help   Help
 */

import { BRAND, ANSI, bold, dim, colorize } from './ui/colors.js';
import { showSplash, showStackDiagram, spacer, groupHeader, commandExample, note } from './ui/splash.js';
import { initProject } from './commands/init.js';
import { showInfo } from './commands/info.js';

const VERSION = '0.1.0';

// ────────────────────────────────────────────────────────────────
// Argument Parsing (zero dependencies)
// ────────────────────────────────────────────────────────────────

interface ParsedArgs {
  command: string;
  flags: Record<string, string | boolean>;
  positionals: string[];
}

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const flags: Record<string, string | boolean> = {};
  const positionals: string[] = [];
  let command = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('-')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      flags[key] = true;
    } else if (!command) {
      command = arg;
    } else {
      positionals.push(arg);
    }
  }

  return { command, flags, positionals };
}

// ────────────────────────────────────────────────────────────────
// Help
// ────────────────────────────────────────────────────────────────

function showHelp(): void {
  console.log('');
  console.log(
    `  ${BRAND.aeon}>${ANSI.reset} ${bold('aeon-foundation')} ${dim(`v${VERSION}`)}  ${dim('The complete Aeon stack')}`,
  );

  groupHeader('Quick Start');
  commandExample('npx @affectively/aeon-foundation', 'Interactive setup');
  commandExample('npx @affectively/aeon-foundation init my-app', 'Scaffold a project');

  groupHeader('Commands');
  commandExample('init [name]', 'Create a new Aeon Foundation project');
  commandExample('info', 'Show the full stack diagram & package info');
  commandExample('help', 'Show this help');

  groupHeader('Init Options');
  commandExample('--template minimal', 'Minimal starter (default)');
  commandExample('--template full', 'Full-stack with all packages');
  commandExample('--template edge-ai', 'Edge AI focused starter');
  commandExample('--skip-install', 'Skip dependency installation');
  commandExample('--pm npm|bun|pnpm|yarn', 'Package manager to use');

  groupHeader('Imports');
  console.log(`  ${colorize("import { Aeon, Pages, Dash, Edgework, Auth } from '@affectively/aeon-foundation'", BRAND.electric)}`);
  spacer();
  console.log(`  ${dim('Or individual modules:')}`);
  console.log(`  ${colorize("import { SyncCoordinator } from '@affectively/aeon-foundation/aeon'", BRAND.electric)}`);
  console.log(`  ${colorize("import { Edgework } from '@affectively/aeon-foundation/edgework'", BRAND.electric)}`);

  groupHeader('Links');
  console.log(`  ${dim('GitHub')}   https://github.com/affectively-ai/aeon-foundation`);
  console.log(`  ${dim('npm')}      https://npmjs.com/package/@affectively/aeon-foundation`);
  console.log(`  ${dim('Website')}  https://affectively.ai`);

  spacer();
}

// ────────────────────────────────────────────────────────────────
// Default action (interactive)
// ────────────────────────────────────────────────────────────────

async function defaultAction(): Promise<void> {
  await showSplash({ animate: true, minimal: false });
  showStackDiagram();

  console.log(`  ${bold('Get started:')}`);
  spacer();
  commandExample('npx @affectively/aeon-foundation init my-app', 'Scaffold a new project');
  commandExample('npx @affectively/aeon-foundation info', 'Explore the stack');
  spacer();

  console.log(`  ${dim('Or just install it:')}`);
  console.log(`  ${dim('$')} ${colorize('npm install @affectively/aeon-foundation', BRAND.aeon)}`);
  console.log(`  ${dim('$')} ${colorize('bun add @affectively/aeon-foundation', BRAND.aeon)}`);
  spacer();

  console.log(`  ${dim('Then import everything:')}`);
  console.log(`  ${colorize("import { Aeon, Pages, Dash, Edgework, Auth } from '@affectively/aeon-foundation';", BRAND.electric)}`);
  spacer();

  note('https://github.com/affectively-ai/aeon-foundation');
  spacer();
}

// ────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { command, flags, positionals } = parseArgs(process.argv);

  // Version
  if (flags['version'] || flags['v']) {
    console.log(VERSION);
    return;
  }

  // Help
  if (flags['help'] || flags['h'] || command === 'help') {
    showHelp();
    return;
  }

  // Commands
  switch (command) {
    case 'init':
    case 'create':
    case 'new': {
      await showSplash({ animate: false, minimal: true });
      await initProject({
        name: positionals[0] || (flags['name'] as string),
        template: (flags['template'] as 'minimal' | 'full' | 'edge-ai') || 'minimal',
        skipInstall: !!flags['skip-install'],
        packageManager: flags['pm'] as 'npm' | 'bun' | 'pnpm' | 'yarn' | undefined,
      });
      break;
    }

    case 'info':
    case 'stack':
    case 'status': {
      await showSplash({ animate: false, minimal: true });
      showInfo();
      break;
    }

    default: {
      // No command or unknown command - show the full splash + guide
      await defaultAction();
    }
  }
}

main().catch((err) => {
  console.error(`\n  ${colorize('✗', BRAND.error)} ${err.message}\n`);
  process.exit(1);
});
