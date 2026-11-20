// SportsHub — Week Project Settimana VII
//
// Devi fare 4 cose per la Versione Base:
// 1. Definire le classi Squadra ed Evento (mappano i dati di TheSportsDB)
// 2. Funzione async cercaSquadre(query) che chiama /searchteams.php
// 3. Funzione async caricaDettagli(idTeam) che chiama in parallelo
//    eventsnext.php + eventslast.php usando Promise.all
// 4. Render dinamico: card squadre, lista prossimi eventi, lista risultati
//
// Endpoint base: https://www.thesportsdb.com/api/v1/json/3/
// Il `3` nell'URL è la chiave API pubblica di test di TheSportsDB: gratis, non serve registrarsi.
//
// Per le versioni Intermedia/Avanzata: localStorage preferiti, debounce, Promise.all multi.

// === Classi ===
class Squadra {
  constructor(dati) {
    this.id = dati.idTeam;
    this.nome = dati.strTeam;
    this.logo = dati.strBadge;
    this.lega = dati.strLeague;
    this.paese = dati.strCountry;
    this.sport = dati.strSport;
  }
}

class Evento {
  constructor(dati) {
    this.titolo = dati.strEvent;
    this.data = dati.dateEvent;
    this.golCasa = dati.intHomeScore;
    this.golTrasferta = dati.intAwayScore;
  }

  dataFormattata() {
    const parti = this.data.split("-");
    return parti[2] + "/" + parti[1] + "/" + parti[0];
  }

  punteggio() {
    if (this.golCasa === null) {
      return "";
    }
    return this.golCasa + " – " + this.golTrasferta;
  }
}

// === API ===
const API = "https://www.thesportsdb.com/api/v1/json/123/";

