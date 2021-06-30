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
Cypress.Commands.add('login', (role) => {

  const cookieName = Cypress.env('COOKIE_NAME')
  const teacherJWT = Cypress.env('TEACHER_JWT')
  const seniorLeaderJWT = Cypress.env('SENIOR_LEADER_JWT')

  if (role === 'Teacher') {
    cy.setCookie(cookieName, teacherJWT)
  }

  if (role === 'Senior Leader') {
    cy.setCookie(cookieName, seniorLeaderJWT)
  }
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
