let currentPage = 1;
let isPlaying = false;

const imgElement = document.getElementById('quran-image');
const pageDisplay = document.getElementById('page-num');
const audio = document.getElementById('main-audio');

// Funzione per caricare la pagina
function loadPage(p) {
    if (p < 1 || p > 604) return;
    currentPage = p;
    // Usiamo il server di Quran.com per le immagini reali
    imgElement.src = `https://pro.quran.com/images/quran/muhammad_v2/${p}.png`;
    pageDisplay.textContent = `Pagina ${p}`;
    createFakeVerses(); // Rigenera aree cliccabili
}

// Crea aree invisibili cliccabili sopra l'immagine
function createFakeVerses() {
    const container = document.getElementById('verse-overlays');
    container.innerHTML = '';
    // Esempio: creiamo 5 aree orizzontali per simulare i versetti
    for(let i=1; i<=6; i++) {
        let v = document.createElement('div');
        v.className = 'verse-hitbox';
        v.style.top = (15 + (i * 10)) + '%';
        v.style.left = '10%';
        v.style.width = '80%';
        v.style.height = '8%';
        v.onclick = () => showTafsir(i);
        container.appendChild(v);
    }
}

function showTafsir(vNum) {
    const tafsirType = document.getElementById('tafsir-select').value;
    document.getElementById('modal-title').textContent = `Versetto ${vNum}`;
    document.getElementById('modal-body').textContent = `Caricamento Tafsir (${tafsirType}) per il versetto ${vNum} della pagina ${currentPage}... In un'app reale qui chiameremmo l'API di Quran.com.`;
    document.getElementById('tafsir-modal').classList.remove('hidden');
}

// Eventi
document.getElementById('next-page').onclick = () => loadPage(currentPage + 1);
document.getElementById('prev-page').onclick = () => loadPage(currentPage - 1);
document.getElementById('close-modal').onclick = () => document.getElementById('tafsir-modal').classList.add('hidden');

document.getElementById('play-pause-btn').onclick = function() {
    const reciter = document.getElementById('reciter-select').value;
    if(!isPlaying) {
        // Link audio di esempio (Sura Al-Fatiha)
        audio.src = `https://download.quranicaudio.com/quran/mishari_rashid_al-afasy/001.mp3`;
        audio.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
    }
    isPlaying = !isPlaying;
};

// Inizializza
loadPage(1);
