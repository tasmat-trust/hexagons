import getSubjects from '../fixtures/getSubjects.json';
import getSingleSubjectBySlug from '../fixtures/getSingleSubjectBySlug.json';
import getDTModules from '../fixtures/getDTModules.json';

describe('Manage subjects page', () => {
  beforeEach(() => {
    cy.mockGraphQL([{ query: 'getSubjects', data: getSubjects }]);
    cy.login('Leader');

    cy.visit('/manage/subjects');
  });
  it('displays all subjects', () => {
    cy.get('[data-test-id=parent-subject-button-communication]').should('exist');
    cy.get('[data-test-id=subject-button-pshe]').should('exist');
  });
});

describe('Manage individual subject', () => {
  beforeEach(() => {
    let updateModule = {
      data: {
        updateModule: {
          module: { summary: 'sdfsfd\nsdfsdf\n\nsfd\nkl\n\nsomething new', id: '442' },
        },
      },
    };

    let updateCapability = {
      data: { updateCapability: { capability: { text: 'sdfdfd', id: '7310' } } },
    };

    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getModules', data: getDTModules },
      { query: 'updateModule', data: updateModule },
      { query: 'updateCapability', data: updateCapability },
    ]);
    cy.login('Leader');

    cy.visit('/manage/subjects/dt');
  });
  it('allows summary editing', () => {
    cy.get('[data-test-id=summary-edit]').contains('Edit summary');
    cy.get('[data-test-id=summary-edit]').click();
    cy.get('#textarea').clear();
    cy.get('#textarea').type('New summary');
    cy.get('[data-test-id="add-new-summary"]').click();
    cy.wait('@gqlupdateModuleQuery').its('request.url').should('include', '/graphql');
  });
  it('allows competency editing', () => {
    cy.get('[data-test-id=edit-hex-1]')
      .invoke('attr', 'aria-label')
      .should('eq', 'Edit capability');
    cy.get('[data-test-id=edit-hex-1]').click();
    cy.get('[data-test-id=text-field]').clear();
    cy.get('[data-test-id=text-field]').type('New competency');
    cy.get('[data-test-id="add-new-capability"]').click();
    cy.wait('@gqlupdateCapabilityQuery').its('request.url').should('include', '/graphql');
  });
});
