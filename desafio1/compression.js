const express = require('express');
const compression = require('compression');

const gzipMiddleware = compression();

const app = express();

function generarSting() {
    return Array(1000).fill('Hola que tal').join('');
} 

const str = generarSting();

app.get('/saludo', (req, res) => {
    res.send(str)
});
app.get('/saludozip', gzipMiddleware, (req, res) => {
    res.send(str)
});
 
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Ejecutando en el puerto: ${PORT}`)
});

