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

import { hasOperationName, aliasQuery, aliasQueryByVariable, hasVariable } from '../utils/graphql-test-utils'

Cypress.Commands.add('mockGraphQL', (mocks) => {
  cy.intercept({
    method: 'POST',
    url: 'http://localhost:1337/graphql'
  },
    (req) => {
      // Get requests
      mocks.forEach(mock => {



        if (mock.variable) {
          if (hasOperationName(req, mock.query) && hasVariable(req, mock.variable.key, mock.variable.value)) {
            aliasQueryByVariable(req, mock.query, mock.variable.key, mock.variable.value)
            req.reply(mock.data);
            return;
          }
        } else {
          if (hasOperationName(req, mock.query)) {
            aliasQuery(req, mock.query)
            req.reply(mock.data)
          }
        }


      });
    }
  )
})


// -- This is a parent command --
Cypress.Commands.add('login', (role) => {

  cy.clearCookies()

  const cookieName = Cypress.env('COOKIE_NAME')
  const teacherJWT = Cypress.env('TEACHER_JWT')
  const seniorLeaderJWT = Cypress.env('SENIOR_LEADER_JWT')

  if (role === 'Teacher') {
    cy.setCookie(cookieName, teacherJWT)
  }

  if (role === 'Leader') {
    cy.setCookie(cookieName, seniorLeaderJWT)
  }
})

Cypress.Commands.add('waitForSpinners', () => {

  // Doesn't work: TODO FIX
  // cy.get('[data-test-id=app-loading]', { timeout: 10000 }).should('not.exist')
  // cy.get('[data-test-id=loading]', { timeout: 10000 }).should('not.exist')
  // cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist')
  cy.wait(1000)
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
