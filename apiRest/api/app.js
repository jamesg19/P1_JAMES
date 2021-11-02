//modoulos a utilizar
const express = require('express');
const app = express();
const path = require('path');
const puerto = 3001;
//let body = require('body-parser')        



//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

const apiRoutes = require('./routes/api_routes');
const loginRoutes = require('./routes/loginroutes');



app.use('/auth/', loginRoutes);


app.use('/', apiRoutes);

//iniciamos el servidor
app.listen(puerto, () => console.log('API escuchando en el puerto 3001'));