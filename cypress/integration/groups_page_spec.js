let getTeacherGroups = {
  body: { "data": { "groups": [{ "name": "EFL", "slug": "efl", "id": "254" }] } }
}
let getTeacherGroupsNone = {
  body: { "data": { "groups": [] } }
}
let getSingleGroup = {
  body: { "data": { "groups": [{ "name": "Class 1", "id": "241" }] } }
}
let getGroups = {
  body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "EFL", "slug": "efl", "id": "254" }] } }
}
let getSingleSubjectBySlug = {
  body: { "data": { "subjects": [{ "id": "29", "name": "Number", "slug": "number" }] } }
}

let getCoreSubjects = {
  body: { "data": { "subjects": [{ "id": "12", "name": "Computing Skills", "slug": "computing-skills" }, { "id": "10", "name": "Expressive Language", "slug": "expressive-language" }, { "id": "9", "name": "Number", "slug": "number" }, { "id": "6", "name": "Reading", "slug": "reading" }, { "id": "16", "name": "Primary Science", "slug": "primary-science" }, { "id": "14", "name": "SS&M", "slug": "ssandm" }, { "id": "15", "name": "U&A", "slug": "uanda" }, { "id": "7", "name": "Writing", "slug": "writing" }] } }
}

let getAllPupilsByGroup = {
  body: { "data": { "pupils": [{ "name": "Jenny Roebottom", "id": "154", "groups": [{ "name": "Class 2", "slug": "class-2" }, { "name": "Class 3", "slug": "class-3" }, { "name": "Class 5", "slug": "class-5" }, { "name": "Form 3", "slug": "form-3" }, { "name": "EFL", "slug": "efl" }, { "name": "FSM", "slug": "fsm" }] }, { "name": "Amy Johnson", "id": "165", "groups": [{ "name": "Class 2", "slug": "class-2" }] }, { "name": "Imogen Banana", "id": "166", "groups": [{ "name": "Class 2", "slug": "class-2" }] }, { "name": "Jamie Jones", "id": "170", "groups": [{ "name": "Class 1", "slug": "class-1" }, { "name": "Class 2", "slug": "class-2" }, { "name": "Class 3", "slug": "class-3" }] }] } }
}

let getLevelsForOverview = {
  body: { "data": { "levels": [{ "id": "751", "status": "incomplete", "module": { "level": "step", "order": 4, "capabilities": [{ "id": "1581" }, { "id": "1582" }, { "id": "1583" }, { "id": "1584" }, { "id": "1585" }, { "id": "1586" }, { "id": "1587" }, { "id": "1588" }, { "id": "1589" }, { "id": "1590" }, { "id": "1591" }, { "id": "1592" }, { "id": "1593" }, { "id": "1594" }, { "id": "1595" }] }, "competencies": [{ "status": "complete" }] }] } }
}

describe('Displaying groups and pupils throughout app', () => {

  beforeEach(() => {

    cy.login('Teacher');
    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getGroups', data: getGroups },
      { query: 'getCoreSubjects', data: getCoreSubjects },
      { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
      { query: 'getLevelsForOverview', data: getLevelsForOverview }
    ])
  })

  describe('With assigned groups', () => {
    beforeEach(() => {

      cy.mockGraphQL([
        { query: 'getGroups', data: getTeacherGroups, variable: { key: 'teacherId', value: 76 } },
      ])

    })

    it('Pupils view: Displays a notice to choose pupils when no active group is present', () => {
      cy.visit('/pupils')
      cy.get('[data-test-id=please-choose-group]').should('exist')
    })
  })

  describe('Without assigned groups', () => {
    beforeEach(() => {
      cy.mockGraphQL([
        { query: 'getGroups', data: getTeacherGroupsNone, variable: { key: 'teacherId', value: 76 } },
      ])
    })

    it('Pupils view: Displays a notice to choose pupils when no active group is present', () => {
      cy.visit('/pupils')
      cy.get('[data-test-id=please-choose-group]').should('exist')
    })

    it('Subjects view: Displays a notice to choose pupils when no active group is present', () => {
      cy.visit('/subjects/number')
      cy.get('[data-test-id=please-choose-group]').should('exist')
    })

    it('Rainbow Awards view: Displays a notice to choose pupils when no active group is present', () => {
      cy.visit('/rainbow-awards/being-a-good-friend')
      cy.get('[data-test-id=please-choose-group]').should('exist')
    })

    it('Lets user choose a group and sets it to localStorage', () => {
      cy.visit('/pupils')
      cy.get('[data-test-id=class-1-link').click()
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/pupils/class-1')
        expect(localStorage.getItem('active-group-slug')).to.eq('class-1')
        expect(localStorage.getItem('active-group-id')).to.eq('241')
        expect(localStorage.getItem('active-group-name')).to.eq('Class 1')
      })
    })

    it('Displays subject overview card', () => {
      cy.visit('/subjects/number/class-2') 
      cy.assertSubjectCardIsVisible()
    })

    it('Displays subject overview card and correct breadcrumb on page without group slug', () => {
      cy.visit('/pupils')
      cy.navigateToPupilsClass1() // Sets group in localStorage
      cy.visit('/subjects/number')
      cy.assertSubjectCardIsVisible()
      cy.get('[data-test-id=third-crumb]').contains('Class 1')
    })
  })
})
