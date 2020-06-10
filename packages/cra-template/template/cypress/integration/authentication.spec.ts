/// <reference path="../support/index.d.ts" />

context('Authentication', () => {
  beforeEach(() => {
    cy.fixture('users.json').as('userData')
    cy.visit('http://localhost:3000/auth?state=signIn')
  })

  if (Cypress.env('mailSlurpApiKey')) {
    it('Should Sign Up, Sign In successfully using created account and Sign Out', function () {
      const { password } = this.userData
      cy.createInbox().then(({ id: inboxId, emailAddress }: any) => {
        cy.get('[data-testid="signUp-link"]', {
          timeout: 5000,
        }).click({
          force: true,
        })

        cy.signUp(emailAddress, password)

        cy.waitForLatestEmail(inboxId).then(({ body: emailBody }) => {
          const verficationCode = emailBody.slice(emailBody.length - 6)
          cy.get('[data-testid="confirm-sign-up-form-header"]').should('be.visible')
          cy.get('[data-testid="confirm-sign-up-code-input"]', {
            timeout: 5000,
          }).type(verficationCode)
          cy.get('[data-testid="confirm-sign-up-btn"]', {
            timeout: 5000,
          }).click({
            force: true,
          })

          cy.signIn(emailAddress, password)

          cy.signOut()
        })
      })
    })

    it('Should Sign Up, Change forgotten password, Sign In successfully with new password and Sign Out', function () {
      const { password, newPassword } = this.userData
      cy.createInbox().then(({ id: inboxId, emailAddress }: any) => {
        cy.get('[data-testid="signUp-link"]', {
          timeout: 5000,
        }).click({
          force: true,
        })

        cy.signUp(emailAddress, password)

        cy.waitForLatestEmail(inboxId)
          .then(({ body: emailBody }) => {
            const signUpVerficationCode = emailBody.slice(emailBody.length - 6)
            cy.get('[data-testid="confirm-sign-up-form-header"]').should('be.visible')
            cy.get('[data-testid="confirm-sign-up-code-input"]', {
              timeout: 5000,
            }).type(signUpVerficationCode)
            cy.get('[data-testid="confirm-sign-up-btn"]', {
              timeout: 5000,
            }).click({
              force: true,
            })

            cy.get('[data-testid="forgotPassword-link"]', { timeout: 5000 }).click({ force: true })
            // change forgotten password
            cy.get('[data-testid="request-new-password-form-header"]').should('be.visible')
            cy.get('[data-testid="request-new-password-email-input"]', {
              timeout: 5000,
            }).type(emailAddress)
            cy.get('[data-testid="request-password-reset-code-btn"]', {
              timeout: 5000,
            }).click({
              force: true,
            })
          })
          .then(() => {
            cy.wait(5000)
            cy.waitForLatestEmail(inboxId).then(({ body: emailBody }) => {
              const changePasswordVerificationCode = emailBody.slice(emailBody.length - 6)
              cy.get('[data-testid="reset-password-form-header"]').should('be.visible')
              cy.get('[data-testid="reset-password-code-input"]', {
                timeout: 5000,
              }).type(changePasswordVerificationCode)
              cy.get('[data-testid="reset-password-new-password-input"]', {
                timeout: 5000,
              }).type(newPassword)
              cy.get('[data-testid="reset-password-btn"]', {
                timeout: 5000,
              }).click({
                force: true,
              })

              cy.signIn(emailAddress, newPassword)

              cy.signOut()
            })
          })
      })
    })
  }
})
