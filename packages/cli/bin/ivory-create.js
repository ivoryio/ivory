#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const { create } = require('../lib/commands/create/builder')

main()

async function main() {
  program
    .version(pkg.version)
    .passCommandToAction(false)
    .option('--fe-only', 'skip adding authentication or any back-end resources')
    .option('--aws-profile <profile>', 'aws profile name')
    .option('--repo <provider>', 'repository provider, one of codecommit/github/other')
    .action(create)
  await program.parseAsync(process.argv)
}
