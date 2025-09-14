import getGroups from '../fixtures/getGroups.json';
import getPupils from '../fixtures/getPupils.json';
import getGroupsEmpty from '../fixtures/getGroupsEmpty.json'

describe('Manage Pupils with no existing groups', () => {
  beforeEach(() => {
    cy.login('Teacher');

 
    cy.mockGraphQL([
      { query: 'createPupil' },
      { query: 'createNewGroup' },
      { query: 'getGroups', data: getGroupsEmpty },
      { query: 'getPupilsWithGroups', data: getPupils },
    ]);

    cy.visit('/manage/pupils');
  });

  it('Lets Teacher create new groups', () => {
    cy.createGroup();
  });

  it('Lets Teacher create new pupils without groups', () => {
    cy.createPupilWithoutGroups();
  });

  it('shows manage pupil interface to Teachers', () => {
    cy.assertManagePupilPageVisible();
  });
});

describe('Manage Pupils Page: Teacher', () => {
  beforeEach(() => {
    cy.login('Teacher');

 
    cy.mockGraphQL([
      { query: 'createPupil' },
      { query: 'createNewGroup' },
      { query: 'updatePupil'},
      { query: 'updatePupilTargetLevel' },
      { query: 'getGroups', data: getGroups },
      { query: 'getPupilsWithGroups', data: getPupils },
    ]);

    cy.visit('/manage/pupils');
  });

  it('shows manage pupil interface to Teachers', () => {
    cy.assertManagePupilPageVisible();
  });

  it('shows assign groups button when more than one pupil is selected', () => {
    cy.selectMultipleUsers();
    cy.get('[data-test-id=assign-groups]').should('be.visible');
  });

  it('Lets Teacher create new groups', () => {
    cy.createGroup();
  });

  it('Lets Teacher create new pupils with groups', () => {
    cy.get('[data-test-id=new-pupil]').click();
    cy.get('#name').clear();
    cy.get('#name').type('Amadeus Foley');
    cy.get('[data-test-id="multi-select"]').click();

    cy.get('[data-value="43"]').click().type('{esc}');
    cy.get('[data-test-id=add-new-pupil]').click();
    cy.get('[data-test-id="close-pupil-popup"]').click();
    cy.wait('@gqlcreatePupilQuery').its('request.url').should('include', '/graphql');
  });

  it('Displays groups alphabetically in list and sorts 1,2,12 correctly', () => {
    cy.get('[data-test-id=new-pupil]').click();
    cy.get('[data-test-id="multi-select"]').click();
    cy.get('ul[aria-labelledby="mutiple-chip-label"] li:first-child').contains('A1');
    cy.get('ul[aria-labelledby="mutiple-chip-label"] li:last-child').contains('D12');
  });

  it('Lets Teacher create new pupils without groups', () => {
    cy.createPupilWithoutGroups();
  });

  it('Lets Teacher assign multiple pupils to groups', () => {
    cy.selectMultipleUsers();
    cy.get('[data-test-id=assign-groups]').click();
    cy.get('[data-test-id="multi-select"]').click();
    cy.get('[data-value="44"]').click().type('{esc}');
    cy.get('[data-test-id=assign-to-group]').click();
    cy.wait('@gqlupdatePupilQuery').its('request.url').should('include', '/graphql');
  });

  it('shows assign target levels button when pupils are selected', () => {
    cy.selectMultipleUsers();
    cy.get('[data-test-id=assign-target-levels]').should('be.visible');
  });

  it('Lets Teacher create new pupils with target level', () => {
    cy.createPupilWithTargetLevel('large');
  });

  it('Lets Teacher create new pupils with default target level (medium)', () => {
    cy.createPupilWithTargetLevel();
  });

  it('Shows target level column in pupils table', () => {
    cy.get('.MuiDataGrid-root').should('be.visible');
    cy.get('[data-field="targetLevel"]').should('be.visible');
    cy.get('.MuiDataGrid-root').contains('Target Level');
  });

  it('Displays different target levels in the table', () => {
    // Check that different target levels are displayed
    cy.get('.MuiDataGrid-root').contains('Small');
    cy.get('.MuiDataGrid-root').contains('Medium'); 
    cy.get('.MuiDataGrid-root').contains('Large');
  });

  it('Lets Teacher assign multiple pupils to target levels', () => {
    cy.selectMultipleUsers();
    cy.assignTargetLevelsToSelectedPupils('small');
  });
});

describe('Manage Pupils Page: Leader', () => {
  beforeEach(() => {
    cy.login('Leader');

    let getCompetencies = { data: { competencies: [] } };
    let getLevels = { data: { levels: [] } };
    let deletePupil = { data: { deletePupil: { pupil: { id: '109' } } } };

    cy.mockGraphQL([
      { query: 'createPupil' },
      { query: 'updatePupil' },
      { query: 'updatePupilTargetLevel' },
      { query: 'createNewGroup' },
      { query: 'getGroups', data: getGroups },
      { query: 'getPupilsWithGroups', data: getPupils },
      { query: 'getCompetencies', data: getCompetencies },
      { query: 'getLevels', data: getLevels },
      { query: 'DeletePupil', data: deletePupil },
    ]);
    cy.visit('/manage/pupils');
  });

  it('Lets Leader delete pupils', () => {
    cy.get('[data-id="109"]').click();
    cy.get('[data-test-id=delete-pupil]').should('be.visible');
    cy.get('[data-test-id=delete-pupil]').click();
    cy.get('[data-test-id=definitely-delete-pupil]').click();
    cy.wait('@gqlDeletePupilQuery').its('request.url').should('include', '/graphql');
  });

  it('Lets Leader assign target levels to multiple pupils', () => {
    cy.selectMultipleUsers();
    cy.get('[data-test-id=assign-target-levels]').should('be.visible');
    cy.assignTargetLevelsToSelectedPupils('large');
  });
});
