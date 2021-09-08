describe('Drag and Drop', () => {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it('Перетаскивание ингредиентов в конструктор бургера', () => {
        cy.get('[data-test="ingredient"]').first().trigger('dragstart');
        cy.get('[data-test="constructor"]').trigger('drop')

        cy.get('[data-test="ingredient"]').eq(6).trigger('dragstart');
        cy.get('[data-test="constructor"]').trigger('drop')

        cy.get('[data-test="ingredient"]').eq(5).trigger('dragstart');
        cy.get('[data-test="constructor"]').trigger('drop')

        cy.get('[data-test="ingredient"]').eq(4).trigger('dragstart');
        cy.get('[data-test="constructor"]').trigger('drop')
    })

    it('Изменение порядка ингредиентов в конструкторе', () => {
        cy.get('[data-test="constructor-ingredient"]').first().trigger('dragstart');
        cy.get('[data-test="constructor-ingredient"]').eq(1).trigger('drop');
    })
})