'use strict';

(function() {
	angular
		.module('tienda')
		.controller('ProductoController', [ '$scope', 'ProductoService', ProductoController ]);

	function ProductoController($scope, productoService) {
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
			var callback = function() {
				limpiarForm();
				listar();
			};

			$scope.errores = [];
			if (form.nombre.$invalid) // TODO mejorar validación
				$scope.errores.push('Nombre inválido')
			if (form.precio.$invalid) // TODO mejorar validación
				$scope.errores.push('Precio inválido')

			if (form.$valid) {
				var p = {
					nombre: $scope.producto.nombre,
					precio: $scope.producto.precio
				};
				if ($scope.producto.id) {
					p.id = $scope.producto.id;
					productoService.modificar(p, callback);
				} else {
					productoService.agregar(p, callback);
				}
			}

		};

		$scope.eliminar = function(id) {
			if (confirm('Eliminar?'))
				productoService.eliminar(id, listar);
		};

		$scope.mostrar = function(p) {
			$scope.producto = p;
		};
	};

})();