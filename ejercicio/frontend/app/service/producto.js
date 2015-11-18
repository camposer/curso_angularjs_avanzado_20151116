'use strict';

(function() {
	angular
		.module('tienda')
		.service('ProductoService', [ '$http', ProductoService ]);

	function ProductoService($http) {
		var URL_BASE = "/productos";

		this.agregar = function(p, success, error) {
			$http({
				url: URL_BASE, 
				method: "post",
				data: p
			}).then(success, error)
		};

		this.modificar = function(p, success, error) {
			$http({
				url: URL_BASE + "/" + p.id, 
				method: "put",
				data: p
			}).then(success, error);
		};

		this.eliminar = function(id, success, error) {
			$http({
				url: URL_BASE + "/" + id, 
				method: "delete"
			}).then(success, error);
		};

		this.obtener = function(id, success, error) {
			$http({
				url: URL_BASE + "/" + id, 
				method: "get"
			}).then(success, error);
		};

		this.obtenerTodos = function(success, error) { 
			$http({
				url: URL_BASE, 
				method: 'GET'
			}).then(success, error); // resp.data

			// $http.get(URL_BASE).then(success, error); // resp.data
			// $http.get(URL_BASE).success(success); // resp => data
		};
		
	};
})();