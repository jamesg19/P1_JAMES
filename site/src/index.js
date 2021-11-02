//modoulos a utilizar
const express = require('express');
const app = express();
const path = require('path');
const puerto = 3000;

//recursos a utilizar en la carpeta public
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

//establecer vistas
app.set('views', './views');
app.set('view engine', 'ejs');

//responder a cada solicitud del cliente
app.get('/', (request, response) => {
    response.status(201).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/about', (request, response) => {
    response.status(201).sendFile(path.join(__dirname, '../views/about.html'));
});

app.get('/help', (request, response) => {
    response.status(201).sendFile(path.join(__dirname, '../views/help.html'));
});
app.get('/login', (request, response) => {
    response.status(201).sendFile(path.join(__dirname, '../views/login.html'));
});

app.use((request, response, next) => {
    response.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

app.listen(puerto, () => console.log('Escuchando en el puerto 3000'));