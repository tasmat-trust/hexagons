import getSubjects from '../fixtures/getSubjects.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getPupil from '../fixtures/getPupil.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getAllLevelsEmpty from '../fixtures/getAllLevelsEmpty.json';
import getModules from '../fixtures/getModules.json';

const earlyDevelopmentFirstCompetencyText = 'sdsfdsdfsfdsfdsfd';
const existingGuidance = 'Some guidance on how to do this lesson';
const newGuidanceText = 'Some new guidance';

const summaryText = 'sdf';
context('Assessment page', () => {
  beforeEach(() => {
    cy.login('Teacher');

    let getSingleSubjectBySlug = {
      body: { data: { subjects: [{ id: '13', name: 'Art', slug: 'art' }] } },
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

  describe('With Transition', () => {
    beforeEach(() => {
      let getSingleSubjectBySlugEd = {
        body: {
          data: { subjects: [{ id: '21', name: 'Transition', slug: 'transition' }] },
        },
      };

      let getEdModules = {
        body: {
          data: {
            modules: [
              {
                order: 1,
                id: '121',
                level: 'step',
                summary: 'Early development',
                guidance: null,
                capabilities: [
                  { text: earlyDevelopmentFirstCompetencyText, id: '1610', guidance: [] },
                  { text: 'fdgegherth', id: '1611', guidance: [] },
                  {
                    text: 'rthrth',
                    id: '1612',
                    guidance: [
                      {
                        text: existingGuidance,
                        created_at: '2021-10-05T14:21:10.655Z',
                        users_permissions_user: { username: 'natalie' },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      };

      let getLevel = {
        body: {
          data: {
            levels: [
              {
                id: '750',
                status: 'incomplete',
                competencies: [
                  { id: '1475', status: 'complete', capability_fk: 1610 },
                  { id: '1476', status: 'target', capability_fk: 1611 },
                  { id: '1477', status: 'target', capability_fk: 1612 },
                ],
              },
            ],
          },
        },
      };

      let getCompetencies = {
        body: {
          data: {
            competencies: [
              { id: '1475', status: 'complete', capability_fk: 1610 },
              { id: '1476', status: 'target', capability_fk: 1611 },
              { id: '1477', status: 'target', capability_fk: 1612 },
            ],
          },
        },
      };

      cy.mockGraphQL([
        {
          query: 'getSingleSubjectBySlug',
          data: getSingleSubjectBySlugEd,
          variable: { key: 'slug', value: 'transition' },
        },
        { query: 'getEdModules', data: getEdModules },
        { query: 'getLevel', data: getLevel },
        { query: 'getCompetencies', data: getCompetencies },
      ]);
    });

    describe('Subject route', () => {
      beforeEach(() => {
        cy.visit('/subjects/art/class-1/154');
        cy.waitForSpinners();
        cy.get('[data-test-id=first-crumb]').should('be.visible');
      });

      it('Shows breadcrumbs, correct step/stage', () => {
        cy.get('[data-test-id=first-crumb]').should('be.visible').contains('Subjects');
        cy.get('[data-test-id=third-crumb]').should('be.visible').contains('Class 1');
      });

      it('Lets user choose a different subject from the breadcrumbs', () => {
        cy.get('[data-test-id=select-subject] select').select('Number');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/subjects/number/class-1/154');
        });
      });

      it('Lets user choose a different pupil from the breadcrumbs', () => {
        cy.get('[data-test-id=select-pupil] select')
          .select('Amy Johnson')
          .should('have.value', '165');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/subjects/art/class-1/165');
        });
      });

      it('Displays Early Development as Step 1 and a step/stage summary when you tap the Summary button', () => {
        cy.get('[data-test-id=hex-1]').should('contain', earlyDevelopmentFirstCompetencyText);
        cy.get('[data-test-id=view-summary-button]').click();
        cy.get('[data-test-id=view-summary-button-popup]').should('contain', 'Early development');
      });
    });

    describe('Pupil route', () => {
      beforeEach(() => {
        cy.visit('/pupils/class-1/art/154');
        cy.waitForSpinners();
        cy.get('[data-test-id=first-crumb]').should('be.visible');
      });
      it('Shows page with correct breadcrumbs', () => {
        cy.get('[data-test-id=first-crumb]').should('be.visible').contains('Pupils');
        cy.get('[data-test-id=second-crumb]').should('be.visible').contains('Class 1');
      });

      it('Lets user choose a different subject from the breadcrumbs', () => {
        cy.get('[data-test-id=select-subject] select').select('Number');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/pupils/class-1/154/number');
        });
      });

      it('Lets user choose a different pupil from the breadcrumbs', () => {
        cy.get('[data-test-id=select-pupil] select')
          .select('Amy Johnson')
          .should('have.value', '165');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/pupils/class-1/165/art');
        });
      });
    });

    // describe('Add Guidance', () => {
    //   beforeEach(() => {
    //     let createGuidance = {
    //       body: {
    //         data: {
    //           createGuidance: {
    //             guidance: {
    //               text: newGuidanceText,
    //               id: '93',
    //               created_at: '2021-10-05T15:21:10.655Z',
    //               users_permissions_user: { username: 'natalie' },
    //             },
    //           },
    //         },
    //       },
    //     };

    //     cy.mockGraphQL([{ query: 'createGuidance', data: createGuidance }]);

    //     cy.visit('/subjects/art/class-1/154');
    //     cy.waitForSpinners();
    //     cy.waitForSpinners();
    //     cy.waitForSpinners();
    //     cy.get('[data-test-id=hex-1]').should('exist');
    //   });

    //   it('Shows a popup with existing guidance and a form to add new', () => {
    //     cy.get('[data-test-id=guidance-lightbulb-hex-3]').should('exist');
    //     cy.get('[data-test-id=guidance-lightbulb-hex-3]').click();
    //     cy.get('[data-test-id=existing-guidance-panel]').contains(existingGuidance);
    //     cy.get('[data-test-id=add-new-guidance-tab]').click();
    //     cy.get('[data-test-id=add-new-guidance').contains('Add new guidance');
    //   });

    //   it('Lets teachers add guidance when there is already guidance present', () => {
    //     cy.get('[data-test-id=guidance-lightbulb-hex-3').should('exist');
    //     cy.get('[data-test-id=guidance-lightbulb-hex-3]').click();
    //     cy.get('[data-test-id=add-new-guidance-tab]').click();
    //     cy.waitForSpinners();
    //     cy.get('[data-test-id=textarea-field]').clear();
    //     cy.get('[data-test-id=textarea-field]').type(newGuidanceText);

    //     cy.assertGuidanceFormSubmitSuccess();

    //     cy.get('[data-test-id=view-guidance-tab]').click();
    //     cy.get('[data-test-id=guidance-1]').should('exist');
    //     cy.get('[data-test-id=guidance-1]').contains(newGuidanceText);
    //   });

    //   it('Lets teachers add guidance when no existing guidance', () => {
    //     cy.get('[data-test-id=not-got-guidance-hex-2').should('exist');
    //     cy.get('[data-test-id=guidance-lightbulb-hex-2').should('exist');
    //     cy.get('[data-test-id=guidance-lightbulb-hex-2]').click();
    //     cy.waitForSpinners();
    //     cy.get('[data-test-id=textarea-field]').clear();
    //     cy.get('[data-test-id=textarea-field]').type(newGuidanceText);

    //     cy.assertGuidanceFormSubmitSuccess();

    //     cy.get('[data-test-id=view-guidance-tab]').click();
    //     cy.get('[data-test-id=guidance-0]').should('exist');
    //     cy.get('[data-test-id=guidance-0]').contains(newGuidanceText);

    //     cy.get('[data-test-id=close-guidance-popup]').click();
    //     cy.get('[data-test-id=got-guidance-hex-2').should('exist');
    //   });
    // });
  });
});
