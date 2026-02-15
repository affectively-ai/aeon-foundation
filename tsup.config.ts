import { defineConfig } from 'tsup';

export default defineConfig([
  // Library entries (no shebang)
  {
    entry: {
      index: 'src/index.ts',
      aeon: 'src/aeon.ts',
      pages: 'src/pages.ts',
      dash: 'src/dash.ts',
      relay: 'src/relay.ts',
      edgework: 'src/edgework.ts',
      auth: 'src/auth.ts',
      aegis: 'src/aegis.ts',
      neural: 'src/neural.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    external: [
      'react',
      'react-dom',
      'eventemitter3',
      'yjs',
      'y-websocket',
      'y-webrtc',
      'ethers',
      'zod',
    ],
    outDir: 'dist',
    target: 'es2022',
  },
  // CLI entry (with shebang)
  {
    entry: {
      cli: 'src/cli.ts',
    },
    format: ['esm'],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: false,
    treeshake: true,
    minify: false,
    outDir: 'dist',
    target: 'es2022',
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
]);
