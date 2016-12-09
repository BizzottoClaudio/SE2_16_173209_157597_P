$(document).ready(function(){
 	/**
 	 * @brief Funzione che controlla i permessi per accedere alla sezione delle petizioni
 	 */
    $("#petizioni_image").click(function(){
        //creo una request
    	var xhr = new XMLHttpRequest();
    	var url = "http://127.0.0.1:5000/login_check";
    	xhr.open("post", url, true);
    	xhr.send();
    	//procedura per ricevere il JSON
    	xhr.onloadend = function (){
	        var result = xhr.responseText;
	        result = JSON.parse(result);
	        //se l'utente è registrato gli viene garantito l'accesso alle petizioni
	        if(result.answer == true){
	            window.location.href = '../html/petizioni.html';
	        }
	        //altrimenti mostra un alert
	        else{
	            alert("è necessario fare il login prima di effettuare una petizione");
	        }
    	};
    });

    /**
 	 * @brief Funzione che disconnette l'utente e lo rimanda alla pagina principale
 	 */
    $("#exit").click(function(){
        //creo una request
    	var xhr = new XMLHttpRequest();
    	var url = "http://127.0.0.1:5000/exit";
    	xhr.open("post", url, true);
    	xhr.send();
    	//procedura per ricevere il JSON
    	xhr.onloadend = function (){
	        var result = xhr.responseText;
	        result = JSON.parse(result);
	        //se l'utente si disconnette correttamente viene rimandato alla home.html
	        if(result.answer == true){
	            alert("LogOut effettuato con successo");
	            window.location.href = '../html/home.html';
	        }
	        //altrimenti mostra un alert
	        else{
	            alert("impossibile effettuare il LogOut");
	        }
    	};
    });

});

/**
 * @brief Funzione che cambia lo sfondo, invocata quando il mouse è sopra l'oggetto x.
 * @param [in] x Rappresenta l'oggetto a cui intendo modificare lo sfondo.
 */
function changeColorIN(x) {
    x.style.backgroundColor = "#3399ff";
}

/**
 * @brief Funzione che cambia lo sfondo, invocata quando il mouse non è più sopra l'oggetto x.
 * @param [in] x Rappresenta l'oggetto a cui intendo modificare lo sfondo.
 */
function changeColorOUT(x) {
    x.style.backgroundColor = "#99ccff";      
}
