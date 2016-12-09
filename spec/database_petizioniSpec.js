//test database_petizioni.js sulla gestione delle petizioni

//petizioni manager
var database = require('../datacenter/database_petizioni.js');

/*  Test inserimento petizione
 *  it checks:
 *  1   input corretto, nuova petizione inserita correttamente
 *  2   input falso, nuova petizione con titolo uguale ad una già inserita
 *  3   input corretto, salvare una petizione e restituirla
 *  4   input corretto, salvare una petizione e verificare che il numero di like sia 0
 */
describe("Test inserimento petizione",function() {

	describe("con una nuova petizione mai inserita prima",function() {
        it("la funzione la deve inserire correttamente", function(){
           expect(database.insert_petizione("Title","testo petizione","Università")).toBeTruthy();
        });    
    });

    describe("con una nuova petizione ma con titolo uguale ad una precedente",function() {
        it("la funzione non deve inserire la petizione", function(){
            database.insert_petizione("Title1","testo petizione","Università");
           expect(database.insert_petizione("Title1","testo petizione","Università")).toBeFalsy();
        });    
    });

    describe("salvando una petizione",function() {
        it("la funzione deve restituirmi la petizione inserita", function(){
            database.insert_petizione("Title2","testo petizione","Università");
           expect(database.return_petizioni()).toContain({ title: 'Title2', petizione: 'testo petizione', type: 'Università'});
        });    
    });

    describe("salvando una petizione",function() {
        it("la funzione deve restituirmi il numero dei like", function(){
            database.insert_petizione("Title3","testo petizione","Università");
           expect(database.return_like()).toContain(0);
        });    
    });
    
});