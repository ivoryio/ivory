const apiKey = Cypress.env('mailSlurpApiKey')
if (apiKey) {
  const { MailSlurp } = require('mailslurp-client')
  
  const mailslurp = new MailSlurp({ apiKey })

  Cypress.Commands.add('createInbox', function () {
    return mailslurp.createInbox()
  })

  Cypress.Commands.add('waitForLatestEmail', function (inboxId: string) {
    return mailslurp.waitForLatestEmail(inboxId)
  })
}

Cypress.Commands.add('signIn', function (username: string, password: string) {
  cy.get('[data-testid="sign-in-form-header"]').should('be.visible')
  cy.get('[data-testid="sign-in-username-input"]', {
    timeout: 5000,
  }).type(username)
  cy.get('[data-testid="sign-in-password-input"]', {
    timeout: 5000,
  }).type(password)
  cy.get('[data-testid="sign-in-btn"]', {
    timeout: 5000,
  }).click({
    force: true,
  })
})

Cypress.Commands.add('signUp', function (username: string, password: string) {
  cy.get('[data-testid="sign-up-form-header"]').should('be.visible')
  cy.get('[data-testid="sign-up-username-input"]', {
    timeout: 5000,
  }).type(username)
  cy.get('[data-testid="sign-up-password-input"]', {
    timeout: 5000,
  }).type(password)
  cy.get('[data-testid="sign-up-btn"]', {
    timeout: 5000,
  }).click({
    force: true,
  })
})

Cypress.Commands.add('signOut', function () {
  cy.get('[data-testid="sign-out-btn"]', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true })
  cy.get('[data-testid="sign-in-form-header"]', { timeout: 10000 }).should('be.visible')
})

// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
