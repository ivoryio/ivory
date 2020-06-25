#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('create [name]', 'create a new project based on the Ivory architecture')
  .command('add', 'add a new module to an existing ivory project')
  .parse(process.argv)
