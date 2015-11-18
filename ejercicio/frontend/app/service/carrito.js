'use strict';

(function() {
	angular
		.module('tienda')
		.service('CarritoService', [ '$http', CarritoService ]);

	function CarritoService($http) {
		this.agregarProducto = function(p) {
			var carrito = sessionStorage.carrito;

			if (!carrito)
				carrito = [];
			else
				carrito = JSON.parse(carrito);

			var encontrado = false;
			for (var i in carrito) {
				var c = carrito[i];

				if (c.id == p.id) {
					var total = c.cantidad + p.cantidad;

					if (total <= 0)
						carrito.splice(i, 1);
					else
						c.cantidad = total;

					encontrado = true;
					break;
				}
			}

			if (!encontrado)
				carrito.push(p);

			sessionStorage.carrito = JSON.stringify(carrito);
		};

		this.obtenerProductos = function() {
			var carrito = sessionStorage.carrito;

			if (!carrito)
				return [];
			else
				return JSON.parse(carrito);

		};

		this.comprar = function(p, success) {
			$http({
				url: 'http://localhost:3000/compras',
				method: 'post',
				data: {
					productoId: p.id,
					nombre: p.nombre,
					cantidad: p.cantidad
				}
			}).then(function() {
				delete sessionStorage.carrito;
				if (success)
					success();
			});

		};

	}
})();