/**
 * init command - Scaffold a new Aeon Foundation project
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { BRAND, bold, dim, colorize } from '../ui/colors.js';
import {
  done,
  fail,
  note,
  stepLine,
  spacer,
  sectionHeader,
} from '../ui/splash.js';
import { createSpinner } from '../ui/progress.js';

interface InitOptions {
  name?: string;
  template?: 'minimal' | 'full' | 'edge-ai';
  skipInstall?: boolean;
  packageManager?: 'npm' | 'bun' | 'pnpm' | 'yarn';
}

function detectPackageManager(): string {
  const userAgent = process.env['npm_config_user_agent'] || '';
  if (userAgent.includes('bun')) return 'bun';
  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('yarn')) return 'yarn';
  // Check for bun binary
  try {
    execSync('bun --version', { stdio: 'ignore' });
    return 'bun';
  } catch {
    return 'npm';
  }
}

function generatePackageJson(name: string, template: string): string {
  const base: Record<string, unknown> = {
    name,
    version: '0.0.1',
    private: true,
    type: 'module',
    scripts: {
      dev: 'bun run --watch src/index.ts',
      build: 'bun build src/index.ts --outdir dist --target node',
      start: 'bun run dist/index.js',
    },
    dependencies: {
      '@affectively/aeon-foundation': '^0.1.0',
    },
    devDependencies: {
      typescript: '^5.7.0',
      '@types/node': '^22.0.0',
    },
  };

  if (template === 'full' || template === 'edge-ai') {
    (base.dependencies as Record<string, string>)['react'] = '^19.0.0';
    (base.dependencies as Record<string, string>)['react-dom'] = '^19.0.0';
    (base.devDependencies as Record<string, string>)['@types/react'] =
      '^19.0.0';
    (base.devDependencies as Record<string, string>)['@types/react-dom'] =
      '^19.0.0';
  }

  return JSON.stringify(base, null, 2);
}

function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'bundler',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        jsx: 'react-jsx',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        declaration: true,
        sourceMap: true,
        outDir: 'dist',
        rootDir: 'src',
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist'],
    },
    null,
    2
  );
}

function generateMinimalEntry(): string {
  return `/**
 * My Aeon Foundation App
 *
 * Built with the complete Aeon stack.
 */

import { Aeon, Edgework, STACK } from '@affectively/aeon-foundation';

console.log('Aeon Foundation Stack:', STACK.name, 'v' + STACK.version);
console.log('Packages:', Object.keys(STACK.packages).join(', '));

// Distributed Sync
const coordinator = new Aeon.SyncCoordinator();
console.log('SyncCoordinator ready');

// Your code here...
`;
}

function generateFullEntry(): string {
  return `/**
 * My Aeon Foundation App
 *
 * Full-stack: sync, pages, dash, relay, edge AI, aegis, neural.
 */

import {
  Aeon,
  Pages,
  Dash,
  Relay,
  Edgework,
  Aegis,
  Neural,
  STACK,
} from '@affectively/aeon-foundation';

console.log('Aeon Foundation Stack:', STACK.name, 'v' + STACK.version);
console.log('');

// ── Distributed Sync ─────────────────────────────────
const coordinator = new Aeon.SyncCoordinator();
console.log('✓ SyncCoordinator initialized');

// ── Edge AI (uncomment to use) ───────────────────────
// const ai = await Edgework.EdgeworkSDK.init({
//   model: 'cyrano-360m',
//   onProgress: (p) => console.log(\`  Downloading: \${p.percent}%\`),
// });
// const response = await ai.generate('Hello from the edge!');
// console.log('AI:', response.text);

console.log('');
console.log('Your Aeon Foundation app is ready.');
console.log('Edit src/index.ts to get started.');
`;
}

function generateEdgeAiEntry(): string {
  return `/**
 * Edge AI App - Powered by Aeon Foundation
 *
 * Client-side AI inference with on-device RLHF.
 */

import { Edgework } from '@affectively/aeon-foundation';

const { Edgework: SDK } = Edgework;

