describe('All Flights flow', () => {
  it('The user clicks on the different buttons in the flights card and gets taken to the correct locations', () => {
    cy.visit('/');
    cy.contains('Login').click();

    cy.contains('Sign in as a guest').click();

    cy.url().should('include', '/dashboard');

    cy.contains('All Flights').click();

    cy.url().should('include', '/flights');

    cy.contains('View flight location on map').first().click();

    cy.url().should(
      'include',
      'flights/map?latitude=41.978367&longitude=-87.904712'
    );

    cy.go('back');

    cy.contains('View Departure airport details').first().click();

    cy.url().should('include', '/airports/ORD');

    cy.go('back');

    cy.contains('View Arrival airport details').first().click();

    cy.url().should('include', '/airports/DFW');

    cy.go('back');

    cy.contains('Logout').click();
  });
});
