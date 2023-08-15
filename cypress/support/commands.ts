/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add('signup', (username, email, password) => {
  cy.visit('/');

  cy.contains('Signup').click();

  cy.contains('Username').type(username);
  cy.contains('Email').type(email);
  cy.contains('Password').type(password);

  cy.contains('Submit').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');

  cy.contains('Login').click();

  cy.contains('Email').type(email);
  cy.contains('Password').type(password);

  cy.contains('Submit').click();
});

Cypress.Commands.add('deleteUser', () => {
  cy.contains('Settings').click();
  cy.contains('Delete Account').click();
  cy.contains('Click to Delete Account').click();
});
