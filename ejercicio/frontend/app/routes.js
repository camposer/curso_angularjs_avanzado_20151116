'use strict';

(function() {
	angular
		.module('tienda')
		.config([ '$routeProvider', RouteConfig ]);	

	function RouteConfig($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'catalogo.html',
			controller: 'CatalogoController'
		});

		$routeProvider.when('/carrito', {
			templateUrl: 'carrito.html',
			controller: 'CarritoController'
		});

		$routeProvider.when('/producto', {
			templateUrl: 'producto.html',
			controller: 'ProductoController'
		});

		$routeProvider.when('/reporte', {
			templateUrl: 'reporte.html',
			controller: 'ReporteController'
		});

		$routeProvider.otherwise('/');
	}
})();