'use strict';

(function() {
	angular
		.module('tienda')
		.controller('ProductoController', [ '$scope', 'MensajesFactory', 'ProductoService', ProductoController ]);

	function ProductoController($scope, MensajesFactory, productoService) {
		var listar = function() {
			productoService.obtenerTodos(function(resp) {
				$scope.productos = resp.data;
			});
		};

		var limpiarForm = function() {
			$scope.producto = {};
		};

		var init = function() {
			listar();
		};

		init();
		
		$scope.guardar = function(form) {
			$scope.mensajes = MensajesFactory.createMensajes();

			var callback = function() {
				limpiarForm();
				listar();
			};

			var error = function() {
				$scope.mensajes.error.push('Ha ocurrido un error del lado del servidor');
			};

			if (form.nombre.$invalid) // TODO mejorar validación
				$scope.mensajes.error.push('Nombre inválido')
			if (form.precio.$invalid) // TODO mejorar validación
				$scope.mensajes.error.push('Precio inválido')

			if (form.$valid) {
				var p = {
					nombre: $scope.producto.nombre,
					precio: $scope.producto.precio
				};
				if ($scope.producto.id) {
					p.id = $scope.producto.id;
					productoService.modificar(p, function() {
						$scope.mensajes.exito.push('Elemento modificado satisfactoriamente');
						callback();
					}, error);
				} else {
					productoService.agregar(p, function() {
						$scope.mensajes.exito.push('Elemento agregado satisfactoriamente');
						callback();
					}, error);
				}
			}

		};

		$scope.eliminar = function(id) {
			$scope.mensajes = MensajesFactory.createMensajes();

//			if (confirm('Eliminar?'))
				productoService.eliminar(id, function() {
					listar();
					$scope.mensajes.exito.push('Elemento eliminado satisfactoriamente');
				});
		};

		$scope.mostrar = function(p) {
			$scope.mensajes = MensajesFactory.createMensajes();
			$scope.producto = p;
		};
	};

})();