import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

describe('Manage Pupils Page', () => {

  beforeEach(() => {

    cy.login(('Senior Leader'))


    let groupResponse = {
      body: { "data": { "groups": [{ "name": "Class 2", "slug": "class-2", "id": "42" }, { "name": "Class 3", "slug": "class-3", "id": "43" }, { "name": "Class 4", "slug": "class-4", "id": "44" }] } }
    }
    let pupilResponse = { body: { "data": { "pupils": [{ "id": "72", "name": "Dave Eggers", "groups": [{ "name": "Class 2", "id": "42" }] }, { "id": "73", "name": "Darren Jones", "groups": [{ "name": "Class 5", "id": "45" }, { "name": "Class 6", "id": "46" }] }, { "id": "74", "name": "Jenny Potterr", "groups": [{ "name": "Class 2", "id": "42" }] }, { "id": "75", "name": "Amadeus Foley", "groups": [{ "name": "Class 2", "id": "42" }, { "name": "Class 3", "id": "43" }] }, { "id": "69", "name": "Peter Smith", "groups": [{ "name": "Class 2", "id": "42" }] }, { "id": "70", "name": "Jenny Roebottom", "groups": [{ "name": "Class 2", "id": "42" }, { "name": "SEND", "id": "47" }] }, { "id": "71", "name": "Amelia Smith", "groups": [{ "name": "Class 2", "id": "42" }] }] } } }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'getGroups')
        aliasQuery(req, 'createNewGroup')
        if (hasOperationName(req, 'getGroups')) {
          req.reply(groupResponse)
        }
      }
    )
    cy.visit('/manage/pupils')
  })

  it('shows manage pupil interface to Senior Leaders', () => {

    cy.get('[data-test-id=title]').should('be.visible')
    cy.get('[data-test-id=notification]').should('be.visible')
    cy.get('[data-test-id=new-pupil]').should('be.visible')
    cy.get('[data-test-id=new-group]').should('be.visible')
  })

  it('Lets SLT create new groups', () => {

    cy.get('[data-test-id=new-group]').should('be.visible')
    cy.get('[data-test-id=new-group]').click();
    cy.get('#name').clear();
    cy.get('#name').type('New group');
    cy.get('[data-test-id=add-new-group]').click();
    cy.get('[data-test-id=close-group-popup]').click();

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        if (hasOperationName(req, 'createNewGroup')) {
          req.alias = 'gqlcreateNewGroupQuery'
        }
      }
    )
    cy.wait('@gqlcreateNewGroupQuery').its('request.url').should('include', '/graphql')
  })



  it('Lets SLT create new pupils', () => {

    // cy.get('[data-test-id=new-pupil]').click();
    // cy.get('#name').clear();
    // cy.get('#name').type('Amadeus Foley');
    // cy.get('body').click();
    // cy.get('.Mui-focusVisible').click();
    // cy.get('[data-value="43"]').click();
    // cy.get('[data-test-id=add-new-pupil]').click();
    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();

  })
})
