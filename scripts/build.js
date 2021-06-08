require('esbuild')
  .build({
    entryPoints: ['examples/hello-world/src/app.ts'],
    bundle: true,
    outfile: 'examples/hello-world/fema.js',
    watch: process.argv.includes('--watch'),
    minifyWhitespace: true,
  })
  .catch(() => process.exit(1));
