describe('Displaying groups and pupils throughout app', () => {

  beforeEach(() => {
    cy.login('Teacher');
    let getTeacherGroups = {
      body: { "data": { "groups": [{ "name": "EFL", "slug": "efl", "id": "254" }] } }
    }
    let getGroups = {
      body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "EFL", "slug": "efl", "id": "254" }] } }
    }
    let getSingleSubjectBySlug = {
      body: { "data": { "subjects": [{ "id": "29", "name": "Being a good friend", "slug": "being-a-good-friend" }] } }
    }
    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getGroups', data: getTeacherGroups, variable: { key: 'teacherId', value: 76 } },
      { query: 'getGroups', data: getGroups }
    ])
  })

  it('Pupils view: Displays a notice to choose pupils when no active group is present', () => {
    cy.visit('/pupils')
    cy.get('[data-test-id=please-choose-group]').should('exist')
  })

 

})