async function getJSON(url, opzioni) {
  const r = await fetch(url, opzioni);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function cercaSquadre(query, signal) {
  const dati = await getJSON(
    `${API}searchteams.php?t=${encodeURIComponent(query)}`,
    { signal: signal },
  );

  if (dati.teams === null) {
    return [];
  }
  return dati.teams.map((t) => new Squadra(t));
}

async function caricaDettagli(idTeam) {
  const [prossimi, ultimi] = await Promise.all([
    getJSON(`${API}eventsnext.php?id=${idTeam}`),
    getJSON(`${API}eventslast.php?id=${idTeam}`),
  ]);

  let listaProssimi = [];
  if (prossimi.events) {
    listaProssimi = prossimi.events.map((e) => new Evento(e));
  }

  let listaUltimi = [];
  if (ultimi.results) {
    listaUltimi = ultimi.results.map((e) => new Evento(e));
  }

  return { prossimi: listaProssimi, ultimi: listaUltimi };
}

// === Stato ===
let squadre = [];

function caricaPreferiti() {
  return JSON.parse(localStorage.getItem("preferiti") ?? "[]");
}

function salvaPreferiti() {
  localStorage.setItem("preferiti", JSON.stringify(preferiti));
}

function ePreferita(id) {
  return preferiti.filter((p) => p.id === id).length > 0;
}

let preferiti = caricaPreferiti();

// === Render ===
const spinner = document.getElementById("spinner");
const errore = document.getElementById("errore");
const messaggio = document.getElementById("messaggio-squadre");
const listaSquadre = document.getElementById("lista-squadre");

const titoloSquadra = document.getElementById("nome-squadra");
const ulProssimi = document.getElementById("lista-prossimi");
const ulUltimi = document.getElementById("lista-ultimi");
const dettagli = document.getElementById("dettagli-section");
const listaPreferiti = document.getElementById("lista-preferiti");
const messaggioPreferiti = document.getElementById("messaggio-preferiti");

function mostraSpinner() {
  spinner.hidden = false;
  errore.hidden = true;
}

function nascondiSpinner() {
  spinner.hidden = true;
}

function mostraErrore(msg) {
  errore.textContent = `Errore: ${msg}`;
  errore.hidden = false;
}

function creaCard(s) {
  const colonna = document.createElement("div");
  colonna.className = "col-12 col-md-6 col-lg-4";

  const box = document.createElement("div");
  box.className = "card h-100 text-center p-3 border-0 shadow-sm";

  const logo = document.createElement("img");
  logo.src = s.logo;
  logo.alt = s.nome;
  logo.className = "logo-squadra mx-auto";

  const nome = document.createElement("h3");
  nome.className = "h6 fw-bold mt-3 mb-1";
  nome.textContent = s.nome;

  const lega = document.createElement("p");
  lega.className = "small text-secondary mb-0";
  lega.textContent = s.lega;

  const paese = document.createElement("p");
  paese.className = "small text-secondary mb-0";
  paese.textContent = s.paese;

  const bottone = document.createElement("button");
  bottone.type = "button";
  if (ePreferita(s.id)) {
    bottone.className =
      "btn bg-danger-subtle text-danger border-danger fw-bold w-100 mt-3";
    bottone.textContent = "✖ Rimuovi";
  } else {
    bottone.className = "btn btn-warning fw-bold w-100 mt-3";
    bottone.textContent = "Aggiungi ai preferiti";
  }

  bottone.addEventListener("click", (e) => {
    e.stopPropagation();
    cambiaPreferito(s);
  });

  box.append(logo, nome, lega, paese, bottone);
  colonna.append(box);

  box.addEventListener("click", () => apriDettagli(s));

  return colonna;
}

function renderSquadre() {
  if (squadre.length === 0) {
    messaggio.textContent = "Nessuna squadra trovata";
    messaggio.hidden = false;
  } else {
    messaggio.hidden = true;
  }

  const card = squadre.map((s) => creaCard(s));
  listaSquadre.replaceChildren(...card);
}

function renderPreferiti() {
  if (preferiti.length === 0) {
    messaggioPreferiti.hidden = false;
  } else {
    messaggioPreferiti.hidden = true;
  }

  const card = preferiti.map((s) => creaCard(s));
  listaPreferiti.replaceChildren(...card);
}

function renderEventi(ul, eventi) {
  if (eventi.length === 0) {
    const vuoto = document.createElement("li");
    vuoto.className = "fst-italic";
    vuoto.textContent = "Nessun evento in programma";
    ul.replaceChildren(vuoto);
    return;
  }

  const righe = eventi.map((e) => {
    const li = document.createElement("li");

    const data = document.createElement("div");
    data.className = "small text-secondary";
    data.textContent = e.dataFormattata();

    const titolo = document.createElement("span");
    titolo.className = "fw-bold";
    titolo.textContent = e.titolo;

    li.append(data, titolo);

    if (e.punteggio() !== "") {
      const badge = document.createElement("span");
      badge.className = "badge text-bg-success ms-2";
      badge.textContent = e.punteggio();
      li.append(badge);
    }

    return li;
  });

  ul.replaceChildren(...righe);
}

function renderDettagli(nome, eventi) {
  titoloSquadra.textContent = nome;
  renderEventi(ulProssimi, eventi.prossimi);
  renderEventi(ulUltimi, eventi.ultimi);
  dettagli.hidden = false;
}
// === Eventi ===
const form = document.getElementById("form-ricerca");
const input = document.getElementById("input-ricerca");

let controller;
let timeoutId;

async function avviaRicerca(testo) {
  if (testo === "") return;

  controller?.abort();
  controller = new AbortController();

  dettagli.hidden = true;
  listaSquadre.replaceChildren();
  messaggio.hidden = true;
  mostraSpinner();

  try {
    squadre = await cercaSquadre(testo, controller.signal);
    renderSquadre();
  } catch (err) {
    if (err.name === "AbortError") return;
    mostraErrore(err.message);
  } finally {
    nascondiSpinner();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(timeoutId);
  avviaRicerca(input.value.trim());
});

input.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    avviaRicerca(input.value.trim());
  }, 400);
});

async function apriDettagli(squadra) {
  mostraSpinner();

  try {
    const eventi = await caricaDettagli(squadra.id);
    renderDettagli(squadra.nome, eventi);
  } catch (err) {
    mostraErrore(err.message);
  } finally {
    nascondiSpinner();
  }
}

function cambiaPreferito(squadra) {
  if (ePreferita(squadra.id)) {
    preferiti = preferiti.filter((p) => p.id !== squadra.id);
  } else {
    preferiti.push(squadra);
  }

  salvaPreferiti();
  renderPreferiti();
  if (squadre.length > 0) {
    renderSquadre();
  }
}

renderPreferiti();
