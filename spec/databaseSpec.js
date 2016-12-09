//test database.js sulla gestione utenti

//user manager
var database = require('../datacenter/database.js');

/*  Test login_check utente
 *  it checks:
 *  1   input errato
 */
describe("Test login_check utente",function() {

	describe("con un utente non loggato",function() {
        it("la funzione lo deve ritornarmi false", function(){
           expect(database.loginCheck()).toBeFalsy();
        });    
    });

});
