'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Pruebas de aplicación', function() {


  it('Cuando el usuario entra debe cargarse la ruta raíz', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('Módulo de productos', function() {

    beforeEach(function() {
      browser.get('index.html#/producto');
    });


    it('Debería mostrar el título de producto', function() {
      expect(element.all(by.css('h1')).first().getText()).
        toMatch(/Productos/);
    });

    it('Debería mostrar la lista de productos', function() {
      expect(element.all(by.repeater('p in productos')).count()).toBeGreaterThan(0);
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
  });


});
