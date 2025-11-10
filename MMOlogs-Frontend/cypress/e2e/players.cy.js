describe('player overview', () => {
  let players = []; 

  const roleclassMap = {
    0: 'Warrior',
    1: 'Knight',
    2: 'Fighter',
    3: 'Archer',
    4: 'Fire Mage',
    5: 'Scholar',
    6: 'Cleric'
  };

  beforeEach(() => {
      cy.intercept('GET', '**/players').as('getPlayers');
      cy.intercept('GET', '**/player/*').as('getPlayerDetail');
      cy.visit('http://localhost:5173/players')
  });
  it('Does the Table get filled', () => {
    cy.wait('@getPlayers');
    cy.get('[data-test="players-table"]').should('exist');

    cy.get('.MuiDataGrid-row').should('have.length.greaterThan', 0);

  });
  before(() => {
    
    cy.request('GET', 'https://localhost:7289/Player')
      .then((response) => {
        players = response.body.data;
      });
  });

  it('navigates to player detail and verifies correct data', () => {
    cy.wait('@getPlayers');
    cy.get('.MuiDataGrid-row').should('have.length.greaterThan', 0);

    const randomPlayer = players[3];

    // Click on the row that matches the randomly selected player's name
    cy.get('.MuiDataGrid-row').contains(randomPlayer.name, { timeout: 10000 })
    .click();

    // Encode the name and then Assert that the URL changes to the player's detail page 
    const encodedName = encodeURIComponent(randomPlayer.name);
    cy.url().should('include', `/players/${encodedName}`);

    // Validate the player's name and role on the detail page
    cy.contains(randomPlayer.name).should('be.visible');
    cy.contains(roleclassMap[randomPlayer.roleclass]).should('be.visible');
  });
});

describe('player registry', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/players/registry')
  });
  it('successful registry of player', () => {

  });
});
