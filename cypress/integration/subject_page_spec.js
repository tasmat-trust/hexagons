import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils';
import getSubjects from '../fixtures/getSubjects.json';
import getRainbowAwardsSubjects from '../fixtures/getRainbowAwardsSubjects.json';

describe('Subjects main page ', () => {
  beforeEach(() => {
    cy.login('Teacher');

    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:1337/graphql',
      },
      (req) => {
        // Get requests
        aliasQuery(req, 'getSubjects');
        if (hasOperationName(req, 'getSubjects')) {
          req.reply(getSubjects);
        }
      }
    );
    cy.visit('/subjects');
    cy.waitForSpinners();
  });

  it('Shows subjects breadcrumb', () => {
    cy.get('[data-test-id=first-crumb]').contains('Subjects');
  });

  it('Nests Language subjects under Communication', () => {
    cy.get('[data-test-id=parent-subject-button-communication]').click();
    cy.get('[data-test-id=subject-button-expressive-language]').should('be.visible');
  });

  it('Nests English subjects under English', () => {
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

describe('Rainbow Awards main page ', () => {
  beforeEach(() => {
    cy.login('Teacher');

    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:1337/graphql',
      },
      (req) => {
        // Get requests
        aliasQuery(req, 'getRainbowAwardsSubjects');
        if (hasOperationName(req, 'getRainbowAwardsSubjects')) {
          req.reply(getRainbowAwardsSubjects);
        }
      }
    );
    cy.visit('/rainbow-awards');
    cy.waitForSpinners();
  });

  it('Shows Rainbow Awards breadcrumb', () => {
    cy.get('[data-test-id=first-crumb]').contains('Rainbow Awards');
  });

  it('Lets user visit Rainbow Award category by clicking Hexagon', () => {
    cy.get('[data-test-id=subject-button-being-a-good-communicator]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/rainbow-awards/being-a-good-communicator');
    });
  });
});
