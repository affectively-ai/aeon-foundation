/**
 * Aeon Foundation CLI - Colors & ANSI Utilities
 *
 * A refined palette: deep violet aeon glow meets electric edge.
 */

export const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  hidden: '\x1b[8m',
  hideCursor: '\x1b[?25l',
  showCursor: '\x1b[?25h',
  clearLine: '\x1b[2K',
  moveUp: '\x1b[1A',
  moveToStart: '\x1b[0G',
};

export function rgb(r: number, g: number, b: number): string {
  return `\x1b[38;2;${r};${g};${b}m`;
}

/**
 * Aeon Foundation brand colors
 */
export const BRAND = {
  // Primary - Deep violet (divine emanation, the Pleroma)
  aeon: rgb(139, 92, 246),
  aeonBright: rgb(167, 139, 250),
  aeonDim: rgb(109, 40, 217),

  // Secondary - Electric blue (speed, clarity)
  electric: rgb(59, 130, 246),
  electricBright: rgb(96, 165, 250),

  // Accent - Warm gold (wisdom, illumination)
  gold: rgb(250, 204, 21),
  goldDim: rgb(202, 138, 4),

  // Tertiary - Emerald (growth, the living network)
  emerald: rgb(52, 211, 153),
  emeraldDim: rgb(16, 185, 129),

  // Status
  success: rgb(34, 197, 94),
  error: rgb(239, 68, 68),
  warning: rgb(245, 158, 11),
  info: rgb(59, 130, 246),

  // Neutrals
  white: rgb(250, 250, 250),
  silver: rgb(163, 163, 163),
  steel: rgb(115, 115, 115),
  muted: rgb(82, 82, 82),
};

export const BRAND_RGB = {
  aeon: { r: 139, g: 92, b: 246 },
  electric: { r: 59, g: 130, b: 246 },
  gold: { r: 250, g: 204, b: 21 },
  emerald: { r: 52, g: 211, b: 153 },
  success: { r: 34, g: 197, b: 94 },
  error: { r: 239, g: 68, b: 68 },
};

export function interpolateColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number,
): string {
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return rgb(r, g, b);
}

export function bold(text: string): string {
  return `${ANSI.bold}${text}${ANSI.reset}`;
}

export function dim(text: string): string {
  return `${ANSI.dim}${text}${ANSI.reset}`;
}

export function colorize(text: string, color: string): string {
  return `${color}${text}${ANSI.reset}`;
}

export function stripAnsi(str: string): string {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

export function visibleLength(str: string): number {
  return stripAnsi(str).length;
}

export function center(str: string, width: number): string {
  const visible = visibleLength(str);
  if (visible >= width) return str;
  const left = Math.floor((width - visible) / 2);
  return ' '.repeat(left) + str;
}

export function getTerminalWidth(): number {
  return process.stdout.columns || 80;
}

export function supportsColor(): boolean {
  if (process.env['NO_COLOR']) return false;
  if (process.env['FORCE_COLOR']) return true;
  if (!process.stdout.isTTY) return false;
  return true;
}
