import getGroups from '../fixtures/getGroups.json';
import getPupils from '../fixtures/getPupils.json';

describe('Target Levels - Basic Functionality', () => {
  beforeEach(() => {
    cy.login('Teacher');

    cy.mockGraphQL([
      { query: 'createPupil' },
      { query: 'updatePupilTargetLevel' },
      { query: 'getGroups', data: getGroups },
      { query: 'getPupilsWithGroups', data: getPupils },
    ]);

    cy.visit('/manage/pupils');
  });

  describe('Core Target Level Features', () => {
    it('shows target level column in pupils table', () => {
      cy.get('.MuiDataGrid-root').should('be.visible');
      cy.get('[data-field="targetLevel"]').should('be.visible');
      cy.contains('Target Level').should('be.visible');
    });

    it('displays different target levels in the table', () => {
      // Verify that our test data shows different target levels
      cy.get('.MuiDataGrid-root').contains('Small').should('be.visible');
      cy.get('.MuiDataGrid-root').contains('Medium').should('be.visible');
      cy.get('.MuiDataGrid-root').contains('Large').should('be.visible');
    });

    it('shows target level dropdown in new pupil form', () => {
      cy.get('[data-test-id=new-pupil]').click();
      cy.get('#demo-single-chip').should('be.visible');
      cy.contains('Target Level').should('be.visible');
      
      // Default should be medium
      cy.get('#demo-single-chip').should('contain', 'Medium (0.4)');
    });

    it('allows selecting different target levels', () => {
      cy.get('[data-test-id=new-pupil]').click();
      
      // Click to open dropdown
      cy.get('#demo-single-chip').click();
      
      // Verify all options are available
      cy.get('[data-value="small"]').should('contain', 'Small (0.2)');
      cy.get('[data-value="medium"]').should('contain', 'Medium (0.4)');
      cy.get('[data-value="large"]').should('contain', 'Large (0.5)');
      
      // Select large
      cy.get('[data-value="large"]').click();
      cy.get('#demo-single-chip').should('contain', 'Large (0.5)');
    });

    it('shows assign target levels button when pupils are selected', () => {
      // Initially button should not be visible
      cy.get('[data-test-id=assign-target-levels]').should('not.exist');
      
      // Select pupils
      cy.get('[data-id="109"]').click();
      cy.get('[data-id="110"]').click();
      
      // Button should now be visible
      cy.get('[data-test-id=assign-target-levels]').should('be.visible');
    });

    it('creates pupil with basic target level functionality', () => {
      cy.get('[data-test-id=new-pupil]').click();
      cy.get('#name').clear();
      cy.get('#name').type('Target Level Test Pupil');
      
      // Keep default medium target level
      cy.get('#demo-single-chip').should('contain', 'Medium (0.4)');
      
      cy.get('[data-test-id=add-new-pupil]').click();
      cy.get('[data-test-id="close-pupil-popup"]').click();
      
      // Verify GraphQL call was made
      cy.wait('@gqlcreatePupilQuery').its('request.url').should('include', '/graphql');
    });

    it('bulk assigns target levels to multiple pupils', () => {
      // Select multiple pupils
      cy.get('[data-id="109"]').click();
      cy.get('[data-id="110"]').click();
      
      // Click assign target levels button
      cy.get('[data-test-id=assign-target-levels]').click();
      
      // Select a target level
      cy.get('#demo-single-chip').click();
      cy.get('[data-value="large"]').click();
      
      // Submit assignment
      cy.get('[data-test-id=assign-to-targetLevel]').click();
      
      // Verify GraphQL call was made
      cy.wait('@gqlupdatePupilTargetLevelQuery').its('request.url').should('include', '/graphql');
    });
  });
});

describe('Target Levels - Leader Access', () => {
  beforeEach(() => {
    cy.login('Leader');

    cy.mockGraphQL([
      { query: 'createPupil' },
      { query: 'updatePupilTargetLevel' },
      { query: 'getGroups', data: getGroups },
      { query: 'getPupilsWithGroups', data: getPupils },
    ]);

    cy.visit('/manage/pupils');
  });

  it('allows Leaders to assign target levels to pupils', () => {
    // Select multiple pupils
    cy.get('[data-id="109"]').click();
    cy.get('[data-id="110"]').click();
    
    // Should see assign target levels button
    cy.get('[data-test-id=assign-target-levels]').should('be.visible');
    
    // Click and verify dialog opens
    cy.get('[data-test-id=assign-target-levels]').click();
    cy.get('#demo-single-chip').should('be.visible');
  });

  it('allows Leaders to create pupils with target levels', () => {
    cy.get('[data-test-id=new-pupil]').click();
    cy.get('#name').clear();
    cy.get('#name').type('Leader Created Pupil');
    
    // Change to small target level
    cy.get('#demo-single-chip').click();
    cy.get('[data-value="small"]').click();
    cy.get('#demo-single-chip').should('contain', 'Small (0.2)');
    
    cy.get('[data-test-id=add-new-pupil]').click();
    cy.get('[data-test-id="close-pupil-popup"]').click();
    
    cy.wait('@gqlcreatePupilQuery').its('request.url').should('include', '/graphql');
  });
});
