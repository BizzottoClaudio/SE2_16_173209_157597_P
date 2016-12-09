//contenitore degli utenti
var register = [];
//contenitore delle email
var emails = [];
//contenitore delle password
var passwords = [];
//contenitore che indica se l'utente relativo ha checkato una petizione, conterrà altre liste
var checks = [];

//variabile indicante se l'utente corrente è loggato
var login = false;

/**
 * @brief Costruttore di un utente.
 * @param [in] _name nome dell'utente.
 * @param [in] _surname cognome dell'utente.
 * @param [in] _email email dell'utente.
 * @param [in] _password password dell'utente.
 * @return un oggetto contenente i parametri in ingresso alla funzione.
 */
function insert_user (_name, _surname, _email, _password){
    return {name : _name, surname : _surname, email : _email, password : _password};
}

/**
 * @brief funzione che ritorna lo stato di un utente, loggato o no.
 * @return la variabile indicante se l'utente è loggato
 */
var login_check = function (){
    return login;
}


//exports delle funzioni
exports.loginCheck = login_check; 
exports.exit = login_exit;