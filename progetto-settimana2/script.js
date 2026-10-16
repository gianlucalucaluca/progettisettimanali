/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questo blocco.
- Puoi testare aprendo index.html nel browser e guardando la console (DevTools).
- Workflow consigliato: prima costruisci la Versione Base in HTML/CSS,
  poi torna qui per la Versione Intermedia (generazione griglia da array di prodotti)
  e per la Versione Avanzata (filtri, ordinamento, carrello dinamico, localStorage).
- Cerca solo cose non viste a lezione. Tutto il necessario è già stato spiegato in settimana.
*/


/* VERSIONE INTERMEDIA — array prodotti
   Crea l'array "prodotti" con almeno 12 oggetti.
   Ogni oggetto: nome, categoria, prezzo, rating (1-5), immagine, disponibile.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const prodotti = [
   {
      nome: "Cuffie wireless con cancellazione del rumore",
      categoria: "Elettronica",
      prezzo: 89.99,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Cuffie",
      disponibile: true
   },

   {
      nome: "Tablet 10 pollici 64GB",
      categoria: "Elettronica",
      prezzo: 199.00,
      rating: 5,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Tablet",
      disponibile: true
   },
   {
      nome: "Il romanzo dell'anno",
      categoria: "Libri",
      prezzo: 14.90,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Libro",
      disponibile: true
   },
   {
      nome: "Zaino da viaggio 30L impermeabile",
      categoria: "Abbigliamento",
      prezzo: 49.99,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Zaino",
      disponibile: true
   },
   {
      nome: "Lampada LED da scrivania orientabile",
      categoria: "Casa",
      prezzo: 29.50,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Lampada",
      disponibile: true
   },
   {
      nome: "Smartwatch fitness con GPS",
      categoria: "Elettronica",
      prezzo: 119.00,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Smartwatch",
      disponibile: true
   },
   {
      nome: "Mouse ergonomico wireless",
      categoria: "Elettronica",
      prezzo: 24.90,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Mouse",
      disponibile: true
   },
   {
      nome: "Caffettiera moka 6 tazze",
      categoria: "Casa",
      prezzo: 22.00,
      rating: 5,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Caffettiera",
      disponibile: true
   },
   {
      nome: "Felpa con cappuccio",
      categoria: "Abbigliamento",
      prezzo: 34.90,
      rating: 3,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Felpa",
      disponibile: true
   },
   {
      nome: "Giacca impermeabile",
      categoria: "Abbigliamento",
      prezzo: 79.00,
      rating: 4,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Giacca",
      disponibile: false
   },
   {
      nome: "Manuale di JavaScript",
      categoria: "Libri",
      prezzo: 32.00,
      rating: 5,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Manuale",
      disponibile: false
   },
   {
      nome: "Cuscino memory foam",
      categoria: "Casa",
      prezzo: 19.90,
      rating: 2,
      immagine: "https://placehold.co/300x300/EEEEEE/333333?text=Cuscino",
      disponibile: true
   }
];


/* VERSIONE INTERMEDIA — formattaPrezzo(prezzo)
   Funzione che ritorna una stringa tipo "€ 19,99".
   Esempio in console.log: Monitor: € 150,00
*/

/* SCRIVI QUI LA TUA RISPOSTA */
function formattaPrezzo(prezzo) {
   return `€ ${prezzo.toFixed(2).replace(".", ",")}`;
}
console.log(`Monitor: ${formattaPrezzo(150)}`);

/* VERSIONE INTERMEDIA — stelline(rating)
   Funzione che ritorna una stringa di stelline piene/vuote.
   Esempio: rating 3 → "★★★☆☆"
   Esempio in console.log: Monitor: rating 3 → "★★★☆☆"
*/

/* SCRIVI QUI LA TUA RISPOSTA */
function stelline(rating) {
   let risultato = "";
   for (let i = 1; i <= 5; i++) {
      risultato += i <= rating ? "★" : "☆";
   }
   return risultato;
}
console.log(`Monitor: rating 3 → "${stelline(3)}"`);

/* VERSIONE INTERMEDIA — Filtro per categoria
   Funzione che riceve il parametro categoria e filtra l'array prodotti mostrando solo i prodotti della categoria ricevuta
*/

/* SCRIVI QUI LA TUA RISPOSTA */
function filtraPerCategoria(categoria) {
   const trovati = [];
   for (const p of prodotti) {
      if (p.categoria === categoria) {
         trovati.push(p);
      }
   }
   return trovati;
}
console.table(filtraPerCategoria('Libri'));

/* VERSIONE INTERMEDIA — Filtro disponibilità e rating
   Funzione che genera un array filtrato dall'array prodotti, mostrando soltanto i prodotti disponibili con rating >= 3
*/

/* SCRIVI QUI LA TUA RISPOSTA */
function filtraDisponibili() {
   const risultato = [];
   for (const p of prodotti) {
      if (p.disponibile && p.rating >= 3) {
         risultato.push(p);
      }
   }
   return risultato;
}
console.log.table(filtraDisponibili());

/* --------------------------------------------------------------

/* VERSIONE AVANZATA — renderProdotti(lista)
   Funzione che, dato un array di prodotti, genera la griglia nel DOM.
   Niente HTML hard-coded per i prodotti: tutto generato dal JavaScript.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* VERSIONE AVANZATA — Aggiungi al carrello
   Quando si clicca il bottone "Aggiungi al carrello", incrementa il contatore
   nell'header (Carrello (0) → Carrello (1) → ...).
   Per i prodotti esauriti: bottone disabilitato e testo "Esaurito".
   Suggerimento: usa una closure come visto in aula
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* VERSIONE AVANZATA — Ordinamento
   Menu a tendina con: Prezzo crescente, Prezzo decrescente, Rating.
   Suggerimento: per rendere più leggibile la select puoi usare optgroup
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* VERSIONE AVANZATA — Riepilogo carrello
   Pagina carrello con elenco prodotti aggiunti, totale, bottone "Svuota".
   Concetto da scoprire: localStorage.setItem / localStorage.getItem.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* VERSIONE AVANZATA — localStorage
   Il carrello sopravvive al refresh della pagina.
   Concetto da scoprire: localStorage.setItem / localStorage.getItem.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
