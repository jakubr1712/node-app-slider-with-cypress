describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Swiper Navigation Test', () => {
  it('Użytkownik może przewijać slajdy za pomocą przycisków', () => {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-slide-active').should('contain', 'Rome');
    
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'London');

    cy.get('.swiper-button-prev').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Rome');
  });
});

describe('Swiper Slide Descriptions Test', () => {
  const slides = [
    { title: 'Rome', description: 'Italy' },
    { title: 'London', description: 'United Kingdom' },
    { title: 'Paris', description: 'France' }
  ];

  it('Każdy slajd ma poprawny tytuł i opis', () => {
    cy.visit('http://localhost:3000');


    slides.forEach((slide, index) => {
      cy.get('.swiper-slide-active').within(() => {
      if (index > 0) cy.wait(2000);
      cy.contains('h1', slide.title).should('be.visible');
      cy.contains('p', slide.description).should('be.visible');
      });
      if (index<slides.length-1) cy.get('.swiper-button-next').click();
    });
  });
});

describe('Responsive Swiper Gallery Test', () => {
  const viewports = [
    { device: 'macbook-15', label: 'Desktop' },
    { device: 'ipad-2', label: 'Tablet' },
    { device: 'iphone-6', label: 'Mobile' }
  ];

  viewports.forEach(({ device, label }) => {
    it(`Galeria działa poprawnie na: ${label}`, () => {
      cy.viewport(device);
      cy.visit('http://localhost:3000');
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-button-next').should('be.visible').click();
      cy.get('.swiper-slide-active').should('not.contain', 'Rome');
    });
  });
});

describe('Gallery Visibility Test', () => {
  it('Wszystkie elementy galerii są widoczne', () => {
    cy.visit('http://localhost:3000');
    cy.get('.swiper').should('be.visible');
    cy.get('.swiper-slide').should('have.length', 3);
    cy.get('.swiper-button-next').should('be.visible').click();
    cy.get('.swiper-button-prev').should('be.visible').click();
  });
});
