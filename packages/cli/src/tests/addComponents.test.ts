/// <reference path="../contracts.d.ts" />
import assert from 'assert'
import { addComponents } from '../commands/add/subcommands'
import { add as buildAddCommand } from '../commands/add/command'

const subCommands: AddSubcommands = {
  addAuth: () => {},
  addComponents: () => {},
  addEntity: async () => {},
}

const doNothingActions = {
  copyModuleTemplate: () => {},
}

describe(`add command with 'components' param`, () => {
  it(`calls 'addComponents' subcommand`, async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = buildAddCommand({
      ...subCommands,
      addComponents: fakeAction,
    })

    add('components')

    assert.ok(called)
  })
})

describe('addComponents command', () => {
  it('calls copyModuleTemplate', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addComponents({ ...doNothingActions, copyModuleTemplate: fakeAction })

    add()

    assert.ok(called)
  })

})
