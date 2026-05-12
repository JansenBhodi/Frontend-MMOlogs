  let bosses = []; 

  beforeEach(() => {
    cy.intercept('GET', '**/bosses').as('getBosses');
    cy.intercept('GET', '**/boss/*').as('getBossDetail');
    cy.visit('http://localhost:5173/bosses');
    });
    it('Does the Table get filled', () => {
        cy.wait('@getBosses');
        cy.get('[data-test="bosses-table"]').should('exist');

        cy.get('.MuiDataGrid-row').should('have.length.greaterThan', 0);
  });
  before(() => {
    cy.request('GET', 'https://localhost:7289/Boss')
      .then((response) => {
        bosses = response.body.data;
      });
  });