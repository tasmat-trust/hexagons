describe('The Home Page', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/')
  })  
  it('shows a login button', () => {
    cy.get('[data-test-id=login-button]').should('be.visible')
  })
})
