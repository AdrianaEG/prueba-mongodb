const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
 
//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//config cors
app.use(cors());


//Lectura y parseo del body
app.use( express.json() );
 
// Rutas
 
//Todo lo que este archivo va a exportar lo va a habilitar
//en esta ruta
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'))
// TODO CRUD: Eventos
 
//Directorio publico
app.use( express.static('public') );
 
 
 
//Escuchar peticiones
app.listen( process.env.PORT , ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} );