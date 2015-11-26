'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Pruebas del módulo de Producto', function() {

    beforeEach(function() {
      browser.get('index.html#/producto');
    });

    it('Debería mostrar el título de producto', function() {
      expect(element.all(by.css('h1')).first().getText()).
        toMatch(/Productos/);
    });

    it('Debería mostrar la lista de productos', function() {
      expect(element.all(by.repeater('p in productos'))
        .count()).toBeGreaterThan(0);
    });

    it('Debería agregar un producto', function() {
      element(by.model('producto.nombre')).sendKeys('nuevo');
      element(by.model('producto.precio')).sendKeys('200');

      var tamanoInicial;

      element
        .all(by.repeater('p in productos'))
        .count()
        .then(function(valor) {
          tamanoInicial = valor;
        });

      element(by.css('button[type=submit]')).click();
          
      element
        .all(by.repeater('p in productos'))
        .count()
        .then(function(valor) {
          expect(valor).toEqual(tamanoInicial + 1);
        });

    });

    it('Debería mostrar un producto seleccionado', function() {
      var nombre, precio;

      element
        .all(by.repeater('p in productos'))
        .then(function(tr) {
            tr[0].element(by.css('td:nth-child(4) a')).click();
            tr[0].element(by.css('td:nth-child(2)')).getText().then(function(valor) {
              nombre = valor;
            });
            tr[0].element(by.css('td:nth-child(3)')).getText().then(function(valor) {
              precio = valor;
            });
        })

      element.all(by.model('producto.nombre')).getAttribute('value').then(function(valor) {
        expect(nombre).toMatch(new RegExp(valor));
      });

      element.all(by.model('producto.precio')).getAttribute('value').then(function(valor) {
        expect(precio).toMatch(new RegExp(valor));
      });

    });

});
