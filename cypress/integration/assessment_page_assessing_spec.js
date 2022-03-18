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
                { text: 'sdfsfd', id: 4, guidance: [] },
                { text: 'sdfsfd', id: 5, guidance: [] },
                { text: 'sdfsfd', id: 6, guidance: [] },
                { text: 'sdfsfd', id: 7, guidance: [] },
                { text: 'sdfsfd', id: 8, guidance: [] },
                { text: 'sdfsfd', id: 9, guidance: [] },
                { text: 'sdfsfd', id: 410, guidance: [] },
              ],
            },
            {
              order: 3,
              id: '4',
              level: 'step',
              summary: summaryText,
              guidance: null,
              capabilities: [
                { text: 'sdfsfd', id: 1, guidance: [] },
                { text: 'sdfsfd', id: 2, guidance: [] },
                { text: 'sdfsfd', id: 3, guidance: [] },
                { text: 'sdfsfd', id: 4, guidance: [] },
                { text: 'sdfsfd', id: 5, guidance: [] },
                { text: 'sdfsfd', id: 6, guidance: [] },
                { text: 'sdfsfd', id: 7, guidance: [] },
                { text: 'sdfsfd', id: 8, guidance: [] },
                { text: 'sdfsfd', id: 9, guidance: [] },
                { text: 'sdfsfd', id: 10, guidance: [] },
                { text: 'sdfsfd', id: 11, guidance: [] },
                { text: 'sdfsfd', id: 12, guidance: [] },
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

    let createLevel = {
      data: {
        createLevel: { level: { id: '614', status: 'incomplete', wasQuickAssessed: false } },
      },
    };

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
      cy.waitForSpinners();
    });

    it('lets teacher mark a competency as complete', () => {
      cy.get('[data-test-id=hex-1]').click();

      cy.wait('@gqlcreateLevelQuery').its('request.url').should('include', '/graphql');

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
            status: 'emerging',
            wasQuickAssessed: false,
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

    it('displays 10% complete and "emerging", lets teacher mark a competency as target, includes accessible SVG icon in hexagon', () => {
      cy.get('[data-test-id=hex-1] svg').should('contain', 'Is complete');
      cy.get('[data-test-id=level-status-status]').should('contain', 'emerging');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '10');
      cy.get('[data-test-id=hex-1]').click();
      cy.wait('@gqlgetCompetencyQuery').its('request.url').should('include', '/graphql');
    });
  });

  describe('Page quick assessed as secure with no competencies marked', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'secure',
            wasQuickAssessed: true,
          },
        ],
      },
    };

    let getCompetencies = {
      data: {
        competencies: [],
      },
    };

    let updateLevel = {
      data: { updateLevel: { level: { id: '615', status: 'complete', wasQuickAssessed: true } } },
    };

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

    it('displays 75% secure and allows quick assessing to 100% complete', () => {
      cy.get('[data-test-id=level-status-status]').should('contain', 'secure');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '75');
      cy.get('[data-test-id="quick-assess"]').click();
      cy.get('[data-test-id="mark-complete"]').should('exist');
      cy.get('[data-test-id="mark-complete"]').click();
      cy.wait('@gqlupdateLevelQuery').its('request.url').should('include', '/graphql');
      cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id=percent-complete-label]').contains('100');
    });
  });

  describe('Page quick assessed as secure with competencies marked', () => {
    let getLevel = {
      data: {
        levels: [
          {
            id: '615',
            status: 'secure',
            wasQuickAssessed: true,
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

    //  let updateLevel = { data: { updateLevel: { level: { id: '615', status: 'incomplete' } } } };

    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
        //  { query: 'updateLevel', data: updateLevel },
      ]);
      cy.visit('/subjects/expressive-language/class-1/154');
      cy.waitForSpinners();
      cy.waitForSpinners();
      cy.waitForSpinners();
    });

    it('displays as secure 75%, and after clicking away and coming back', () => {
      cy.get('[data-test-id=level-status-status]').should('contain', 'secure');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '75');
      cy.get('[data-test-id=tab-1]').click();
      cy.get('[data-test-id=hex-11]').should('exist');
      cy.get('[data-test-id=tab-0]').click();
      cy.get('[data-test-id=level-status-status]').should('contain', 'secure');
      cy.get('[data-test-id=percent-complete-label]').should('contain', '75');
    });
  });

  // describe('Page with all competencies marked complete', () => {
  //   let getLevel = {
  //     data: {
  //       levels: [
  //         {
  //           id: '615',
  //           status: 'complete',
  //           competencies: [
  //             { id: '2863', status: 'complete', capability_fk: firstCompId },
  //             { id: '2864', status: 'complete', capability_fk: secondCompId },
  //             { id: '2865', status: 'complete', capability_fk: thirdCompId },
  //           ],
  //         },
  //       ],
  //     },
  //   };

  //   let getCompetencies = {
  //     data: {
  //       competencies: [
  //         { id: '2863', status: 'complete', capability_fk: firstCompId },
  //         { id: '2864', status: 'complete', capability_fk: secondCompId },
  //         { id: '2865', status: 'complete', capability_fk: thirdCompId },
  //       ],
  //     },
  //   };

  //   beforeEach(() => {
  //     cy.mockGraphQL([
  //       { query: 'getLevel', data: getLevel },
  //       { query: 'getCompetencies', data: getCompetencies },
  //     ]);
  //     cy.visit('/subjects/expressive-language/class-1/154');
  //     cy.waitForSpinners();
  //     cy.waitForSpinners();
  //     cy.waitForSpinners();
  //   });

  //   it('displays 100% complete and status', () => {
  //     cy.get('[data-test-id=level-status-status]').contains('complete');
  //     cy.get('[data-test-id=percent-complete-label]').contains('100');
  //   });

  //   it('asks the user to untick competencies if they attempt to mark as incomplete a genuinely completed level', () => {
  //     cy.get('[data-test-id=level-status-status]').contains('complete');
  //     cy.get('[data-test-id="mark-incomplete"]').click();
  //     cy.get('[data-test-id="level-status-alert"]').should('exist');
  //   });
  // });
});
