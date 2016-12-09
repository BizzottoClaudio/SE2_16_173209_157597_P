$(document).ready(function(){
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

    /**
     * @brief Funzione che carica in petizione.html le petizioni universitarie e cittadine
     */
    $("#Tutte").click(function(){
        //prendo la tabella dal html
        var table = document.getElementById("myTable");
        //imposto il colore dei bottoni se questi sono premuti
        $("#Tutte").attr('class', 'btn btn-success');
        $("#Università").attr('class', 'btn btn-default');
        $("#Città").attr('class', 'btn btn-default');
        //cancello la tabella se già esistente
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
        //creo una request
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1:5000/load_petizioni";
        xhr.open("post", url, true);
        xhr.send();
        //procedura per ricevere il JSON
        xhr.onloadend = function (){
            var result = xhr.responseText;
            result = JSON.parse(result);
            //se non ci sono petizioni, lo indico nella tabella
            if(result.n_petizioni == false){
                var row = table.insertRow(table.rows.length);
                var x = row.insertCell(0);
                x.innerHTML = "<h3>Nessuna petizione presente</h3>";
            }
            //altrimenti scrivo le petizioni nella tabella
            else{
                for(var i = 0; i < result.titles.length; i++){
                    //inserisco una riga nella tabella
                    var row = table.insertRow(table.rows.length);
                    row.id = "row"+i;
                    var x = row.insertCell(0);
                    //se la petizione risulta checkata dall'utente il box risulterà tale
                    if(result.check[i] == true){
                        x.innerHTML = "<h3 id="+"petiz_title"+">"+result.titles[i]+"</h3><p "+"id="+"petiz_desc"+">"+result.descriptions[i]+"</p><input id="+"petiz_box"+" class="+"big-checkbox" +" type="+"checkbox"+" onclick="+"add_check_petizioni(this.id)"+" checked><h4 id="+"petiz_num"+">"+result.like[i]+"</h4>";
                    }
                    //altrimenti il box non è checkato
                    else{
                        x.innerHTML = "<h3 id="+"petiz_title"+">"+result.titles[i]+"</h3><p "+"id="+"petiz_desc"+">"+result.descriptions[i]+"</p><input id="+"petiz_box"+" class="+"big-checkbox" +" type="+"checkbox"+" onclick="+"add_check_petizioni(this.id)"+"><h4 id="+"petiz_num"+">"+result.like[i]+"</h4>";
                    }
                    //personalizzo l'ID della petizione corrente
                    $('#petiz_box').attr('id','petiz'+i);
                    //coloro lo sfondo della petizione in base alla tipologia
                    if(result.types[i] == "Università"){
                        $("#row"+i).css("background-color", "#cceeff");
                    }else if(result.types[i] == "Città"){
                        $("#row"+i).css("background-color", "#ffe6cc");
                    }
                }
            }
        };
    });

    /**
     * @brief Funzione che carica in petizione.html le petizioni universitarie
     */
    $("#Università").click(function(){
        //prendo la tabella dal html
        var table = document.getElementById("myTable");
        //imposto il colore dei bottoni se questi sono premuti
        $("#Tutte").attr('class', 'btn btn-default');
        $("#Università").attr('class', 'btn btn-primary');
        $("#Città").attr('class', 'btn btn-default');
        //cancello la tabella se già esistente
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
        //creo una request
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1:5000/load_petizioni";
        xhr.open("post", url, true);
        xhr.send();
        //procedura per ricevere il JSON
        xhr.onloadend = function (){
            var result = xhr.responseText;
            result = JSON.parse(result);
            //se non ci sono petizioni, lo indico nella tabella
            if(result.n_petizioni == false){
                var row = table.insertRow(table.rows.length);
                var x = row.insertCell(0);
                x.innerHTML = "<h3>Nessuna petizione universitaria presente</h3>";
            }
            //se ci sono petizioni
            else{
                var res = 0;
                //conto se ci sono petizioni di tipo università
                for(var i = 0; i < result.titles.length; i++){
                    if(result.types[i] == "Università"){
                        res += 1;
                    }
                }
                //se non ci sono lo indico
                if(res == 0){
                    var row = table.insertRow(table.rows.length);
                    var x = row.insertCell(0);
                    x.innerHTML = "<h3>Nessuna petizione universitaria presente</h3>";
                }
                //altrimenti scrivo le petizioni nella tabella
                else{
                    for(var i = 0; i < result.titles.length; i++){
                        if(result.types[i] == "Università"){
                            //inserisco una riga nella tabella
                            var row = table.insertRow(table.rows.length);
                            row.id = "row"+i;
                            var x = row.insertCell(0);
                            //se la petizione risulta checkata dall'utente il box risulterà tale
                            if(result.check[i] == true){
                                x.innerHTML = "<h3 id="+"petiz_title"+">"+result.titles[i]+"</h3><p "+"id="+"petiz_desc"+">"+result.descriptions[i]+"</p><input id="+"petiz_box"+" class="+"big-checkbox" +" type="+"checkbox"+" onclick="+"add_check_petizioni(this.id)"+" checked><h4 id="+"petiz_num"+">"+result.like[i]+"</h4>";
                            }
                            //altrimenti il box non è checkato
                            else{
                                x.innerHTML = "<h3 id="+"petiz_title"+">"+result.titles[i]+"</h3><p "+"id="+"petiz_desc"+">"+result.descriptions[i]+"</p><input id="+"petiz_box"+" class="+"big-checkbox" +" type="+"checkbox"+" onclick="+"add_check_petizioni(this.id)"+"><h4 id="+"petiz_num"+">"+result.like[i]+"</h4>";
                            }
                            //personalizzo l'ID della petizione corrente
                            $('#petiz_box').attr('id','petiz'+i);
                            //coloro lo sfondo della petizione
                            $("#row"+i).css("background-color", "#cceeff");
                        }
                    }
                }
            }
        };
    });

    /**
     * @brief Funzione che carica in petizione.html le petizioni cittadine
     */
    $("#Città").click(function(){
        //prendo la tabella dal html
        var table = document.getElementById("myTable");
        //imposto il colore dei bottoni se questi sono premuti
        $("#Tutte").attr('class', 'btn btn-default');
        $("#Università").attr('class', 'btn btn-default');
        $("#Città").attr('class', 'btn btn-warning');
        //cancello la tabella se già esistente
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
        //creo una request
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1:5000/load_petizioni";
        xhr.open("post", url, true);
        xhr.send();
        //procedura per ricevere il JSON
        xhr.onloadend = function (){
            var result = xhr.responseText;
            result = JSON.parse(result);
            //se non ci sono petizioni, lo indico nella tabella
            if(result.n_petizioni == false){
                var row = table.insertRow(table.rows.length);
                var x = row.insertCell(0);
                x.innerHTML = "<h3>Nessuna petizione cittadina presente</h3>";
            }else{
                var res = 0;
                //conto se ci sono petizioni di tipo città
                for(var i = 0; i < result.titles.length; i++){
                    if(result.types[i] == "Città"){
                        res += 1;
                    }
                }
                //se non ci sono lo indico
                if(res == 0){
                    var row = table.insertRow(table.rows.length);
                    var x = row.insertCell(0);
                    x.innerHTML = "<h3>Nessuna petizione cittadina presente</h3>";
                }
                //altrimenti scrivo le petizioni nella tabella
                else{
                    for(var i = 0; i < result.titles.length; i++){
                        if(result.types[i] == "Città"){
                            //inserisco una riga nella tabella
                            var row = table.insertRow(table.rows.length);
                            row.id = "row"+i;
                            var x = row.insertCell(0);
                            //se la petizione risulta checkata dall'utente il box risulterà tale
                            if(result.check[i] == true){
                                x.innerHTML = "<h3 id="+"petiz_title"+">"+result.titles[i]+"</h3><p "+"id="+"petiz_desc"+">"+result.descriptions[i]+"</p><input id="+"petiz_box"+" class="+"big-checkbox" +" type="+"checkbox"+" onclick="+"add_check_petizioni(this.id)"+" checked><h4 id="+"petiz_num"+">"+result.like[i]+"</h4>";
                            }
                            //altrimenti il box non è checkato
                            else{
                                x.innerHTML = "<h3 id="+"petiz_title"+">"+result.titles[i]+"</h3><p "+"id="+"petiz_desc"+">"+result.descriptions[i]+"</p><input id="+"petiz_box"+" class="+"big-checkbox" +" type="+"checkbox"+" onclick="+"add_check_petizioni(this.id)"+"><h4 id="+"petiz_num"+">"+result.like[i]+"</h4>";
                            }
                            //personalizzo l'ID della petizione corrente
                            $('#petiz_box').attr('id','petiz'+i);
                            //coloro lo sfondo della petizione
                            $("#row"+i).css("background-color", "#ffe6cc");
                        }
                    }
                }
            }
        };
    });

});

/**
 * @brief Funzione che gestisce la partecipazione ad una petizione tramite il check
 */
function add_check_petizioni(x){
    //prendo il titolo della petizione a partire dall'ID del checkbox premuto
    var petiz_title = document.getElementById(x).previousElementSibling.previousElementSibling.innerHTML;
    //contenitore dei dati
    var data = {};
    //il dato da inviare al server
    data['title'] = petiz_title;
    //creo una request
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/add_check_petizioni";
    xhr.open("post", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    //spedisco il JSON
    xhr.send(JSON.stringify(data));
    //procedura per ricevere il JSON
    xhr.onloadend = function (){
        var result = xhr.responseText;
        result = JSON.parse(result);
        //se l'utente aggiunge il check, verrà mostrato un alert
        if(result.answer == true){
            alert("complimenti la sua partecipazione alla petizione è stata registrata");
            document.getElementById(x).nextElementSibling.innerHTML = result.value;
        }
        //se l'utente rimuove il check, verrà mostrato un alert
        else{
            alert("la sua partecipazione alla petizione è stata cancellata");
            document.getElementById(x).nextElementSibling.innerHTML = result.value;
        }
    };
}
