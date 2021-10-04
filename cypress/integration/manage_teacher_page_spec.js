import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

describe('Manage Pupils page', () => {
  beforeEach(() => {
    cy.login(('Leader'))

    let getTeachers = {
      body: { "data": { "users": [{ "username": "Jo Malone", "email": "aliblackwell+joe@protonmail.com", "id": "73", "organization": { "name": "Torfield School" }, "role": { "name": "Teacher" }, "groups": [{ "name": "Class 2", "id": "244" }] }, { "username": "Parrot Browning", "email": "aliblackwell+parrot@protonmail.com", "id": "74", "organization": { "name": "Torfield School" }, "role": { "name": "Teacher" }, "groups": [{ "name": "Class 1", "id": "241" }] }, { "username": "Barry Bindle", "email": "aliblackwell+barry@protonmail.com", "id": "75", "organization": { "name": "Torfield School" }, "role": { "name": "Teacher" }, "groups": [{ "name": "Class 2", "id": "244" }, { "name": "Form 4", "id": "251" }] }, { "username": "Teacher Jones", "email": "aliblackwell+teacherjones@protonmail.com", "id": "76", "organization": { "name": "Torfield School" }, "role": { "name": "Teacher" }, "groups": [{ "name": "Class 1", "id": "241" }] }] } }
    }

    let getGroups = {
      body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "Class 4", "slug": "class-4", "id": "248" }, { "name": "Class 5", "slug": "class-5", "id": "249" }, { "name": "Form 1", "slug": "form-1", "id": "250" }, { "name": "Form 4", "slug": "form-4", "id": "251" }, { "name": "Form 3", "slug": "form-3", "id": "252" }, { "name": "Form 2", "slug": "form-2", "id": "253" }, { "name": "EFL", "slug": "efl", "id": "254" }, { "name": "FSM", "slug": "fsm", "id": "255" }, { "name": "Form 5", "slug": "form-5", "id": "256" }, { "name": "Form 6", "slug": "form-6", "id": "257" }, { "name": "Form 7", "slug": "form-7", "id": "258" }, { "name": "Form 8", "slug": "form-8", "id": "259" }, { "name": "Form 9", "slug": "form-9", "id": "260" }, { "name": "Class 6", "slug": "class-6", "id": "261" }, { "name": "New group", "slug": "new-group", "id": "262" }, { "name": "New group", "slug": "new-group", "id": "263" }] } }

    }
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        // Get requests
        aliasQuery(req, 'getTeachers')
        aliasQuery(req, 'getGroups')
        if (hasOperationName(req, 'getTeachers')) {
          req.reply(getTeachers)
        }
        if (hasOperationName(req, 'getGroups')) {
          req.reply(getGroups)
        }

        // Post requests
        aliasQuery(req, 'createNewGroup')

      }
    )
    cy.visit('/manage/teachers')
  })

  it('Lets Teacher create new groups', () => {
    cy.createGroup()
  })

  it('shows manage teacher interface to Leaders', () => {
    cy.assertManageTeacherPageVisible()
  })

})

