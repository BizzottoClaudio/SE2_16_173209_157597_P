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

/**
 * @brief funzione che slogga l'utente impostando il suo status di loggato a FALSE
 * @return un boolean indicante che l'utente è stato sloggato correttamente
 */
var login_exit = function (){
    var res = false;
    
    if(login == true){
        login = false;
        res = true;
    }else{
        res = false
    }

    return res;
}

/**
 * @brief Funzione che registra l'utente se l'email che utilizza non è già in uso.
 * @param [in] name il nome dell'utente.
 * @param [in] surname il cognome dell'utente.
 * @param [in] email l'email dell'utente.
 * @param [in] password la password dell'utente.
 * @return TRUE se la registrazione è andata a buon fine, FALSE altrimenti.
 */
var regis = function (name, surname, email, password){
    
    var check = true;

	//itero le email presenti nel database per verificare che non sia già presente
	for(var i = 0; i< register.length; i++){
	    //se l'email è già presente imposto il check a FALSE
        if(emails[i] == email.toString()){
	        check = false;
        }
	}
	//se l'email non è presente procedo con l'inserire l'utente e le sue caratteristiche
	if(check == true){
	    var news = insert_user(name.toString(), surname.toString(), email.toString(), password.toString());
        var c = [];
        checks.push(c);
	    register.push(news);
	    emails.push(email.toString());
	    passwords.push(password.toString());
	}
    
    return check;
}

/**
 * @brief Funzione che logga l'utente e torna TRUE, FALSE se il login fallisce.
 * @param [in]  email email dell'utente.
 * @param [in|out]  password password dell'utente.
 * @return una variabile indicante se il login è avvenuto o no.
 */
var log = function (email, password){
    var check = false;

    for(var i = 0; i< register.length; i++){
        if(emails[i] == email.toString() && passwords[i] == password.toString()){
            check = true;
            login = true;
        }
    }

    return check;
}

/**
 * @brief Funzione usata solo in fase di testing.
 * @return ritorna la lista degli utenti registrati.
 */
var return_register = function(){
    return register;
}

/**
 * @brief Funzione che ritorna la lista dei check.
 * @return ritorna la lista dei check.
 */
var return_checks = function(){
    return checks;
}

/**
 * @brief Funzione che ritorna la lista degli utente registrati.
 * @return ritorna la lista delle email degli utenti registrati.
 */
var return_emails = function (){
    return emails;
}

/**
 * @brief Funzione usata solo in fase di testing.
 * @return ritorna la lista delle passwords degli utenti registrati.
 */
var return_passwords = function (){
    return passwords;
}

//exports delle funzioni
exports.loginCheck = login_check; 
exports.registrazione = regis;
exports.login = log; 
exports.exit = login_exit; 
exports.return_register = return_register; 
exports.return_emails = return_emails; 
exports.return_passwords = return_passwords; 
exports.return_checks = return_checks; 