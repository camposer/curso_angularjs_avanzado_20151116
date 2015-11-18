'use strict';

(function() {
	angular
		.module('tienda')
		.service('CompraService', [ '$http', CompraService ]);

	function CompraService($http) {

		this.obtenerCompras = function(success, error) {
			$http({
				url: 'http://localhost:3000/compras',
				method: 'get'
			}).then(success, error);


		};

	}
})();