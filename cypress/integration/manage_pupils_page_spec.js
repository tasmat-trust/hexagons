import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

describe('Manage Pupils Page', () => {

  beforeEach(() => {

    cy.login(('Senior Leader'))


    let staticResponse = {
      body: { "data": { "groups": [{ "name": "Class 2", "slug": "class-2", "id": "42" }, { "name": "Class 3", "slug": "class-3", "id": "43" }, { "name": "Class 4", "slug": "class-4", "id": "44" }] } }
    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'getGroups')
        if (hasOperationName(req, 'getGroups')) {
          req.reply(staticResponse)
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

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        if (hasOperationName(req, 'createGroup')) {
          req.alias = 'groupCreated'
        }
      }
    )
    cy.get('.MuiGrid-grid-md-5 > .makeStyles-paper-37 > .MuiBox-root > .MuiButtonBase-root > .MuiButton-label').click();
    cy.get('#name').clear();
    cy.get('#name').type('New group');
    cy.get('#new-group > :nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root > .MuiButton-label').click();
    cy.wait('@groupCreated').its('request.url').should('include', '/graphql')
  })
})
