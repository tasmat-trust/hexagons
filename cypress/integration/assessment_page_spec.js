import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils';

context('Assessment page', () => {
  beforeEach(() => {

    cy.login('Teacher');


    let getSubject = {
      body: {
        data: { subjects: [{ id: '1', name: 'Number', slug: 'number' }] },
      },
    };

    let getGroup = {
      body: { data: { groups: [{ name: 'Group A', id: '1' }] } },
    };

    let getPupil = {
      body: {
        data: {
          pupils: [
            {
              name: 'Amelia Banks',
              id: '2',
              groups: [{ name: 'Group A' }],
              organization: { school_type: 'primary' },
            },
          ],
        },
      },
    };

    let getLevels = {
      body: {
        data: {
          levels: [
            {
              id: '1',
              status: 'incomplete',
              module: {
                level: 'step',
                order: 1,
                capabilities: [
                  { text: 'adsdfsdf', order: 0, id: '1' },
                  { text: 'sdfsdfsdf', order: 1, id: '2' },
                  { text: 'sdfsdf', order: 3, id: '3' },
                  { text: 'sdfsdfsdf', order: 2, id: '4' },
                ],
              },
              competencies: [
                { status: 'complete', capability_fk: 1 },
                { status: 'complete', capability_fk: 2 },
                { status: 'complete', capability_fk: 4 },
                { status: 'incomplete', capability_fk: 3 },
              ],
            },
          ],
        },
      },
    };

    let getPupils = {
      body: {
        data: {
          pupils: [
            { name: 'Amelia Banks', id: '2', groups: [{ name: 'Group A' }] },
            { name: 'Amadeus Foley', id: '5', groups: [{ name: 'Group A' }] },
            { name: 'Ali B', id: '6', groups: [{ name: 'Group A' }] },
          ],
        },
      },
    };

    let getModules = {
      body: {
        data: {
          modules: [
            {
              order: 1,
              id: '1',
              level: 'step',
              summary: 'asasdasd',
              guidance: 'asdasfdsf',
              capabilities: [
                { text: 'adsdfsdf', id: '1' },
                { text: 'sdfsdfsdf', id: '2' },
                { text: 'sdfsdf', id: '3' },
                { text: 'sdfsdfsdf', id: '4' },
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
            { status: 'complete', capability_fk: 1 },
            { status: 'complete', capability_fk: 2 },
            { status: 'complete', capability_fk: 4 },
            { status: 'incomplete', capability_fk: 3 },
          ],
        },
      },
    };

    let getCompetency = {
      body: { data: { competencies: [{ id: '2' }] } },
    };

    let getLevel = {
      body: { data: { levels: [{ id: '1', status: 'incomplete' }] } },
    };

    let updateLevel = {
      body: { data: { updateLevel: { level: { id: '1', status: 'complete' } } } },
    };

    let updateCompetency = {
      body: { data: { updateCompetency: { competency: { id: '2' } } } },
    };

    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:1337/graphql',
      },
      (req) => {
        aliasQuery(req, 'getSubject');
        aliasQuery(req, 'getGroup');
        aliasQuery(req, 'getPupil');
        aliasQuery(req, 'getLevels');
        aliasQuery(req, 'getPupils');
        aliasQuery(req, 'getModules');
        aliasQuery(req, 'getCompetency');
        aliasQuery(req, 'getCompetencies');
        aliasQuery(req, 'getLevel');
        aliasQuery(req, 'updateCompetency');

        if (hasOperationName(req, 'getSubject')) { 
          req.reply(getSubject);
          return;
        }
        if (hasOperationName(req, 'getGroup')) {
          req.reply(getGroup);
          return;
        }
        if (hasOperationName(req, 'getPupil')) {
          req.reply(getPupil);
          return;
        }
        if (hasOperationName(req, 'getLevels')) {
          req.reply(getLevels);
          return;
        }
        if (hasOperationName(req, 'getPupils')) {
          req.reply(getPupils);
          return;
        }
        if (hasOperationName(req, 'getModules')) {
          req.reply(getModules);
          return;
        }
        if (hasOperationName(req, 'getCompetency')) {
          req.reply(getCompetency);
          return;
        }
        if (hasOperationName(req, 'getCompetencies')) {
          req.reply(getCompetencies);
          return;
        }
        if (hasOperationName(req, 'getLevel')) {
          req.reply(getLevel);
          return;
        }
        if (hasOperationName(req, 'updateLevel')) {
          req.reply(updateLevel);
          return;
        }

        if (hasOperationName(req, 'updateCompetency')) {
          req.reply(updateCompetency);
          return;
        }
      }
    );

    
  });

  describe('assessment functionality', () => {
    beforeEach(() => {
      cy.visit('/subjects/number/group-a/2');
      cy.wait('@gqlgetModulesQuery');
      cy.wait('@gqlgetPupilQuery');
      cy.wait('@gqlgetCompetenciesQuery');
      cy.wait('@gqlgetLevelQuery');
      cy.waitForSpinners()
    });

    it('allows steps to be marked complete', () => {
      let updatedCompetencies = {
        body: {
          data: {
            competencies: [
              { status: 'complete', capability_fk: 1 },
              { status: 'complete', capability_fk: 2 },
              { status: 'complete', capability_fk: 4 },
              { status: 'complete', capability_fk: 3 },
            ],
          },
        },
      };
      cy.waitForSpinners()

      cy.get('[data-test-id=hex-3]').click();
      cy.wait('@gqlgetCompetencyQuery');
      cy.wait('@gqlupdateCompetencyQuery');
      cy.intercept(
        {
          method: 'POST',
          url: 'http://localhost:1337/graphql',
        },
        (req) => {
          aliasQuery(req, 'getCompetencies');
          if (hasOperationName(req, 'getCompetencies')) {
            req.reply(updatedCompetencies);
            return;
          }
        }
      );
      cy.wait('@gqlgetCompetenciesQuery'); // Needs to use different fixture
      cy.wait('@gqlgetLevelQuery');
      // cy.get('[data-test-id=level-status-status]').contains('complete');
      cy.get('[data-test-id=percent-complete-label]').contains('100');
      // cy.get('[data-test-id=mark-incomplete]').contains('Mark Step incomplete');
    });
  });

  describe('subjects pathway', () => {
    beforeEach(() => {
      cy.visit('/subjects/number/group-a/2');
    });
    it('shows a view summary button', () => {
      cy.get('[data-test-id=view-summary-button]').should('be.visible');
    });

    it('displays correct breadcrumbs for given URL', () => {
      cy.get('[data-test-id=first-crumb]').contains('Subjects');
      cy.get('[data-test-id=second-crumb]').contains('Number');
      cy.get('[data-test-id=third-crumb]').contains('Group A');
      cy.get('[data-test-id=fourth-crumb]').contains('Amelia Banks');
    });

    it('shows the level marked as incomplete', () => {
      cy.get('[data-test-id=level-status-title]').should('be.visible');
      cy.get('[data-test-id=level-status-title]').contains('Step 1');
      cy.get('[data-test-id=level-status-status]').contains('incomplete');
      cy.get('[data-test-id=percent-complete-label]').contains('75');
      cy.get('[data-test-id=mark-complete]').contains('Complete this Step');
    });
  });

  describe('pupils pathway', () => {
    beforeEach(() => {
      cy.visit('/pupils/group-a/2/number');
    });
    it('displays correct breadcrumbs for given URL', () => {
      cy.get('[data-test-id=first-crumb]').contains('Pupils');
      cy.get('[data-test-id=second-crumb]').contains('Group A');
      cy.get('[data-test-id=third-crumb]').contains('Amelia Banks');
      cy.get('[data-test-id=fourth-crumb]').contains('Number');
    });
  });
});
