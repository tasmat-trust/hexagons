import getGroups from '../fixtures/getGroups.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getPupil from '../fixtures/getPupil.json';
import getSingleSubjectBySlug from '../fixtures/getSingleSubjectBySlug.json'

context('Reports', () => {
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
    it('should display links to different reports', () => {
      cy.get('[data-test-id=pupil-overview-link]').should('exist');
      cy.get('[data-test-id=group-overview-link]').should('exist');
      cy.get('[data-test-id=data-export-link]').should('exist');
    });
  });

  describe('Pupil overview', () => {
    beforeEach(() => {
      cy.visit('/reports/pupil-overview');
    });
    it('should let the user choose a group', () => {
      cy.get('[data-test-id="my-groups"]').should('exist');
    });
  });

  describe('Group overview', () => {
    beforeEach(() => {
      cy.visit('/reports/pupil-overview/class-2');
    });
    it('should navigate to specific pupil overview page', () => {
      cy.get('[data-test-id="pupil-154"]').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/reports/pupil-overview/class-2/154');
      });
    });
  });
});
