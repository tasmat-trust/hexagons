import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

describe('Manage Pupils with no existing groups', () => {
  beforeEach(() => {
    cy.login(('Teacher'))

    let groupResponse = {
      body: { "response": null }
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'createPupil')
        aliasQuery(req, 'getGroups')
        aliasQuery(req, 'createNewGroup')
        if (hasOperationName(req, 'getGroups')) {
          req.reply(groupResponse)
        }
      }
    )
    cy.visit('/manage/pupils')
  })

  it('Lets Teacher create new groups', () => {
    cy.createGroup()
  })

  it('Lets Teacher create new pupils without groups', () => {
    cy.createPupilWithoutGroups()
  })

})

describe('Manage Pupils Page', () => {

  beforeEach(() => {

    cy.login(('Teacher'))


    let groupResponse = {
      body: { "data": { "groups": [{ "name": "Class 2", "slug": "class-2", "id": "42" }, { "name": "Class 3", "slug": "class-3", "id": "43" }, { "name": "Class 4", "slug": "class-4", "id": "44" }] } }
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'createPupil')
        aliasQuery(req, 'getGroups')
        aliasQuery(req, 'createNewGroup')
        if (hasOperationName(req, 'getGroups')) {
          req.reply(groupResponse)
        }
      }
    )
    cy.visit('/manage/pupils')
  })

  it('shows manage pupil interface to Teachers', () => {
    cy.assertManageUserPageVisible()
  })

  it('Lets Teacher create new groups', () => {
    cy.createGroup()
  })



  it('Lets Teacher create new pupils with groups', () => {
    cy.get('[data-test-id=new-pupil]').click();
    cy.get('#name').clear();
    cy.get('#name').type('Amadeus Foley');
    cy.get('[data-test-id="multi-select"]').click();

    cy.get('[data-value="43"]').click().type('{esc}');
    cy.get('[data-test-id=add-new-pupil]').click();
    cy.get('[data-test-id="close-pupil-popup"]').click();
    cy.wait('@gqlcreatePupilQuery').its('request.url').should('include', '/graphql')
  })

  it('Lets Teacher create new pupils without groups', () => {
    cy.createPupilWithoutGroups()
  })
})
