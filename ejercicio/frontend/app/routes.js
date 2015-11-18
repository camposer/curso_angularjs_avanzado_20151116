'use strict';

(function() {
	angular
		.module('tienda')
		.config([ '$routeProvider', RouteConfig ]);	

	function RouteConfig($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'view/catalogo.html',
			controller: 'CatalogoController'
		});

		$routeProvider.when('/carrito', {
			templateUrl: 'view/carrito.html',
			controller: 'CarritoController'
		});

		$routeProvider.when('/producto', {
			templateUrl: 'view/producto.html',
			controller: 'ProductoController'
		});

		$routeProvider.when('/reporte', {
			templateUrl: 'view/reporte.html',
			controller: 'ReporteController'
		});

		$routeProvider.otherwise('/');
	}
})();