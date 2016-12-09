# SE2_16_173209_157597_P
## SWEng2: **Applicazione per Università**

### Sviluppatori:
- Bizzotto Claudio, 157597
- Dolzani Michael, 173209

## Descrizione Progetto:
Abbiamo realizzato l'applicazione di cui avevamo fatto il mockup (https://invis.io/4Q9080XBS).
La schermata home.html è a immagine e somiglianza del mockup, da lì è possibile registrarsi per poi accedere. Una volta che si ha eseguito l'accesso sarà possibile proseguire nella visione delle petizioni.

Funzionalità implementate:
 - *Registrazione*: è possibile creare un account;
 - *Login*: accedere al proprio account;
 - *Viasualizza petizioni*: vengono distinte per tipologia, università o città;
 - *Check petizioni*: per partecipare alle petizioni tramite il checkbox;
 - *Aggiungi petizioni*: per aggiungere una nuova petizione;
 - *Esci*: è possibile eseguire il logout dall'account.

## Link heroku


## Dettagli tecnici
```
home.html
```
 - Bottone **registrati**: per accedere alla pagina `registrazione.html`;
 - Bottone **login**: per accedere alla pagina `login.html`;
 - **Petizioni**: immagine cliccabile dalla quale si accedere a `petizioni.html` solo previo login.
```
registrazione.html
```
 - Contiene un **form** da compilare:
	 - **Email** deve rispettare la sintassi *example@domani.com* e non deve essere già presente nel database;
	 - **Name** e **Surname** non devono contenere numeri;
 - Bottone **Registrati** per inviare i dati al server;
 - Bottone **Indietro** per tornare alla pagina precedente.
Se la registrazione avviene correttamente l'utente sarà indirizzato alla pagina `home.html`.
```
login.html
```
 - Contiene un **form** da compilare:
	 - **Email** e **Password** devono essere correttamente inseriti;
 - Bottone **ok**: per inviare i dati al server;
 - Bottone **Indietro** per tornare alla pagina precedente;
 Se il login avviene con successo si verrà indirizzati alla pagina `login_home.html`.
```
login_home.html
```
 - Bottone **exit**: per effettuare il logout, e rimanda a `home.html`;
 - **Petizioni**: immagine cliccabile dalla quale si accedere a `petizioni.html`.
```
petizioni.html
```    
 - Bottone **exit**: per effettuare il logout, e rimanda a `home.html`;
 - Bottone **Indietro**: per tornare alla pagina precedente;
 - Bottone **Aggiungi Petizione**: manda a `add_petizione.html`;
 - Bottoni **Tutte, Città, Università** per scegliere la tipologia di petizioni che si vuole vedere (da cliccare per visualizzare le petizioni).
```
add_petizione.html
```    
 - Bottone **Indietro**: per tornare alla pagina precedente
 - Contiene un **form** da compilare:
	 - **Titolo** non deve essere già presente nel database;
	 - **Descrizione** della petizione;
	 - **Checkbox** per scegliere la tipologia della petizione (uno dei due deve essere checkato);
 - Bottone **Ok** per inviare i dati al server;
 Se la petizione viene inserita con successo si viene indirizzati alla pagina `petizioni.html`.
 
 
