describe('My First Test', () => {
    it('Visits the Next.js app', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Welcome to Next.js');
    });
  });
  