const { build } = require('esbuild');
const { dependencies } = require('./package.json'); // Usando require

build({
  entryPoints: ['./src/main.mjs'],
  external: Object.keys(dependencies),
  outfile: './dist/bundle.js',
  bundle: true,
  minify: true,
  target: ['ES2015'],
})
