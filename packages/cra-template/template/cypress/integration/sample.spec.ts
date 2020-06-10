context('Sample test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('First time', () => {
    cy.contains('Hello')
  })

  it.skip('Skip a test', () => {
    cy.visit('/login')
    cy.contains('Login').should('be.disabled')
  })
})
