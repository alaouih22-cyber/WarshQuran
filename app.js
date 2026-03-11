let currentPage = 1;
const img = document.getElementById('quran-page');
const pageDisplay = document.getElementById('page-num');
const loader = document.getElementById('loading-overlay');

// 1. Funzione per caricare la pagina
async function loadPage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;
    
    if (loader) loader.style.display = "block";

    // Se è la pagina 1, carica il tuo file locale 1.png
    // Altrimenti carica dal server Tajweed Warsh
    if (n === 1) {
        img.src = "1.png";
    } else {
        img.src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
    }

    img.onload = () => {
        if (loader) loader.style.display = "none";
        pageDisplay.textContent = n;
        preloadNext(n + 1);
    };

    img.onerror = () => {
        // Se c'è un errore, prova il server di emergenza
        img.src = `https://www.searchtruth.org/quran/images2/${n}.png`;
    };
}

// 2. Pre-caricamento per velocità
function preloadNext(n) {
    if (n <= 604) {
        const nextImg = new Image();
        nextImg.src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
    }
}

// 3. Funzioni di navigazione
function nextPage() { loadPage(currentPage + 1); }
function prevPage() { loadPage(currentPage - 1); }

// Gestione tocco sullo schermo (sinistra avanti, destra indietro)
function handleTap(e) {
    const x = e.clientX;
    const w = window.innerWidth;
    if (x < w / 2) {
        nextPage();
    } else {
        prevPage();
    }
}

// Avvio
window.onload = () => loadPage(1);
