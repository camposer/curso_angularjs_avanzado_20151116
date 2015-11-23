'use strict';

describe('Controlador de Producto', function () {
  var productoCtrl, scope;

  beforeEach(module('tienda'));

  beforeEach(inject(function ($q, $controller, $rootScope, _MensajesFactory_, _ProductoServiceDummy_) { // ProductoServiceDummy y MensajeFactory son inyectados por nombre
    scope = $rootScope.$new();

    productoCtrl = $controller('ProductoController', {
      $scope: scope,
      MensajesFactory: _MensajesFactory_,
      ProductoService: _ProductoServiceDummy_
    });

    scope.$digest(); // Obliga la actualización del scope a partir de las promesas pendientes por ejecución
  }));

  it('Debería iniciar los productos al cargar', function () {
    console.log('productos = ' + JSON.stringify(scope.productos));
    expect(scope.productos.length).toEqual(3);
  });

});
