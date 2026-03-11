const CONFIG = {
    reciters: [
        { id: 'ar.yassin_al_jazaery', name: 'ياسين الجزائري (ورش)' },
        { id: 'ar.ibrahimaldosari', name: 'إبراهيم الدوسري (ورش)' },
        { id: 'ar.laayoun_el_kouchi', name: 'العيون الكوشي (ورش)' }
    ],
    tafsirs: [
        { id: 'ar.jalalayn', name: 'تفسير الجلالين' },
        { id: 'ar.muyassar', name: 'تفسير الميسر' },
        { id: 'ar.qortobi', name: 'تفسير القرطبي' }
    ]
};

const ui = {
    toggleMenu: () => document.getElementById('mainMenu').classList.toggle('hidden'),
    showLoading: (show) => document.getElementById('loadingOverlay').classList.toggle('hidden', !show)
};

async function loadSurahData() {
    const id = document.getElementById('surahSelect').value;
    const reciter = document.getElementById('reciterSelect').value;
    const tafsirId = document.getElementById('tafsirSelect').value;

    ui.showLoading(true);

    try {
        // 1. Aggiorna Immagine (Warsh)
        document.getElementById('pageImg').src = `https://easyquran.com{id}.png`;

        // 2. Aggiorna Audio
        document.getElementById('mainAudio').src = `https://cdn.islamic.network{reciter}/${id}.mp3`;

        // 3. Carica Tafsir Completo (Tutti i versetti)
        const response = await fetch(`https://api.alquran.cloud{id}/${tafsirId}`);
        const data = await response.json();
        
        let html = '';
        data.data.ayahs.forEach(ayah => {
            html += `<div class="ayah-tafsir">
                        <span class="ayah-num">[آية ${ayah.numberInSurah}]</span><br>
                        ${ayah.text}
                     </div>`;
        });
        document.getElementById('tafsirList').innerHTML = html;

    } catch (err) {
        console.error("Errore nel caricamento:", err);
    } finally {
        ui.showLoading(false);
    }
}

// Inizializzazione
window.onload = async () => {
    // Popola select
    document.getElementById('reciterSelect').innerHTML = CONFIG.reciters.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
    document.getElementById('tafsirSelect').innerHTML = CONFIG.tafsirs.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

    const res = await fetch('https://api.alquran.cloud');
    const data = await res.json();
    document.getElementById('surahSelect').innerHTML = data.data.map(s => `<option value="${s.number}">${s.name}</option>`).join('');

    document.getElementById('surahSelect').onchange = loadSurahData;
    document.getElementById('reciterSelect').onchange = loadSurahData;
    document.getElementById('tafsirSelect').onchange = loadSurahData;
};
