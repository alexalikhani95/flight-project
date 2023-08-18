describe('Airports flow', () => {
  it('The user clicks on the different buttons in the airports card and gets taken to the correct locations', () => {
    cy.visit('/');
    cy.contains('Login').click();

    cy.contains('Sign in as a guest').click();

    cy.url().should('include', '/dashboard');

    cy.contains('Airports').click();

    cy.url().should('include', '/airports');

    cy.contains('View airport location on map').first().click();

    cy.url().should(
      'include',
      '/airports/map?latitude=41.978367&longitude=-87.904712'
    );

    cy.go('back');

    cy.contains('View airport flight schedule').first().click();

    cy.url().should('include', '/flights/ORD');

    cy.contains('Logout').click();
  });
});
