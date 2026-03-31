import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const assetsRoot = resolve(scriptDir, '..');
const storybookDir = resolve(assetsRoot, 'storybook-static');
const baselineDir = resolve(assetsRoot, 'visual-baseline');
const manifestPath = resolve(baselineDir, 'baseline-manifest.json');

const mode = process.argv[2] ?? 'record';

async function listFilesRecursively(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursively(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function buildManifest() {
  const files = (await listFilesRecursively(storybookDir))
    .filter((file) => file.replace(`${storybookDir}/`, '') !== 'project.json')
    .sort();
  const hashes = [];

  for (const file of files) {
    const relative = file.replace(`${storybookDir}/`, '');
    const data = await readFile(file);
    const fileStat = await stat(file);
    const hash = createHash('sha256').update(data).digest('hex');
    hashes.push({ file: relative, bytes: fileStat.size, sha256: hash });
  }

  const combinedHash = createHash('sha256')
    .update(hashes.map((row) => `${row.file}:${row.bytes}:${row.sha256}`).join('\n'))
    .digest('hex');

  return {
    generatedAt: new Date().toISOString(),
    fileCount: hashes.length,
    combinedHash,
    files: hashes
  };
}

async function record() {
  const manifest = await buildManifest();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Recorded visual baseline: ${manifestPath}`);
  console.log(`Files: ${manifest.fileCount}, combined hash: ${manifest.combinedHash}`);
}

async function verify() {
  const current = await buildManifest();
  const baselineRaw = await readFile(manifestPath, 'utf8');
  const baseline = JSON.parse(baselineRaw);

  if (baseline.combinedHash !== current.combinedHash) {
    console.error('Visual baseline mismatch detected.');
    console.error(`Expected: ${baseline.combinedHash}`);
    console.error(`Actual:   ${current.combinedHash}`);
    process.exit(1);
  }

  console.log(`Visual baseline verified: ${current.combinedHash}`);
}

if (mode === 'record') {
  await record();
} else if (mode === 'verify') {
  await verify();
} else {
  console.error('Usage: node scripts/visual-baseline.mjs [record|verify]');
  process.exit(1);
}
