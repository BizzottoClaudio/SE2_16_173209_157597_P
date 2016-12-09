//lista contenente le petizioni
var petizioni = [];
//lista contenente i titoli delle petizioni
var titles = [];
//lista contenente le descrizioni delle petizioni
var descriptions = [];
//lista contenente i tipi delle petizioni
var types = [];
//lista contenente i like totali delle petizioni
var like = [];

//richiamo il database.js
var database = require('./database.js');

/**
 * @brief Funzione costruttore di una petizione.
 * @param [in] String _title titolo della petizione.
 * @param [in] String _petizione descrizione delle petizione.
 * @param [in] String _type tipo della petizione.
 * @return Description of returned value.
 */
function petizione (_title, _petizione, _type){
    return {title : _title, petizione : _petizione, type : _type};
}

/**
 * @brief Funzione che inserisce una petizione. Anzitutto controlla se il titolo
 * è già presente, nel cui caso non la inserisce e ritorno FALSE. Altrimenti inserisce
 * i parametri della petizione nelle rispettive liste.
 * @param [in] String title titolo della petizione.
 * @param [in] String description descrizione della petizione.
 * @param [in] String type tipo della petizione.
 * @return ritorna un boleano indicante l'esito dell'azione.
 */
var insert_petizione = function(title, description, type){
    var ret = true;
    //collegamento al database
    var check = database.return_checks();
    var emails = database.return_emails();
    
    //check se il titolo è già presente
    for(var i = 0; i < titles.length; i++){
        if(title == titles[i]){
            ret = false;
        }
    }
    //se il titolo non è presente, inserisco la petizione
    if(ret == true){
        //imposto che la petizione non abbia ricevuto check
        for(var i = 0;i < emails.length;i++){
            check[i][petizioni.length] = false;
        }
        //creo la petizione
        var news = petizione(title.toString(), description.toString(), type.toString())
        //inserisco la petizione nella relativa lista
        petizioni.push(news);
        //inserisco nelle relative liste i vari parametri della petizione
        titles.push(title.toString());
        descriptions.push(description.toString());
        types.push(type.toString());
        //imposto il numero attuale di like, della petizione appena creata, a zero
        like.push(0);
    }

    return ret;
}

/**
 * @brief Funzione che gestisce il check di una petizione da parte di un utente.
 * @param [in] String email email dell'utente loggato che eseguisce l'azione.
 * @param [in] String title titolo della petizione.
 * @return un Object contenente l'esito della funzione (true o false) ovvero se l'utente
 * ha messo il like o no, e aggiorna il numero complessivo dei like.
 */
var check_petizione = function(email, title){
    var ret;
    //oggetto che verrà ritornato
    var res;
    //collegamento al database
    var check = database.return_checks();
    var emails = database.return_emails();
    //prendo gli indici degli elementi delle liste contenenti l'email e il titolo della petizione
    var email_index = emails.indexOf(email.toString());
    var title_index = titles.indexOf(title.toString());
    //se la petizione era già checkata, il check viene tolto
    if(check[email_index][title_index] == true){
        ret = false;
        //imposto il check della petizione a false
        check[email_index][title_index] = false;
        var n = like[title_index] -= 1;
        //aggiorno il contatore dei like
        like.splice(title_index, 1, n);
    }
    //altrimenti, la petizione non era stata checkata
    else{
        ret = true;
        //checko la petizione
        check[email_index][title_index] = true;
        var n = like[title_index] += 1;
        //aggiorno il contatore dei like
        like.splice(title_index, 1, n);
    }

    res = { 
        answer: ret,
        value: like[title_index]
    };

    return res; 
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Object contenente tutta la petizione.
 */
var load_petizioni = function(email){
    var res;
    //collegamento con il database
    var check = database.return_checks();
    var emails = database.return_emails();
    //prendo l'indice dell'elemento della lista contenente la mia email
    var email_index = emails.indexOf(email.toString());
    //variabile indicante se esiste almeno una petizione
    var n_petizioni;
    //se non sono presenti petizioni torno FALSE, altrimenti TRUE
    if(petizioni.length == 0){
        n_petizioni = false;
    }else{
        n_petizioni = true;
    }
    
    res = { 
        titles: titles,
        descriptions: descriptions,
        types: types,
        like: like,
        //la lista indicante i check delle petizioni, dell'utente corrente
        check: check[email_index],
        n_petizioni: n_petizioni
    };

    return res;
}

/**
 * @brief Funzione che ritorna la lista delle petizioni.
 * @return la lista delle petizioni.
 */
var return_petizioni = function(){
    return petizioni;
}

/**
 * @brief Funzione che ritorna la lista dei like.
 * @return la lista dei like.
 */
var return_like = function(){
    return like;
}

//exports delle funzioni
exports.return_petizioni = return_petizioni; 
exports.return_like = return_like;
exports.insert_petizione = insert_petizione; 
exports.check_petizione = check_petizione; 
exports.load_petizioni = load_petizioni;


