#!/usr/bin/env node
const lib = require('../dist/skeleton-lib-node-cli.cjs');

try {
  lib.cli(process);
} catch (e) {
  console.error(e);
  process.exit(0);
}
