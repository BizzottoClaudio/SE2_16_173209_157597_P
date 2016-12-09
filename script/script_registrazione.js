/**
 * @brief Funzione che registra l'utente passando i dati di quest'ultimo al server.
 * se l'email è già stata utilizzata verrà indicato un errore
 */
function registrazione(){
    //creo e inizializzo le variabili con i dati prendendoli dal form di registrazione.html
    var name = $("#name").val();
    var surname = $("#surname").val();
    var email = $("#email").val();
    var password = $("#password").val();

    var hasNumber = /\d/;
    var vincolo_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //check dei parametri, se incompleti viene mostrato un alert
    if (name == '' && surname == '' && email == '' && password == '') {
        $("#name").css("background-color", "#FFB6C1");
        $("#surname").css("background-color", "#FFB6C1");
        $("#email").css("background-color", "#FFB6C1");
        $("#password").css("background-color", "#FFB6C1");
        alert("obbligatorio inserire i parametri name, surname, email e password");
    }else if(name == '' || !isNaN(parseInt(name)) || hasNumber.test(name)){
        $("#name").css("background-color", "#FFB6C1");
        $("#surname").css("background-color", "");
        $("#email").css("background-color", "");
        $("#password").css("background-color", "");
        alert("inserire un pasametro name valido: no numeri");
    }else if(surname == '' || !isNaN(parseInt(surname)) || hasNumber.test(surname)){
        $("#surname").css("background-color", "#FFB6C1");
        $("#name").css("background-color", "");
        $("#email").css("background-color", "");
        $("#password").css("background-color", "");
        alert("inserire un pasametro surname valido: no numeri");
    }else if(email == '' || !vincolo_email.test(email)){
        $("#email").css("background-color", "#FFB6C1");
        $("#surname").css("background-color", "");
        $("#name").css("background-color", "");
        $("#password").css("background-color", "");
        alert("inserire un pasametro email valido");
    }else if(password == ''){
        $("#password").css("background-color", "#FFB6C1");
        $("#email").css("background-color", "");
        $("#surname").css("background-color", "");
        $("#name").css("background-color", "");
        alert("inserire una password");
    }
    //se i parametri sono stati inseriti correttamente
    else {
        //creo un contenitore dei dati
    	var data = {};
        //prendo i dati dal form
    	data["name"] = name;
        data["surname"] = surname;
        data["email"] = email;
        data["password"] = password;
        //creo una request
    	var xhr = new XMLHttpRequest();
    	var url = "http://127.0.0.1:5000/registrazione";
    	xhr.open("post", url, true);
    	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    	// spedire i dati come json
    	xhr.send(JSON.stringify(data));
        //processo il JSON ricevuto
        xhr.onloadend = function (){
            var result=xhr.responseText;
            result = JSON.parse(result);
            //se result affermativo mostro un alert e reindizzo all pagina home.html
            if(result.answer == true){
            	alert("utente inserito con successo");
            	window.location.href = '../html/home.html';
            }
            //altrimenti mostro un alert
            else{
                $("#email").css("background-color", "#FFB6C1");
                $("#surname").css("background-color", "");
                $("#name").css("background-color", "");
                $("#password").css("background-color", "");
            	alert("email già presente nel database");
            }
        };

    }
}