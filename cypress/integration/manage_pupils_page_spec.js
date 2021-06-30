describe('Manage Pupils Page', () => {

  beforeEach(() => {

    cy.login(('Senior Leader'))

  })

  it('successfully loads', () => {
    cy.visit('/manage/pupils')
    cy.get('[data-test-id=title]').should('be.visible')
  })
})
