describe('Boss overview', () => {
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

  it('navigates to boss detail and verifies correct data', () => {
    cy.wait('@getBosses');
    cy.get('.MuiDataGrid-row').should('have.length.greaterThan', 0);

    const randomBoss = bosses[3];

    // Click on the row that matches the randomly selected player's name
    cy.get('.MuiDataGrid-row').contains(randomBoss.name, { timeout: 10000 })
    .click();

    // Encode the name and then Assert that the URL changes to the player's detail page 
    const encodedName = encodeURIComponent(randomBoss.name);
    cy.url().should('include', `/bosses/detail`);

    // Validate the player's name and role on the detail page
    cy.contains(randomBoss.name).should('be.visible');
  });
});

describe('Boss Creation', () => {
    let bosses = [];

    beforeEach(() => {
        cy.visit('http://localhost:5173/bosses/create');
    });

    it('can we load creation page', () => {
        cy.contains('New Boss').should('exist');
        cy.get('input[type="text"]').should('exist');
        cy.get('button[type="submit"]').should('contain', 'Submit');
    });
    it('Succesfully create a boss', () => {
        //use a date.now since we need the name to be unique
        //it saves it to the real backend after all
    const bossName = `testBoss_${Date.now()}`;
        cy.get('[data-cy="name-input"]').click().type(bossName);
        cy.get('[data-cy="level-input"]').click().type(90);
        cy.get('[data-cy="health-input"]').click().type(745000);
        cy.get('[data-cy="desc-input"]').click().type("This is a test boss that will see if a boss is succesfully created");
        cy.get('button[type="submit"]').click();

        cy.url({ timeout: 10000 }).should('include', `/bosses/detail`);
        cy.contains(bossName).should('exist'); 
    })
});
