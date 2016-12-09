/**
 * @brief Funzione che prende i parametri del form, ne verifica la correttezza. Se corretti manda una richiesta di loggarsi, al server.
 * Se il server risponde con successo, l'utente viene reindirizzato ad un'altra pagina.
 */
var login = function (){
    //prendo i dati dalla login.html
    var email = $("#email").val();
    var password = $("#password").val();

    var vincolo_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Se i campi inseriti non sono corretti mostro un alert
    if (email == '' && password == '') {
        $("#email").css("background-color", "#FFB6C1");
        $("#password").css("background-color", "#FFB6C1");
        alert("obbligatorio inserire i parametri email e password");
    }else if(email == '' || !vincolo_email.test(email)){
        $("#email").css("background-color", "#FFB6C1");
        $("#password").css("background-color", "");
        alert("inserire un pasametro email valido");
    }else if(password == ''){
        $("#password").css("background-color", "#FFB6C1");
        $("#email").css("background-color", "");
        alert("inserire la password");
    }
    //se i campi sono corretti
    else {
        //contenitore dei dati
        var data = {};
        //prendo tutti i dati della form
        data["email"] = email;
        data["password"] = password;
        //creo una request
    	var xhr = new XMLHttpRequest();
    	var url = "http://127.0.0.1:5000/login";
    	xhr.open("post", url, true);
    	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    	// spedisco i dati come JSON
    	xhr.send(JSON.stringify(data));
        //ricevo il JSON
        xhr.onloadend = function (){
            var result=xhr.responseText;
            result = JSON.parse(result);
            //se la risposta è affermativa, reindirizzo alla home.html
            if(result.answer == true){
            	alert("login avvenuto con successo");
            	window.location.href = '../html/login_home.html';        	
            }
            //altrimenti mostro un alert
            else{
            	$("#email").css("background-color", "#FFB6C1");
                $("#password").css("background-color", "#FFB6C1");
            	alert("non esiste un utente registrato con email e password indicate");
            }
        };
    }
}
