import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

let getSubjects = {
  body: { "data": { "subjects": [{ "name": "Computing Skills", "slug": "computing-skills", "isCore": true, "isChildOf": "Computing", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Music", "slug": "music", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "PSHE", "slug": "pshe", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "PE", "slug": "pe", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "RE", "slug": "re", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Early Development", "slug": "early-development", "isCore": false, "isChildOf": null, "isEarlyDevelopment": true, "isRainbowAwards": false }, { "name": "Online Safety", "slug": "online-safety", "isCore": false, "isChildOf": "Computing", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Geography", "slug": "geography", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Investigation Skills", "slug": "investigation-skills", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "DT", "slug": "dt", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Biology", "slug": "biology", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Art", "slug": "art", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Physics", "slug": "physics", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Chemistry", "slug": "chemistry", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Food Technology", "slug": "food-technology", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Being a good communicator", "slug": "being-a-good-communicator", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being a good friend", "slug": "being-a-good-friend", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being healthy", "slug": "being-healthy", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being independent", "slug": "being-independent", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being safe", "slug": "being-safe", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Expressive Language", "slug": "expressive-language", "isCore": true, "isChildOf": "Communication", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Number", "slug": "number", "isCore": true, "isChildOf": "Maths", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Reading", "slug": "reading", "isCore": true, "isChildOf": "English", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Receptive Language", "slug": "receptive-language", "isCore": false, "isChildOf": "Communication", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Primary Science", "slug": "primary-science", "isCore": true, "isChildOf": "Science", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "SS&M", "slug": "ssandm", "isCore": true, "isChildOf": "Maths", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "U&A", "slug": "uanda", "isCore": true, "isChildOf": "Maths", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Writing", "slug": "writing", "isCore": true, "isChildOf": "English", "isEarlyDevelopment": null, "isRainbowAwards": null }] } }
}

let getRainbowAwardsSubjects = {
  body: { "data": { "subjects": [{ "name": "Being a good communicator", "slug": "being-a-good-communicator" }, { "name": "Being a good friend", "slug": "being-a-good-friend" }, { "name": "Being healthy", "slug": "being-healthy" }, { "name": "Being independent", "slug": "being-independent" }, { "name": "Being safe", "slug": "being-safe" }] } }
}

describe('Subjects main page ', () => {
  beforeEach(() => {
    cy.login(('Teacher'))

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        // Get requests
        aliasQuery(req, 'getSubjects')
        if (hasOperationName(req, 'getSubjects')) {
          req.reply(getSubjects)
        }
      }
    )
    cy.visit('/subjects')
    cy.waitForSpinners()
  })

  it('Shows subjects breadcrumb', () => {
    cy.get('[data-test-id=first-crumb]').contains('Subjects')
  })

  it('Nests Language subjects under Communication', () => {
    cy.get('[data-test-id=parent-subject-button-communication]').click()
    cy.get('[data-test-id=subject-button-expressive-language]').should('be.visible')
  })

  it('Nests English subjects under English', () => {
    cy.get('[data-test-id=parent-subject-button-english]').click()
    cy.get('[data-test-id=subject-button-reading]').should('be.visible')
    cy.get('[data-test-id=subject-button-writing]').should('be.visible')
  })

  it('Lets user visit non-nested subject by clicking button', () => {
    cy.get('[data-test-id=subject-button-art]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/subjects/art')
    })
  })

  it('Lets user visit nested subject by clicking Hexagon and then button', () => {
    cy.get('[data-test-id=parent-subject-button-computing]').click()
    cy.get('[data-test-id=subject-button-computing-skills]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/subjects/computing-skills')
    })
  })
})

describe('Rainbow Awards main page ', () => {
  beforeEach(() => {
    cy.login(('Teacher'))

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        // Get requests
        aliasQuery(req, 'getRainbowAwardsSubjects')
        if (hasOperationName(req, 'getRainbowAwardsSubjects')) {
          req.reply(getRainbowAwardsSubjects)
        }
      }
    )
    cy.visit('/rainbow-awards')
    cy.waitForSpinners()
  })

  it('Shows Rainbow Awards breadcrumb', () => {
    cy.get('[data-test-id=first-crumb]').contains('Rainbow Awards')
  })

  it('Lets user visit Rainbow Award category by clicking Hexagon', () => {
    cy.get('[data-test-id=subject-button-being-a-good-communicator]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/rainbow-awards/being-a-good-communicator')
    })
  })


})