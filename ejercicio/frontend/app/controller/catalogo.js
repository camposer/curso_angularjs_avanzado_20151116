'use strict';

(function() {
	angular
		.module('tienda')
		.controller('CatalogoController', [ '$scope', '$location', 'CarritoService', 'ProductoService', CatalogoController ]);

	function CatalogoController($scope, $location, carritoService, productoService) {
		var init = function() {
			productoService.obtenerTodos(function(resp) {
				$scope.productos = resp.data;
			});
		};

		init();

		$scope.agregar = function() {
			for (var i in $scope.productos) 
				if (angular.isNumber($scope.productos[i].cantidad))
					carritoService.agregarProducto($scope.productos[i]);

			$location.path('/carrito');
		};
	};

})();