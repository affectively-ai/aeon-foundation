/**
 * Aeon Foundation CLI - Progress Indicators
 */

import {
  ANSI,
  BRAND,
  BRAND_RGB,
  interpolateColor,
  bold,
  dim,
  colorize,
} from './colors.js';

const SPINNER_FRAMES = ['◜', '◠', '◝', '◞', '◡', '◟'];

export class Spinner {
  private frames = SPINNER_FRAMES;
  private frameIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private text: string;

  constructor(text: string = '') {
    this.text = text;
  }

  start(text?: string): this {
    if (text) this.text = text;
    process.stdout.write(ANSI.hideCursor);

    this.intervalId = setInterval(() => {
      const frame = this.frames[this.frameIndex];
      process.stdout.write(ANSI.clearLine + ANSI.moveToStart);
      process.stdout.write(`  ${BRAND.aeon}${frame}${ANSI.reset} ${this.text}`);
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
    }, 60);

    return this;
  }

  update(text: string): this {
    this.text = text;
    return this;
  }

  succeed(text?: string): void {
    this.stop();
    console.log(`  ${colorize('✓', BRAND.success)} ${text || this.text}`);
  }

  fail(text?: string): void {
    this.stop();
    console.log(`  ${colorize('✗', BRAND.error)} ${text || this.text}`);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    process.stdout.write(ANSI.clearLine + ANSI.moveToStart);
    process.stdout.write(ANSI.showCursor);
  }
}

export function createSpinner(text?: string): Spinner {
  return new Spinner(text);
}

export class ProgressBar {
  private current = 0;
  private total: number;
  private width: number;

  constructor(total: number, width: number = 30) {
    this.total = total;
    this.width = width;
  }

  start(): this {
    this.current = 0;
    process.stdout.write(ANSI.hideCursor);
    this.render();
    return this;
  }

  update(current: number, message?: string): this {
    this.current = Math.min(current, this.total);
    this.render(message);
    return this;
  }

  tick(message?: string): this {
    return this.update(this.current + 1, message);
  }

  private render(message?: string): void {
    const percent = this.current / this.total;
    const filled = Math.round(this.width * percent);
    const empty = this.width - filled;

    let bar = '';
    for (let i = 0; i < filled; i++) {
      const t = i / this.width;
      const color = interpolateColor(BRAND_RGB.aeon, BRAND_RGB.electric, t);
      bar += color + '█';
    }
    bar += BRAND.steel + '░'.repeat(empty) + ANSI.reset;

    let status = `  ${bar} ${bold(Math.round(percent * 100).toString())}%`;
    if (message) status += ` ${message}`;

    process.stdout.write(ANSI.clearLine + ANSI.moveToStart);
    process.stdout.write(status);
  }

  finish(message?: string): void {
    this.update(this.total);
    process.stdout.write('\n');
    process.stdout.write(ANSI.showCursor);
    if (message) {
      console.log(`  ${colorize('✓', BRAND.success)} ${message}`);
    }
  }
}
