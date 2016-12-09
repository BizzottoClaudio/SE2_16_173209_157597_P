//importo librerie
var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

//importo i database
var database = require('./datacenter/database.js');

//variabile indicante l'email dell'utente corrente
var email_utente = "";

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

/**
 * @brief Funzione invocata quando è richiesta la registrazione.
 * @param [in] Object request la richiesta dell'utente.
 * @param [out] Object response la risposta del server.
 * @return un JSON contenente TRUE se l'utente è riuscito a registrarsi, FALSE altrimenti.
 */
app.post('/registrazione', function(request, response){
    //parametri che verranno utilizzati per gestire la registrazione
    var json;
    var name;
    var surname;
    var email;
    var password;
    var registrazione;
    //controllo che il body, e poi i parametri, siano stati definiti
    if ( typeof request.body !== 'undefined' && request.body){
        if (typeof request.body.name !== 'undefined' && request.body.name){
            name = request.body.name;  
        }else{ 
            name = "not defined";
        }
        if (typeof request.body.surname !== 'undefined' && request.body.surname){
            surname = request.body.surname;  
        }else{ 
            surname = "not defined";
        }
        if (typeof request.body.email !== 'undefined' && request.body.email){
            email = request.body.email;  
        }else{ 
            email = "not defined";
        }
        if (typeof request.body.password !== 'undefined' && request.body.password){
            password = request.body.password;  
        }else{ 
            password = "not defined";
        }
        //se i parametri sono stati definiti correttamente
        if(name != "not defined" && surname != "not defined" && email != "not defined" && password != "not defined"){
            //effettuo l'iserimento dell'acocunt nel database
            registrazione = database.registrazione(name, surname, email, password);
            //valuto l'esito dell'inserimento
            if(registrazione == true){
                json = JSON.stringify({ 
                    answer: true
                });
            }else{
                json = JSON.stringify({ 
                    answer: false
                });
            }
        }
    }
    //se il body non era stato definito correttamente
    else{
        name = "body undefined";
        surname = "body undefined";
        email = "body undefined";
        password = "body undefined";
    }
    //headers a 200 se il body e i parametri sono stati correttamente definiti
    if(name != "not defined" && surname != "not defined" && email != "not defined" && password != "not defined" && name != "body undefined" && surname != "body undefined" && email != "body undefined" && password != "body undefined"){
        response.writeHead(200, headers);
    }
    //altrimenti setto l'headers a 406, per indicare problemi con almeno uno dei parametri
    else{
        response.writeHead(406, headers);
    }

    response.end(json);
});

/**
 * @brief Funzione invocata quando è richiesto il login.
 * @param [in] Object request la richiesta dell'utente.
 * @param [out] Object response la risposta del server.
 * @return un JSON contenente TRUE se l'utente è riuscito a loggarsi, FALSE altrimenti.
 */
app.post('/login', function(request, response){
    //parametri utilizzati per gestire il login
    var json;
    var email;
    var password;
    var login;
    //controllo che il body, e poi i parametri, siano stati definiti    
    if ( typeof request.body !== 'undefined' && request.body){
        if ( typeof request.body.email !== 'undefined' && request.body.email){
            email = request.body.email;  
        }else{ 
            email = "not defined";
        }
        if ( typeof request.body.password !== 'undefined' && request.body.password){
            password = request.body.password;  
        }else{ 
            password = "not defined";
        }
        //se i parametri sono stati definiti correttamente
        if(email != "not defined" && password != "not defined"){
            //effettuo il login, ritornando TRUE in caso affermativo, FALSE altrimenti
            login = database.login(email, password);
            if(login == true){
                //aggiorno la variabile globale con l'email dell'utente corrente
                email_utente = email;
                json = JSON.stringify({ 
                    answer: true
                });
            }else{
                json = JSON.stringify({ 
                    answer: false
                });
            }
        }
    }
    //se il body non era stato definito correttamente
    else{
        email = "body undefined";
        password = "body undefined";
    }
    
    //headers a 200 se il body e i parametri sono stati correttamente definiti
    if(email != "not defined" && password != "not defined" && email != "body undefined" && password != "body undefined"){       
        response.writeHead(200, headers);
    }
    //altrimenti setto l'headers a 406, per indicare problemi con almeno uno dei parametri
    else{
        response.writeHead(406, headers);
    }

    response.end(json);
});

/**
 * @brief Funzione invocata quando è richiesto il logout.
 * @param [in] Object request la richiesta dell'utente.
 * @param [out] Object response la risposta del server.
 * @return un JSON contenente TRUE se l'utente è riuscito a scollegarsi, FALSE altrimenti.
 */
app.post('/exit', function(request, response){
    var json;
    //effettuo il logout, ritornando TRUE in caso affermativo, FALSE altrimenti
    var exit = database.exit();
    if(exit == true){
        //aggiorno la variabile globale con un campo vuoto
        email_utente = "";
        json = JSON.stringify({ 
            answer: true
        });
    }else{
        json = JSON.stringify({ 
            answer: false
        });
    }    
    //imposto l'headers a 200
    response.writeHead(200, headers);

    response.end(json);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});