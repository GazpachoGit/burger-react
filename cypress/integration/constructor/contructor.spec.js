describe('app works correctly with routes', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });

    it('should open contructor page by default', function() {
        cy.contains('Собери бургер');
      });
    it('should open ingredient card on click', () => {
        cy.get('[class^="ingredients-list-item_info"]')
            .first()
            .click()
        cy.contains('Детали ингредиента')
    })
    it('check close button works', () => {
        cy.get('[class^="modal-overlay_modalHeadWithClose"]')
            .find('svg')
            .click()
    })
    it('test bun drag&n&drop', ()=>{
        cy.get('[class^="ingredients-section_section-list"]>a')
            .first()
            .as('bun')
            .trigger('dragstart')
        cy.get('[class^="burger-constructor_section"]')
            .trigger('drop')
            .find('div[class^="constructor-el-wrapper_wrapper"]')
        cy.get('@bun').find('p').contains('2')
    })
    it('replace bun', () => {
        cy.get('[class^="ingredients-section_section-list"]')
            .first()
            .find('a')
            .last()
            .as('bun')
            .trigger('dragstart')
        cy.get('[class^="burger-constructor_section"]')
            .trigger('drop')
            .find('div[class^="constructor-el-wrapper_wrapper"]')
            .first()
            .as('constuctorBun')
        cy.get('@bun').find('p').contains('2')
        cy.get('@bun')
            .find('span')
            .last()
            .should('have.text', cy.get('@constuctorBun').find('[class^="constructor-element__text"]').invoke('text'))
    })

})