async function main() {
  console.log('Initializing edge AI...');

  const ai = await SDK.init({
    model: 'cyrano-360m',
    onProgress: (p) => {
      process.stdout.write(\`\\r  Downloading model: \${p.percent}%\`);
    },
  });

  console.log('\\n✓ Model loaded');

  // Generate text
  const response = await ai.generate('How are you feeling today?');
  console.log('\\nAI:', response.text);

  // Stream responses
  console.log('\\nStreaming:');
  for await (const token of ai.stream('Tell me about emotions')) {
    process.stdout.write(token);
  }
  console.log('');
}

main().catch(console.error);
`;
}

export async function initProject(options: InitOptions = {}): Promise<void> {
  const template = options.template || 'minimal';
  const projectName = options.name || 'my-aeon-app';
  const pm = options.packageManager || detectPackageManager();

  const projectDir = resolve(process.cwd(), projectName);

  sectionHeader('Scaffolding new Aeon Foundation project');
  spacer();

  // Check if directory exists
  if (existsSync(projectDir)) {
    fail(`Directory already exists: ${projectName}`);
    note('Choose a different name or remove the existing directory.');
    return;
  }

  // Create directory structure
  stepLine('Creating project structure...', 'active');
  mkdirSync(join(projectDir, 'src'), { recursive: true });
  done('Created project directory', projectName);

  // Write package.json
  writeFileSync(
    join(projectDir, 'package.json'),
    generatePackageJson(projectName, template)
  );
  done('Created package.json');

  // Write tsconfig.json
  writeFileSync(join(projectDir, 'tsconfig.json'), generateTsConfig());
  done('Created tsconfig.json');

  // Write entry file
  const entryGenerators: Record<string, () => string> = {
    minimal: generateMinimalEntry,
    full: generateFullEntry,
    'edge-ai': generateEdgeAiEntry,
  };
  const entryContent = (entryGenerators[template] || generateMinimalEntry)();
  writeFileSync(join(projectDir, 'src', 'index.ts'), entryContent);
  done('Created src/index.ts', `(${template} template)`);

  // Write .gitignore
  writeFileSync(
    join(projectDir, '.gitignore'),
    'node_modules/\ndist/\n*.tsbuildinfo\n.env\n.env.local\n.DS_Store\n'
  );
  done('Created .gitignore');

  // Install dependencies
  if (!options.skipInstall) {
    spacer();
    const spinner = createSpinner(`Installing dependencies with ${pm}...`);
    spinner.start();

    try {
      const installCmd = pm === 'bun' ? 'bun install' : `${pm} install`;
      execSync(installCmd, { cwd: projectDir, stdio: 'ignore' });
      spinner.succeed(`Dependencies installed with ${pm}`);
    } catch {
      spinner.fail(`Failed to install dependencies`);
      note(`Run '${pm} install' manually in ${projectName}/`);
    }
  }

  // Final output
  spacer();
  console.log(
    `  ${colorize('╭─────────────────────────────────────────╮', BRAND.aeon)}`
  );
  console.log(
    `  ${colorize('│', BRAND.aeon)} ${bold(
      'Your Aeon Foundation project is ready!'
    )}   ${colorize('│', BRAND.aeon)}`
  );
  console.log(
    `  ${colorize('╰─────────────────────────────────────────╯', BRAND.aeon)}`
  );
  spacer();

  console.log(`  ${dim('Next steps:')}`);
  console.log(`  ${dim('$')} ${colorize(`cd ${projectName}`, BRAND.aeon)}`);
  console.log(
    `  ${dim('$')} ${colorize(
      `${pm === 'bun' ? 'bun' : pm} run dev`,
      BRAND.aeon
    )}`
  );
  spacer();

  console.log(`  ${dim('Import the full stack:')}`);
  console.log(
    `  ${colorize(
      "import { Aeon, Pages, Dash, Relay, Edgework, Aegis, Neural } from '@affectively/aeon-foundation';",
      BRAND.electric
    )}`
  );
  spacer();

  console.log(`  ${dim('Or import individual modules:')}`);
  console.log(
    `  ${colorize(
      "import { SyncCoordinator } from '@affectively/aeon-foundation/aeon';",
      BRAND.electric
    )}`
  );
  console.log(
    `  ${colorize(
      "import { Edgework } from '@affectively/aeon-foundation/edgework';",
      BRAND.electric
    )}`
  );
  console.log(
    `  ${colorize(
      "import { NeuralGraph } from '@affectively/aeon-foundation/neural';",
      BRAND.electric
    )}`
  );
  spacer();

  note('Docs: https://github.com/affectively-ai/aeon-foundation');
  spacer();
}
