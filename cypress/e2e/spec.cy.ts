/// <reference types="cypress" />


describe('FormPage Functionality', () => {
  it('front page starts with the loading circle', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#loadingCircle').should('exist')
    cy.contains('Submit Form').should('not.exist')
  })

  it('Front Page with form loads', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(2000)
    cy.get('#password').should('be.visible')
    cy.contains('Submit Form')
  })
})