export {};
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      signup(
        username: string,
        email: string,
        password: string
      ): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      deleteUser(): Chainable<void>;
    }
  }
}
