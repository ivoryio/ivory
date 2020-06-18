#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const { add } = require('../lib/commands/add/builder')

main()

async function main() {
  program
  .version(pkg.version)
  .command('auth')
  .action(add)

  program
  .version(pkg.version)
  .command('entity')
  .action(add)
  await program.parseAsync(process.argv)
}
