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
    // En lugar de implementar un dummy de ProductoService, pudimos
    // inyectar el $httpBackend y dar respuesta (estática) a cada una de las peticiones
    // angular inyecta el $httpBackend en lugar del $http de forma automática
    productoService = _ProductoServiceDummy_; 

    productoService.agregar({
        id: 1,
        nombre: 'uno',
        precio: 1
      });
    productoService.agregar({
        id: 2,
        nombre: 'dos',
        precio: 2
      });
    productoService.agregar({
        id: 3,
        nombre: 'tres',
        precio: 3
      });

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
    scope.producto = {
      nombre: 'uno',
      precio: 200
    };
    var form = angular.copy(scope.producto);
    form.$valid = true;

    var numProductosInicial = scope.productos.length;

    scope.guardar(form);
    scope.$digest();

    expect(scope.mensajes.exito.length).toEqual(1);
    expect(/agregado/.test(scope.mensajes.exito[0])).toEqual(true);
    expect(scope.producto).toEqual({});
    expect(scope.productos.length - 1).toEqual(numProductosInicial);
  });

  it('Dado un producto pre-existente cuando se llama a la función guardar (con p.id) entonces modifica', function () {
    var producto = {
      id: 1,
      nombre: 'uno',
      precio: 200
    };
    scope.producto = angular.copy(producto);
    var form = angular.copy(producto);
    form.$valid = true;

    scope.guardar(form);
    scope.$digest();

    expect(scope.mensajes.exito.length).toEqual(1);
    expect(/modificado/.test(scope.mensajes.exito[0])).toEqual(true);
    expect(scope.producto).toEqual({});
    expect(productoService.obtener(1)).toEqual(producto);
  });

  it('Al mostrar debería cargar un producto pre-existente', function () {
    var producto = {
      id: 1,
      nombre: 'uno',
      precio: 200
    };

    scope.mostrar(producto);

    expect(scope.mensajes).toEqual(MensajesFactory.createMensajes());
    expect(scope.producto).toEqual(producto);
  });

  it('Dado un producto pre-existente cuando se llama a la función eliminar entonces es eliminado', function () {
    var numProductosInicial = scope.productos.length;

    scope.eliminar(1);
    scope.$digest();

    expect(scope.mensajes.exito.length).toEqual(1);
    expect(/eliminado/.test(scope.mensajes.exito[0])).toEqual(true);
    expect(scope.productos.length + 1).toEqual(numProductosInicial);
  });

});
