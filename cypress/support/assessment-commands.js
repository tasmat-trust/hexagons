
Cypress.Commands.add('assertGuidanceFormSubmitSuccess', () => {
  cy.get('[data-test-id=add-new-guidance]').click()
  cy.get('[data-test-id=success]').should('exist')
  cy.get('[data-test-id=success]').contains('guidance saved successfully')
})
