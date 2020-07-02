/// <reference path="../contracts.d.ts" />
import assert from 'assert'
import { addEntity } from '../commands/add/subcommands'
import { add as buildAddCommand } from '../commands/add/command'

const subCommands: AddSubcommands = {
  addAuth: () => {},
  addComponents: () => {},
  addEntity: async () => {},
}

const doNothingActions: AddEntityCommandActions = {
  log: () => {},
  copyModuleTemplate: () => {},
  amplifyPush: async () => {},
  checkAmplifyApiExists: () => true,
  inquireEntityParams: async () => ({
    name: { singular: 'X', plural: 'X', lower: { singular: 'x', plural: 'x' } },
    attributes: [],
  }),
  transformEntityTemplate: () => {},
  addEntityToGraphQLSchema: () => {},
}

describe(`add command with 'entity' param`, () => {
  it(`calls 'addEntity' subcommand`, async () => {
    let called = false
    const fakeAction = async () => {
      called = true
    }
    const add = buildAddCommand({
      ...subCommands,
      addEntity: fakeAction,
    })

    await add('entity')

    assert.ok(called)
  })
})

describe('addEntity command', () => {
  it('calls checkAmplifyApiExists', async () => {
    let called = false
    const fakeAction = () => {
      called = true
      return true
    }
    const add = addEntity({ ...doNothingActions, checkAmplifyApiExists: fakeAction })

    await add()

    assert.ok(called)
  })

  it("logs a fatal error if api doesn't exist", async () => {
    let called = false
    const add = addEntity({
      ...doNothingActions,
      checkAmplifyApiExists: () => false,
      log: () => {
        called = true
      },
    })

    await add()

    assert.ok(called)
  })

  it('calls inquireEntityParams', async () => {
    let called = false
    const fakeAction = () => {
      called = true
      return doNothingActions.inquireEntityParams()
    }
    const add = addEntity({ ...doNothingActions, inquireEntityParams: fakeAction })

    await add()

    assert.ok(called)
  })

  it('calls addEntityToGraphQLSchema', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addEntity({ ...doNothingActions, addEntityToGraphQLSchema: fakeAction })

    await add()

    assert.ok(called)
  })

  it('calls amplifyPush', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addEntity({ ...doNothingActions, amplifyPush: fakeAction })

    await add()

    assert.ok(called)
  })

  it('calls copyModuleTemplate', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addEntity({ ...doNothingActions, copyModuleTemplate: fakeAction })

    await add()

    assert.ok(called)
  })

  it('calls transformEntityTemplate', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    const add = addEntity({ ...doNothingActions, transformEntityTemplate: fakeAction })

    await add()

    assert.ok(called)
  })
})
