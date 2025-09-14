
Cypress.Commands.add('assertManagePupilPageVisible', () => {
  cy.get('[data-test-id=title]').should('be.visible')
  cy.get('[data-test-id=notification]').should('be.visible')
  cy.get('[data-test-id=new-pupil]').should('be.visible')
  cy.get('[data-test-id=new-group]').should('be.visible')
})

Cypress.Commands.add('selectMultipleUsers', () => {
  cy.get('[data-id="109"]').click()
  cy.get('[data-id="110"]').click()
})

Cypress.Commands.add('createGroup', () => {
  cy.get('[data-test-id=new-group]').should('be.visible')
  cy.get('[data-test-id=new-group]').click();
  cy.get('#name').clear();
  cy.get('#name').type('New group');
  cy.get('[data-test-id=add-new-group]').click();
  cy.get('[data-test-id=close-group-popup]').click();
  cy.waitForSpinners()
  cy.wait('@gqlcreateNewGroupQuery').its('request.url').should('include', '/graphql')
})

Cypress.Commands.add('createPupilWithoutGroups', () => {
  cy.get('[data-test-id=new-pupil]').should('be.visible')
  cy.get('[data-test-id=new-pupil]').click();
  cy.get('#name').clear();
  cy.get('#name').type('Amadeus Foley');
  cy.get('[data-test-id=add-new-pupil]').click();
  cy.get('[data-test-id="close-pupil-popup"]').click();
  cy.wait('@gqlcreatePupilQuery').its('request.url').should('include', '/graphql')
})

Cypress.Commands.add('createGroupAssertError', (attemptedGroupName) => {
  cy.get('[data-test-id=new-group]').click()
  cy.get('#name').clear()
  cy.get('#name').type(attemptedGroupName)
  cy.get('[data-test-id=add-new-group]').click()
  cy.get('[data-test-id=error]').should('exist')
})

Cypress.Commands.add('createPupilWithTargetLevel', (targetLevel = 'medium') => {
  cy.get('[data-test-id=new-pupil]').should('be.visible')
  cy.get('[data-test-id=new-pupil]').click();
  cy.get('#name').clear();
  cy.get('#name').type('Test Pupil');
  
  // Select target level only if not already set to the desired value
  cy.get('#demo-single-chip').then(($chip) => {
    const currentText = $chip.text();
    const targetText = targetLevel === 'small' ? 'Small (0.2)' : 
                      targetLevel === 'large' ? 'Large (0.5)' : 'Medium (0.4)';
    
    if (!currentText.includes(targetText)) {
      cy.get('#demo-single-chip').click();
      cy.get(`[data-value="${targetLevel}"]`).click();
    }
  });
  
  cy.get('[data-test-id=add-new-pupil]').click();
  cy.get('[data-test-id="close-pupil-popup"]').click();
  cy.wait('@gqlcreatePupilQuery').its('request.url').should('include', '/graphql')
})

Cypress.Commands.add('assignTargetLevelsToSelectedPupils', (targetLevel = 'large') => {
  cy.get('[data-test-id=assign-target-levels]').should('be.visible');
  cy.get('[data-test-id=assign-target-levels]').click();
  
  // Select target level in the assignment dialog
  cy.get('#demo-single-chip').click();
  cy.get(`[data-value="${targetLevel}"]`).click();
  
  cy.get('[data-test-id=assign-to-targetLevel]').click();
  cy.wait('@gqlupdatePupilTargetLevelQuery').its('request.url').should('include', '/graphql');
})
