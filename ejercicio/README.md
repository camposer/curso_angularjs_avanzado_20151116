# Instrucciones para arrancar el proyecto

En una consola arrancar el backend:
```
backend> npm install & npm start
```

En otra consola arrancar el frontend:
```
frontend> npm install & npm start
```

Ejecutar en el navegador la URL: `http://localhost:8000/app`

# Ejercicio

1.- Crear la estructura del proyecto utilizando [Angular-Seed](https://github.com/angular/angular-seed) e importar el proyecto creado en el [curso básico de AngularJS](https://github.com/camposer/curso_angularjs_20151015)

2.- Implementar una directiva para el manejo de mensajes de error. El resultado debe ser algo como:
	<mensaje src="ctrl.mensaje"></mensaje>

3.- Implementar una animación para que cada vez que se agregue un elemento nuevo a la lista se muestre "lentamente". Ver ejemplo de ng-repeat en documentación.

4.- Cambiar el manejo de rutas, actualmente con ngRoute, por ui-router. Ver: https://github.com/angular-ui/ui-router

5.- Implementar las pruebas unitarias de agregar y eliminar de ProductoController. 
NOTA: Recuerde que para ejecutar: `npm test`

6.- Implementar la pruebas e2e de agregar producto.
NOTA: Recuerde que para ejecutar:
```
npm run update-webdriver
npm run protractor
```
