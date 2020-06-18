#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const { create } = require('../lib/commands/create/builder')

main()

async function main() {
  program
    .version(pkg.version)
    .passCommandToAction(false)
    // .option('-n, --project-name <name>', 'name of the new project')
    .option('--aws-profile <profile>', 'aws profile name')
    .option('--repo <provider>', 'repository provider, one of codecommit/github/other')
    .action(create)
  await program.parseAsync(process.argv)
}
