/// <reference types="cypress" />


describe('FormPage Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })


  it('front page starts with the loading circle', () => {
    cy.get('#loadingCircle').should('exist')
    cy.contains('Submit Form').should('not.exist')
  })

  it('Front Page with form loads after API is called successfully', () => {
    cy.wait(2000)
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#frontend-occupation-select').should('be.visible')
    cy.get('#state').should('be.visible')
    cy.contains('Submit Form').should('be.visible')
  })

  it('Form Page should allow for the successful submission of the form', () => {
    cy.wait(2000)
    cy.get('#name').type('Nash Vador')
    cy.get('#email').type('nashv@gmail.com')
    cy.get('#password').type('testpassword')
    cy.get('#frontend-occupation-select').click()
    cy.contains('Chard').click()
    cy.get('#state').type('Flo')
    cy.contains('Florida').click()
    cy.contains('Submit Form').click()
    cy.contains('Successful Submission').should('be.visible')
  })

  it('Form Page should not allow successful submission upon a form field being unfilled', () => {
    cy.wait(2000)
    cy.get('#name').type('Nash Vador')
    cy.get('#email').type('nashv@gmail.com')
    cy.get('#frontend-occupation-select').click()
    cy.contains('Chard').click()
    cy.get('#state').type('Flo')
    cy.contains('Florida').click()
    cy.contains('Submit Form').click()
    cy.contains('Successful Submission').should('not.exist')
  })

})