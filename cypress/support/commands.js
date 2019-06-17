// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const _ = require('lodash');

Cypress.Commands.add("store", (str = '') => {
    let log = Cypress.log({ name: 'store' })

    const cb = (state) => {
        log.set({
            message: JSON.stringify(state),
            consoleProps: () => {
                return state
            }
        }).snapshot().end()

        return state
    }

    return cy.window({log: false}).then(function($w) { return $w.store.getState() }).then((state) => {
        if (str.length > 0) {
            return cy.wrap(state, {log: false}).its(str).then(cb)
        } else {
            return cy.wrap(state, {log: false}).then(cb)
        }
        
    })
})

const loMethods = _.functions(_).map((fn) => { return `lo_${fn}` });

loMethods.forEach((loFn) => {
    const loName = loFn.replace(/lo_/, '');
    Cypress.Commands.add(loFn, { prevSubject: true }, (subject, fn, ...args) => {
        let result = _[loName](subject, fn, ...args);
        Cypress.log({
            name: loFn,
            message: JSON.stringify(result),
            consoleProps: () => result,
        });
    
        return result;
    })
})
