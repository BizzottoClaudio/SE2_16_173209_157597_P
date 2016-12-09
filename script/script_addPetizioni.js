/**
 * @brief Funzione che aggiunge una petizione e rimanda l'utente alla pagina petizione.html
 */
function add_petizione(){

    //creo e inizializzo le variabili con i dati prendendoli dal form di add_petizione.html
    var title = $("#title").val();
    var description = $("#description").val();
    var universita = document.getElementById("universita");
    var citta = document.getElementById("citta");

    var hasNumber = /\d/;

    //check dei parametri, se incompleti viene mostrato un alert
    if (title == '' && description == '' && !universita.checked && !citta.checked) {
        $("#title").css("background-color", "#FFB6C1");
        $("#description").css("background-color", "#FFB6C1");
        alert("obbligatorio inserire i parametri title, description e scegliere a quale categoria appartiene la petizione");
    }else if(title == '' || !isNaN(parseInt(title)) || hasNumber.test(title)){
        $("#title").css("background-color", "#FFB6C1");
        $("#description").css("background-color", "");
        alert("inserire un pasametro title valido: no numeri");
    }else if(description == '' || !isNaN(parseInt(description))){
        $("#description").css("background-color", "#FFB6C1");
        $("#title").css("background-color", "");
        alert("inserire un pasametro description valido: non è concesso inserire solo numeri");
    }else if(universita.checked && citta.checked){
        $("#title").css("background-color", "");
        $("#description").css("background-color", "");
        alert("è consentito scegliere sono una delle due possibilità: citta o università");
    }else if(!universita.checked && !citta.checked){
        $("#title").css("background-color", "");
        $("#description").css("background-color", "");
        alert("è obbligatorio scegliere una delle due possibilità: città o università");
    }
    //se i parametri sono stati inseriti correttamente
    else {
    	//prelevo dal form il tipo della petizione, città o università
        var type;
        if(universita.checked){
            type = $("#universita").val();
        }else if(citta.checked){
            type = $("#citta").val();
        }
        //creo un contenitore dei dati
        var data = {};
        //set dei dati da mandare al server
        data['title'] = title;
        data['description'] = description;
        data['type'] = type;
        //creo una request
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1:5000/add_petizione";
        xhr.open("post", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // spedire i dati come json
        xhr.send(JSON.stringify(data));
        //processo il JSON ricevuto
        xhr.onloadend = function (){
            var result=xhr.responseText;
            result = JSON.parse(result);
            //se result affermativo mostro un alert e reindizzo alla pagina petizione.html
            if(result.answer == true){
                alert("petizione inserita con successo");
                window.location.href = '../html/petizioni.html';
            }
            //altrimenti mostro un alert
            else{
                $("#title").css("background-color", "#FFB6C1");
                $("#description").css("background-color", "");
                alert("titolo già presente, non è consentito inserire due petizioni con lo stesso titolo");
            }
        };

    }
}
