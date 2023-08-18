describe('Delayed flights flow', () => {
  it('The user clicks on the different buttons in the delayed flights card and gets taken to the correct locations', () => {
    cy.visit('/');
    cy.contains('Login').click();

    cy.contains('Sign in as a guest').click();

    cy.url().should('include', '/dashboard');

    cy.contains('Delayed Flights').click();

    cy.url().should('include', '/delayedFlights');

    cy.contains('View Departure airport details').first().click();

    cy.url().should('include', '/airports/JED');

    cy.go('back');

    cy.contains('View Arrival airport details').first().click();

    cy.url().should('include', '/airports/MXP');

    cy.go('back');

    cy.contains('Logout').click();
  });
});
