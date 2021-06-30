describe('Manage Groups Page', () => {

  beforeEach(() => {

    cy.login(('Teacher'))

  })

  it('successfully loads', () => {
    cy.visit('/groups')
    cy.get('[data-test-id=title]').should('be.visible')
  })
})
