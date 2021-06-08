require('esbuild')
  .build({
    entryPoints: ['test/Tests.ts'],
    bundle: true,
    outfile: 'test/fema.test.js',
  })
  .catch(() => process.exit(1));
