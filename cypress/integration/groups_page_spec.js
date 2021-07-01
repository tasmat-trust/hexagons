describe('Manage Groups Page', () => {

  beforeEach(() => { 
    cy.login(('Teacher'))
    cy.visit('/groups')
  })

  it('shows groups to logged in user', () => {    
    cy.get('[data-test-id=title]').should('be.visible')
  })

})
