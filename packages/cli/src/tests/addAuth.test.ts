/// <reference path="../contracts.d.ts" />
import assert from 'assert'
import { addAuth } from '../commands/add/subcommands'
import { add as buildAddCommand } from '../commands/add/command'

const subCommands: AddSubcommands = {
  addAuth: () => {},
  addComponents: () => {},
  addEntity: async () => {},
}

const doNothingActions = {
  injectAuthCode: () => {},
  copyModuleTemplate: () => {},
}

describe(`add command with 'auth' param`, () => {
  it(`calls 'addAuth' subcommand`, async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = buildAddCommand({
      ...subCommands,
      addAuth: fakeAction,
    })

    add('auth')

    assert.ok(called)
  })
})

describe('addAuth command', () => {
  it('calls copyModuleTemplate', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addAuth({ ...doNothingActions, copyModuleTemplate: fakeAction })

    add()

    assert.ok(called)
  })

  it('calls injectAuthCode', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addAuth({ ...doNothingActions, injectAuthCode: fakeAction })

    add()

    assert.ok(called)
  })
})
