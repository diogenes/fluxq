import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const assetsRoot = resolve(scriptDir, '..');
const repoRoot = resolve(assetsRoot, '..', '..', '..');
const tokensPath = resolve(repoRoot, '.stitch/tokens.json');
const outputPath = resolve(assetsRoot, 'src/styles/tokens.generated.css');

const tokens = JSON.parse(await readFile(tokensPath, 'utf8'));

const lines = [];
lines.push('/* Auto-generated from .stitch/tokens.json. Do not edit by hand. */');
lines.push(':root, .dark {');

const colorMap = {
  'background-base': tokens.color.background.base,
  'background-surface-low': tokens.color.background.surfaceLow,
  'background-surface-mid': tokens.color.background.surfaceMid,
  'background-surface-high': tokens.color.background.surfaceHigh,
  'text-primary': tokens.color.text.primary,
  'text-secondary': tokens.color.text.secondary,
  'semantic-info': tokens.color.semantic.info,
  'semantic-success': tokens.color.semantic.success,
  'semantic-warning': tokens.color.semantic.warning,
  'semantic-error': tokens.color.semantic.error,
  'action-primary-start': tokens.color.action.primaryStart,
  'action-primary-end': tokens.color.action.primaryEnd,
  'outline-variant': tokens.color.outline.variant
};

for (const [name, value] of Object.entries(colorMap)) {
  lines.push(`  --fxq-${name}: ${value};`);
}

lines.push(`  --fxq-font-display: ${JSON.stringify(tokens.typography.display.fontFamily)}, sans-serif;`);
lines.push(`  --fxq-font-interface: ${JSON.stringify(tokens.typography.interface.fontFamily)}, sans-serif;`);
lines.push(`  --fxq-font-mono: ${JSON.stringify(tokens.typography.mono.fontFamily)}, monospace;`);

for (const [name, value] of Object.entries(tokens.space)) {
  lines.push(`  --fxq-space-${name}: ${value};`);
}

for (const [name, value] of Object.entries(tokens.radius)) {
  lines.push(`  --fxq-radius-${name}: ${value};`);
}

for (const [name, value] of Object.entries(tokens.motion)) {
  lines.push(`  --fxq-motion-${name}: ${value};`);
}

lines.push('  --fxq-shadow-surface: 0 24px 64px rgba(0, 0, 0, 0.28);');
lines.push('  --fxq-shadow-rail: 0 16px 40px rgba(0, 0, 0, 0.18);');
lines.push('}');
lines.push('');
await writeFile(outputPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${outputPath}`);
