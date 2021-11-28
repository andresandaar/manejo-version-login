const { app, BrowserWindow } = require('electron');
const path = require('path'); /* facilita las busqueda de archivo en nuestro directorio */
const ejs = require('ejs-electron'); /* para que pueda leer los archivos ejs */
const serve = require('./index-express');
function crearVentanaPrincipal() {
	let ventanaPrincipal = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	ventanaPrincipal.loadFile('src/views/index.ejs');
	ventanaPrincipal.loadURL(
		'http://localhost:3001/'
	); /* le pasamos la dirrecion */
}

app.whenReady().then(crearVentanaPrincipal);
/* En electron index-electron.js archivo ,se debe requerir index-express.js para iniciar la aplicacion express,luego creeamos una nueva instancia de browserwindow y cargamos la URL QUE ESCUCHARA LA APLICACION */
/* https://www.it-swarm-es.com/es/node.js/como-usar-electron-con-una-aplicacion-express-existente/808567082/ */

/* si quiero ejecutar solo la pagina tengo que hacer los siguiente scambios en mi archivo.json  muy importante version4
	"scripts": {
		"test": "node src/server.js", 
		"start": "electron  ."
	}*/
