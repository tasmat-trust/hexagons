import getSubjects from '../fixtures/getSubjects.json';
import getPupil from '../fixtures/getPupil.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getAllLevelsEmpty from '../fixtures/getAllLevelsEmpty.json';

const firstCompText = 'sfdsdf';
const firstCompId = 1617;
const secondCompId = 1618;
const thirdCompId = 1619;
const summaryText = 'sdf';

context('Assessment page', () => {
  beforeEach(() => {
    cy.login('Teacher');

    let getSingleSubjectBySlug = {
      body: {
        data: {
          subjects: [
            {
              id: '68',
              name: 'Expressive Language',
              slug: 'expressive-language',
              excludeEarlyDevelopmentStep: true,
            },
          ],
        },
      },
    };

    let getModules = {
      body: {
        data: {
          modules: [
            {
              order: 2,
              id: '123',
              level: 'step',
              summary: summaryText,
              guidance: null,
              capabilities: [
                { text: firstCompText, id: `${firstCompId}`, guidance: [] },
                { text: 'sfdsdf', id: `${secondCompId}`, guidance: [] },
                { text: 'sdfsfd', id: `${thirdCompId}`, guidance: [] },
              ],
            },
          ],
        },
      },
    };

    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getPupil', data: getPupil },
      { query: 'getSubjects', data: getSubjects },
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getAllLevels', data: getAllLevelsEmpty },
      { query: 'getModules', data: getModules },
    ]);
  });

  describe('Page with no competencies marked', () => {
    let getLevelEmpty = {
      body: { data: { levels: [] } },
    };

    let getCompetenciesEmpty = {
      body: {
        data: {
          competencies: [],
        },
      },
    };

    let createLevel = { data: { createLevel: { level: { id: '614', status: 'incomplete' } } } };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevelEmpty },
        { query: 'getCompetencies', data: getCompetenciesEmpty },
        { query: 'createLevel', data: createLevel },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('lets teacher mark a competency as complete', () => {
      cy.get('[data-test-id=hex-1]').click();

      cy.wait('@gqlcreateLevelQuery').its('request.url').should('include', '/graphql');
    });

    it('displays 0% complete and no level status', () => {
      cy.get('[data-test-id=level-status-status]').should('not.exist');
      cy.get('[data-test-id=percent-complete-label]').contains('0');
    });
  });

  describe('Page with one competency marked', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'incomplete',
            competencies: [{ id: '2863', status: 'complete', capability_fk: firstCompId }],
          },
        ],
      },
    };

    let getCompetencies = {
      data: { competencies: [{ id: '2863', status: 'complete', capability_fk: firstCompId }] },
    };

    let getCompetency = {
      data: { competencies: [{ id: '2863', status: 'complete', capability_fk: firstCompId }] },
    };

    let updateCompetency = { data: { updateCompetency: { competency: { id: '2863' } } } };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
        { query: 'getCompetency', data: getCompetency },
        { query: 'updateCompetency', data: updateCompetency },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('lets teacher mark a competency as target', () => {
      cy.get('[data-test-id=hex-1]').click();

      cy.wait('@gqlgetCompetencyQuery').its('request.url').should('include', '/graphql');
    });

    it('displays 33% complete and "incomplete"', () => {
      cy.get('[data-test-id=level-status-status]').contains('incomplete');
      cy.get('[data-test-id=percent-complete-label]').contains('33');
    });
  });

  describe('Page with two competencies marked', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'incomplete',
            competencies: [
              { id: '2863', status: 'complete', capability_fk: firstCompId },
              { id: '2864', status: 'complete', capability_fk: secondCompId },
            ],
          },
        ],
      },
    };

    let getCompetencies = {
      data: {
        competencies: [
          { id: '2863', status: 'complete', capability_fk: firstCompId },
          { id: '2864', status: 'complete', capability_fk: secondCompId },
        ],
      },
    };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays 66% complete and completed tile includes icon and text label', () => {
      cy.get('[data-test-id=level-status-status]').contains('incomplete');
      cy.get('[data-test-id=percent-complete-label]').contains('66');
      cy.get('[data-test-id=hex-1] svg').contains('Is complete');
    });
  });

  describe('Page with two competencies marked as target', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'incomplete',
            competencies: [
              { id: '2863', status: 'target', capability_fk: firstCompId },
              { id: '2864', status: 'target', capability_fk: secondCompId },
            ],
          },
        ],
      },
    };

    let getCompetencies = {
      data: {
        competencies: [
          { id: '2863', status: 'target', capability_fk: firstCompId },
          { id: '2864', status: 'target', capability_fk: secondCompId },
        ],
      },
    };

    let updateLevel = { data: { updateLevel: { level: { id: '615', status: 'complete' } } } };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
        { query: 'updateLevel', data: updateLevel },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays 0% complete and target tile includes icon and text label', () => {
      cy.get('[data-test-id=level-status-status]').contains('incomplete');
      cy.get('[data-test-id=percent-complete-label]').contains('0');
      cy.get('[data-test-id=hex-1] svg').contains('Is current target');
    });

    it('allows a level to be marked as complete without ticking off all competencies', () => {
      cy.get('[data-test-id=level-status-status]').contains('incomplete');
      cy.get('[data-test-id="mark-complete"]').click();
      cy.wait('@gqlupdateLevelQuery').its('request.url').should('include', '/graphql');
      cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id=percent-complete-label]').contains('100');
    });

    it('Shows a step/stage summary when you tap the Summary button', () => {
      cy.get('[data-test-id=view-summary-button]').click();
      cy.get('[data-test-id=view-summary-button-popup]').contains(summaryText);
    });
  });

  describe('Page with uncompleted competencies set as complete using button', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'complete',
            competencies: [
              { id: '2863', status: 'complete', capability_fk: firstCompId },
              { id: '2864', status: 'target', capability_fk: secondCompId },
            ],
          },
        ],
      },
    };

    let getCompetencies = {
      data: {
        competencies: [
          { id: '2863', status: 'complete', capability_fk: firstCompId },
          { id: '2864', status: 'target', capability_fk: secondCompId },
        ],
      },
    };

    let updateLevel = { data: { updateLevel: { level: { id: '615', status: 'incomplete' } } } };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
        { query: 'updateLevel', data: updateLevel },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('allows a level to be marked as incomplete without ticking off all competencies', () => {
      cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id="mark-incomplete"]').click();
      cy.wait('@gqlupdateLevelQuery').its('request.url').should('include', '/graphql');
      cy.get('[data-test-id=level-status-status]').contains('incomplete');
      cy.get('[data-test-id=percent-complete-label]').contains('33');
    });
  });

  describe('Page with all competencies marked complete', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'complete',
            competencies: [
              { id: '2863', status: 'complete', capability_fk: firstCompId },
              { id: '2864', status: 'complete', capability_fk: secondCompId },
              { id: '2865', status: 'complete', capability_fk: thirdCompId },
            ],
          },
        ],
      },
    };

    let getCompetencies = {
      data: {
        competencies: [
          { id: '2863', status: 'complete', capability_fk: firstCompId },
          { id: '2864', status: 'complete', capability_fk: secondCompId },
          { id: '2865', status: 'complete', capability_fk: thirdCompId },
        ],
      },
    };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays 100% complete and status', () => {
      cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id=percent-complete-label]').contains('100');
    });

    it('asks the user to untick competencies if they attempt to mark as incomplete a genuinely completed level', () => {
      cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id="mark-incomplete"]').click();
      cy.get('[data-test-id="level-status-alert"]').should('exist');
    });
  });
});
