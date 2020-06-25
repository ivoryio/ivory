const assert = require('assert')
const { add } = require('../lib/commands/add/command')

const doNothingActions = {
  injectAuthCode: () => {},
  copyModuleTemplate: () => {},
}

describe('add command with \'auth\' param', () => {
  it('calls copyModuleTemplate', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    add({ ...doNothingActions, copyModuleTemplate: fakeAction })('auth')

    assert.ok(called)
  })

  it('calls injectAuthCode', async () => {
    let called = false
    const fakeAction = () => {
      called = true
    }
    add({ ...doNothingActions, injectAuthCode: fakeAction })('auth')

    assert.ok(called)
  })
})
