// SERVIDOR CON JAVASCRIPT

// const http = require('http');

// const server = http.createServer((req,res)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hello wordl')
// });

// server.listen(3000, () =>{
//     console.log('server on port 3000')
// })

// SERVIDOR CON EXPRESS

const express = require('express');
const morgan = require('morgan');
const app = express();
//settings
app.set('appName', 'express test');
app.set('port',3000)
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(morgan('dev'));


//routes


// function logger(req, res, next) {
//     console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }
// app.use(logger);


// app.all('/user', (req ,res, next) => {
//     console.log('por aqui paso');
//     next();
// });

//Sirve para devolver cosas
app.get('/', (req, res) => {
    const data = [{name: 'sharp'},{name: 'fred'},{name: 'adrian'}, {name: 'shura'}];
    res.render('index.ejs', {people: data});
})

app.get('/user', (req,res) => {
    res.json({
        username: 'adrian',
        lastname: 'shura'
    })
});

//Cuando el navegador envia un dato (Sirve para recibir datos y guardarlo, procesarlo)
app.post('/user/:id', (req,res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('POST REQUEST RECEIVED');
});

//Cuando el navegador quiere actualizar un dato (Me envia datos para actualizarlos)
app.put('/user/:id', (req,res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} updated`);
});

//cuando el navegador quiere eliminar un dato (Toma la peticion, elimina y envia respuesta)
app.delete('/user/:userID', (req,res) => {
    res.send(`User ${req.params.userID} deleted`);
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log('server on port', app.get('port'));
});