require('esbuild')
  .build({
    entryPoints: ['test/Tests.ts'],
    bundle: true,
    outfile: 'test/tmp/test.js',
  })
  .catch(() => process.exit(1));
