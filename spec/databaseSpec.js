//test database.js sulla gestione utenti

//user manager
var database = require('../datacenter/database.js');

/*  Test registrazione utente
 *  it checks:
 *  1   input corretto, campi String
 *  2   input corretto, password solo numeri
 *  3   input corretto, password numeri e lettere
 *  4   input corretto, utente nel database 
 *  5   input corretto, se più utenti nel database
 *  6   input errato, user già inserito con tutti i parametri uguali
 *  7   input errato, user già inserito con solo email uguale
 *  8   input corretto, nuovo user che differisce solo per l'email
 *  9   input corretto, inserimento secondo utente
 *  10  input corretto, restituzione password
 *  11  input corretto, restituzione email
 */
describe("Test registrazione utente",function() {

	describe("con un nuovo utente mai registrato e parametri string",function() {
        it("la funzione lo deve inserire correttamente", function(){
           expect(database.registrazione("asd","asd","asd@asd","asd")).toBeTruthy();
        });    
    });

    describe("con un nuovo utente mai registrato con parametro int sulla password",function() {
        it("la funzione lo deve inserire correttamente", function(){
           expect(database.registrazione("asd","asd","asd3@asd",123)).toBeTruthy();
        });    
    });

    describe("con un nuovo utente mai registrato con parametro int e string sulla password",function() {
        it("la funzione lo deve inserire correttamente", function(){
           expect(database.registrazione("asd","asd","asd4@asd","asd123")).toBeTruthy();
        });    
    });

    describe("salvando un nuovo user",function() {
        it("la lista deve contenere l'utente appena inserito", function(){
            database.registrazione("asd","asd","asd5@asd","asd");
           	expect(database.return_register()).toContain({ name: 'asd', surname: 'asd', email: 'asd5@asd', password: 'asd' });
        });
    });

    describe("salvando due nuovi users",function() {
        it("la lista deve contenere gli utenti inseriti", function(){
            database.registrazione("asd","asd","asd6@asd","asd");
            database.registrazione("ciao","ciao","ciao@ciao","ciao");
            expect(database.return_register()).toContain({ name: 'asd', surname: 'asd', email: 'asd6@asd', password: 'asd' });
            expect(database.return_register()).toContain({ name: 'ciao', surname: 'ciao', email: 'ciao@ciao', password: 'ciao' });
        });
    });

    describe("salvando un nuovo user già inserito",function() {
        it("la funzione non deve reinserire l'utente", function(){
            database.registrazione("asd","asd","asd7@asd","asd");
           	expect(database.registrazione("asd","asd","asd7@asd","asd")).toBeFalsy();
        });
    });

    describe("salvando un nuovo user con email uguale ad un user precedentemente inserito",function() {
        it("la funzione non deve reinserire l'utente", function(){
            database.registrazione("asd","asd","asd8@asd","asd");
           	expect(database.registrazione("ciao","ciao","asd8@asd","asd1")).toBeFalsy();
        });
    });

    describe("salvando un nuovo user con tutti i parametri uguali ad un user precedentemente inserito tranne l'email differente",function() {
        it("la funzione deve inserire l'utente correttamente", function(){
            database.registrazione("asd","asd","asd9@asd","asd");
           	expect(database.registrazione("asd","asd","qwe@qwe","asd")).toBeTruthy();
        });
    });

    describe("salvando un nuovo user con tutti i parametri diversi ad un user precedentemente inserito",function() {
        it("la funzione deve inserire l'utente correttamente", function(){
            database.registrazione("asd","asd","asd10@asd","asd");
           	expect(database.registrazione("c","c","c@c","c")).toBeTruthy();
        });
    });

    describe("salvando un nuovo utente",function() {
        it("la funzione deve restituire la password dell'utente", function(){
            database.registrazione("asd","asd","asd11@asd","asd");
           	expect(database.return_passwords()).toContain("asd");
        });
    });

    describe("salvando un nuovo utente",function() {
        it("la funzione deve restituire l'email dell'utente", function(){
            database.registrazione("asd","asd","asd12@asd","asd");
           	expect(database.return_emails()).toContain("asd@asd");
        });
    });
});

/*  Test login utente
 *  it checks:
 *  1   input errato, login con password sbagliata
 *  2   input errato, utente che non logga non altera il database
 *  3   input corretto, utente loggato altera il database
 *  4   input corretto, utente registrato si logga
 *  5   input corretto, utente non registrato non si logga
 *  6   input errato, user registrato inserisce parametri sbagliati
 */
describe("Test login utente",function() {

    describe("con utente registrato correttamente ma parametro sbagliato in fase di login",function() {
        it("la funzione deve non cambiare nel database il parametro sul check del login", function(){
        	database.registrazione("asd","asd","asd13@asd","asd");
        	database.login("asd13@asd","ciaociao");
           expect(database.loginCheck()).toBeFalsy();
        });    
    });

    describe("con utente che non esegue il login",function() {
        it("la funzione deve non cambiare nel database il parametro sul check del login", function(){
           expect(database.loginCheck()).toBeFalsy();
        });    
    });

    describe("con utente registrato correttamente",function() {
        it("la funzione deve cambiare nel database il parametro sul check del login", function(){
        	database.registrazione("asd","asd","asd14@asd","asd");
        	database.login("asd14@asd","asd");
           expect(database.loginCheck()).toBeTruthy();
        });    
    });

	describe("con utente precedentemente registrato",function() {
        it("la funzione deve loggare l'utente correttamente", function(){
        	database.registrazione("asd","asd","asd15@asd","asd");
           expect(database.login("asd15@asd","asd")).toBeTruthy();
        });    
    });

    describe("con utente non registrato",function() {
        it("la funzione deve non loggare l'utente", function(){
           expect(database.login("asd16@ciao","ciao")).toBeFalsy();
        });    
    });

    describe("con utente registrato correttamente ma inserisce un parametro sbagliato in fase di login",function() {
        it("la funzione deve non loggare l'utente", function(){
        	database.registrazione("asd","asd","asd@asd","asd");
           expect(database.login("asd16@asd","ciao")).toBeFalsy();
        });    
    });

});

/*  Test logout utente
 *  it checks:
 *  1   input corretto, utente loggato riesce a fare logout
 *  2   input errato, utente non loggato non effettua il logout
 */
describe("Test logout utente",function() {

    describe("con utente loggato correttamente",function() {
        it("la funzione deve sloggare l'utente", function(){
        	database.registrazione("asd","asd","asd17@asd","asd");
        	database.login("asd17@asd","asd");
           expect(database.exit()).toBeTruthy();
        });    
    });

    describe("con utente non loggato",function() {
        it("la funzione non deve sloggare l'utente", function(){
           expect(database.exit()).toBeFalsy();
        });    
    });

});





