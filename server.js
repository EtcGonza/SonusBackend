const express = require('express');
const fs = require('fs');
const cors = require('cors');

var micsBajos = fs.readFileSync('micsBajos.json');
var micsGuitarras = fs.readFileSync('micsGuitarras.json');
var micsBajos = JSON.parse(micsBajos);
var micsGuitarras = JSON.parse(micsGuitarras);
let server = express();

const port = process.env.PORT || 3000;


server.listen(port, () => { console.log(`Listen ${port}!`); });




server.get('/getBajos', cors(), getMicsBajos);

server.get('/getGuitarras', cors(), getMicsGuitarras);

server.get('/getMicrofono/:modelo/:clasificacion/:nombre', cors(), getMicrofono);

//FUNCTIONS
function getMicsGuitarras(request, response) {
    var promise = new Promise(function(resolve, reject) {
        if (micsGuitarras != undefined) {
            resolve("Que bien que anda este codigo pibe!!");
        } else {
            reject("Hay que debuggear.");
        }
    });

    promise.then(function() {
        console.log("Este codigo es una maravilla!!");
        response.send(micsGuitarras);
    }, function() {
        console.log("Algo salio muy mal... Hay que debuggear.");
    });
}

function getMicsBajos(request, response) {
    var promise = new Promise(function(resolve, reject) {
        if (micsBajos != undefined) {
            resolve("Que bien que anda este codigo pibe!!");
        } else {
            reject("Hay que debuggear.");
        }
    });

    promise.then(function() {
        console.log("Este codigo es una maravilla!!");
        response.send(micsBajos);
    }, function() {
        console.log("Algo salio muy mal... Hay que debuggear.");
    });
}

function getMicrofono(request, response) {

    var microfono = null;
    var data = request.params;

    var promise = new Promise(function(resolve, reject) {

        console.log("Se hizo una consulta con los siguientes parametros: " + "|" + data.modelo + "|" + data.clasificacion + "|" + data.nombre + "|");
        microfono = buscarMic(data.modelo, data.clasificacion, data.nombre);

        if (microfono != null) {
            resolve("Se hizo la solicitud.");
        } else {
            reject("Pibe... ponete a debuggear.");
        }
    });

    promise.then(function() {
        console.log("Este codigo es una maravilla!!");
        response.send(microfono);
    }, function() {
        console.log("Algo salio muy mal... Hay que debuggear.");
    });
}

function buscarMic(modelo, clasificacion, nombre) {

    console.log("Buscando => " + modelo + "|" + clasificacion + "|" + nombre);

    if (modelo == 'Bajos') {
        console.log("Busco un Bajo.");
        for (let count = 0; count < micsBajos.length; count++) {
            for (let count2 = 0; count2 < micsBajos[count].microfonos.length; count2++) {
                if (micsBajos[count].nombreClasificacion == clasificacion && micsBajos[count].microfonos[count2].nombre == nombre) {
                    console.log("Lo encontre!");
                    return micsBajos[count].microfonos[count2];
                }
            }
        }
    }
    if (modelo == 'Guitarras') {
        console.log("Busco una guitarra.");
        for (let count = 0; count < micsGuitarras.length; count++) {
            for (let count2 = 0; count2 < micsGuitarras[count].microfonos.length; count2++) {
                if (micsGuitarras[count].nombreClasificacion == clasificacion && micsGuitarras[count].microfonos[count2].nombre == nombre) {
                    console.log("Lo encontre");
                    return micsGuitarras[count].microfonos[count2];
                }
            }
        }
    }

    console.log("No se encontro nada...");
    return "No se encontro nada...";
}