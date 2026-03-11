// Database semplificato per la gestione delle Sure
const surahData = [
    {id:1, name:"الفاتحة", p:1}, {id:2, name:"البقرة", p:2}, {id:3, name:"آل عمران", p:50},
    // ... il resto del database è già memorizzato nel browser
];

let currentPage = 1;
const img = document.getElementById('quran-img'); // Assicurati che l'ID nell'HTML sia 'quran-img'
const pageNumDisplay = document.getElementById('page-num');
const loader = document.getElementById('loading');

// 1. Funzione Principale per caricare la pagina
function loadPage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;
    
    if(loader) loader.style.display = "block";

    // LOGICA DI CARICAMENTO:
    // Se è la pagina 1, usa il tuo file locale.
    // Altrimenti usa il server remoto.
    if (n === 1) {
        img.src = "1.png";
    } else {
        // Usiamo un server affidabile per le altre 603 pagine
        img.src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
    }

    img.onload = () => {
        if(loader) loader.style.display = "none";
        pageNumDisplay.textContent = n;
        
        // Pre-carica la pagina successiva in segreto per la velocità
        preloadNext(n + 1);
    };

    img.onerror = () => {
        console.error("Errore nel caricamento della pagina " + n);
        if(loader) loader.textContent = "Errore... riprova";
    };
}

// 2. Funzione per il pre-caricamento (rende l'app fluida)
function preloadNext(n) {
    if (n <= 604) {
        const nextImg = new Image();
        nextImg.src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
    }
}

// 3. Funzioni di Navigazione
function nextPage() {
    if (currentPage < 604) loadPage(currentPage + 1);
}

function prevPage() {
    if (currentPage > 1) loadPage(currentPage - 1);
}

// 4. Inizializzazione al caricamento
window.onload = () => {
    loadPage(currentPage);
};
