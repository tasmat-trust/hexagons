import getGroups from '../fixtures/getGroups.json';
import getCoreSubjects from '../fixtures/getCoreSubjects.json';
import getAllPupilsByGroup from '../fixtures/getAllPupilsByGroup.json';
import getLevelsForOverview from '../fixtures/getLevelsForOverview.json';
import getSingleGroup from '../fixtures/getSingleGroup.json';
import getGroupsEmpty from '../fixtures/getGroupsEmpty.json';

context('Groups pages', () => {
  beforeEach(() => {
    cy.login('Teacher');
    let getSingleSubjectBySlug = {
      body: { data: { subjects: [{ id: '29', name: 'Number', slug: 'number' }] } },
    };
    cy.mockGraphQL([
      { query: 'getSingleSubjectBySlug', data: getSingleSubjectBySlug },
      { query: 'getSingleGroup', data: getSingleGroup },
      { query: 'getGroups', data: getGroups },
      { query: 'getCoreSubjects', data: getCoreSubjects },
      { query: 'getLevelsForOverview', data: getLevelsForOverview },
    ]);
  });

  describe('Displaying groups and pupils throughout app', () => {
    beforeEach(() => {
      cy.mockGraphQL([{ query: 'getAllPupilsByGroup', data: getAllPupilsByGroup }]);
    });

    describe('With assigned groups', () => {
      beforeEach(() => {
        let getTeacherGroups = {
          body: { data: { groups: [{ name: 'EFL', slug: 'efl', id: '254' }] } },
        };
        cy.mockGraphQL([
          { query: 'getGroups', data: getTeacherGroups, variable: { key: 'teacherId', value: 76 } },
        ]);
      });

      it('Pupils view: Displays a notice to choose pupils when no active group is present', () => {
        cy.visit('/pupils');
        cy.get('[data-test-id=please-choose-group]').should('exist');
      });
    });

    describe('Without assigned groups', () => {
      beforeEach(() => {
        cy.mockGraphQL([
          {
            query: 'getGroups',
            data: getGroupsEmpty,
            variable: { key: 'teacherId', value: 76 },
          },
        ]);
      });

      it('Pupils view: Displays a notice to choose pupils when no active group is present', () => {
        cy.visit('/pupils');
        cy.get('[data-test-id=please-choose-group]').should('exist');
      });

      it('Subjects view: Displays a notice to choose pupils when no active group is present', () => {
        cy.visit('/subjects/number');
        cy.get('[data-test-id=please-choose-group]').should('exist');
      });

      it('Rainbow Awards view: Displays a notice to choose pupils when no active group is present', () => {
        cy.visit('/rainbow-awards/being-a-good-friend');
        cy.get('[data-test-id=please-choose-group]').should('exist');
      });

      it('Lets user choose a group and sets it to localStorage', () => {
        cy.visit('/pupils');
        cy.get('[data-test-id=class-1-link]').click();
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/pupils/class-1');
          expect(localStorage.getItem('active-group-slug')).to.eq('class-1');
          expect(localStorage.getItem('active-group-id')).to.eq('241');
          expect(localStorage.getItem('active-group-name')).to.eq('Class 1');
        });
      });

      it('Displays subject overview card', () => {
        cy.visit('/subjects/number/class-1');
        cy.assertSubjectCardIsVisible();
      });

      it('Displays subject overview card and correct breadcrumb on page without group slug', () => {
        cy.visit('/pupils');
        cy.navigateToPupilsClass1(); // Sets group in localStorage
        cy.visit('/subjects/number');
        cy.assertSubjectCardIsVisible();
        cy.get('[data-test-id=third-crumb]').contains('Class 1');
      });
    });
  });

  describe('localStorage thorough testing', () => {
    beforeEach(() => {
      cy.login('Teacher');
      let getAllPupilsByGroupClass1 = {
        body: {
          data: {
            pupils: [
              {
                name: 'Jamie Jones',
                id: '170',
                groups: [
                  { name: 'Class 1', slug: 'class-1' },
                  { name: 'Class 2', slug: 'class-2' },
                  { name: 'Class 3', slug: 'class-3' },
                ],
              },
            ],
          },
        },
      };
      cy.mockGraphQL([{ query: 'getAllPupilsByGroup', data: getAllPupilsByGroupClass1 }]);
    });

    it('Displays group from localStorage', () => {
      window.localStorage.setItem('active-group-slug', 'class-1');
      window.localStorage.setItem('active-group-id', '241');
      window.localStorage.setItem('active-group-name', 'Class 1');
      window.localStorage.setItem('active-group-org-id', 1);
      cy.visit('/pupils');
      cy.get('[data-test-id=second-crumb]').contains('Class 1');
      cy.get('[data-test-id="groups-list-pupil-170"]').should('exist');
    });

    it("Doesn't display group if orgId is different to current user", () => {
      window.localStorage.setItem('active-group-slug', 'class-1');
      window.localStorage.setItem('active-group-id', '241');
      window.localStorage.setItem('active-group-name', 'Class 1');
      window.localStorage.setItem('active-group-org-id', '2');
      cy.visit('/pupils');
      cy.get('[data-test-id=second-crumb]').should('not.exist');
      cy.get('[data-test-id="groups-list-pupil-170"]').should('not.exist');
      cy.get('[data-test-id="please-choose-group"]').should('exist');
    });
  });
});
