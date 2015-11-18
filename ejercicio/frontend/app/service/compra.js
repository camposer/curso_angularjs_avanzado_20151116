'use strict';

(function() {
	angular
		.module('tienda')
		.service('CompraService', [ '$http', CompraService ]);

	function CompraService($http) {

		this.obtenerCompras = function(success, error) {
			$http({
				url: '/compras',
				method: 'get'
			}).then(success, error);


		};

	}
})();