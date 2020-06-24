#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const { add } = require('../lib/commands/add/builder')

main()

async function main() {
  program
    .version(pkg.version)
    .command('auth')
    .action(() => add('auth'))

  program
    .version(pkg.version)
    .command('components')
    .action(() => add('components'))

  await program.parseAsync(process.argv)
}
