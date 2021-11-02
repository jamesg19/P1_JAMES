//importamos el modulo express
const express = require('express');
const routes = express.Router();
routes.use(express.json());

//importamos el modulo para la autenticacion
const authenticated = require('../auth/chktoken')
const axios = require('axios')

const workerhost = process.env.WORKER_HOST;
const workerport = process.env.WORKER_PORT;


routes.get('/prueba', async (req, res) => {
    console.log(workerhost + ':' + workerport + '/math/');
    await axios.get('http://' + workerhost + ':' + workerport + '/math/', { port: Number.parseInt(workerport) })
        .then(response => {
            console.log(response.data);
            res.status(201).json(response.data);
        })
        .catch(error => {
            console.log("error");
            console.log(error);
            res.send("funciono " + workerhost + "  " +workerport);
        });

    //  console.log("funciono");
    // res.send("funciono");
});



routes.get('/historico', /*authenticated.checkToken,*/  (request, response) => {
    console.log('historial de los calculos...');
    //response.send('Saludos desde express');
    response.status(201).send({ historial: [hist] });
   //response.json({historial: [ '1+3+4', '34*5']}).status(201);
});

routes.post('/operacion', /*authenticated.checkToken,*/ async (request, response) => {

    const { val1, val2, ope } = request.body;
    const params = {
        value1: val1,
        value2: val2
    };

    let val = 'http://' + workerhost + ':' + workerport + '/math/' + ope
    //let res = 'http://' + workerhost + ':' + workerport + '/math/' + ope

    console.log('http://' + workerhost + ':' + workerport + '/math/' + ope);

    //response.json({historial: [ '1+3+4', '34*5', `${val}` ]}).status(201);
    await axios.get('http://' + workerhost + ':' + workerport + '/math/' + ope, { port: Number.parseInt(workerport), params })
        .then(res => {
            console.log(res.data);
            response.json({ operacion: `${val1}  ${ope}  ${val2} = ${res.data.result}`, resultado: res.data.result }).status(201);
        })
        .catch(error => {

            console.log(error);
            response.send("funciono" + res + " " + error);
        });
});

module.exports = routes;