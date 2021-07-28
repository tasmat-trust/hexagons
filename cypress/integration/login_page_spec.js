describe('Login page', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/login')
  })  
  it('shows a login button', () => {
    cy.get('[data-test-id=login]').should('be.visible')
  })


  it('requires user to enter an email', () => {
    cy.get('[data-test-id=login]').click()
    cy.get('[data-test-id=error]').should('be.visible')
  })

  it('requires user to enter a password', () => {
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('[data-test-id=login]').click()
    cy.get('[data-test-id=error]').should('be.visible')
  })


})
