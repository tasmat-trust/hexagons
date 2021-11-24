import getGroups from '../fixtures/getGroups.json';
import getSubjects from '../fixtures/getSubjects.json';

describe('Homepage: logged out user', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Shows a blurb, get in touch button and logos of funders', () => {
    cy.get('[data-test-id="public-welcome"]').should('exist');
    cy.get('[data-test-id="school-logos"]').should('exist');
    cy.get('[data-test-id="funder-logos"]').should('exist');
    cy.get('[data-test-id="get-in-touch"]').should('exist');
  });
  it('Lets a user login', () => {
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(50)
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login');
    });
  });
});

describe('Homepage: logged in user', () => {
  beforeEach(() => {
    cy.login('Teacher');
    cy.mockGraphQL([
      { query: 'getGroups', data: getGroups },
      { query: 'getSubjects', data: getSubjects },
    ]);
    cy.visit('/');
  });
  it('Shows groups and all subjects on a grid', () => {
    cy.get('[data-test-id="subject-tiles-container"]').should('exist');
    cy.get('[data-test-id="all-groups"]').should('exist');
    cy.get('[data-test-id="my-groups"]').should('exist');
  });
  it('Lets a user logout', () => {
    cy.get('[data-test-id="logout-button"]').click();
    cy.wait(50)
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login');
    });
  });
});

describe('Accessibility: logged out / general user', () => {
  beforeEach(() => {
    cy.visit('/accessibility');
  });
  it('Shows an accessibility statement', () => {
    cy.get('[data-test-id="accessibility-statement"]').should('exist');
  });
});

describe('Privacy: logged out / general user', () => {
  beforeEach(() => {
    cy.visit('/privacy');
  });
  it('Shows a privacy/security statement', () => {
    cy.get('[data-test-id="privacy-statement"]').should('exist');
  });
});
