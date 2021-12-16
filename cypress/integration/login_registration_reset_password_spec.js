import getAllOrgs from '../fixtures/getAllOrgs.json';

describe('Reset password page: after email with valid link', () => {
  beforeEach(() => {
    cy.visit('/reset-password?code=0123456789');
  });

  it('shows a field to enter a new password with a label and helper text', () => {
    cy.get('#password').should('exist');
    cy.get('#password-label').should('exist');
    cy.get('#password-helper-text').should('exist');
  });

  it('validates the password', () => {
    cy.get('[data-test-id=reset-password]').click();
    cy.get('[data-test-id=error]').should('be.visible');
    cy.validatePassword('reset-password');
  });

  it('rejects invalid codes', () => {
    cy.intercept('http://localhost:1337/auth/reset-password', {
      statusCode: 400,
      fixture: 'authInvalidCode.json',
    });
    cy.get('[data-test-id=reset-password]').click();
    cy.get('#password').type('pacific_sandwich_leaf_basket');
    cy.get('[data-test-id=reset-password]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });
  it('accepts valid codes and shows a login link at the end', () => {
    cy.intercept('http://localhost:1337/auth/reset-password', {
      fixture: 'authValidResponse.json',
    });
    cy.get('[data-test-id=reset-password]').click();
    cy.get('#password').type('pacific_sandwich_leaf_basket');
    cy.get('[data-test-id=reset-password]').click();
    cy.get('[data-test-id=password-success]').should('be.visible');
    cy.get('[data-test-id=login-link]').should('be.visible');
  });
});

describe('Reset password page: before email with link', () => {
  beforeEach(() => {
    cy.visit('/reset-password');
  });
  it('shows a form where you can enter your email with a label and helper text', () => {
    cy.get('#email').should('exist');
    cy.get('#email-label').should('exist');
    cy.get('#email-helper-text').should('exist');
  });

  it('requires an email address', () => {
    cy.get('[data-test-id=reset-password]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });

  it('requires a properly formatted email address', () => {
    cy.intercept('http://localhost:1337/auth/forgot-password', {
      statusCode: 400,
      fixture: 'authInvalidEmail.json',
    });
    cy.get('#email').type('damianattasmat.org.uk');
    cy.get('[data-test-id=reset-password]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });

  it('tells the user to check their email on success', () => {
    // cy.mockAuthEndpoint(incorrectEmailResponse, 'forgot-password');
    cy.intercept('http://localhost:1337/auth/forgot-password', {
      fixture: 'authValidResponse.json',
    });
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('[data-test-id=reset-password]').click();
    cy.get('[data-test-id=email-success]').should('be.visible');
  });
});

describe('Login page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/login');
  });
  it('lets users login', () => {
    cy.intercept('/api/login', {
      fixture: 'authLoginSuccess.json',
    });
    cy.get('#email').clear();
    cy.get('#email').type('example@tasmat.org.uk');
    cy.get('#password').type('validrandomfourwords');
    cy.get('[data-test-id=login]').click();
    cy.wait(50);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('shows a login button, and link to register and reset password', () => {
    cy.get('[data-test-id=login]').should('be.visible');
    cy.get('[data-test-id=register-link]').should('be.visible');
    cy.get('[data-test-id=reset-password-link]').should('be.visible');
  });

  it('requires an email', () => {
    cy.get('[data-test-id=login]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });

  it('requires a password', () => {
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('[data-test-id=login]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });
});

describe('Registration page', () => {
  beforeEach(() => {
    cy.mockGraphQL([{ query: 'getAllOrgs', data: getAllOrgs }]);

    cy.clearCookies();
    cy.visit('/register');
  });

  it('shows a register button', () => {
    cy.get('[data-test-id=register]').should('be.visible');
  });

  it('shows password and email hints', () => {
    cy.get('#password-helper-text').should('be.visible');
    cy.get('#email-helper-text').should('be.visible');
  });

  it('requires user to choose a school', () => {
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });

  it('requires user to enter a username', () => {
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Saxon Mount School');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });

  it('requires user to enter an email', () => {
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Saxon Mount School');
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });

  it('only accepts email addresses from the list of permitted domains', () => {
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Saxon Mount School');
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('validrandomfourwords');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').contains(
      'You must use an email address from tasmat.org.uk or othervaliddomain.com or thirdvaliddomain.com'
    );
  });

  it('formats domain nicely when there is only one', () => {
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Torfield School');
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('validrandomfourwords');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').contains('You must use an email address from tasmat.org.uk');
  });

  it('validates the password', () => {
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Saxon Mount School');
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('damian@tasmat.org.uk');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').should('be.visible');
    cy.validatePassword('register');
  });

  it('disallows duplicate emails', () => {
    cy.intercept('/api/register', {
      statusCode: 400,
      fixture: 'authDuplicateEmail.json',
    });
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Saxon Mount School');
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('duplicateemail@tasmat.org.uk');
    cy.get('#password').type('validrandomfourwords');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=error]').should('be.visible');
  });
  it('displays a success message on successful registration', () => {
    cy.intercept('/api/register', {
      fixture: 'authValidUserUnconfirmed.json',
    });
    cy.get('[data-test-id=select-school]').should('be.visible');
    cy.get('[data-test-id=select-school]').click();
    cy.get('.MuiNativeSelect-select').select('Saxon Mount School');
    cy.get('#username').clear();
    cy.get('#username').type('Damian Phelps');
    cy.get('#email').clear();
    cy.get('#email').type('duplicateemail@tasmat.org.uk');
    cy.get('#password').type('validrandomfourwords');
    cy.get('[data-test-id=register]').click();
    cy.get('[data-test-id=registration-success]').should('be.visible');
  });
});
