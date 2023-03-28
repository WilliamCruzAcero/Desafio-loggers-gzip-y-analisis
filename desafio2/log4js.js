require('dotenv').config();
const express = require('express');
const log4js = require('log4js');
require('./config/logger');

const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || " "
const logger = NODE_ENV === 'production' 
    ? log4js.getLogger('productionLogger')
    : log4js.getLogger();

app.get('/suma', (req, res) => {
    const {a, b} = req.query;
    const encontrarValorNoNumerico = [a, b].some( ele => isNaN(ele));
    if(encontrarValorNoNumerico) {
        //manejo de error y loggeo
        logger.warn('Valor de tipo incorrecto (a: Int, y b: Int)');
        res.send('Valor de tipo incorrecto (a: Int, y b: Int)');
        return;
    }

    const c = parseInt(a) + parseInt(b);
    logger.info(`Operación exítosa: Resultado suma: ${c}`);
    res.send({suma: c});
})

app.get('*', (req, res) => {
    logger.warn(`Ruta no encontrada ${req.url}`);
    res.status(404).send(`Ruta no encontrada ${req.url}`); 
})


const server = app.listen(PORT, () => {
    console.log(`Ejecutando en el puerto: ${PORT}`)
})

server.on('error', (err) => {
    logger.error(`Ocurrio un error al iniciar el server: ${err}`);
})