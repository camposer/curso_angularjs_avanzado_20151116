'use strict';

(function() {
	angular
		.module('tienda')
		.directive('mensajes', MensajesDirective);

	function MensajesDirective() {
		return {
			restrict: 'E',
			templateUrl: 'directive/mensajes/template.html',
			scope: {
				mensajes: '=src'
			}
		};
	}
})();