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

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function cercaSquadre(query) {
  const dati = await getJSON(
    `${API}searchteams.php?t=${encodeURIComponent(query)}`,
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

// === Render ===
const spinner = document.getElementById("spinner");
const errore = document.getElementById("errore");
const messaggio = document.getElementById("messaggio-squadre");
const listaSquadre = document.getElementById("lista-squadre");

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

function renderSquadre() {
  if (squadre.length === 0) {
    messaggio.textContent = "Nessuna squadra trovata";
    messaggio.hidden = false;
  } else {
    messaggio.hidden = true;
  }

  const card = squadre.map((s) => {
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

    box.append(logo, nome, lega, paese);
    colonna.append(box);

    box.addEventListener("click", () => apriDettagli(s));

    return colonna;
  });

  listaSquadre.replaceChildren(...card);
}
// === Eventi ===
