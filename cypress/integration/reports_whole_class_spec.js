import getGroups from '../fixtures/getGroups.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getSubjects from '../fixtures/getSubjects.json';
import getRainbowAwardsSubjects from '../fixtures/getRainbowAwardsSubjects.json';
import getLevelsForOverview from '../fixtures/getLevelsForOverview.json';

context('Whole class report', () => {
  beforeEach(() => {
    cy.login('Leader');
    cy.mockGraphQL([
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getGroups', data: getGroups },
      { query: 'getSubjects', data: getSubjects },
      { query: 'getRainbowAwardsSubjects', data: getRainbowAwardsSubjects },
      { query: 'getLevelsForOverview', data: getLevelsForOverview },
    ]);
  });

  describe('Report homepage', () => {
    beforeEach(() => {
      cy.visit('/reports/group-overview');
    });
    it('should display all subjects and groups', () => {
      cy.get('[data-test-id=all-groups]').should('exist');
      cy.get('[data-test-id=my-groups]').should('exist');
      cy.get('[data-test-id=subject-tiles-container]').should('exist');
      // and rainbow awards
    });
  });
});
