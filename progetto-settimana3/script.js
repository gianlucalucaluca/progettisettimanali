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
    locandina: "img/blade-runner.jpg",
    titolo: "Blade Runner",
    regista: "Ridley Scott",
    anno: 1982,
    visto: true,
  },
  {
    id: 2,
    locandina: "img/apocalypse-now.jpg",
    titolo: "Apocalypse Now",
    regista: "Francis Ford Coppola",
    anno: 1979,
    visto: true,
  },
  {
    id: 3,
    locandina: "img/oldboy.jpg",
    titolo: "Oldboy",
    regista: "Park Chan-wook",
    anno: 2003,
    visto: false,
  },
  {
    id: 4,
    locandina: "img/il-padrino.jpg",
    titolo: "Il padrino",
    regista: "Francis Ford Coppola",
    anno: 1972,
    visto: true,
  },
  {
    id: 5,
    locandina: "img/the-irishman.jpg",
    titolo: "The Irishman",
    regista: "Martin Scorsese",
    anno: 2019,
    visto: false,
  },

  {
    id: 6,
    locandina: "img/snatch.jpg",
    titolo: "Snatch",
    regista: "Guy Ritchie",
    anno: 2000,
    visto: true,
  },
  {
    id: 7,
    locandina: "img/barry-lyndon.jpg",
    titolo: "Barry Lyndon",
    regista: "Stanley Kubrick",
    anno: 1975,
    visto: false,
  },
  {
    id: 8,
    locandina: "img/interstellar.jpg",
    titolo: "Interstellar",
    regista: "Christopher Nolan",
    anno: 2014,
    visto: false,
  },
];
let ricerca = "";
let idInModifica = null;

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
const inputRicerca = document.querySelector("#ricerca");
const btnTema = document.querySelector("#btn-tema");

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

  const filmVisibili = film.filter(
    (f) =>
      f.titolo.toLowerCase().includes(ricerca) ||
      f.regista.toLowerCase().includes(ricerca),
  );

  filmVisibili.forEach((unFilm) => {
    const card = document.createElement("article");
    card.classList.add("card");
    const classe = unFilm.visto ? "visto" : "da-vedere";
    card.classList.add(classe);

    if (unFilm.id === idInModifica) {
      card.innerHTML = `
        <img src="${unFilm.locandina}" alt="${unFilm.titolo}">
        <input type="text" class="campo-modifica mod-titolo" value="${unFilm.titolo}">
        <input type="text" class="campo-modifica mod-regista" value="${unFilm.regista}">
        <input type="number" class="campo-modifica mod-anno" value="${unFilm.anno}">
        <input type="text" class="campo-modifica mod-locandina" value="${unFilm.locandina}">
        <select class="campo-modifica mod-visto">
          <option value="no">Da vedere</option>
          <option value="si">Visto</option>
        </select>
                <button class="salva">Salva</button>`;
      card.querySelector(".mod-visto").value = unFilm.visto ? "si" : "no";
    } else {
      card.innerHTML = `<img src="${unFilm.locandina}" alt="${unFilm.titolo}">
        <h3>${unFilm.titolo}</h3><p>${unFilm.regista}—${unFilm.anno}</p>
        <button class="modifica" data-id="${unFilm.id}">Modifica</button>
        <button class="elimina" data-id="${unFilm.id}">Elimina</button>`;
    }
    listaFilm.appendChild(card);
  });

  const totale = film.length;
  const visti = film.filter((f) => f.visto).length;
  const daVedere = totale - visti;

  numTotale.textContent = totale;
  numVisti.textContent = visti;
  numDaVedere.textContent = daVedere;

  const percentuale = totale === 0 ? 0 : Math.round((visti / totale) * 100);
  barraVisti.style.width = `${percentuale}%`;
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
    visto: visto === "si",
    locandina:
      locandina !== ""
        ? locandina
        : `https://placehold.co/300x450/EEEEEE/333333?text=${titolo}`,
  };
  film.push(nuovoFilm);
  formFilm.reset();
  erroreForm.textContent = "";
  render();
});

/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
function salvaModifica(card) {
  const filmDaCambiare = film.find((f) => f.id === idInModifica);

  filmDaCambiare.titolo = card.querySelector(".mod-titolo").value.trim();
  filmDaCambiare.regista = card.querySelector(".mod-regista").value.trim();
  filmDaCambiare.anno = Number(card.querySelector(".mod-anno").value);
  filmDaCambiare.locandina = card.querySelector(".mod-locandina").value.trim();
  filmDaCambiare.visto = card.querySelector(".mod-visto").value === "si";

  idInModifica = null;
  render();
}

listaFilm.addEventListener("click", (event) => {
  if (event.target.classList.contains("elimina")) {
    const id = Number(event.target.dataset.id);
    film = film.filter((f) => f.id !== id);
    render();
  }

  if (event.target.classList.contains("modifica")) {
    idInModifica = Number(event.target.dataset.id);
    render();
  }

  if (event.target.classList.contains("salva")) {
    salvaModifica(event.target.parentNode);
  }
});

listaFilm.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    event.target.classList.contains("campo-modifica")
  ) {
    salvaModifica(event.target.parentNode);
  }
});

/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
inputRicerca.addEventListener("input", (event) => {
  ricerca = event.target.value.trim().toLowerCase();
  render();
});

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
btnTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnTema.textContent = document.body.classList.contains("dark")
    ? "Tema chiaro"
    : "Tema scuro";
});

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
