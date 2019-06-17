describe('Todo Application', () => {
  it('loads the page', () => {
    cy.visit('/')

    cy.window().its('store').invoke('getState').should('deep.equal', {
      todos: [
        {
          "text": "Hello world",
          "completed": false,
          "id": 3
        },
        {
          "id": 4,
          "completed": true,
          "text": "Goodnight moon"
        }
      ],
      visibilityFilter: 'show_all'
    })

    cy.get('[data-cy=todo-item-3]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')

    cy.get('[data-cy=todo-item-4]')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked')
  })
})