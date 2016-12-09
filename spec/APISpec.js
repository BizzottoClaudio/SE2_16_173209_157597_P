//test sulle funzionalità del server.js

var request = require("request");
var base_url = "http://localhost:5000";

/*  Test /login_check
 *  it checks if the server answers with 200 code header
 */
describe("Test /login_check", function() {
    it("deve ritornare 200",function(done) {
        request.post(
            base_url + "/login_check",
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        
    }); 
});

/*  Test /exit
 *  it checks if the server answers with 200 code header
 */
describe("Test /exit", function() {
    it("deve ritornare 200",function(done) {
        request.post(
            base_url + "/exit",
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        
    }); 
});

/*  Test /load_petizioni
 *  it checks if the server answers with 200 code header
 */
describe("Test /load_petizioni", function() {
    it("deve ritornare 200",function(done) {
        request.post(
            base_url + "/load_petizioni",
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        
    }); 
});

requestJSON = require('request-json');
//simulo il client
var client = requestJSON.createClient(base_url);

/*  Test /registrazione
 *  it checks:
 *  1   input corretto, answer is 200
 *  2   input errato, answer is 406
 *  3   input errato, answer is 406
 *  4   input errato, answer is 406
 *  5   input errato, answer is 406
 *  6   input errato, answer is 406
 *  7   input errato, answer is 406
 */
describe("Test /registrazione", function() {
    
    var data1 = {name: 'asd', surname: 'asd', email: 'asd@asd.it', password: 'asd'};
    it("deve ritornare 200", function(done) {
        client.post(
            base_url + "/registrazione", data1,
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 

    var data2 = {name: '', surname: 'asd', email: 'asd@asd.it', password: 'asd'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/registrazione", data2,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    }); 

    var data3 = {name: 'asd', surname: '', email: 'asd@asd.it', password: 'asd'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/registrazione", data3,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
        
    });

    var data4 = {name: 'asd', surname: 'asd', email: '', password: 'asd'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/registrazione", data4,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
        
    });

    var data5 = {name: 'asd', surname: 'asd', email: 'asd@asd.it', password: ''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/registrazione", data5,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
        
    });

    var data6 = {name: '', surname: '', email: '', password: ''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/registrazione", data6,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
        
    }); 

    var data7 = {name: 'asd', surname: '', email: '', password: 'asd'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/registrazione", data7,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
        
    }); 
});

/*  Test /login
 *  it checks:
 *  1   input corretto, answer is 200
 *  2   input errato, answer is 406
 *  3   input errato, answer is 406
 *  4   input errato, answer is 406
 */
describe("Test /login", function() {
    var data1 = {email: 'asd@asd.it', password: 'asd'};
    it("deve ritornare 200", function(done) {
        client.post(
            base_url + "/login", data1,
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 

    var data2 = {email: 'asd@asd.it', password: ''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/login", data2,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });

    var data3 = {email: '', password: 'asd'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/login", data3,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });

    var data4 = {email: '', password: ''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/login", data4,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });
});

/*  Test /add_check_petizioni
 *  it checks:
 *  1   input corretto, answer is 200
 *  2   input errato, answer is 406
 */
describe("Test /add_check_petizioni", function() {
    var data1 = {title: 'Titolo della petizione'};
    it("deve ritornare 200", function(done) {
        client.post(
            base_url + "/add_check_petizioni", data1,
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 

    var data2 = {title: ''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/add_check_petizioni", data2,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    }); 
});

/*  Test /add_petizione
 *  it checks:
 *  1   input corretto, answer is 200
 *  2   input errato, answer is 406
 *  3   input errato, answer is 406
 *  4   input errato, answer is 406
 *  5   input errato, answer is 406
 *  6   input errato, answer is 406
 */
describe("Test /add_petizione", function() {
    var data1 = {title: 'Titolo', description: 'descrizione', type:'Università'};
    it("deve ritornare 200", function(done) {
        client.post(
            base_url + "/add_petizione", data1,
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    });  

    var data2 = {title: 'Titolo', description: 'descrizione', type:''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/add_petizione", data2,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });

    var data3 = {title: 'Titolo', description: '', type:'Università'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/add_petizione", data3,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });

    var data4 = {title: '', description: 'descrizione', type:'Università'};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/add_petizione", data4,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });

    var data5 = {title: '', description: '', type:''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/add_petizione", data5,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });

    var data6 = {title: '', description: 'descrizione', type:''};
    it("deve ritornare 406", function(done) {
        client.post(
            base_url + "/add_petizione", data6,
            function(error, response, body) {
                expect(response.statusCode).toBe(406);
                done();
            });
    });
});