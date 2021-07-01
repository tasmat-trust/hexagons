describe('Manage Pupils Page', () => {

  beforeEach(() => {

    cy.login(('Senior Leader'))
    cy.visit('/manage/pupils')
  })

  it('shows manage pupil interface to Senior Leaders', () => {
    
    cy.get('[data-test-id=title]').should('be.visible')
    cy.get('[data-test-id=notification]').should('be.visible')
    cy.get('[data-test-id=new-pupil]').should('be.visible')
    cy.get('[data-test-id=new-group]').should('be.visible')
  })

  it('Lets SLT create new groups', () => {

    cy.get('.MuiGrid-grid-md-5 > .makeStyles-paper-37 > .MuiBox-root > .MuiButtonBase-root > .MuiButton-label').click();
    cy.get('#name').clear();
    cy.get('#name').type('New group');
    cy.get('#new-group > :nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root > .MuiButton-label').click();
    cy.get('h3').contains('New group')
  })
})
