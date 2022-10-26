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
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('testingfromcypress');
      cy.get('#password').type('supersecurepassword');
      cy.get('#login-button').click();
      cy.get('.success').contains('Login successful');
    });

    it('Fails with wrong credentials', function () {
      cy.get('#username').type('testingfromcypess');
      cy.get('#password').type('wrongpassword');
      cy.get('#login-button').click();
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testingfromcypress', password: 'supersecurepassword' });
    });

    it('A blog can be created', function () {
      cy.get('#create-blog').click();
      cy.get('#title').type('Title about Cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('https://www.cypress.io/');
      cy.get('#create-button').click();
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('Title about Cypress');
    });

    it('Users can like a blog', function () {
      cy.createBlog({
        title: 'Title about Cypress',
        author: 'Cypress',
        url: 'https://www.cypress.io/',
      });
      cy.contains('view').click();
      cy.contains('likes 0');
      cy.contains('like').click();
      setTimeout(() => {
        cy.contains('like 1');
      }, 1000);
    });
  });
});