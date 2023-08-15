describe('Dashboard flow', () => {
  it('The user logs in as a guest and gets taken to the dashboard upon completion', () => {
    cy.visit('/');
    cy.contains('Login').click();

    cy.contains('Sign in as a guest').click();

    cy.url().should('include', '/dashboard');

    cy.contains('Airports').click();

    cy.url().should('include', '/airports');

    cy.contains('Dashboard').click();

    cy.contains('All Flights').click();

    cy.url().should('include', '/flights');

    cy.contains('Dashboard').click();

    cy.contains('Delayed Flights').click();

    cy.url().should('include', '/delayedFlights');

    cy.contains('Logout').click();
  });
});
