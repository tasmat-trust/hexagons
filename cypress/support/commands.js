// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.container > div > button').click();
    cy.get('#input-email-for-credentials-provider').clear();
    cy.get('#input-email-for-credentials-provider').type('teacher@tasmat.org.uk');
    cy.get('#input-password-for-credentials-provider').clear();
    cy.get('#input-password-for-credentials-provider').type('Gardenparty7');
    cy.get('button').click();
    /* ==== End Cypress Studio ==== */

})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
