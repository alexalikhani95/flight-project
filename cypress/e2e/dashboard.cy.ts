describe('Login as guest', () => {
  it('The user logs in as a guest and gets taken to the dashboard upon completion', () => {
    cy.visit('/');

    cy.contains('Login').click();

    cy.url().should('include', '/auth/login');

    cy.contains('Sign in as a guest').click();

    cy.url().should('include', '/dashboard');

    cy.contains('Airports').click();
    cy.url().should('include', '/airports');
  });
});
