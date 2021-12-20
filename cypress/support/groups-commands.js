Cypress.Commands.add('assertSubjectCardIsVisible', () => {
  cy.get('[data-test-id=subject-card-title]').should('be.visible')
  cy.get('[data-test-id=subject-card-title]').contains('Class 1')
  cy.get('[data-test-id=subject-card-title]').contains('Number')
  cy.get('[data-test-id=groups-list-pupil-154]').contains('Class 2')
  cy.get('[data-test-id=groups-list-pupil-154]').contains('Class 3')
  cy.get('[data-test-id=groups-list-pupil-154]').contains('Class 5')
  cy.get('[data-test-id=groups-list-pupil-154]').contains('EFL')
  cy.get('[data-test-id=groups-list-pupil-154]').contains('FSM')
})

Cypress.Commands.add('navigateToPupilsClass1', () => {
  cy.get('[data-test-id=class-1-link]').click()
  cy.waitForSpinners()
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq('/pupils/class-1')
    expect(localStorage.getItem('active-group-slug')).to.eq('class-1')
    expect(localStorage.getItem('active-group-id')).to.eq('241')
    expect(localStorage.getItem('active-group-name')).to.eq('Class 1')
  })
})