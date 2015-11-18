'use strict';

(function() {
	angular
		.module('tienda')
		.controller('ReporteController', [ '$scope', 'CompraService', ReporteController ]);

	function ReporteController($scope, compraService) {
		var init = function() {
			compraService.obtenerCompras(function(resp) {
				$scope.labels = [];
				$scope.data = [];

				for (var i in resp.data) {
					$scope.labels.push(resp.data[i].nombre);
					$scope.data.push(resp.data[i].cantidad);
				}
			});

		};

		init();

	};

})();