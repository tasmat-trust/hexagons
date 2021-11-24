import getSubjects from '../fixtures/getSubjects.json';
import getSingleSubjectBySlug from '../fixtures/getSingleSubjectBySlug.json';
import getDTModules from '../fixtures/getDTModules.json';
import getModulesEmpty from '../fixtures/getModulesEmpty.json';
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

describe('Manage individual subject with existing content', () => {
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

describe('Manage subject with no content', () => {
  beforeEach(() => {
    const createModule = {
      data: {
        createModule: {
          module: {
            level: 'step',
            order: 2,
            id: '476',
            summary: 'sdfsfd\nsdfsdf\n\nsfd\nkl\n\nsomething new',
            subject: { name: 'DT', id: '4' },
          },
        },
      },
    };

    let createCapability = {
      data: {
        createCapability: {
          capability: { text: 'sdfsfd', order: 0, module: { level: 'step', order: 2 } },
        },
      },
    }; 

    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getModules', data: getModulesEmpty },
      { query: 'createModule', data: createModule },
      { query: 'createCapability', data: createCapability, isOneOfManySimilar: true },
    ]);
    cy.login('Leader');

    cy.visit('/manage/subjects/dt');
  });
  it('creates competencies based on textarea input with line breaks', () => {
    cy.get('[data-test-id=select-level]').click();
    cy.get('[data-value="Step"]').click();
    cy.get('#order').clear();
    cy.get('#order').type('2');
    cy.get('#summary').clear();
    cy.get('#summary').type('sdfsfd\nsdfsdf\n\nsfd\nkl\n\nsomething new');
    cy.get('#capabilities').clear();
    cy.get('#capabilities').type('Capability one\nCapability two\nThird\ncapabilityFourth\nFifth');
    cy.get('[data-test-id=add-new-module]').click();
    cy.wait('@gqlcreateCapability1Query').its('request.url').should('include', '/graphql');
    cy.wait('@gqlcreateCapability2Query').its('request.url').should('include', '/graphql');
    cy.wait('@gqlcreateCapability3Query').its('request.url').should('include', '/graphql');
    cy.wait('@gqlcreateCapability4Query').its('request.url').should('include', '/graphql');
    cy.wait('@gqlcreateCapability5Query').its('request.url').should('include', '/graphql');
  });
});
