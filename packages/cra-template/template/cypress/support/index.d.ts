/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    createInbox(): Chainable<any>
    waitForLatestEmail(indoxId: string): Chainable<any>
    signIn(username: string, password: string): Chainable<any>
    signUp(username: string, password: string): Chainable<any>
    signOut(): Chainable<any>
  }
}
