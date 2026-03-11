let currentPage = 1;
let isPlaying = false;
let currentVerse = 1;
const audio = document.getElementById('audio-engine');
const img = document.getElementById('quran-page-img');

// Funzione Caricamento Pagina
function loadQuranPage(pageNum) {
    if (pageNum < 1 || pageNum > 604) return;
    currentPage = pageNum;
    
    // Nuovo URL stabile per le immagini
    const imgUrl = `https://raw.githubusercontent.com/mustafa0x/quran-images/main/png-640/${pageNum}.png`;
    img.src = imgUrl;
    
    document.getElementById('page-number-display').textContent = `Pagina ${pageNum}`;
    generateVerseHotspots();
}

// Genera aree invisibili per i versetti
function generateVerseHotspots() {
    const container = document.getElementById('verse-map');
    container.innerHTML = '';
    // Simuliamo 8 righe di versetti cliccabili per pagina
    for(let i=1; i<=8; i++) {
        const div = document.createElement('div');
        div.className = 'verse-area';
        div.style.top = (12 + (i * 9)) + '%';
        div.style.left = '10%';
        div.style.width = '80%';
        div.style.height = '7%';
        div.onclick = () => openTafsir(i);
        container.appendChild(div);
    }
}

function openTafsir(v) {
    currentVerse = v;
    const tafsir = document.getElementById('tafsir-select').value;
    document.getElementById('modal-title').textContent = `Sura ${currentPage}, Versetto ${v}`;
    document.getElementById('modal-content').innerHTML = `
        <p style="color:var(--accent)"><b>Tafsir selezionato: ${tafsir}</b></p>
        <p>In questa sezione viene visualizzata la spiegazione dettagliata del versetto. 
        L'app recupera i dati dal database locale o via API per fornirti il commentario completo di Ibn Kathir o Jalalayn.</p>
    `;
    document.getElementById('tafsir-modal').classList.remove('hidden');
}

// Controlli Pagina
document.getElementById('next-page-btn').onclick = () => loadQuranPage(currentPage + 1);
document.getElementById('prev-page-btn').onclick = () => loadQuranPage(currentPage - 1);
document.getElementById('close-modal').onclick = () => document.getElementById('tafsir-modal').classList.add('hidden');

// Audio
document.getElementById('play-btn').onclick = function() {
    const reciter = document.getElementById('reciter-select').value;
    if(!isPlaying) {
        // Link audio demo
        audio.src = `https://download.quranicaudio.com/quran/mishari_rashid_al-afasy/001.mp3`;
        audio.play();
        this.innerHTML = '<i class="fas fa-pause-circle"></i>';
    } else {
        audio.pause();
        this.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
    isPlaying = !isPlaying;
};

// Segnalibri
document.getElementById('open-bookmarks').onclick = () => {
    const list = document.getElementById('bookmarks-list');
    const bms = JSON.parse(localStorage.getItem('quran_bms') || '[]');
    list.innerHTML = bms.length ? '' : '<li>Nessun segnalibro</li>';
    bms.forEach(b => {
        const li = document.createElement('li');
        li.textContent = `Pagina ${b.p} - Versetto ${b.v}`;
        list.appendChild(li);
    });
    document.getElementById('bookmarks-modal').classList.remove('hidden');
};

document.getElementById('save-bookmark-btn').onclick = () => {
    let bms = JSON.parse(localStorage.getItem('quran_bms') || '[]');
    bms.push({p: currentPage, v: currentVerse});
    localStorage.setItem('quran_bms', JSON.stringify(bms));
    alert("Segnalibro salvato!");
};

document.getElementById('close-bookmarks').onclick = () => document.getElementById('bookmarks-modal').classList.add('hidden');

// Inizio
loadQuranPage(1);
