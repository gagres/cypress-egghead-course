describe('Todo Application', () => {
    it('loads the page', () => {

        // Cypress schedule all tasks to do in the future [ visit, get, get ];
        cy.visit('/')

        cy.log('I will debug this element')
        cy.get('[data-cy=todo-item-3]')
          .then((element) => { debugger; })
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        // This will pause the test running flow
        debugger;

        cy.get('[data-cy=todo-item-4]')
          .debug()
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})