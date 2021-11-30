 
import getSubjects from '../fixtures/getSubjects.json';

describe('Subjects main page ', () => {
  beforeEach(() => {
    cy.login('Teacher');
    cy.mockGraphQL([
      { query: 'getSubjects', data: getSubjects }
    ]);
    cy.visit('/subjects');
    cy.waitForSpinners();
  });

  it('Nests subjects correctly and shows subjects breadcrumb', () => {
    cy.get('[data-test-id=first-crumb]').contains('Subjects');
    cy.get('[data-test-id=parent-subject-button-communication]').click();
    cy.get('[data-test-id=subject-button-expressive-language]').should('be.visible');
    cy.get('[data-test-id=parent-subject-button-english]').click();
    cy.get('[data-test-id=subject-button-reading]').should('be.visible');
    cy.get('[data-test-id=subject-button-writing]').should('be.visible');
  });

  it('Lets user visit non-nested subject by clicking button', () => {
    cy.get('[data-test-id=subject-button-art]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/subjects/art');
    });
  });

  it('Lets user visit nested subject by clicking Hexagon and then button', () => {
    cy.get('[data-test-id=parent-subject-button-computing]').click();
    cy.get('[data-test-id=subject-button-computing-skills]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/subjects/computing-skills');
    });
  });
});

