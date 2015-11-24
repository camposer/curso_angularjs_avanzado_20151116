'use strict';

describe('ProductoController', function () {
  var controller, 
    productoCtrl, 
    scope, 
    productoService, 
    MensajesFactory;

  beforeEach(module('tienda'));

  beforeEach(inject(function ($q, $controller, $rootScope, _MensajesFactory_, _ProductoServiceDummy_) { // ProductoServiceDummy y MensajeFactory son inyectados por nombre
    scope = $rootScope.$new();

    controller = $controller;
    MensajesFactory = _MensajesFactory_;
    productoService = _ProductoServiceDummy_;

    productoCtrl = $controller('ProductoController', {
      $scope: scope,
      MensajesFactory: MensajesFactory,
      ProductoService: productoService
    });

    scope.$digest(); // Obliga la actualización del scope a partir de las promesas pendientes por ejecución
  }));

  it('Cuando se inicia el controller entonces hay productos', function () {
    console.log('productos = ' + JSON.stringify(scope.productos));
    expect(scope.productos.length).toEqual(3);
  });

  it('Dado un nuevo producto cuando se llama a la función guardar (sin p.id) entonces agrega', function () {
    productoService.obtenerTodos = function() {
      this.llamoObtenerTodos = true;
    }

    productoCtrl = controller('ProductoController', {
      $scope: scope,
      MensajesFactory: MensajesFactory,
      ProductoService: productoService
    });

    scope.$digest(); 

    scope.producto = {
      nombre: 'uno',
      precio: 200
    };
    var form = angular.copy(scope.producto);
    form.$valid = true;

    // var numProductosInicial = scope.productos.length;

    scope.guardar(form);
    scope.$digest();

    expect(scope.mensajes.exito.length).toBeGreaterThan(0);
    expect(scope.producto).toEqual({});
    expect(productoService.llamoObtenerTodos).toEqual(true);
    // expect(scope.productos.length - 1).toEqual(numProductosInicial);
  });

  it('Dado un nuevo producto cuando el nombre y precio son inválidos al guardar entonces agrega mensajes de error', function () {
    var form = {
      nombre: {
        $invalid: true
      },
      precio: {
        $invalid: true
      }
    }

      scope.guardar(form);
    scope.$digest();

    expect(scope.mensajes.error.length).toEqual(2);
  });

});
