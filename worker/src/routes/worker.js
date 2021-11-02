//importamos modulo
const { response } = require('express');
const express = require('express');
const routes = express.Router();

//indicamos que utilizaremos el modulo json
routes.use(express.json());

//router para suma
routes.get('/suma', (request, response) => {
	console.log('realizando una suma');
	let { value1, value2 } = request.query
	response.json({ result:(Number.parseInt(value1) + Number.parseInt(value2)) }).status(201);
});

//router para resta
routes.get('/resta', (request, response) => {
	console.log('realizando una resta');
	let { value1, value2 } = request.query
	response.json({ result:(Number.parseInt(value1) - Number.parseInt(value2)) }).status(201);
});

//router para multiplicacion
routes.get('/producto', (request, response) => {
	console.log('realizando una multiplicacion');
	let { value1, value2 } = request.query
	response.json({ result:(Number.parseInt(value1) * Number.parseInt(value2)) }).status(201);
});

//router para division
routes.get('/division', (request, response) => {
	console.log('realizando una división');
	let { value1, value2 } = request.query

	if (value2 != 0)
		response.json({ result:(Number.parseInt(value1) / Number.parseInt(value2)) }).status(201);
    else 
        response.json({ result: [`indefinido: el numero val2 = ${value2} tiene que ser mayor a cero`]}).status(402)    
});

//router potencia
routes.get('/potencia', (request, response) => {
    console.log('realizando una potencia')
    let { value1, value2 } = request.query

    response.json( { result: [ `${Math.pow(Number.parseInt(value1), Number.parseInt(value2))}`]}).status(201)
})

//exportamos el modulo routes para que pueda ser expueto por la appi del worker
module.exports = routes;
