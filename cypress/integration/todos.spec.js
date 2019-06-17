describe('Todo Application', () => {
  beforeEach(() => {
    cy.fixture('todos/all.json').as('todosPreload')
  })

  it('loads the page', function () {
    cy.server()

    // Alias the fixture data
    cy.route('/api/todos', '@todosPreload').as('preload')

    cy.visit('/')
    cy.wait('@preload')

    cy.store('example.test.first').should('equal', 1)

    cy.store('todos').should('deep.equal', this.todosPreload)

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')

    cy.get('[data-cy=todo-item-2]')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked')
  })
})