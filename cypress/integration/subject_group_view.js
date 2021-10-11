import { hasOperationName, hasVariable, aliasQuery, aliasQueryByVariable } from '../utils/graphql-test-utils'

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
  body: { "data": { "subjects": [{ "id": "12", "name": "Computing Skills", "slug": "computing-skills" }, { "id": "10", "name": "Expressive Language", "slug": "expressive-language" }, { "id": "9", "name": "Number", "slug": "number" }, { "id": "6", "name": "Reading", "slug": "reading" }, { "id": "16", "name": "Primary Science", "slug": "primary-science" }, { "id": "14", "name": "SS&M", "slug": "ssandm" }, { "id": "15", "name": "U&A", "slug": "uanda" }, { "id": "7", "name": "Writing", "slug": "writing" }] } }
}

let getAllPupilsByGroup = {
  body: { "data": { "pupils": [{ "name": "Jenny Roebottom", "id": "154", "groups": [{ "name": "Class 2", "slug": "class-2" }, { "name": "Class 3", "slug": "class-3" }, { "name": "Class 5", "slug": "class-5" }, { "name": "Form 3", "slug": "form-3" }, { "name": "EFL", "slug": "efl" }, { "name": "FSM", "slug": "fsm" }] }, { "name": "Amy Johnson", "id": "165", "groups": [{ "name": "Class 2", "slug": "class-2" }] }, { "name": "Imogen Banana", "id": "166", "groups": [{ "name": "Class 2", "slug": "class-2" }] }, { "name": "Jamie Jones", "id": "170", "groups": [{ "name": "Class 1", "slug": "class-1" }, { "name": "Class 2", "slug": "class-2" }, { "name": "Class 3", "slug": "class-3" }] }] } }
}

let getLevelsForOverview = {
  body: { "data": { "levels": [{ "id": "751", "status": "incomplete", "module": { "level": "step", "order": 4, "capabilities": [{ "id": "1581" }, { "id": "1582" }, { "id": "1583" }, { "id": "1584" }, { "id": "1585" }, { "id": "1586" }, { "id": "1587" }, { "id": "1588" }, { "id": "1589" }, { "id": "1590" }, { "id": "1591" }, { "id": "1592" }, { "id": "1593" }, { "id": "1594" }, { "id": "1595" }] }, "competencies": [{ "status": "complete" }] }] } }
}

let getLevelsForOverviewByPupilId = {
  body: { "data": { "levels": [{ "id": "754", "status": "incomplete", "module": { "level": "step", "order": 2, "capabilities": [{ "id": "1480" }, { "id": "1481" }, { "id": "1482" }, { "id": "1483" }, { "id": "1484" }, { "id": "1485" }, { "id": "1486" }, { "id": "1487" }, { "id": "1488" }, { "id": "1489" }, { "id": "1490" }, { "id": "1491" }, { "id": "1492" }, { "id": "1493" }, { "id": "1494" }] }, "competencies": [{ "status": "complete" }, { "status": "complete" }] }] } }
}


describe('Subject by group page', () => {
  beforeEach(() => {
    cy.login(('Teacher'))
    localStorage.setItem('active-group-slug', 'class-1')
    localStorage.setItem('active-group-id', '241')
    localStorage.setItem('active-group-name', 'Class 1')

    // cy.mockGraphQL([
    //   { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
    //   { query: 'getGroups', data: getGroupsByOrgId },
    //   { query: 'getGroups', data: getGroupsByTeacherId, variable: { key: 'teacherId', value: 76 } },
    //   { query: 'getLevelsForOverview', data: getLevelsForOverviewByPupilId, variable: { key: 'pupilId', value: "154" } },
    //   { query: 'getCoreSubjects', data: getCoreSubjects },
    //   { query: 'getAllPupilsByGroup', data: getAllPupilsByGroup },
    //   { query: 'getLevelsForOverview', data: getLevelsForOverview },
    // ])

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

        aliasQueryByVariable(req, 'getGroups', 'teacherID', 76)
        if (hasOperationName(req, 'getGroups') && hasVariable(req, 'teacherID', 76)) {
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

        aliasQuery(req, 'getAllPupilsByGroup')
        if (hasOperationName(req, 'getAllPupilsByGroup')) {
          req.reply(getAllPupilsByGroup)
        }

        aliasQuery(req, 'getLevelsForOverview')
        if (hasOperationName(req, 'getLevelsForOverview')) {
          req.reply(getLevelsForOverview)
        }

      }
    )

  })



  it('Shows groups to logged in user', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQueryByVariable(req, 'getLevelsForOverview', 'pupilId', "154")
        if (hasOperationName(req, 'getLevelsForOverview') && hasVariable(req, 'pupilId', "154")) {
          req.reply(getLevelsForOverviewByPupilId)
        }
      })


    cy.visit('/subjects/dt')
    cy.waitForSpinners()
    cy.waitForSpinners()
    cy.waitForSpinners()

    cy.get('[data-test-id=subject-card-title]').should('be.visible')

    cy.get('[data-test-id=subject-card-title]').contains('Class 1')
    cy.get('[data-test-id=subject-card-title]').contains('DT')

    cy.get('[data-test-id=groups-list-pupil-154]').contains('Class 2')
    cy.get('[data-test-id=groups-list-pupil-154]').contains('Class 3')
    cy.get('[data-test-id=groups-list-pupil-154]').contains('Class 5')
    cy.get('[data-test-id=groups-list-pupil-154]').contains('EFL')
    cy.get('[data-test-id=groups-list-pupil-154]').contains('FSM')
  })



})

