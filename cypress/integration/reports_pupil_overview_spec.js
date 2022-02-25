import getGroups from '../fixtures/getGroups.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getPupil from '../fixtures/getPupil.json';
import getSubjects from '../fixtures/getSubjects.json';
import getRainbowAwardsSubjects from '../fixtures/getRainbowAwardsSubjects.json';
import getLevelsForOverview from '../fixtures/getLevelsForOverview.json';

context('Pupil overview', () => {
  beforeEach(() => {
    cy.login('Leader');
    cy.mockGraphQL([
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getGroups', data: getGroups },
      { query: 'getPupil', data: getPupil },
      { query: 'getSubjects', data: getSubjects },
      { query: 'getRainbowAwardsSubjects', data: getRainbowAwardsSubjects },
      { query: 'getLevelsForOverview', data: getLevelsForOverview },
    ]);
  });

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.visit('/reports/pupil-overview/class-1/154');
    });
    it('should display the date, pupil name and groups', () => {
      cy.get('[data-test-id=report-date]').should('exist');
      cy.get('[data-test-id=pupil-name]').should('exist');
      cy.get('[data-test-id=groups-list-pupil-154]').should('exist');
    });

    it('should show academic attainment with core and all subjects', () => {
      cy.get('[data-test-id=attainment]').should('exist');
    });
  });
});
