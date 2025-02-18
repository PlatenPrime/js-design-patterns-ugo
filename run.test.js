import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { describe } from 'node:test';
import { parseArgs } from 'node:util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolveFileRelativePath = (p = '.') => path.join(__dirname, p);

const allChapterSamples = readdirSync(resolveFileRelativePath(), {
  withFileTypes: true,
})
  .filter((f) => f.isDirectory())
  .map((f) => f.name);

const { positionals } = parseArgs({ allowPositionals: true });
const samplesToRun =
  positionals.length > 0
    ? allChapterSamples.filter((directory) =>
        positionals.some((p) => directory.includes(p)),
      )
    : allChapterSamples;

describe('Code Samples Runner', { concurrency: 4 }, () => {
  global.console.assert = (...args) => {
    if (args[0] === false) {
      const err = new Error('Assertion failed');
      err.callArguments = args;
      throw err;
    }
  };

  for (const sample of allChapterSamples) {
    const sampleModulePath = `./${sample}/${sample}.js`;
    const resolvedSampleModulePath = resolveFileRelativePath(sampleModulePath);
    if (!existsSync(resolvedSampleModulePath)) {
      continue;
    }

    test(sample, { skip: !samplesToRun.includes(sample) }, async () => {
      await import(resolvedSampleModulePath);
    });
  }
});
