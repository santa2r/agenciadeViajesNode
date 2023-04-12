import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Conectar la bases de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log('Error'))

// Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.NombreSitios = 'Agencia de viajes';
    return next();
});

//Agfregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'))

//Agreagr router
app.use('/', router);

app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});



