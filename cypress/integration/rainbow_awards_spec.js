import getRainbowAwardsSubjects from '../fixtures/getRainbowAwardsSubjects.json';
import getSingleSubjectBySlugRA from '../fixtures/getSingleSubjectBySlugRA.json';
import getPupil from '../fixtures/getPupil.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getAllLevelsEmpty from '../fixtures/getAllLevelsEmpty.json';
import getModulesRA from '../fixtures/getModulesRA.json';

describe('Rainbow Awards main page ', () => {
  beforeEach(() => {
    cy.login('Teacher');

    cy.mockGraphQL([{ query: 'getRainbowAwardsSubjects', data: getRainbowAwardsSubjects }]);
    cy.visit('/rainbow-awards');
    cy.waitForSpinners();
  });

  it('Lets user visit Rainbow Award category by clicking Hexagon', () => {
    cy.get('[data-test-id=subject-button-being-a-good-communicator]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/rainbow-awards/being-a-good-communicator');
    });
  });
});

context('Rainbow Awards subject page', () => {
  beforeEach(() => {
    cy.login('Teacher');

    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlugRA },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getPupil', data: getPupil },
      { query: 'getRainbowAwardsSubjects', data: getRainbowAwardsSubjects },
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getAllLevels', data: getAllLevelsEmpty },
      { query: 'getModules', data: getModulesRA },
    ]);
  });

  describe('Rainbow Awards subject page', () => {
    beforeEach(() => {
      cy.visit('/rainbow-awards/being-healthy/class-1/154');
      cy.waitForSpinners();
    });
    it('Displays colours instead of Step/Stage', () => {
      cy.get('[data-test-id=tab-0]').contains('White');
    });
  });
});
