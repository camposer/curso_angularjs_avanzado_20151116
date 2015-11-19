'use strict';

(function() {
	angular
		.module('tienda')
		.factory('MensajesFactory', MensajesFactory);

	function MensajesFactory() {
		return {
			createMensajes: function() {
				return {
					error: [],
					exito: []
				};
			}
		};
	}
})();