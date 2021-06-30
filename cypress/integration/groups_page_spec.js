describe('Manage Groups Page', () => {

  beforeEach(() => { 
    cy.login(('Teacher'))
  })

  it('shows groups to logged in user', () => {
    cy.visit('/groups')
    cy.get('[data-test-id=title]').should('be.visible')
  })
})
