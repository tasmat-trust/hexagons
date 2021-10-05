import { hasOperationName, aliasQuery, aliasQueryByVariable, hasVariable } from '../utils/graphql-test-utils';


const earlyDevelopmentFirstCompetencyText = 'sdsfdsdfsfdsfdsfd'
const existingGuidance = 'Some guidance on how to do this lesson'
const newGuidanceText = 'Some new guidance'


context('Assessment page', () => {

  beforeEach(() => {

    cy.login('Teacher');

    let getSingleSubjectBySlug = {
      body: { "data": { "subjects": [{ "id": "13", "name": "Art", "slug": "art" }] } }
    }

    let getGroup = {
      body: { "data": { "groups": [{ "name": "Class 2", "id": "244" }] } }
    }

    let getPupil = {
      body: { "data": { "pupils": [{ "name": "Jenny Roebottom", "id": "154", "groups": [{ "name": "Class 2" }, { "name": "Class 3" }, { "name": "Class 5" }, { "name": "Form 3" }, { "name": "EFL" }, { "name": "FSM" }], "organization": { "school_type": "secondary" } }] } }
    }

    let getSubjects = {
      body: { "data": { "subjects": [{ "name": "Computing Skills", "slug": "computing-skills", "isCore": true, "isChildOf": "Computing", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Music", "slug": "music", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "PSHE", "slug": "pshe", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "PE", "slug": "pe", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "RE", "slug": "re", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Early Development", "slug": "early-development", "isCore": false, "isChildOf": null, "isEarlyDevelopment": true, "isRainbowAwards": false }, { "name": "Online Safety", "slug": "online-safety", "isCore": false, "isChildOf": "Computing", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Geography", "slug": "geography", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Investigation Skills", "slug": "investigation-skills", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "DT", "slug": "dt", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Biology", "slug": "biology", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Art", "slug": "art", "isCore": null, "isChildOf": null, "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Physics", "slug": "physics", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Chemistry", "slug": "chemistry", "isCore": false, "isChildOf": "Science", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Food Technology", "slug": "food-technology", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Being a good communicator", "slug": "being-a-good-communicator", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being a good friend", "slug": "being-a-good-friend", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being healthy", "slug": "being-healthy", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being independent", "slug": "being-independent", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Being safe", "slug": "being-safe", "isCore": false, "isChildOf": null, "isEarlyDevelopment": false, "isRainbowAwards": true }, { "name": "Expressive Language", "slug": "expressive-language", "isCore": true, "isChildOf": "Communication", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Number", "slug": "number", "isCore": true, "isChildOf": "Maths", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Reading", "slug": "reading", "isCore": true, "isChildOf": "English", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Receptive Language", "slug": "receptive-language", "isCore": false, "isChildOf": "Communication", "isEarlyDevelopment": false, "isRainbowAwards": false }, { "name": "Primary Science", "slug": "primary-science", "isCore": true, "isChildOf": "Science", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "SS&M", "slug": "ssandm", "isCore": true, "isChildOf": "Maths", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "U&A", "slug": "uanda", "isCore": true, "isChildOf": "Maths", "isEarlyDevelopment": null, "isRainbowAwards": null }, { "name": "Writing", "slug": "writing", "isCore": true, "isChildOf": "English", "isEarlyDevelopment": null, "isRainbowAwards": null }] } }
    }

    let getAllPupilsByGroup = {
      body: { "data": { "pupils": [{ "name": "Jenny Roebottom", "id": "154", "groups": [{ "name": "Class 2", "slug": "class-2" }, { "name": "Class 3", "slug": "class-3" }, { "name": "Class 5", "slug": "class-5" }, { "name": "Form 3", "slug": "form-3" }, { "name": "EFL", "slug": "efl" }, { "name": "FSM", "slug": "fsm" }] }, { "name": "Amy Johnson", "id": "165", "groups": [{ "name": "Class 2", "slug": "class-2" }] }, { "name": "Imogen Banana", "id": "166", "groups": [{ "name": "Class 2", "slug": "class-2" }] }, { "name": "Jamie Jones", "id": "170", "groups": [{ "name": "Class 1", "slug": "class-1" }, { "name": "Class 2", "slug": "class-2" }, { "name": "Class 3", "slug": "class-3" }] }] } }
    };

    let getAllLevels = {
      body: { "data": { "levels": [] } }
    }

    let getModules = {
      body: { "data": { "modules": [{ "order": 2, "id": "123", "level": "step", "summary": "sdf", "guidance": null, "capabilities": [{ "text": "sfdsdf", "id": "1617", "guidance": [] }, { "text": "sfdsdf", "id": "1618", "guidance": [] }, { "text": "sdfsfd", "id": "1619", "guidance": [] }] }] } }
    }


    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:1337/graphql',
      },
      (req) => {

        aliasQuery(req, 'getSingleSubjectBySlug');
        aliasQuery(req, 'getGroup');
        aliasQuery(req, 'getPupil');
        aliasQuery(req, 'getSubjects');
        aliasQuery(req, 'getAllPupilsByGroup');
        aliasQuery(req, 'getAllLevels');
        aliasQuery(req, 'getModules');

        if (hasOperationName(req, 'getSingleSubjectBySlug')) {
          req.reply(getSingleSubjectBySlug);
          return;
        }

        if (hasOperationName(req, 'getGroup')) {
          req.reply(getGroup);
          return;
        }

        if (hasOperationName(req, 'getPupil')) {
          req.reply(getPupil);
          return;
        }

        if (hasOperationName(req, 'getSubjects')) {
          req.reply(getSubjects);
          return;
        }

        if (hasOperationName(req, 'getAllPupilsByGroup')) {
          req.reply(getAllPupilsByGroup);
          return;
        }

        if (hasOperationName(req, 'getAllLevels')) {
          req.reply(getAllLevels);
          return;
        }

        if (hasOperationName(req, 'getModules')) {
          req.reply(getModules);
          return;
        }

      }
    );

  });

  describe('With Early Development', () => {

    beforeEach(() => {
      let getSingleSubjectBySlugEd = {
        body: { "data": { "subjects": [{ "id": "21", "name": "Early Development", "slug": "early-development" }] } }

      }



      let getEdModules = {
        body: { "data": { "modules": [{ "order": 1, "id": "121", "level": "step", "summary": "Early development", "guidance": null, "capabilities": [{ "text": earlyDevelopmentFirstCompetencyText, "id": "1610", "guidance": [] }, { "text": "fdgegherth", "id": "1611", "guidance": [] }, { "text": "rthrth", "id": "1612", "guidance": [{ "text": existingGuidance }] }] }] } }
      }

      let getLevel = {
        body: { "data": { "levels": [{ "id": "750", "status": "incomplete", "competencies": [{ "id": "1475", "status": "complete", "capability_fk": 1610 }, { "id": "1476", "status": "target", "capability_fk": 1611 }, { "id": "1477", "status": "target", "capability_fk": 1612 }] }] } }
      }

      let getCompetencies = {
        body: { "data": { "competencies": [{ "id": "1475", "status": "complete", "capability_fk": 1610 }, { "id": "1476", "status": "target", "capability_fk": 1611 }, { "id": "1477", "status": "target", "capability_fk": 1612 }] } }
      }

      cy.intercept(
        {
          method: 'POST',
          url: 'http://localhost:1337/graphql',
        },
        (req) => {

          aliasQuery(req, 'getSingleSubjectBySlug');
          aliasQuery(req, 'getEdModules');
          aliasQuery(req, 'getLevel');
          aliasQuery(req, 'getCompetencies');

          if (hasOperationName(req, 'getSingleSubjectBySlug') && hasVariable(req, 'slug', 'early-development')) {
            req.reply(getSingleSubjectBySlugEd);
            return;
          }

          if (hasOperationName(req, 'getEdModules')) {
            req.reply(getEdModules);
            return;
          }

          if (hasOperationName(req, 'getLevel')) {
            req.reply(getLevel);
            return;
          }
          if (hasOperationName(req, 'getCompetencies')) {
            req.reply(getCompetencies);
            return;
          }
        })

    });

    describe('Subject route', () => {
      beforeEach(() => {
        cy.visit('/subjects/art/class-2/154');
        cy.waitForSpinners()
        cy.waitForSpinners()
        cy.waitForSpinners()

      })
      it('Shows page with correct breadcrumbs', () => {
        cy.get('[data-test-id=first-crumb]').contains('Subjects')
        cy.get('[data-test-id=third-crumb]').contains('Class 2')
      });

      it('Lets user choose a different subject from the breadcrumbs', () => {
        cy.get('[data-test-id=select-subject] select').select('Number').should('have.value', 'number');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/subjects/number/class-2/154')
        })
      });

      it('Lets user choose a different pupil from the breadcrumbs', () => {
        cy.get('[data-test-id=select-pupil] select').select('Amy Johnson').should('have.value', '165');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/subjects/art/class-2/165')
        })
      });

      it('Displays Early Development as Step 1', () => {
        cy.get('[data-test-id=hex-1]').contains(earlyDevelopmentFirstCompetencyText)
      });
    })

    describe('Pupil route', () => {
      beforeEach(() => {
        cy.visit('/pupils/class-2/art/154');
        cy.waitForSpinners()
        cy.waitForSpinners()
        cy.waitForSpinners()
      })
      it('Shows page with correct breadcrumbs', () => {
        cy.get('[data-test-id=first-crumb]').contains('Pupils')
        cy.get('[data-test-id=second-crumb]').contains('Class 2')
      });

      it('Lets user choose a different subject from the breadcrumbs', () => {
        cy.get('[data-test-id=select-subject] select').select('Number').should('have.value', 'number');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/pupils/class-2/154/number')
        })
      });

      it('Lets user choose a different pupil from the breadcrumbs', () => {
        cy.get('[data-test-id=select-pupil] select').select('Amy Johnson').should('have.value', '165');
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/pupils/class-2/165/art')
        })
      });
    })

    describe('Add Guidance', () => {
      beforeEach(() => {

        let createGuidance = {
          body: { "data": { "createGuidance": { "guidance": { "text": newGuidanceText, "id": "92" } } } }
        }

        cy.intercept(
          {
            method: 'POST',
            url: 'http://localhost:1337/graphql',
          },
          (req) => {

            aliasQuery(req, 'createGuidance');

            if (hasOperationName(req, 'createGuidance')) {
              req.reply(createGuidance);
              return;
            }
          })

        cy.visit('/subjects/art/class-2/154');
        cy.get('[data-test-id=hex-3]').should('exist')
      })
      it('Lets user put page into guidance mode', () => {
        cy.get('[data-test-id=view-guidance-button]').contains('Add / View Guidance')
        cy.startGuidanceMode()
        cy.get('[data-test-id=view-guidance-button]').contains('Go back to assessment')
      })
      it('Shows a popup with existing guidance and a form to add new', () => {
        cy.startGuidanceMode()
        cy.get('[data-test-id=hex-3]').click()
        cy.get('[data-test-id=existing-guidance-panel').contains(existingGuidance)
        cy.get('[data-test-id=add-new-guidance-tab]').click()
        cy.get('[data-test-id=add-new-guidance').contains('Add new guidance')
      })
      it("Lets teachers add guidance when there is already guidance present", () => {
        cy.get('[data-test-id=guidance-lightbulb-hex-3').should('exist')
        cy.startGuidanceMode()
        cy.get('[data-test-id=hex-3]').should('exist')
        cy.get('[data-test-id=hex-3]').click()
        cy.get('[data-test-id=add-new-guidance-tab]').click()
        cy.waitForSpinners()
        cy.get('[data-test-id=text-field]').clear()
        cy.get('[data-test-id=text-field]').type(newGuidanceText)

        cy.assertGuidanceFormSubmitSuccess()

        cy.get('[data-test-id=view-guidance-tab]').click()
        cy.get('[data-test-id=guidance-1]').should('exist')
        cy.get('[data-test-id=guidance-1]').contains(newGuidanceText)
      })

      it("Lets teachers add guidance when no existing guidance", () => {
        cy.get('[data-test-id=guidance-lightbulb-hex-2').should('not.exist')
        cy.startGuidanceMode()
        cy.get('[data-test-id=hex-2]').click()
        cy.waitForSpinners()
        cy.get('[data-test-id=text-field]').clear()
        cy.get('[data-test-id=text-field]').type(newGuidanceText)

        cy.assertGuidanceFormSubmitSuccess()

        cy.get('[data-test-id=view-guidance-tab]').click()
        cy.get('[data-test-id=guidance-0]').should('exist')
        cy.get('[data-test-id=guidance-0]').contains(newGuidanceText)

        cy.get('[data-test-id=close-guidance-popup]').click()
        cy.get('[data-test-id=guidance-lightbulb-hex-2').should('exist')
      })
    })
  })
});