import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

describe('Registration page', () => {

  beforeEach(() => {

    let orgsResponse = {
      body: {"data":{"organizations":[{"name":"Torfield School","id":"1"},{"name":"Saxon Mount School","id":"2"}]}}

    }

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:1337/graphql'
    },
      (req) => {
        aliasQuery(req, 'getAllOrgs')
        if (hasOperationName(req, 'getAllOrgs')) {
          req.reply(orgsResponse)
        }
      }
    )



    cy.clearCookies()
    cy.visit('/register')
  })  
  it('shows a register button', () => {
    cy.get('[data-test-id=register]').should('be.visible')
  })

  it('shows password and email hints', () => {
    cy.get('#password-helper-text').should('be.visible')
    cy.get('#email-helper-text').should('be.visible')
  })

  it('requires user to choose a school', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('');    
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').should('be.visible')
  })

  it('requires user to enter a username', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');    
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').should('be.visible')
  })

  it('requires user to enter an email', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');   
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').should('be.visible')
  })

  it('requires user to enter a password', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');   
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').should('be.visible')
  })

  it('requires user to enter a lowercase password', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');   
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('#password').clear();
    cy.get('#password').type('ReusedPassw0rd');
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').contains('Password must be lowercase')
  })

  it('requires user to enter a password with more than 16 characters', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');   
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('#password').clear();
    cy.get('#password').type('easypassword');
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').contains('Password must be longer than sixteen characters')
  })

  it('disallows special characters and numbers in passwords', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');   
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('#password').clear();
    cy.get('#password').type('apa$$word1haveu5edbe4');
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').contains('Password must not contain special characters or numbers')
  })

  it('only accepts email addresses from the list of permitted domains', () => {
    cy.get('[data-test-id=select-school]').should('be.visible')
    cy.get('[data-test-id=select-school]').click()
    cy.get('.MuiSelect-root').select('Saxon Mount School');   
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('validrandomfourwords');
    cy.get('[data-test-id=register]').click()
    cy.get('[data-test-id=error]').contains('You must use an email address from Tasmat')
  })


})
