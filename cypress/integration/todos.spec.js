describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/');
        cy.get('.todo-list li:first-child').should('have.text', 'Hello world')
            .should('not.have.class', '.completed')
            .find('.toggle')
            .should('not.be.checked');
    })
})