let curPage = 1;
let isPlaying = false;
const img = document.getElementById('quran-img');
const player = document.getElementById('player');

function loadPage(n) {
    if (n < 1 || n > 604) return;
    curPage = n;
    
    // FIX: Formattazione a 3 cifre (1 -> 001)
    const pStr = n.toString().padStart(3, '0');
    
    // NUOVO URL SICURO
    img.src = `https://everyayah.com/data/quran_pages_png/${pStr}.png`;
    
    document.getElementById('p-num').textContent = `Pagina ${n}`;
    drawZones();
}

function drawZones() {
    const ov = document.getElementById('verse-overlay');
    ov.innerHTML = '';
    // Creiamo zone cliccabili per i versetti
    for(let i=1; i<=10; i++) {
        const zone = document.createElement('div');
        zone.className = 'v-zone';
        zone.style.cssText = `top:${10+(i*8)}%; left:10%; width:80%; height:7%;`;
        zone.onclick = () => openTafsir(i);
        ov.appendChild(zone);
    }
}

function openTafsir(v) {
    const tType = document.getElementById('tafsir-sel').value;
    document.getElementById('m-title').textContent = `Versetto ${v}`;
    document.getElementById('m-body').innerHTML = `<b>Tafsir: ${tType}</b><br><br>Spiegazione del versetto selezionato nella pagina ${curPage}. In questa sezione l'app caricherà il testo originale dal database.`;
    document.getElementById('modal-tafsir').classList.remove('hidden');
}

// Eventi Navigazione
document.getElementById('p-next').onclick = () => loadPage(curPage + 1);
document.getElementById('p-prev').onclick = () => loadPage(curPage - 1);
document.getElementById('m-close').onclick = () => document.getElementById('modal-tafsir').classList.add('hidden');

// Audio
document.getElementById('a-play').onclick = function() {
    if(!isPlaying) {
        const reciter = document.getElementById('reciter-sel').value;
        // Esempio audio Sura 1
        player.src = "https://download.quranicaudio.com/quran/mishari_rashid_al-afasy/001.mp3";
        player.play();
        this.innerHTML = '<i class="fas fa-pause-circle"></i>';
    } else {
        player.pause();
        this.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
    isPlaying = !isPlaying;
};

// Segnalibri (LocalStorage)
document.getElementById('btn-bookmarks').onclick = () => {
    const list = document.getElementById('b-list');
    const data = JSON.parse(localStorage.getItem('q_bmarks') || '[]');
    list.innerHTML = data.length ? '' : '<li>Nessun segnalibro</li>';
    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `Pagina ${item.p} <button onclick="loadPage(${item.p})" style="margin-left:10px">Vai</button>`;
        list.appendChild(li);
    });
    document.getElementById('modal-bmarks').classList.remove('hidden');
};

document.getElementById('m-save').onclick = () => {
    let data = JSON.parse(localStorage.getItem('q_bmarks') || '[]');
    data.push({p: curPage});
    localStorage.setItem('q_bmarks', JSON.stringify(data));
    alert("Salvato!");
};

document.getElementById('b-close').onclick = () => document.getElementById('modal-bmarks').classList.add('hidden');

// Avvio
loadPage(1);
