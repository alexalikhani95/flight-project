describe('Signup, login, delete account', () => {
  it('The user signs up and gets taken to the dashboard, then logs out and can login. Then go to the settings page to delete the account', () => {
    cy.signup('test-username', 'test1234@gmail.com', 'testpassword');
    cy.url().should('include', '/dashboard');

    cy.contains('Logout').click();
    cy.login('test1234@gmail.com', 'testpassword');

    cy.url().should('include', '/dashboard');
    cy.deleteUser();
  });
});
