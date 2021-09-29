import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

describe('Manage Pupils with no existing groups', () => {
  beforeEach(() => {
    cy.login(('Teacher'))

    let groupResponse = {
      body: { "data": { "groups": [] } }
    }

    let pupilResponse = {
      body: { "data": { "pupils": [{ "id": "102", "name": "Peter Smith", "groups": [] }, { "id": "103", "name": "Damilola Chukwu", "groups": [] }, { "id": "104", "name": "Amelia Baker", "groups": [] }, { "id": "105", "name": "Amelia Baker", "groups": [] }, { "id": "106", "name": "Amelia Baker", "groups": [] }, { "id": "107", "name": "Amelia Baker", "groups": [] }, { "id": "108", "name": "Amelia Baker", "groups": [] }, { "id": "104", "name": "Amelia Baker", "groups": [] }, { "id": "109", "name": "Amelia Baker", "groups": [] }, { "id": "110", "name": "Amelia Baker", "groups": [] }] } }
    }
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'createPupil')
        aliasQuery(req, 'getGroups')
        aliasQuery(req, 'createNewGroup')
        aliasQuery(req, 'getPupilsWithGroups')
        if (hasOperationName(req, 'getPupilsWithGroups')) {
          req.reply(pupilResponse)
        }
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

  it('shows manage pupil interface to Teachers', () => {
    cy.assertManagePupilPageVisible()
  })

})

describe('Manage Pupils Page', () => {

  beforeEach(() => {
    cy.login(('Teacher'))


    let groupResponse = {
      body: { "data": { "groups": [{ "name": "Class 2", "slug": "class-2", "id": "42" }, { "name": "Class 3", "slug": "class-3", "id": "43" }, { "name": "Class 4", "slug": "class-4", "id": "44" }] } }
    }

    let pupilResponse = {
      body: { "data": { "pupils": [{ "id": "102", "name": "Peter Smith", "groups": [] }, { "id": "103", "name": "Damilola Chukwu", "groups": [] }, { "id": "104", "name": "Amelia Baker", "groups": [] }, { "id": "105", "name": "Amelia Baker", "groups": [] }, { "id": "106", "name": "Amelia Baker", "groups": [] }, { "id": "107", "name": "Amelia Baker", "groups": [] }, { "id": "108", "name": "Amelia Baker", "groups": [] }, { "id": "104", "name": "Amelia Baker", "groups": [] }, { "id": "109", "name": "Amelia Baker", "groups": [] }, { "id": "110", "name": "Amelia Baker", "groups": [] }] } }
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'createPupil')
        aliasQuery(req, 'getGroups')
        aliasQuery(req, 'createNewGroup')
        aliasQuery(req, 'getPupilsWithGroups')
        aliasQuery(req, 'updatePupil')
        if (hasOperationName(req, 'getPupilsWithGroups')) {
          req.reply(pupilResponse)
        }
        if (hasOperationName(req, 'getGroups')) {
          req.reply(groupResponse)
        }
      }
    )
    cy.visit('/manage/pupils')
  })

  it('shows manage pupil interface to Teachers', () => {
    cy.assertManagePupilPageVisible()
  })

  it('shows assign groups button when more than one pupil is selected', () => {
    cy.selectMultipleUsers()
    cy.get('[data-test-id=assign-groups]').should('be.visible')
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

  it('Lets Teacher assign multiple pupils to groups', () => {
    cy.selectMultipleUsers()
    cy.get('[data-test-id=assign-groups]').click()
    cy.get('[data-test-id="multi-select"]').click();
    cy.get('[data-value="44"]').click().type('{esc}');
    cy.get('[data-test-id=assign-to-group]').click()
    cy.wait('@gqlupdatePupilQuery').its('request.url').should('include', '/graphql')
  })

})
