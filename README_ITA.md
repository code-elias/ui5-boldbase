# UI5 Template

Autore: @eligolam  
Lingue: .xml, .js

## Come avviare

1. Installa i moduli node
```bash
npm i
```

2. Regola le Porte
   a. Imposta la porta node in **_package.json_**  
   b. Imposta la porta API in **_common.js_**  
   c. Imposta la porta yaml in **_ui5.yaml_**

3. Avvia la soluzione
```bash
npm start
```

---
## Gerarchia dei controller di base
UI5 non supporta ancora i moduli JS.
Per mantenere i controller ordinati, abbiamo deciso di utilizzare diversi controller **Base** per separare le logiche.

L'attuale **gerarchia delle dipendenze** è la seguente:  
[BaseController.js](./uimodule/webapp/controller/BaseController.js) > [BaseAjaxController.js](./uimodule/webapp/controller/BaseAjaxController.js) > [BaseAjaxResponseController.js](./uimodule/webapp/controller/BaseAjaxResponseController.js) > [BaseAjaxErrorController.js](./uimodule/webapp/controller/BaseAjaxErrorController.js) > [BaseErrorController.js](./uimodule/webapp/controller/BaseErrorController.js) > [BaseControllerProject.js](./uimodule/webapp/controller/BaseControllerProject.js)  

Tutti i controller nell'App devono dipendere da [BaseControllerProject.js](./uimodule/webapp/controller/BaseControllerProject.js).

### BaseController.js
Funzioni di utilità per operazioni comuni dell'app, inclusa la gestione dei modelli, il routing, la gestione della sessione, le richieste API e le notifiche agli utenti.

### BaseAjaxController.js
Funzioni per gestire le **richieste AJAX** con promise per le chiamate API. Include funzioni personalizzate per costruire le opzioni AJAX, gestire le risposte e gestire gli errori con proprietà personalizzate per una gestione degli errori flessibile.

#### Utilizzo
```js
BusyIndicator.show(0); // Mostra l'indicatore di caricamento durante la chiamata AJAX

this.getAjaxPromise(url, 'GET' /* Altre opzioni */)
  .then(response => {
    const oModel = new JSONModel(response)
    this.setModel(oModel, 'YourModel')
  })
  .catch(error => {
    MessageBox.error(error.Message);
    console.error("Errore:", error);
  })
  .finally(() => {
    BusyIndicator.hide(); // Nasconde l'indicatore di caricamento dopo la fine dell'AJAX
  })
```

### BaseAjaxResponseController.js
Gestisce le risposte AJAX, trattando direttamente i successi e processando gli errori con metadati personalizzati e logiche di gestione errori.

### BaseAjaxErrorController.js
Gestisce gli errori AJAX categorizzandoli in base alla loro origine (frontend o backend), imposta un modello di errore con informazioni dettagliate e visualizza una finestra di errore, adattandosi in base ai problemi di connessione, agli errori di autenticazione o agli errori specifici delle API.

### BaseErrorController.js
Gestione generale degli errori che consente una gestione e visualizzazione coerente degli errori all'interno dell'applicazione.

### BaseControllerProject.js
**Controller di base** con funzioni di utilità a livello di progetto per un uso coerente all'interno del progetto.