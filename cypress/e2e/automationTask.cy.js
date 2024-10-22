// cypress/e2e/demoblaze_spec.cy.js

describe('Demoblaze E-commerce Flow', () => {
  // Visit website before each test
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/')
  });

  // Login Test
  it('should log in with valid credentials', () => {
   
    // Click the "Log in" button
    cy.get('#login2').click();

    // Wait for modal to appear
    cy.wait(1000);

    // Input username and password
    cy.get('#loginusername').type('Ekay'); // replace with your username
    cy.get('#loginpassword').type('Johnae28'); // replace with your password

    // Click login
    cy.get('button').contains('Log in').click();

    // Assert that the user is logged in by checking the navbar for the username
    cy.get('#nameofuser').should('contain', 'Welcome Ekay'); // replace with actual username
  });

  // Add item to cart
  it('should add item to cart', () => {
    
    // Click on the first item (Samsung galaxy s6 for example)
    cy.get('.card-title').contains('Samsung galaxy s6').click();

    // Add to cart
    cy.get('.btn-success').contains('Add to cart').click();

    // Handle alert pop-up
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product added');
    });

    cy.wait(1000); // wait for the item to be added
  });

  // Checkout process
  it('should complete the checkout process', () => {
    
    // Open the cart
    cy.get('#cartur').click();

    // Wait for cart to load
    cy.wait(1000);

    // Proceed to place the order
    cy.get('.btn-success').contains('Place Order').click();

    // Fill out the form
    cy.get('#name').type('John Doe');
    cy.get('#country').type('USA');
    cy.get('#city').type('New York');
    cy.get('#card').type('1234 5678 9123 4567');
    cy.get('#month').type('12');
    cy.get('#year').type('2024');

    // Submit order
    cy.get('.btn-primary').contains('Purchase').click({force:true});

    //cy.wait(2000);
    // Assert the success message
    //cy.xpath("//body/div[1]").should('exist')
    //cy.xpath("//h2[contains(text(),'Thank you for your purchase!')]").should('have.value','Thank you for your purchase!');
  });
});
