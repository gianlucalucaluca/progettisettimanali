/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questi commenti.
- Pattern fondamentale: stato -> render() -> eventi.
  Tutto cio' che vedi a schermo dipende dallo stato.
  Gli eventi modificano lo stato e poi chiamano render().
- Apri index.html nel browser. Apri la console (DevTools) per gli errori.
- Niente AI per generare codice. Niente template scaricati.
*/

/* STATO
   In cima al file definisci poche variabili globali:
   - un array di oggetti come dato principale (es. libri, ricette, film, ...)
   - una variabile per il filtro corrente
   - una variabile per l'ordinamento corrente
   - una variabile per la stringa di ricerca corrente
*/

/* SCRIVI QUI LA TUA RISPOSTA */
let film = [
  {
    id: 1,
    locandina: "https://placehold.co/300x450/EEEEEE/333333?text=Blade+Runner",
    titolo: "Blade Runner",
    regista: "Ridley Scott",
    anno: 1982,
    visto: true,
  },
  {
    id: 2,
    locandina: "https://placehold.co/300x450/EEEEEE/333333?text=Apocalypse+Now",
    titolo: "Apocalypse Now",
    regista: "Francis Ford Coppola",
    anno: 1979,
    visto: true,
  },
  {
    id: 3,
    locandina: "https://placehold.co/300x450/EEEEEE/333333?text=Oldboy",
    titolo: "Oldboy",
    regista: "Park Chan-wook",
    anno: 2003,
    visto: false,
  },
  {
    id: 4,
    locandina: "https://placehold.co/300x450/EEEEEE/333333?text=Il+padrino",
    titolo: "Il padrino",
    regista: "Francis Ford Coppola",
    anno: 1972,
    visto: true,
  },
  {
    id: 5,
    locandina: "https://placehold.co/300x450/EEEEEE/333333?text=The+Irishman",
    titolo: "The Irishman",
    regista: "Martin Scorsese",
    anno: 2019,
    visto: false,
  },
];
let ricerca = "";

const listaFilm = document.querySelector("#lista-film");
const numTotale = document.querySelector("#num-totale");
const numVisti = document.querySelector("#num-visti");
const numDaVedere = document.querySelector("#num-da-vedere");
const barraVisti = document.querySelector("#barra-visti");
const formFilm = document.querySelector("#form-film");
const inputTitolo = document.querySelector("#titolo");
const inputRegista = document.querySelector("#regista");
const inputAnno = document.querySelector("#anno");
const inputLocandina = document.querySelector("#locandina");
const selectVisto = document.querySelector("#visto");
const erroreForm = document.querySelector("#errore");

/* RENDER()
   Una sola funzione che ridipinge la lista. A ogni chiamata:
   1) parte dall'array completo,
   2) filtra,
   3) ordina,
   4) svuota il container DOM,
   5) ricrea gli elementi DOM per gli oggetti risultanti.
   Aggiorna anche conteggi e statistiche.
   Salva lo stato in localStorage in fondo a render() (cerca tu come funziona).
*/

/* SCRIVI QUI LA TUA RISPOSTA */
function render() {
  listaFilm.innerHTML = "";

  film.forEach((unFilm) => {
    const card = document.createElement("article");
    card.classList.add("card");
    const classe = unFilm.visto ? "visto" : "da-vedere";
    card.classList.add(classe);
    card.innerHTML = `<img src="${unFilm.locandina}" alt="${unFilm.titolo}">
    <h3>${unFilm.titolo}</h3><p>${unFilm.regista}—${unFilm.anno}</p><button class='elimina' data-id='${unFilm.id}'>Elimina</button>`;
    listaFilm.appendChild(card);
  });
}

/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
formFilm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titolo = inputTitolo.value.trim();
  const regista = inputRegista.value.trim();
  const anno = inputAnno.value.trim();
  const locandina = inputLocandina.value.trim();
  const visto = selectVisto.value.trim();

  if (titolo === "" || regista === "" || anno === "") {
    erroreForm.textContent = "Compila titolo, regista e anno";
    return;
  }
  const nuovoFilm = {
    id: Date.now(),
    titolo: titolo,
    regista: regista,
    anno: Number(anno),
    visto: visto === 'si',
    locandina: locandina !== '' ? locandina : `https://placehold.co/300x450/EEEEEE/333333?text=${titolo}`
  };
  film.push(nuovoFilm);
  formFilm.reset();
  erroreForm.textContent = '';
  render();
});


/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* NOTIFICHE TEMPORANEE
   Funzione notifica(testo) che imposta il testo del <div id="notifica">,
   lo mostra (display: block), poi dopo 3000ms (setTimeout) lo nasconde.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* TEMA CHIARO/SCURO
   Un button che chiama document.body.classList.toggle("dark").
   In CSS scrivi le regole opposte (es. body.dark { background: #111; ... }).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* PERSISTENZA — localStorage (cerca tu su MDN)
   - In fondo a render(), salva lo stato:
       localStorage.setItem("dati", JSON.stringify(stato));
   - All'avvio, prima della prima render(), carica:
       const salvato = localStorage.getItem("dati");
       if (salvato) stato = JSON.parse(salvato);
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RIORDINO ↑ ↓
   Due button su ogni elemento. Click su ↑ scambia con il precedente nell'array,
   ↓ con il successivo. Event delegation. Poi render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* STATISTICHE GRAFICHE
   Almeno due indicatori: contatori grandi e/o barre orizzontali
   (<div> con width: X% in base al dato). Aggiorna dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* MULTI-VISTA — lista / card / tabella
   Una variabile globale "vista" che render() legge per decidere quale HTML
   produrre. Tre button cambiano "vista" e chiamano render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* CATEGORIE
   Aggiungi un campo categoria nello schema. Nel form un <select> per sceglierla.
   In render(), raggruppa con reduce in { categoria: [elementi] } e disegna un
   header per categoria con sotto la lista di quella categoria.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

render();
