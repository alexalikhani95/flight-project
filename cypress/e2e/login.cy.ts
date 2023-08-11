// describe('Login', () => {
//   it('The user signs up and gets taken to the dashboard upon completion', () => {
//     cy.visit('/');

//     cy.contains('Signup').click();

//     cy.url().should('include', '/auth/signup');

//     cy.contains('Username').type('fake');
//     cy.contains('Email').type('fake@email.com');
//     cy.contains('Password').type('testpassword');

//     cy.contains('Submit');

//     cy.url().should('include', '/dashboard');
//   });
// });

describe('Login as guest', () => {
  it('The user logs in as a guest and gets taken to the dashboard upon completion', () => {
    cy.visit('/');

    cy.contains('Login').click();

    cy.url().should('include', '/auth/login');

    cy.contains('Sign in as a guest').click();

    cy.url().should('include', '/dashboard');

    cy.contains('Logout').click();
  });
});
