describe('Manage Pupils page', () => {
  beforeEach(() => {
    cy.login(('Leader'))

    let getAllTeachers = {
      body: {
        "data": {
          "usersPermissionsUsers": {
            "data": [
              {
                "id": "3",
                "attributes": {
                  "username": "natalie",
                  "email": "fakeemail@tasmat.org.uk",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "email": "aliblackwell@fakeemail.com",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "2",
                      "attributes": {
                        "name": "Teacher"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "241",
                        "attributes": {
                          "name": "Class 1"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    }

    let getGroups = {
      body: {
        "data": {
          "groups": {
            "data": [
              {
                "id": "241",
                "attributes": {
                  "name": "Class 1",
                  "slug": "class-1"
                }
              },
              {
                "id": "244",
                "attributes": {
                  "name": "Class 2",
                  "slug": "class-2"
                }
              },
              {
                "id": "247",
                "attributes": {
                  "name": "Class 3",
                  "slug": "class-3"
                }
              },
              {
                "id": "248",
                "attributes": {
                  "name": "Class 4",
                  "slug": "class-4"
                }
              },
              {
                "id": "249",
                "attributes": {
                  "name": "Class 5",
                  "slug": "class-5"
                }
              },
              {
                "id": "254",
                "attributes": {
                  "name": "EFL",
                  "slug": "efl"
                }
              },
              {
                "id": "257",
                "attributes": {
                  "name": "Form 6",
                  "slug": "form-6"
                }
              },
              {
                "id": "258",
                "attributes": {
                  "name": "Form 7",
                  "slug": "form-7"
                }
              },
              {
                "id": "259",
                "attributes": {
                  "name": "Form 8",
                  "slug": "form-8"
                }
              },
              {
                "id": "260",
                "attributes": {
                  "name": "Form 9",
                  "slug": "form-9"
                }
              },
              {
                "id": "261",
                "attributes": {
                  "name": "Class 6",
                  "slug": "class-6"
                }
              }
            ]
          }
        }
      }
    }

    cy.mockGraphQL([{ query: 'getAllTeachers', data: getAllTeachers }, { query: 'getGroups', data: getGroups }])

    cy.visit('/manage/teachers')
    cy.waitForSpinners()
    cy.waitForSpinners()
  })

  it('Lets leader assign role to teachers', () => {
    let updateUser = {
      body: {
        "data": {
          "updateUser": {
            "user": {
              "data": {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "role": {
                    "data": {
                      "id": "3"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    let getAllTeachers = {
      body: {
        "data": {
          "usersPermissionsUsers": {
            "data": [
              {
                "id": "3",
                "attributes": {
                  "username": "natalie",
                  "email": "nshuttleworth@tasmat.org.uk",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "email": "aliblackwell@protonmail.com",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "241",
                        "attributes": {
                          "name": "Class 1"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
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
      body: {
        "data": {
          "createGroup": {
            "group": {
              "data": {
                "id": "999",
                "attributes": {
                  "name": "sdfsdf",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    let getGroups = {
      body: {
        "data": {
          "groups": {
            "data": [
              {
                "id": "241",
                "attributes": {
                  "name": "Class 1",
                  "slug": "class-1"
                }
              },
              {
                "id": "244",
                "attributes": {
                  "name": "Class 2",
                  "slug": "class-2"
                }
              },
              {
                "id": "247",
                "attributes": {
                  "name": "Class 3",
                  "slug": "class-3"
                }
              },
              {
                "id": "248",
                "attributes": {
                  "name": "Class 4",
                  "slug": "class-4"
                }
              },
              {
                "id": "249",
                "attributes": {
                  "name": "Class 5",
                  "slug": "class-5"
                }
              },
              {
                "id": "254",
                "attributes": {
                  "name": "EFL",
                  "slug": "efl"
                }
              },
              {
                "id": "257",
                "attributes": {
                  "name": "Form 6",
                  "slug": "form-6"
                }
              },
              {
                "id": "258",
                "attributes": {
                  "name": "Form 7",
                  "slug": "form-7"
                }
              },
              {
                "id": "259",
                "attributes": {
                  "name": "Form 8",
                  "slug": "form-8"
                }
              },
              {
                "id": "260",
                "attributes": {
                  "name": "Form 9",
                  "slug": "form-9"
                }
              },
              {
                "id": "261",
                "attributes": {
                  "name": "Class 6",
                  "slug": "class-6"
                }
              },
              {
                "id": "999",
                "attributes": {
                  "name": newGroupName,
                  "slug": "new-group-name"
                }
              }
            ]
          }
        }
      }
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
      body: {
        "data": {
          "updateUser": {
            "user": {
              "data": {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "groups": {
                    "data": [
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
    let getAllTeachers = {
      body: {
        "data": {
          "usersPermissionsUsers": {
            "data": [
              {
                "id": "3",
                "attributes": {
                  "username": "natalie",
                  "email": "nshuttleworth@tasmat.org.uk",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "241",
                        "attributes": {
                          "name": "Class 1"
                        }
                      },
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      },
                      {
                        "id": "254",
                        "attributes": {
                          "name": "EFL"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "email": "aliblackwell@protonmail.com",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "241",
                        "attributes": {
                          "name": "Class 1"
                        }
                      },
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
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
      body: {
        "data": {
          "updateUser": {
            "user": {
              "data": {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "groups": {
                    "data": [
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
    let getAllTeachers = {
      body: {
        "data": {
          "usersPermissionsUsers": {
            "data": [
              {
                "id": "3",
                "attributes": {
                  "username": "natalie",
                  "email": "nshuttleworth@tasmat.org.uk",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "241",
                        "attributes": {
                          "name": "Class 1"
                        }
                      },
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      },
                      {
                        "id": "254",
                        "attributes": {
                          "name": "EFL"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "id": "61",
                "attributes": {
                  "username": "Alasdair Blackwell",
                  "email": "aliblackwell@protonmail.com",
                  "organization": {
                    "data": {
                      "id": "1",
                      "attributes": {
                        "name": "Torfield School"
                      }
                    }
                  },
                  "role": {
                    "data": {
                      "id": "3",
                      "attributes": {
                        "name": "Leader"
                      }
                    }
                  },
                  "groups": {
                    "data": [
                      {
                        "id": "241",
                        "attributes": {
                          "name": "Class 1"
                        }
                      },
                      {
                        "id": "244",
                        "attributes": {
                          "name": "Class 2"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
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
        body: {
          "data": {
            "organizations": {
              "data": [
                {
                  "id": "2",
                  "attributes": {
                    "name": "Saxon Mount School",
                    "email_domains": "tasmat.org.uk, aliblackwell"
                  }
                },
                {
                  "id": "1",
                  "attributes": {
                    "name": "Torfield School",
                    "email_domains": "tasmat.org.uk, stm.org.uk"
                  }
                }
              ]
            }
          }
        }
      }
      let getGroups = {
        body: {
          "data": {
            "groups": {
              "data": [
                {
                  "id": "241",
                  "attributes": {
                    "name": "Class 1",
                    "slug": "class-1"
                  }
                },
                {
                  "id": "244",
                  "attributes": {
                    "name": "Class 2",
                    "slug": "class-2"
                  }
                },
                {
                  "id": "247",
                  "attributes": {
                    "name": "Class 3",
                    "slug": "class-3"
                  }
                },
                {
                  "id": "248",
                  "attributes": {
                    "name": "Class 4",
                    "slug": "class-4"
                  }
                },
                {
                  "id": "249",
                  "attributes": {
                    "name": "Class 5",
                    "slug": "class-5"
                  }
                },
                {
                  "id": "254",
                  "attributes": {
                    "name": "EFL",
                    "slug": "efl"
                  }
                },
                {
                  "id": "257",
                  "attributes": {
                    "name": "Form 6",
                    "slug": "form-6"
                  }
                }
              ]
            }
          }
        }
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
        body: {
          "data": {
            "usersPermissionsUsers": {
              "data": []
            }
          }
        }
      }

      let createUser = {
        body: {
          "data": {
            "createUser": {
              "user": {
                "data": {
                  "id": "77",
                  "attributes": {
                    "organization": {
                      "data": {
                        "id": "1"
                      }
                    },
                    "groups": {
                      "data": []
                    },
                    "role": {
                      "data": {
                        "id": "1"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      let getAllTeachers = {
        body: {
          "data": {
            "usersPermissionsUsers": {
              "data": [
                {
                  "id": "3",
                  "attributes": {
                    "username": "natalie",
                    "email": "nshuttleworth@tasmat.org.uk",
                    "organization": {
                      "data": {
                        "id": "1",
                        "attributes": {
                          "name": "Torfield School"
                        }
                      }
                    },
                    "role": {
                      "data": {
                        "id": "3",
                        "attributes": {
                          "name": "Leader"
                        }
                      }
                    },
                    "groups": {
                      "data": [
                        {
                          "id": "241",
                          "attributes": {
                            "name": "Class 1"
                          }
                        },
                        {
                          "id": "244",
                          "attributes": {
                            "name": "Class 2"
                          }
                        },
                        {
                          "id": "254",
                          "attributes": {
                            "name": "EFL"
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "61",
                  "attributes": {
                    "username": "Alasdair Blackwell",
                    "email": "aliblackwell@protonmail.com",
                    "organization": {
                      "data": {
                        "id": "1",
                        "attributes": {
                          "name": "Torfield School"
                        }
                      }
                    },
                    "role": {
                      "data": {
                        "id": "3",
                        "attributes": {
                          "name": "Leader"
                        }
                      }
                    },
                    "groups": {
                      "data": [
                        {
                          "id": "241",
                          "attributes": {
                            "name": "Class 1"
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "77",
                  "attributes": {
                    "username": newTeacherName,
                    "email": newTeacherEmail,
                    "organization": {
                      "data": {
                        "id": "1",
                        "attributes": {
                          "name": "Torfield School"
                        }
                      }
                    },
                    "role": {
                      "data": {
                        "id": "2",
                        "attributes": {
                          "name": "Teacher"
                        }
                      }
                    },
                    "groups": {
                      "data": []
                    }
                  }
                }
              ]
            }
          }
        }
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
        body: {
          "data": {
            "usersPermissionsUsers": {
              "data": [
                {
                  "id": "61"
                }
              ]
            }
          }
        }
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
