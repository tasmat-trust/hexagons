Cypress.Commands.add('startGuidanceMode', () => {
  cy.get('[data-test-id=view-guidance-button]').click()
  cy.get('[data-test-id=close-guidance-popup]').click()
})

Cypress.Commands.add('assertGuidanceFormSubmitSuccess', () => {
  cy.get('[data-test-id=add-new-guidance]').click()
  cy.get('[data-test-id=success]').should('exist')
  cy.get('[data-test-id=success]').contains('guidance saved successfully')
})
