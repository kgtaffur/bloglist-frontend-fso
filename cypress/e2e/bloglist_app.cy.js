describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'testingfromcypress',
      password: 'supersecurepassword',
      name: 'Test Cypress',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testingfromcypress');
      cy.get('#password').type('supersecurepassword');
      cy.get('#login-button').click();
      cy.get('.success').contains('Login successful');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testingfromcypess');
      cy.get('#password').type('wrongpassword');
      cy.get('#login-button').click();
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});