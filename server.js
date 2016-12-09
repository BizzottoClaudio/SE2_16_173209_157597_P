//importo librerie
var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

//importo i database
var database = require('./datacenter/database.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.options('*', cors());

var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    headers["Content-Type"] = "application/json";

/**
 * @brief Funzione invocata quando è richiesto il check del login.
 * @param [in] Object request la richiesta dell'utente.
 * @param [out] Object response la risposta del server.
 * @return un JSON contenente TRUE se l'utente è loggato, FALSE altrimenti.
 */
app.post('/login_check', function(request, response){

    var json;
    //controlla se l'utente è già loggato o no
    var check = database.loginCheck();
    //prepara il JSON di risposta
    if(check == true){        
        json = JSON.stringify({ 
            answer: true
        });
    }else{
        json = JSON.stringify({ 
            answer: false
        });
    }   
    //imposto l'header a 200
    response.writeHead(200, headers);
    
    response.end(json);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});