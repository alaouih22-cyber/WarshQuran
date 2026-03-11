const recitersWarsh = [
    { id: 'ar.yassin_al_jazaery', name: 'Yassin Al Jazaery' },
    { id: 'ar.ibrahimaldosari', name: 'Ibrahim Al Dosari' },
    { id: 'ar.laayoun_el_kouchi', name: 'Laayoun El Kouchi' }
];

const tafsirs = [
    { id: 'ar.jalalayn', name: 'Tafsir Al-Jalalayn' },
    { id: 'ar.muyassar', name: 'Tafsir Al-Muyassar' }
];

function toggleMenu() {
    document.getElementById('menuOverlay').classList.toggle('hidden');
}

// Popola Menu
window.onload = () => {
    const rs = document.getElementById('reciterSelect');
    rs.innerHTML = recitersWarsh.map(r => `<option value="${r.id}">${r.name}</option>`).join('');

    const ts = document.getElementById('tafsirSelect');
    ts.innerHTML = tafsirs.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

    // Carica lista Sure
    fetch('https://api.alquran.cloud')
        .then(res => res.json())
        .then(data => {
            document.getElementById('surahSelect').innerHTML = data.data.map(s => 
                `<option value="${s.number}">${s.name}</option>`).join('');
        });
};

// Cambio Sura/Pagina
document.getElementById('surahSelect').addEventListener('change', (e) => {
    const surahId = e.target.value;
    const reciter = document.getElementById('reciterSelect').value;
    
    // Audio
    document.getElementById('audioPlayer').src = `https://cdn.islamic.network{reciter}/${surahId}.mp3`;
    
    // Nota: Per le immagini esatte di EasyQuran serve il loro server o QuranHub
    // Esempio generico di immagine pagina (da adattare al numero pagina della sura)
    document.getElementById('quranImage').src = `https://easyquran.com{surahId}.png`; 
});
