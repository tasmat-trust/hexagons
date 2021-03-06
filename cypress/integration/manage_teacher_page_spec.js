describe('Manage Pupils page', () => {
  beforeEach(() => {
    cy.login(('Leader'))

    let getAllTeachers = {
      body: { "data": { "users": [{ "username": "natalie", "email": "fakeemail@tasmat.org.uk", "id": "3", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 2", "id": "244" }] }, { "username": "Alasdair Blackwell", "email": "aliblackwell@fakeemail.com", "id": "61", "organization": { "name": "Torfield School" }, "role": { "name": "Teacher" }, "groups": [{ "name": "Class 1", "id": "241" }] }] } }
    }

    let getGroups = {
      body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "Class 4", "slug": "class-4", "id": "248" }, { "name": "Class 5", "slug": "class-5", "id": "249" }, { "name": "EFL", "slug": "efl", "id": "254" }, { "name": "Form 6", "slug": "form-6", "id": "257" }, { "name": "Form 7", "slug": "form-7", "id": "258" }, { "name": "Form 8", "slug": "form-8", "id": "259" }, { "name": "Form 9", "slug": "form-9", "id": "260" }, { "name": "Class 6", "slug": "class-6", "id": "261" }] } }
    }

    cy.mockGraphQL([{ query: 'getAllTeachers', data: getAllTeachers }, { query: 'getGroups', data: getGroups }])

    cy.visit('/manage/teachers')
    cy.waitForSpinners()
    cy.waitForSpinners()
  })

  it('Lets leader assign role to teachers', () => {
    let updateUser = {
      body: { "data": { "updateUser": { "user": { "username": "Alasdair Blackwell", "role": { "id": "3" } } } } }
    }
    let getAllTeachers = {
      body: { "data": { "users": [{ "username": "natalie", "email": "nshuttleworth@tasmat.org.uk", "id": "3", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 2", "id": "244" }] }, { "username": "Alasdair Blackwell", "email": "aliblackwell@protonmail.com", "id": "61", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }] }] } }
    }
    cy.mockGraphQL([{ query: 'updateUser', data: updateUser }, { query: 'getAllTeachers', data: getAllTeachers }])
    cy.get('[data-id=61]').contains('Teacher')
    cy.get('[data-id=61]').click({ force: true });
    cy.get('[data-test-id="assign-roles"]').click();
    cy.get('#demo-single-chip').click();
    cy.get('[data-value="3"]').click()
    cy.get('[data-test-id=assign-to-role]').click()
    cy.get('[data-id=61]').contains('Leader')
  })

  it('Lets leader create new groups', () => {

    const newGroupName = 'New Group Name'

    let createGroup = {
      body: { "data": { "createGroup": { "group": { "name": "sdfsdf", "organization": { "name": "Torfield School" } } } } }

    }
    let getGroups = {
      body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "Class 4", "slug": "class-4", "id": "248" }, { "name": "Class 5", "slug": "class-5", "id": "249" }, { "name": "EFL", "slug": "efl", "id": "254" }, { "name": "Form 6", "slug": "form-6", "id": "257" }, { "name": "Form 7", "slug": "form-7", "id": "258" }, { "name": "Form 8", "slug": "form-8", "id": "259" }, { "name": "Form 9", "slug": "form-9", "id": "260" }, { "name": "Class 6", "slug": "class-6", "id": "261" }, { "name": newGroupName, "slug": "new-group-name", "id": "999" }] } }
    }

    cy.mockGraphQL([{ query: 'createGroup', data: createGroup }, { query: 'getGroups', data: getGroups }])


    cy.get('[data-test-id=new-group]').click()
    cy.get('#name').clear()
    cy.get('#name').type(newGroupName)
    cy.get('[data-test-id=add-new-group]').click()
    cy.get('[data-test-id=success]').should('exist')
    cy.get('[data-test-id=close-group-popup]').click()
    cy.wait('@gqlgetGroupsQuery').its('request.url').should('include', '/graphql')
    cy.get('[data-test-id=group-list]').contains(newGroupName)

  })

  it('Rejects group names that are too long', () => {
    cy.createGroupAssertError('Group name that is much much much much much too long')
  })

  it('Rejects group names with special characters', () => {
    cy.createGroupAssertError('Group name $!')
  })

  it('Lets leader assign groups to teachers by overwriting existing groups', () => {
    let updateUser = {
      body: { "data": { "updateUser": { "user": { "username": "Alasdair Blackwell", "groups": [{ "name": "Class 2", "id": "244" }] } } } }
    }
    let getAllTeachers = {
      body: { "data": { "users": [{ "username": "natalie", "email": "nshuttleworth@tasmat.org.uk", "id": "3", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }, { "name": "Class 2", "id": "244" }, { "name": "EFL", "id": "254" }] }, { "username": "Alasdair Blackwell", "email": "aliblackwell@protonmail.com", "id": "61", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }, { "name": "Class 2", "id": "244" }] }] } }

    }
    cy.mockGraphQL([{ query: 'updateUser', data: updateUser }, { query: 'getAllTeachers', data: getAllTeachers }])
    cy.get('[data-id=61]').contains('Class 1')
    cy.get('[data-id=61]').click({ force: true });
    cy.get('[data-test-id="assign-groups"]').click();
    cy.get('[data-test-id="multi-select"]').click();
    cy.get('[data-value="244"]').click().type('{esc}');
    cy.get('[data-test-id=overwrite-groups]').click()
    cy.get('[data-test-id=assign-to-group]').click()
    cy.get('[data-test-id=success]').should('exist')
    cy.get('[data-test-id=close-group-popup]').click()
    cy.get('[data-id=61]').contains('Class 2')
  })

  it('Lets leader assign groups to teachers by adding to existing groups', () => {
    let updateUser = {
      body: { "data": { "updateUser": { "user": { "username": "Alasdair Blackwell", "groups": [{ "name": "Class 2", "id": "244" }] } } } }
    }
    let getAllTeachers = {
      body: { "data": { "users": [{ "username": "natalie", "email": "nshuttleworth@tasmat.org.uk", "id": "3", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }, { "name": "Class 2", "id": "244" }, { "name": "EFL", "id": "254" }] }, { "username": "Alasdair Blackwell", "email": "aliblackwell@protonmail.com", "id": "61", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }, { "name": "Class 2", "id": "244" }] }] } }

    }
    cy.mockGraphQL([{ query: 'updateUser', data: updateUser }, { query: 'getAllTeachers', data: getAllTeachers }])
    cy.get('[data-id=61]').contains('Class 1')
    cy.get('[data-id=61]').click({ force: true });
    cy.get('[data-test-id="assign-groups"]').click();
    cy.get('[data-test-id="multi-select"]').click();
    cy.get('[data-value="244"]').click().type('{esc}');
    cy.get('[data-test-id=assign-to-group]').click()
    cy.get('[data-test-id=success]').should('exist')
    cy.get('[data-test-id=close-group-popup]').click()
    cy.get('[data-id=61]').contains('Class 1')
    cy.get('[data-id=61]').contains('Class 2')
  })

  describe('Create new teacher form', () => {

    const newTeacherEmail = 'newteacher@tasmat.org.uk'
    const newTeacherName = 'Emma Stoker'

    beforeEach(() => {
      let getAllOrgs = {
        body: { "data": { "organizations": [{ "name": "Saxon Mount School", "id": "2", "email_domains": "tasmat.org.uk, aliblackwell" }, { "name": "Torfield School", "id": "1", "email_domains": "tasmat.org.uk, stm.org.uk" }] } }
      }
      let getGroups = {
        body: { "data": { "groups": [{ "name": "Class 1", "slug": "class-1", "id": "241" }, { "name": "Class 2", "slug": "class-2", "id": "244" }, { "name": "Class 3", "slug": "class-3", "id": "247" }, { "name": "Class 4", "slug": "class-4", "id": "248" }, { "name": "Class 5", "slug": "class-5", "id": "249" }, { "name": "EFL", "slug": "efl", "id": "254" }, { "name": "Form 6", "slug": "form-6", "id": "257" }] } }
      }
      cy.mockGraphQL([{ query: 'getAllOrgs', data: getAllOrgs }, { query: 'getGroups', data: getGroups }])
    })

    it('Insists on emails from domains associated with org', () => {
      cy.get('[data-test-id=new-teacher]').click({ force: true });
      cy.get('#username').clear();
      cy.get('#username').type('Damian Phelps');
      cy.get('#demo-single-chip').click();
      cy.get('[data-value="1"]').click()
      cy.get('#email').clear();
      cy.get('#email').type('sdgcdsv');
      cy.get('[data-test-id=add-new-user]').click()
      cy.get('[data-test-id=error]').should('exist')
      cy.get('[data-test-id=error]').contains('Email domain must be tasmat.org.uk or stm.org.uk')
    })

    it('Requires a user role', () => {
      cy.get('[data-test-id=new-teacher]').click({ force: true });
      cy.get('#username').clear();
      cy.get('#username').type('Damian Phelps');
      cy.get('#email').clear();
      cy.get('#email').type('teacheremail@tasmat.org.uk');
      cy.get('[data-test-id=add-new-user]').click()
      cy.get('[data-test-id=error]').should('exist')
      cy.get('[data-test-id=error]').contains('Please choose a role')
    })

    it('Successfully creates a new user', () => {

      let getTeacher = {
        body: { "data": { "users": [] } }
      }

      let createUser = {
        body: { "data": { "createUser": { "user": { "organization": { "id": "1" }, "groups": [], "role": { "id": "1" } } } } }
      }

      let getAllTeachers = {
        body: { "data": { "users": [{ "username": "natalie", "email": "nshuttleworth@tasmat.org.uk", "id": "3", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }, { "name": "Class 2", "id": "244" }, { "name": "EFL", "id": "254" }] }, { "username": "Alasdair Blackwell", "email": "aliblackwell@protonmail.com", "id": "61", "organization": { "name": "Torfield School" }, "role": { "name": "Leader" }, "groups": [{ "name": "Class 1", "id": "241" }] }, { "username": newTeacherName, "email": newTeacherEmail, "id": "77", "organization": { "name": "Torfield School" }, "role": { "name": "Teacher" }, "groups": [] }] } }
      }

      cy.mockGraphQL([
        { query: 'getTeacher', data: getTeacher },
        { query: 'createUser', data: createUser },
        { query: 'getAllTeachers', data: getAllTeachers, instance: '1' },
      ])

      cy.get('[data-test-id=new-teacher]').click({ force: true });
      cy.get('#username').clear()
      cy.get('#username').type(newTeacherName)
      cy.get('#email').clear();
      cy.get('#email').type(newTeacherEmail)
      cy.get('#demo-single-chip').click()
      cy.get('[data-value="1"]').click()
      cy.get('[data-test-id=add-new-user]').click()
      cy.wait('@gqlgetAllTeachersQuery').its('request.url').should('include', '/graphql')
      cy.get('[data-test-id=success]').should('exist')
      cy.get('[data-test-id=close-user-popup]').click()
      cy.get('[data-id=77]').contains('Teacher')
    })

    it('Refuses to create a new user with the same email', () => {

      let getTeacher = {
        body: { "data": { "users": [{ "id": "61" }] } }
      }

      cy.mockGraphQL([
        { query: 'getTeacher', data: getTeacher }
      ])

      cy.get('[data-test-id=new-teacher]').click({ force: true });
      cy.get('#username').clear()
      cy.get('#username').type(newTeacherName)
      cy.get('#email').clear();
      cy.get('#email').type(newTeacherEmail)
      cy.get('#demo-single-chip').click()
      cy.get('[data-value="1"]').click()
      cy.get('[data-test-id=add-new-user]').click()
      cy.wait('@gqlgetTeacherQuery').its('request.url').should('include', '/graphql')
      cy.get('[data-test-id=error]').should('exist')
    })

  })
})
