const surahSelect = document.getElementById('surahSelect');
const ayahText = document.getElementById('ayahText');
const tafsirText = document.getElementById('tafsirText');
const audioPlayer = document.getElementById('audioPlayer');

// Carica l'elenco delle Sure
fetch('https://api.alquran.cloud')
    .then(res => res.json())
    .then(data => {
        surahSelect.innerHTML = data.data.map(s => `<option value="${s.number}">${s.name}</option>`).join('');
    });

surahSelect.addEventListener('change', (e) => {
    const id = e.target.value;
    
    // Testo in Warsh (Edizione: quran-wordbyword)
    fetch(`https://api.alquran.cloud/${id}/ar.ebrahim_walk`)
        .then(res => res.json())
        .then(data => {
            ayahText.innerText = data.data.ayahs.map(a => a.text).join(' ۝ ');
            audioPlayer.src = `https://cdn.islamic.network{id}.mp3`;
        });

    // Esempio Tafsir (Jalalayn)
    fetch(`https://api.alquran.cloud/${id}/ar.jalalayn`)
        .then(res => res.json())
        .then(data => {
            tafsirText.innerText = data.data.ayahs[0].text + "... (Tafsir)";
        });
});
