import { hasOperationName, aliasQuery, aliasQueryByVariable, hasVariable } from '../utils/graphql-test-utils';


const earlyDevelopmentFirstCompetencyText = 'sdsfdsdfsfdsfdsfd'



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

      }
    );


  });

  describe('assessment functionality', () => {

    beforeEach(() => {
      let getSingleSubjectBySlugEd = {
        body: { "data": { "subjects": [{ "id": "21", "name": "Early Development", "slug": "early-development" }] } }

      }

      let getModules = {
        body: { "data": { "modules": [{ "order": 2, "id": "123", "level": "step", "summary": "sdf", "guidance": null, "capabilities": [{ "text": "sdfsdf", "id": "1617", "guidance": [] }, { "text": "sfdsdf", "id": "1618", "guidance": [] }, { "text": "sdfsfd", "id": "1619", "guidance": [] }] }] } }
      }

      let getEdModules = {
        body: { "data": { "modules": [{ "order": 1, "id": "121", "level": "step", "summary": "Early development", "guidance": null, "capabilities": [{ "text": earlyDevelopmentFirstCompetencyText, "id": "1610", "guidance": [] }, { "text": "fdgegherth", "id": "1611", "guidance": [] }, { "text": "rthrth", "id": "1612", "guidance": [] }] }] } }
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

          aliasQueryByVariable(req, 'getSingleSubjectBySlug', 'slug', 'early-development');
          aliasQuery(req, 'getModules');
          aliasQuery(req, 'getEdModules');
          aliasQuery(req, 'getLevel');
          aliasQuery(req, 'getCompetencies');

          if (hasOperationName(req, 'getSingleSubjectBySlug') && hasVariable(req, 'slug', 'early-development')) {
            req.reply(getSingleSubjectBySlugEd);
            return;
          }

          if (hasOperationName(req, 'getModules')) {
            req.reply(getModules);
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
      cy.visit('/subjects/art/class-2/154');
      cy.waitForSpinners()
      cy.waitForSpinners()
      cy.waitForSpinners()
    });


    it('Shows page with correct breadcrumbs', () => {
      cy.get('[data-test-id=first-crumb]').contains('Subjects')
      cy.get('[data-test-id=third-crumb]').contains('Class 2')
    });

    it('Lets user choose a different subject from the breadcrumbs', () => {
      cy.get('[data-test-id=select-subject] select').select('number');
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/subjects/number/class-2/154')
      })
    });

    it('Lets user choose a different pupil from the breadcrumbs', () => {
      cy.get('[data-test-id=select-pupil] select').select('165');
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/subjects/art/class-2/165')
      })
    });

    it('Displays Early Development as Step 1', () => {
      cy.get('[data-test-id=hex-1]').contains(earlyDevelopmentFirstCompetencyText)
    });



  });
});