describe('login path', () => {
  it('should login user', () => {
    cy.visit('/');
    cy.get('.modal-close').click();
    indexedDB.deleteDatabase('shop');
    cy.clearLocalStorage();
    cy.get('.header button').last().click();
    cy.get('[name=email]').type('test@test.com');
    cy.get('[name=password]').type('Password123');
    cy.get('#remember').check({ force: true });
    cy.get(".modal .cl-error").should('be.not.be.visible');
  });
});