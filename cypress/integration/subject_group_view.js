import { hasOperationName, hasVariable, aliasQuery, aliasQueryByVariable } from '../utils/graphql-test-utils'

describe('Subject by group page', () => {
  beforeEach(() => {
    cy.login(('Teacher'))

    let getSingleSubjectBySlug = {
      body: { "data": { "subjects": [{ "id": "11", "name": "DT", "slug": "dt" }] } }
    }

    let getGroupsByTeacherId = {
      body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Form 2", "slug": "form-2", "id": "253" }, { "name": "EFL", "slug": "efl", "id": "254" }] } }
    }

    let getGroupsByOrgId = {
      body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "Class 4", "slug": "class-4", "id": "248" }, { "name": "Class 5", "slug": "class-5", "id": "249" }, { "name": "Form 1", "slug": "form-1", "id": "250" }, { "name": "Form 4", "slug": "form-4", "id": "251" }, { "name": "Form 3", "slug": "form-3", "id": "252" }, { "name": "Form 2", "slug": "form-2", "id": "253" }, { "name": "EFL", "slug": "efl", "id": "254" }, { "name": "FSM", "slug": "fsm", "id": "255" }, { "name": "Form 5", "slug": "form-5", "id": "256" }] } }
    }

    let getCoreSubjects = {
      body: {"data":{"subjects":[{"id":"12","name":"Computing Skills","slug":"computing-skills"},{"id":"10","name":"Expressive Language","slug":"expressive-language"},{"id":"9","name":"Number","slug":"number"},{"id":"6","name":"Reading","slug":"reading"},{"id":"16","name":"Primary Science","slug":"primary-science"},{"id":"14","name":"SS&M","slug":"ssandm"},{"id":"15","name":"U&A","slug":"uanda"},{"id":"7","name":"Writing","slug":"writing"}]}}
    }

    let getPupils = {
      body: {"data":{"pupils":[{"name":"Jenny Roebottom","id":"154","groups":[{"name":"Class 2","slug":"class-2"},{"name":"Class 3","slug":"class-3"},{"name":"Class 5","slug":"class-5"},{"name":"Form 3","slug":"form-3"},{"name":"EFL","slug":"efl"},{"name":"FSM","slug":"fsm"}]},{"name":"Amy Johnson","id":"165","groups":[{"name":"Class 2","slug":"class-2"}]},{"name":"Imogen Banana","id":"166","groups":[{"name":"Class 2","slug":"class-2"}]},{"name":"Jamie Jones","id":"170","groups":[{"name":"Class 1","slug":"class-1"},{"name":"Class 2","slug":"class-2"},{"name":"Class 3","slug":"class-3"}]}]}}

    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        // Get requests
        aliasQuery(req, 'getSingleSubjectBySlug')
        if (hasOperationName(req, 'getSingleSubjectBySlug')) {
          req.reply(getSingleSubjectBySlug)
        }

        aliasQueryByVariable(req, 'getGroups', 'teacherID', 3)
        if (hasOperationName(req, 'getGroups') && hasVariable(req, 'teacherID', 3)) {
          req.reply(getGroupsByTeacherId)
        }

        aliasQueryByVariable(req, 'getGroups', 'orgId', 1)
        if (hasOperationName(req, 'getGroups') && hasVariable(req, 'orgId', 1)) {
          req.reply(getGroupsByOrgId)
        }

        aliasQuery(req, 'getCoreSubjects')
        if (hasOperationName(req, 'getCoreSubjects')) {
          req.reply(getCoreSubjects)
        }

        aliasQuery(req, 'getPupils')
        if (hasOperationName(req, 'getPupils')) {
          req.reply(getPupils)
        }

      }
    )
    cy.visit('/subjects/dt')
    cy.waitForSpinners()
    cy.waitForSpinners()
    cy.waitForSpinners()
  })



  it('shows groups to logged in user', () => {    
    cy.get('[data-test-id=subject-card-title]').should('be.visible')
  })

  it('Displays Group and Subject title', () => {    
    cy.get('[data-test-id=subject-card-title]').contains('Class 1')
    cy.get('[data-test-id=subject-card-title]').contains('DT')
  })
 

 
})

