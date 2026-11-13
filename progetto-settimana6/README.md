# Atelier — Studio di architettura

Progetto settimanale **S6/L5** (Unit 2, Week 6) del corso Epicode AI Full-Stack Developer.

Sito di una pagina per **Atelier**, uno studio di architettura inventato.
Dal menu si va alle varie sezioni della pagina.

## Con cosa è fatto

- **HTML** HTML statico: tutte le card e i testi sono scritti direttamente in index.html (niente card generate con JavaScript)
- **Bootstrap 5.3** (collegato da CDN) per griglia, navbar, card, form e modal
- **CSS** per i colori del brand e pochi ritocchi

Non ho usato SASS e non ho scritto JavaScript mio:
l'hamburger e i modal li fa funzionare il JavaScript di Bootstrap.

## Struttura delle cartelle

```
progetto-settimana6/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── img/          (le 6 foto dei lavori)
```

## Versione Base

- **Navbar**: logo a sinistra e link a destra. Sotto i 768px diventa un menu a hamburger. Resta in cima mentre scorri.
- **Hero**: titolo, sottotitolo e bottone "Inizia un progetto" che porta ai contatti, centrati su sfondo marrone.
- **Servizi**: 3 card con icona. Su mobile stanno una sotto l'altra, da tablet in su sono affiancate.
- **Contatti**: form con Nome, Email, Tipo di progetto e Messaggio, stretto e centrato.
- **Footer**: 3 colonne (Atelier e indirizzo / Link / Contatti) e copyright in fondo.
- **Colori**: ho cambiato il blu di Bootstrap (`.bg-primary`, `.text-primary`, `.btn-primary`) con il marrone del brand.

## Extra svolti

### Dalla Versione Intermedia
- **Sezione Lavori**: 6 card con foto, titolo, anno e categoria.
  1 card per riga su mobile, 2 su tablet, 3 su desktop.
- **Transizioni**: le card si alzano e l'ombra cresce quando ci passi sopra. I link del footer cambiano colore con una leggera sfumatura.

### Dalla Versione Avanzata
- **Modal "Dettagli lavoro"**: cliccando su una card dei lavori si apre una finestra con la foto grande e la descrizione completa.
  Funziona solo con gli attributi di Bootstrap (`data-bs-toggle="modal"` e `data-bs-target`), senza JavaScript mio.

## Cosa non ho fatto

- Filtri dei lavori, tema scuro e validazione del form, perché richiedono JavaScript
- Mixin e partial SASS, perché non ho usato SASS

## Crediti

Foto dei lavori da [Unsplash](https://unsplash.com).
