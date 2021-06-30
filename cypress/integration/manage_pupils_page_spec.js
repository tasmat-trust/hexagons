describe('Manage Pupils Page', () => {

  beforeEach(() => {

    cy.login(('Senior Leader'))

  })

  it('successfully loads', () => {
    cy.visit('/manage/pupils')
    cy.get('[data-test-id=title]').should('be.visible')
    cy.get('[data-test-id=notification').should('be.visible')
    cy.get('[data-test-id=new-pupil').should('be.visible')
    cy.get('[data-test-id=new-group').should('be.visible')
  })
})
