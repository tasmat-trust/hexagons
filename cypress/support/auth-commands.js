Cypress.Commands.add('validatePassword', (submitTestId) => {
  cy.get('#password').type('ReusedPassw0rd');
  cy.get(`[data-test-id=${submitTestId}]`).click();
  cy.get('[data-test-id=error]').contains('Password must be lowercase');
  cy.get('#password').clear();
  cy.get('#password').type('easypassword');
  cy.get(`[data-test-id=${submitTestId}]`).click();
  cy.get('[data-test-id=error]').contains('Password must be longer than sixteen characters');
  cy.get('#password').clear();
  cy.get('#password').type('apa$$word1haveu5edbe4');
  cy.get(`[data-test-id=${submitTestId}]`).click();
  cy.get('[data-test-id=error]').contains(
    'Password must not contain special characters or numbers'
  );
});
