let currentPage = 392; // Partiamo dalla pagina dello screenshot

const qImg = document.getElementById('quran-img');
const pLabel = document.getElementById('page-num');

function loadQuranPage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;

    // Usiamo un server affidabile per le immagini Tajweed
    // Nota: il numero deve essere formattato correttamente
    qImg.src = `https://www.searchtruth.org/quran/images2/${n}.png`;
    
    pLabel.textContent = `صفحة ${n}`;
    
    // Scroll automatico in alto quando cambi pagina
    window.scrollTo(0,0);
}

// Bottoni Avanti/Indietro
document.getElementById('btn-next').onclick = () => loadQuranPage(currentPage - 1); // Nel Corano si legge da destra a sinistra
document.getElementById('btn-prev').onclick = () => loadQuranPage(currentPage + 1);

// Gestione Play Audio (Esempio)
let isPlaying = false;
document.getElementById('play-pause').onclick = function() {
    isPlaying = !isPlaying;
    this.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
};

// Inizializza l'app
loadQuranPage(currentPage);
