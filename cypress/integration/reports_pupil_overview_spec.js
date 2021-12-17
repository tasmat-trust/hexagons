import getGroups from '../fixtures/getGroups.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getPupil from '../fixtures/getPupil.json';

context('Pupil overview', () => {
  beforeEach(() => {
    cy.login('Leader');
    cy.mockGraphQL([
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getGroups', data: getGroups },
      { query: 'getPupil', data: getPupil },
    ]);
  });

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.visit('/reports');
    });
    it('should display the date, pupil name and groups', () => {
      cy.get('[data-test-id=report-date]').should('exist');
      cy.get('[data-test-id=pupil-name]').should('exist');
      cy.get('[data-test-id=groups-list]').should('exist');
    });

    it('should show academic attainment with core and all subjects', () => {
      cy.get('[data-test-id=academic-attainment]').should('exist');
      cy.get('[data-test-id=core-subjects]').should('exist');
      cy.get('[data-test-id=other-subjects]').should('exist');
    });



  });


});
